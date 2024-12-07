const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[ata-passwordDisplay]");
const copybtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator =document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols ='~`@#$%z^&*()_-={[}]:|/?';

let password ="";
let passwordLength = 12;
let checkCount = 0;
handleSlider();
// set strength circle color to gray

// set passwordLength

function handleSlider() { // iska kam ha ki slider or password length ki value ko handle karta ha
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;    //  or kuch bhi karna chaihiye

}

function setIndicator(color){
    indicator.computedStyleMap.backfroundColor =color;
    // shadow -hw
}

function getRndInteger(min ,max){
    Math.floor(Math.random() * (max -min)) + min;

}

function generateRandomNumber(){
    return getRndInteger(0 ,9);
}

function generateLowerCase(){
     return String.fromCharCode(getRndInteger(97 ,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65 ,91));
}

function generateSymbols(){
     const randNum = getRndInteger(0 , symbols.length);
     return symbols.charAt(randNum);
}



// reh gya ha code likgne


function calcStrength(){
    let hasUpper ="";

}








async function copyContent(params) {
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText ="copied";
    }
    catch(e){
        copyMsg.innerText ="Failed";
    }
    // to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( ()=>{
        copyMsg.classList.remove("active");
    } ,2000);
    
}
 
function shufflepassword(){
    // fisher yates Method 
}


function handleCheckBocChange(){
    checkCount =0;
    allCheckBox.forEach( (checkbox)=>{
        if(checkbox.checked)
            checkCount++;
            handleSlider();
    })

    // special condition
    if(passwordLength < checkCount ){
        passwordLength =checkCount;

    }
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change' , handleCheckBocChange);

})



inputSlider.addEventListener('input' , (e)=>{
    passwordLength =e.target.value;
    handleSlider();
} )

copybtn.addEventListener('click' , ()=>{
    if(passwordDisplay.value)
        copyContent();
})

// generate password

generateBtn.addEventListener('click' , ()=> {
    // none of the checkbox are selected
    if(checkCount <=0) return;

    if(passwordLength < checkCount){
        passwordLength =checkCount;
        handleSlider();
    }
      

    // let's start the journey to find new password ]

    // remove old password
    password= "";

    // let put the stuff mentioned by checkBoxes

//     if(uppercaseCheck.checked){
//         password += generateUpperCase();
//     }

//     if(lowercaseCheck.checked){
//         password += generatelowerCase();
//     }

//     if(numbersCheck.checked){
//         password += generateRandomNumber();
//     }

//     if(symbolsCheckk.checked){
//         password += generateSymbols();
//     }
// });

let funArr =[];

if(uppercaseCheck.checked)
    funArr.push(generateUpperCase);

if(lowercaseCheck.checked)
    funArr.push(generateLowerCase);

if(numbersCheck.checked)
    funArr.push(generateRandomNumber);

if(symbolsCheck.checked)
    funArr.push(generateSymbols);

// compulsary addition 
for(let i=0;i<funArr.length;i++){
    password+= funArr[i]();
}

// remaining addition
for(let i=0;i<passwordLength-funArr.length;i++){
    let randIndex = getRndInteger(0 , funArr.length);
    password+= funArr[randIndex]();

}

// shuffle the password

password=shufflepassword(Array.from(Array));
// show in UI
passwordDisplay.value=password;

// calculate Strength
calcStrength();



});

