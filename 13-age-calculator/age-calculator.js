const DateTime = luxon.DateTime;

const $selectedTime = document.querySelector('.age-calculator-input')
const $button = document.querySelector('.age-calculator-button')
const $value = document.querySelector('.age-calculator-value')
$button.addEventListener('click', () => {handleClickAge()} )

function handleClickAge() {
    const { years, months } = DateTime.now().diff(DateTime.fromISO($selectedTime.value), ['years', 'months']).toObject();
    $value.innerHTML = `You are <strong>${years} years ${Math.floor(months)} months</strong> old`
}