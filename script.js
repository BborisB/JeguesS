let inputs = document.getElementById('inputs').querySelectorAll('input');
let colors = ['rgb(0, 0, 0)', 'rgb(25, 135, 84)', 'rgb(255, 193, 7)', 'rgb(220, 53, 69)', 'rgb(13, 202, 240)']
let index = 0;
let buttons = document.getElementById('colors').querySelectorAll('button');
for(let i = 0; i < buttons.length; i++)
{
    let btn = buttons[i];
    btn.addEventListener('click', () =>
    {
        if(index < inputs.length)
        {
            btn.style.backgroundColor = colors[i]
            inputs[index].style.backgroundColor = btn.style.backgroundColor;
            index++;
        }
    })
}

document.getElementById('resetBtn').addEventListener('click', (e) =>
{
    inputs.forEach((i) =>
    {
        i.style.backgroundColor = "transparent";
    })
    index = 0;
})

let solution = [
    colors[Math.floor(Math.random() * colors.length)],
    colors[Math.floor(Math.random() * colors.length)],
    colors[Math.floor(Math.random() * colors.length)],
    colors[Math.floor(Math.random() * colors.length)],
    colors[Math.floor(Math.random() * colors.length)]
]

console.log(solution);
document.getElementById('submitBtn').addEventListener('click', (e) =>
{
    let result = true;
    for(let i = 0; i < inputs.length; i++)
    {
        if(inputs[i].style.backgroundColor != solution[i])
        {
            result = false;
            break;
        }
    }
    if(result)
        console.log('vrai');
    else
        console.log('faux');
})