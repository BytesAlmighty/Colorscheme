//  create consts to save whatever the value is of the seed color and scheme mode.
// add those consts to the fetch string when ever the button "get color scheme is clicked"
// render to the page whatever is returned by the color API (JSON)

const colorPicker = document.getElementById('color-picker')
const chooseScheme = document.getElementById('scheme-picker')
const colorPalette = document.getElementById('color-scheme')
const popUp = document.getElementById('popup')

let isWaiting = false

document.getElementById('get-color').addEventListener('click', function(){
    colorPalette.innerHTML = "" //clear pallete
    colorPalette.classList.add("color-scheme") //add grid
    colorPalette.classList.remove("initial-text") //remove initial text
    document.getElementById('color-hex').innerHTML = "" //clear hexes
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorPicker.value.substring(1)}&mode=${chooseScheme.value}&count=5`, 
    {method:"GET"}) //end of fetch init
        .then(Res => Res.json()) //parse to json
        .then(data => {
            data.colors.forEach(color=>{
                colorPalette.innerHTML += `
                    <div data-color=${color.hex.value} class="generated-color" style=background-color:${color.hex.value}></div>
                ` // generate colors
                document.getElementById('color-hex').innerHTML += `
                    <div data-color=${color.hex.value} class="align-center">${color.hex.value}</div>
                ` // generate hexes
            })
        })
})

document.addEventListener('click',function(e){
    if(e.target.dataset.color && isWaiting === false){
        isWaiting = true
        navigator.clipboard.writeText(e.target.dataset.color)
        popUp.style.display = "block"
        popUp.style.opacity = 1
        popUp.innerText = `${e.target.dataset.color} copied to clipboard`
        setTimeout(()=>popUp.style.opacity= 0,1000)
        setTimeout(()=>{
            popUp.style.display = "none"
            isWaiting = false
            },1500)
    }
    
})