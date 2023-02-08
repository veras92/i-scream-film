const closeModalBtn = document.querySelector('.btn-modal');
const backdrop = document.querySelector('.js-backdrop');
const listLibrary = document.querySelector('.js-gallery');

listLibrary.addEventListener('click', onModalOpen);
closeModalBtn.addEventListener('click', onCloseModal);
backdrop.addEventListener('click', onBackdropClick);



function onModalOpen () {
  window.addEventListener('keypress', onEscKeyPress);
  document.body.classList.add('show-modal');
}

function onCloseModal () {
  window.removeEventListener('keypress', onEscKeyPress);
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