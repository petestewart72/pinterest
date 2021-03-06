import './pinCard.scss';
import pinList from '../pinList/pinList';

const pinCardString = (pin) => {
  const domString = `
  <div class="single-pin-container">
    <div class="pin-image" id=${pin.id}>
      <img class="" src="${pin.url}" alt="${pin.id}">
      </div>
      <div id="edit">
        <div class="pin-info-header">
          <div>
            <img src="${pin.avatar}" class="avatar-mini home-button">
              saved to <a class="board-link" id="${pin.boardId}">${pin.boardName}</a>
            <h2 class="mt-3">${pin.title}</h2>
          </div>
          <div>
            <div id="edit-button" class="pin-edit-button hide" data-pinid="${pin.id}">
              <span class="fa-stack fa-1x" id="edit-button" data-pinid="${pin.id}">
                <i class="fas fa-circle fa-stack-2x" data-pinid="${pin.id}"></i>
                <i class="fas fa-edit fa-stack-1x fa-inverse" data-pinid="${pin.id}"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
  </div>
  `;
  return domString;
};

const pinCardMaker = (pin) => new Promise((resolve, reject) => {
  const pinObject = pin;
  pinList.getHeaderInfo(pin.boardId)
    .then((response) => {
      pinObject.boardName = response.boardName;
      pinObject.avatar = response.avatar;
      const domString = pinCardString(pinObject);
      resolve(domString);
    })
    .catch((err) => reject(err));
});

const showEditButton = () => {
  $('#edit-button').removeClass('hide');
};

const hideEditButton = () => {
  $('#edit-button').addClass('hide');
};

export default {
  pinCardMaker, showEditButton, hideEditButton,
};
