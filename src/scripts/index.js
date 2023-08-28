/* Desenvolva sua lógica aqui */
import { handleModal } from "./modal.js"
import { insertedValues } from "./valuesData.js"

const handleRegisterValue = (array) => {
  const modal = document.querySelector('.modal__controller')
  const value = document.querySelector('#value')
  const radios = document.querySelectorAll('input[type="radio"]')
  const button = document.querySelector('.submit')

  let newValue = {}

  button.addEventListener('click', (event) => {
    event.preventDefault()

    //adicionando o id ao objeto
    newValue.id = Number(array.length + 1)

    //adicionando o valor
    newValue.value = Number(value.value)

  //adicionando tipo entranda/saida
  radios.forEach((radio) => {
    if (radio.checked) {
      if (radio.value == 0) {
        newValue.valuesCategory = "Entrada"
      } else {
        newValue.valuesCategory = "Saída"
      }
    }
  });

  array.push(newValue)
  newValue = {}
  render(insertedValues)
  sumValues(insertedValues)

  modal.close()
  })
}

const render = (array) => {
  const resumeList = document.querySelector('.resume__list')

  resumeList.innerHTML = ""

  array.forEach(value => {
    const card = createCard(value)

    resumeList.appendChild(card)
  });

}

const createCard = (object) => {
  const li = document.createElement('li')
  const value = document.createElement('span')
  const div = document.createElement('div')
  const op = document.createElement('span')
  const btn = document.createElement('button')

  li.classList.add("value__card")
  value.classList.add("text1")
  value.classList.add("medium")
  op.classList.add("span")
  div.classList.add("buttons__container")
  btn.classList.add("delete__button")

  btn.addEventListener('click', () => {

    
    const found = insertedValues.find((element) => +element.id == +btn.id) 


    let foundIndex = insertedValues.findIndex((element)=> element.id == found)
    insertedValues.splice(foundIndex,1)

    li.remove()

    sumValues(insertedValues)


  })

  value.innerText = `R$ ${object.value.toFixed(2)}`
  op.innerText = object.valuesCategory
  btn.innerHTML = "<img src='./src/assets/trash.svg'>"

  div.append(op, btn)
  li.append(value, div)

  return li
}

function sumValues(array) {
  const entradas = array.filter((element) => element.valuesCategory == "Entrada");

  let totalEntradas = entradas.reduce((acumulador, valorAtual) => {
    return acumulador + valorAtual.value;
  }, 0);

  const saidas = array.filter((element) => element.valuesCategory == "Saída");

  let totalSaidas = saidas.reduce((acumulador, valorAtual) => {
    return acumulador + (valorAtual.value * -1);
  }, 0);


  const sumItem = document.querySelector(".sum__item");

  sumItem.innerText = ""
  sumItem.innerText = `R$ ${(totalEntradas + totalSaidas).toFixed(2)}`
}

function filter(array){
  const allButton = document.querySelector('.all__button')

  allButton.addEventListener('click', ()=> {

    render(array)

  })


  const entryButton = document.querySelector('.entry__button')
  entryButton.addEventListener('click', () =>{

    const entryValues = insertedValues.filter((valor) => valor.valuesCategory == 'Entrada');

    const resumeList = document.querySelector(".resume__list")

    resumeList.innerText = ""

    render(entryValues)
    
  })

  const exitButton = document.querySelector('.exit__button')
  exitButton.addEventListener('click', () =>{

    const exitValues = insertedValues.filter((valor) => valor.valuesCategory == 'Saída');

    const resumeList = document.querySelector(".resume__list")

    resumeList.innerText = ""

    render(exitValues)
    
  })
}


filter(insertedValues)
handleRegisterValue(insertedValues)
render(insertedValues)
handleModal()
sumValues(insertedValues)