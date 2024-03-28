"use strict";

const card = document.querySelector('.card')
const card__form = document.querySelector('.card__form--container')
const success__msg = document.querySelector('.card__completed')

const card__name = card.querySelector('.card__name')
const card__number = card.querySelector('.card__number')
const card__exp = card.querySelector('.card__exp')
const month = card__exp.querySelector('.card__exp--month')
const year = card__exp.querySelector('.card__exp--year')
const cvv = card.querySelector('.card__cvv')
const numError = card__form.querySelector('.number__error')
const expError = card__form.querySelector('.exp__error')
const nameError = card__form.querySelector('.name__error')
const cvvError = card__form.querySelector('.cvv__error')
const completeBtn =  document.querySelector('.card__completed--btn')
const form__name = card__form.querySelector('.form__name')
const form__number = card__form.querySelector('.form__number')
const form__month = card__form.querySelector('.form__month')
const form__year = card__form.querySelector('.form__year')
const form__cvv = card__form.querySelector('.form__cvv')

const currentMonth = new Date().getMonth()
const currentYear = new Date().getFullYear()

function renderval(obj, e){
  obj.insertAdjacentHTML('afterbegin', e)
}

function cleanValues() {
  card__name.textContent = 'Jane Appleseed'
  card__number.textContent = '0000 0000 0000 0000'
  month.textContent = '00'
  year.textContent = '00'
  cvv.textContent = '000'
  form__name.value = ''
  form__number.value = ''
  form__month.value = ''
  form__year.value = ''
  form__cvv.value = ''
}


card__form.addEventListener('keyup', function(e) {
  try {
    if(e.target.classList.contains('form__name')) {
      nameError.classList.add('hidden')
      card__name.textContent = ''
      renderval(card__name, e.target.value)
      return
    }
    
    if(e.target.classList.contains('form__number')) {
      card__number.textContent = ''
      function cardFormat(num){
        return num.replace(/(.{4})/g, "$1 ");
      }
      renderval(card__number, cardFormat(e.target.value)) 
      if(isNaN(e.target.value)) throw Error('numError')
      numError.classList.add('hidden')
      return
    }

    if(e.target.classList.contains('form__month')) {
      month.textContent = ''
      if(parseInt(e.target.value) > 12 || parseInt(e.target.value) < 1)  throw Error('monthError') 
      renderval(month, e.target.value)
      expError.classList.add('hidden')
      return
    }
    
    if(e.target.classList.contains('form__year')) {
      year.textContent = ''
      console.log(e.target.value)
      if(parseInt(e.target.value) < 24) throw Error('yearError') 
      renderval(year, e.target.value)
      expError.classList.add('hidden')
      return
    }

    if(e.target.classList.contains('form__cvv')) {
      cvv.textContent = ''
      renderval(cvv, e.target.value)
      cvvError.classList.add('hidden')
      return
    }
  } catch(err) {
      console.log(err.message);
      if(err.message === 'numError') {
        numError.textContent = 'Wrong format, numbers only'
        numError.classList.remove('hidden')
        return
      }
      if(err.message === 'monthError') {
        expError.textContent = 'Wrong date'
        expError.classList.remove('hidden')
        return
      }
      if(err.message === 'yearError') {
        expError.textContent = 'Wrong date'
        expError.classList.remove('hidden')
        return
      }
    }
  }
)


card__form.addEventListener('submit', function(e) {
  e.preventDefault()
  try { 
    const dataArr = [...new FormData(card__form)]
    const data = Object.fromEntries(dataArr)

    if(data.name === '') throw Error('empty_name')
    if(data.cardNum.length < 16 || data.cardNum === '') throw Error('invalid_card')
    if(parseInt(data.month) < currentMonth + 1) throw Error('invalid_exp')
    if(data.month === '' || data.year === '') throw Error('blank_exp')
    if(data.cvv === '') throw Error('blank_cvv')

    card__form.classList.add('hidden')
    success__msg.classList.remove('hidden')
  } catch (err) {
    if(err.message === 'empty_name') {
      nameError.textContent = "Can't be blank"
      nameError.classList.remove('hidden')
      return
    }
    if(err.message === 'invalid_card') {
      numError.textContent = "Invalid card number"
      numError.classList.remove('hidden')
      return
    }
    if(err.message === 'invalid_exp') {
      expError.textContent = 'Invalid date'
      expError.classList.remove('hidden')
      return
    }
    if(err.message === 'blank_exp') {
      expError.textContent = "Can't be blank"
      expError.classList.remove('hidden')
      return
    }
    if(err.message === 'blank_cvv') {
      cvvError.textContent = "Can't be blank"
      cvvError.classList.remove('hidden')
      return
    }
  }
})


completeBtn.addEventListener('click', function() {
  cleanValues()
  card__form.classList.remove('hidden')
  success__msg.classList.add('hidden')
})
