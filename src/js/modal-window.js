const closeModalBtn = document.querySelector('.btn-modal');
const backdrop = document.querySelector('.js-backdrop');
const listLibrary = document.querySelector('.js-gallery');


listLibrary.addEventListener('click', onModalOpen);
closeModalBtn.addEventListener('click', onCloseModal);
backdrop.addEventListener('click', onBackdropClick);



function onModalOpen () {
  window.addEventListener('keydown', onEscKeyPress);
  document.body.classList.add('show-modal');


  // Розмітка через шаблон---!!!


}

function onCloseModal () {
  window.removeEventListener('keydown', onEscKeyPress);
  document.body.classList.remove('show-modal');
}

function onBackdropClick (event) {
  if(event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onEscKeyPress (event) {
  if(event.code === 'Escape') {
    onCloseModal();
  }
  
}