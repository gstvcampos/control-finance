/* Desenvolva sua lógica aqui */

export const handleModal = () => {
    const modal = document.querySelector('.modal__controller')
    const button = document.querySelector('.modal__button')
  
    button.addEventListener('click', () => {
      modal.showModal()

      closeModal()
    })
    
}

export const closeModal = () => {
  const modal = document.querySelector('.modal__controller')
  const buttons = document.querySelectorAll('.close__modal')

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      modal.close()
    })
  })
}


