const $form = document.querySelector('.temp-converter-form')
const $inputForm = $form.querySelector('input')
const $fromValue = $form.querySelector('.temp-converter-units-from')
const $toValue = $form.querySelector('.temp-converter-units-to')
const $buttonForm = $form.querySelector('button')
const $result = document.querySelector('.temp-converter-result')
let calculatedValue = 0
$form.addEventListener("input", () => {
  if ($inputForm.value && $fromValue.value !== 'n' && $toValue.value !== 'n') {
    $buttonForm.disabled = false;
  } else {
    $buttonForm.disabled = true;
  }
});


$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fromValue = $fromValue.value
  const toValue = $toValue.value
  const formValue = $inputForm.value
  switch (fromValue) {
    case "Fahrenheit":
       if(toValue === 'Fahrenheit') calculatedValue = formValue     
       else if(toValue === 'Celseus') farenheitToCelsius(formValue)
       else if(toValue === 'Kelvin') farenheitToKelvin(formValue)
       break;
    case "Celseus":
       if(toValue === 'Celseus') calculatedValue =  formValue     
       else if(toValue === 'Fahrenheit')  celsiusToFarenheit(formValue)
       else if(toValue === 'Kelvin')  celsiusToKelvin(formValue)  
        break;
    case "Kelvin":
       if(toValue === 'Kelvin')  calculatedValue = formValue     
       else if(toValue === 'Fahrenheit')  kelvinToFarenheit(formValue)
       else if(toValue === 'Celseus')  kelvinToCelsius(formValue)  
        break;
    default:
        break;
  }
   $result.textContent = `${formValue} ${fromValue} is ${calculatedValue} ${toValue}`
});



function farenheitToCelsius(fromValue) {
  // °C = (°F - 32) * 5/9
  calculatedValue = ((fromValue - 32) * 5/9).toFixed(2);
}

function celsiusToFarenheit(fromValue) {
  // °F = (°C * 9/5) + 32
  calculatedValue = ((fromValue * 9/5) + 32).toFixed(2);
}

function farenheitToKelvin(fromValue) {
  // K = (°F - 32) * 5/9 + 273.15
  calculatedValue = (((fromValue - 32) * 5/9) + 273.15).toFixed(2);
}

function kelvinToFarenheit(fromValue) {
  // °F = (K - 273.15) * 9/5 + 32
  calculatedValue = (((fromValue - 273.15) * 9/5) + 32).toFixed(2);
}

function celsiusToKelvin(fromValue) {
  // K = °C + 273.15
  calculatedValue = (parseFloat(fromValue) + 273.15).toFixed(2);
}

function kelvinToCelsius(fromValue) {
  // °C = K - 273.15
  calculatedValue = (fromValue - 273.15).toFixed(2);
}
