import { Report } from 'notiflix/build/notiflix-report-aio';
import './team-data';
// (() => {
const refs = {
  openTeamModalBtn: document.querySelectorAll('[data-about-scream-modal-open]'),
  closeTeamModalBtn: document.querySelector('[data-about-scream-modal-close]'),
  teamModal: document.querySelector('[data-about-scream-modal]'),
};

refs.openTeamModalBtn.forEach(el => {
  el.addEventListener('click', toggleModal);
});
refs.closeTeamModalBtn.addEventListener('click', toggleModal);

function toggleModal(event) {
  event.preventDefault();
  document.body.classList.toggle('modal-open--team');
  refs.teamModal.classList.toggle('is-hidden--team');
}
// })();

const bestTeamBtnEl = document.querySelector('.button__modal-submit--team');
bestTeamBtnEl.addEventListener('click', onBestTeamConfirm);

function onBestTeamConfirm() {
  Report.success(
    'Totally agree',
    '"We are happy to work together again on JS project" <br/><br/>- every team member',
    'Okay, calm down',
    {
      backgroundColor: 'black',
      titleFontSize: '24px',
      messageFontSize: '17px',
      buttonFontSize: '15px',
      success: {
        svgColor: 'yellow',
        titleColor: 'red',
        messageColor: 'red',
        buttonBackground: 'yellow',
        buttonColor: 'black',
        backOverlayColor: 'rgba(0,0,0,0.7)',
      },
    }
  );
}
