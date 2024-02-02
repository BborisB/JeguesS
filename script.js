let inputsTbody = document.getElementById('inputs-tbody');
let inputsRow = inputsTbody.lastElementChild;
let inputs = inputsRow.querySelectorAll('button');
let colors = [
    'rgb(' + getIntRand(255) + ', ' + getIntRand(255) + ', ' + getIntRand(255) + ')',
    'rgb(' + getIntRand(255) + ', ' + getIntRand(255) + ', ' + getIntRand(255) + ')',
    'rgb(' + getIntRand(255) + ', ' + getIntRand(255) + ', ' + getIntRand(255) + ')',
    'rgb(' + getIntRand(255) + ', ' + getIntRand(255) + ', ' + getIntRand(255) + ')',
    'rgb(' + getIntRand(255) + ', ' + getIntRand(255) + ', ' + getIntRand(255) + ')'
]
let colorsTemp = Array.from(colors);
let buttons = document.getElementById('colors').querySelectorAll('button');
let solution = [getUniqueColor(), getUniqueColor(), getUniqueColor(), getUniqueColor(), getUniqueColor()]
let index = 0;
let tryCount = 1;
let submitBtn = document.getElementById('submitBtn');
let resetBtn = document.getElementById('resetBtn');
let hints = document.getElementById('hints');
let originalRow = inputsRow.cloneNode(true);
document.getElementById('new-game').addEventListener('click', (e) =>
{
    window.location.reload();
})

//difficulty
document.getElementsByName('difficulty').forEach((elt) =>
{
    elt.addEventListener('change', (e) =>
    {
        colors = [];
        //easy
        if(elt.value == 'easy')
        {
            for(let i = 0; i < 5; i++)
            {
                colors.push('rgb(' + getIntRand(255) + ', ' + getIntRand(255) + ', ' + getIntRand(255) + ')');
            }
        }
        //not easy
        else
        {
            for(let i = 0; i < 10; i++)
            {
                colors.push('rgb(' + getIntRand(255) + ', ' + getIntRand(255) + ', ' + getIntRand(255) + ')');
            }
        }
    })
})

function clickButton(i)
{
    if(i < buttons.length)
        buttons[i].click();
}

//buttons shortkey
document.addEventListener('keypress', (e) =>
{
    clickButton(e.key - 1);
})

//rand
function getIntRand(max)
{
    return Math.floor(Math.random() * max)
}

//colors without dupes
function getUniqueColor()
{
    let number = getIntRand(colorsTemp.length);
    let color = colorsTemp[number];
    colorsTemp.splice(number, 1);
    return color;
}

//colors with dupes
function getColor()
{
    return colors[getIntRand(colors.length)];
}

//buttons click
for(let i = 0; i < buttons.length; i++)
{
    let btn = buttons[i];
    btn.style.backgroundColor = colors[i]
    btn.addEventListener('click', () =>
    {
        if(index < inputs.length)
        {
            inputs[index].style.backgroundColor = btn.style.backgroundColor;
            index++;
            btn.style.opacity = 0;
            btn.disabled = true;
        }
        if(index == inputs.length)
            submitBtn.disabled = false;
    })
}

//reset
function reset()
{
    submitBtn.disabled = true;
    inputs.forEach((i) =>
    {
        i.style.backgroundColor = "transparent";
    })
    buttons.forEach((btn) =>
    {
        btn.disabled = false;
        btn.style.opacity = 100;
    })
    index = 0;
}
resetBtn.addEventListener('click', reset);

//submit
submitBtn.addEventListener('click', (e) =>
{
    let count = 0;
    for(let i = 0; i < inputs.length; i++)
    {
        let input = inputs[i];
        let td = inputsRow.children[i + 1];
        if(input.style.backgroundColor == solution[i])
        {
            count++;
            td.style.border = "solid 10px rgb(25, 135, 84)"
        }
        else
        {
            td.style.border = "solid 10px rgb(220, 53, 69)"
        }
    }
    if(count == inputs.length)
    {
        hints.textContent = "Gagné !"
        resetBtn.disabled = true;
        submitBtn.disabled = true;
    }
    else
    {
        hints.textContent = 'incorrect'
        let newRow = originalRow.cloneNode(true);
        newRow.firstElementChild.textContent = '#' + ++tryCount;
        inputsTbody.appendChild(newRow);
        inputsRow = inputsTbody.lastChild;
        inputs = inputsRow.querySelectorAll('button');
        reset();
    }
})