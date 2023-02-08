import { Report } from 'notiflix/build/notiflix-report-aio';
(() => {
    const refs = {
      openModalBtn: document.querySelector('[data-about-scream-modal-open]'),
      closeModalBtn: document.querySelector('[data-about-scream-modal-close]'),
      modal: document.querySelector('[data-about-scream-modal]'),
    };
  
    refs.openModalBtn.addEventListener('click', toggleModal);
    refs.closeModalBtn.addEventListener('click', toggleModal);
  
    function toggleModal() {
      document.body.classList.toggle('modal-open--team');
      refs.modal.classList.toggle('is-hidden--team');
    }
  })();

  const bestTeamBtnEl = document.querySelector(".button__modal-submit--team");
  bestTeamBtnEl.addEventListener("click", onBestTeamConfirm);
  
  function onBestTeamConfirm () {
    Report.success(
        'Totally agree',
        '"We are happy to work together again on JS project" <br/><br/>- every team member',
        'Okay, calm down',{backgroundColor: 'black', titleFontSize: '24px',
            messageFontSize: '17px', buttonFontSize: '15px',success: {
            svgColor: 'yellow',
            titleColor: 'red',
            messageColor: 'red',
            buttonBackground: 'yellow',
            buttonColor: 'black',
            backOverlayColor: 'rgba(0,0,0,0.7)',}},
        );

  }
