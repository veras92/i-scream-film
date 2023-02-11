import { Report } from 'notiflix/build/notiflix-report-aio';
import './team-data';
import { LeadsTeamData, TeamData } from './team-data';

const leadsListEl = document.querySelector('.team-list--leads');
const othersListEl = document.querySelector('.team-list--others');

// Modal opening
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
  refs.teamModal.classList.toggle('visually-hidden');
}

// Button function

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

//! Team cards

leadsListEl.innerHTML = renderLeadTeam(LeadsTeamData);
othersListEl.innerHTML = renderTeam(TeamData);

function createLeadCard({ role, image, name, telegram, facebook, linkedIn }) {
  return `
  <li class = "member-card">
  <h3 class="member-card__role">"${role}"</h3>
  <img src="${image}" alt="${name}" class="member-card__photo">
  <h2 class="member-card__name">${name}</h2>
  
  <ul class="social-networks__list">
   <li class="social-networks__item">
      <a
        href="https://telegram.me/${telegram}"
        aria-label="Telegram link"
        target="_blank"
        referrerpolicy="no-referrer"
        class="social-networks__link"
      >
        <svg class="social-networks__icon social-networks__icon--telegram" <symbol id="icon-tg" viewBox="0 0 44 32">
        <path d="M17.346 21.048l-0.676 8.86c0.966 0 1.384-0.388 1.886-0.852l4.528-4.040 9.38 6.414c1.72 0.894 2.932 0.422 3.396-1.478l6.16-26.932c0.546-2.372-0.92-3.3-2.596-2.72l-36.194 12.934c-2.47 0.896-2.432 2.18-0.42 2.766l9.254 2.686 21.494-12.552c1.010-0.626 1.93-0.28 1.174 0.346l-17.386 14.57z"></path>
        </symbol>>
        </svg>
      </a>
    </li>
    <li class="social-networks__item">
      <a
        href="https://www.facebook.com/${facebook}"
        aria-label="Facebook link"
        target="_blank"
        referrerpolicy="no-referrer"
        class="social-networks__link"
      >
        <svg class="social-networks__icon" <symbol id="icon-fb" viewBox="0 0 16 32">
        <path d="M14.143 15.971h-4.033v14.865h-6.112v-14.865h-2.906v-5.222h2.906v-3.382c0-2.417 1.142-6.204 6.167-6.204l4.527 0.019v5.072h-3.284c-0.538 0-1.297 0.272-1.297 1.425v3.073h4.567l-0.534 5.219z"></path>
        </symbol>>
        </svg>
      </a>
    </li>
    <li class="social-networks__item">
      <a
        href="https://www.linkedin.com/in/${linkedIn}"
        aria-label="LinkedIn link"
        target="_blank"
        referrerpolicy="no-referrer"
        class="social-networks__link"
      >
        <svg class="social-networks__icon" <symbol id="icon-linkedin2" viewBox="0 0 32 32">
        <path d="M12 12h5.535v2.837h0.079c0.77-1.381 2.655-2.837 5.464-2.837 5.842 0 6.922 3.637 6.922 8.367v9.633h-5.769v-8.54c0-2.037-0.042-4.657-3.001-4.657-3.005 0-3.463 2.218-3.463 4.509v8.688h-5.767v-18z"></path>
        <path d="M2 12h6v18h-6v-18z"></path>
        <path d="M8 7c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-1.657 1.343-3 3-3s3 1.343 3 3z"></path>
        </symbol>>
        
        </svg>
      </a>
    </li>
  </ul>
</li>`;
}

function createTeamCard({ image, name, telegram, facebook, linkedIn }) {
  return `
  <li class = "member-card">
  <img src="${image}" alt="${name}" class="member-card__photo">
  <h2 class="member-card__name">${name}</h2>
  
  <ul class="social-networks__list">
   <li class="social-networks__item">
      <a
        href="https://telegram.me/${telegram}"
        aria-label="Telegram link"
        target="_blank"
        referrerpolicy="no-referrer"
        class="social-networks__link"
      >
        <svg class="social-networks__icon social-networks__icon--telegram" <symbol id="icon-tg" viewBox="0 0 44 32">
        <path d="M17.346 21.048l-0.676 8.86c0.966 0 1.384-0.388 1.886-0.852l4.528-4.040 9.38 6.414c1.72 0.894 2.932 0.422 3.396-1.478l6.16-26.932c0.546-2.372-0.92-3.3-2.596-2.72l-36.194 12.934c-2.47 0.896-2.432 2.18-0.42 2.766l9.254 2.686 21.494-12.552c1.010-0.626 1.93-0.28 1.174 0.346l-17.386 14.57z"></path>
        </symbol>>
        </svg>
      </a>
    </li>
    <li class="social-networks__item">
      <a
        href="https://www.facebook.com/${facebook}"
        aria-label="Facebook link"
        target="_blank"
        referrerpolicy="no-referrer"
        class="social-networks__link"
      >
        <svg class="social-networks__icon" <symbol id="icon-fb" viewBox="0 0 16 32">
        <path d="M14.143 15.971h-4.033v14.865h-6.112v-14.865h-2.906v-5.222h2.906v-3.382c0-2.417 1.142-6.204 6.167-6.204l4.527 0.019v5.072h-3.284c-0.538 0-1.297 0.272-1.297 1.425v3.073h4.567l-0.534 5.219z"></path>
        </symbol>>
        </svg>
      </a>
    </li>
    <li class="social-networks__item">
      <a
        href="https://www.linkedin.com/in/${linkedIn}"
        aria-label="LinkedIn link"
        target="_blank"
        referrerpolicy="no-referrer"
        class="social-networks__link"
      >
        <svg class="social-networks__icon" <symbol id="icon-linkedin2" viewBox="0 0 32 32">
        <path d="M12 12h5.535v2.837h0.079c0.77-1.381 2.655-2.837 5.464-2.837 5.842 0 6.922 3.637 6.922 8.367v9.633h-5.769v-8.54c0-2.037-0.042-4.657-3.001-4.657-3.005 0-3.463 2.218-3.463 4.509v8.688h-5.767v-18z"></path>
        <path d="M2 12h6v18h-6v-18z"></path>
        <path d="M8 7c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-1.657 1.343-3 3-3s3 1.343 3 3z"></path>
        </symbol>>
        
        </svg>
      </a>
    </li>
  </ul>
</li>`;
}
function renderLeadTeam(arr) {
  return arr.map(item => createLeadCard(item)).join('');
}

function renderTeam(arr) {
  return arr.map(item => createTeamCard(item)).join('');
}
