import pinData from './data/pinData';
import smash from './data/smash';
import pinList from '../components/pinList/pinList';
import singlePin from '../components/singlePin/singlePin';
import boardList from '../components/boardList/boardList';
import editBoard from '../components/editBoard/editBoard';
import boardCard from '../components/boardCard/boardCard';
import editPin from '../components/editPin/editPin';
import profile from '../components/profile/profile';

const deletePinClick = (e) => {
  const pinId = e.target.attributes[3].value;
  pinData.deletePin(pinId);
  smash.totallyDeletePin(pinId)
    .then((boardId) => {
      pinList.showBoard(boardId);
    });
};

const boardLinkEvent = (e) => {
  pinList.showBoard(e.target.id);
};

const pinLinkEvent = (e) => {
  singlePin.showPin(e.target.closest('button').id);
};

const showPinEvent = (e) => {
  const pinId = e.target.closest('.card').id;
  singlePin.showPin(pinId);
};

const cancelPinEdit = (e) => {
  e.stopPropagation();
  const pinId = e.target.dataset.pinid;
  singlePin.showPin(pinId);
};

const clickEvents = () => {
  $('body').on('mouseenter', '.board-selector', (e) => {
    e.target.closest('.card').classList.add('hovering');
  });
  $('body').on('mouseleave', '.board-selector', (e) => {
    e.target.closest('.card').classList.remove('hovering');
  });
  $('body').on('mouseenter', '.board-selector', (e) => {
    boardCard.showEditButton(e);
  });
  $('body').on('mouseleave', '.board-selector', (e) => {
    boardCard.hideEditButton(e);
  });
  $('body').on('click', '#delete-pin', deletePinClick);
  $('body').on('mouseenter', '.pin', (event) => {
    event.target.closest('.card').classList.add('hovering');
  });
  $('body').on('mouseleave', '.pin', (event) => {
    event.target.closest('.card').classList.remove('hovering');
  });
  $('body').on('click', '.pin', showPinEvent);
  $('body').on('click', '.home-button', boardList.createBoards);
  $('body').on('click', '.cancel-edit', pinLinkEvent);
  $('body').on('click', '.board-link', boardLinkEvent);
  $('body').on('click', '.board-selector', pinList.showBoardEvent);
  $('body').on('click', '.board-edit-button', editBoard.editBoardWindow);
  $('body').on('click', '.cancel-board-edit', editBoard.cancelBoardEdit);
  $('body').on('click', '#delete-board', editBoard.deleteBoard);
  $('body').on('click', '#add-board', boardList.addBoard);
  $('body').on('click', '#add-pin', editPin.addPin);
  $('body').on('click', '#board-creator', boardList.addBoardEvent);
  $('body').on('click', '#pin-creator', editPin.addPinEvent);
  $('body').on('click', '#set-board', editPin.setBoardEvent);
  $('body').on('click', '.cancel-pin-edit', cancelPinEdit);
  $('body').on('click', '#profile-link', profile.displayProfile);
  $('body').on('click', '#edit-profile-btn', (() => { $('#edit-profile-form').removeClass('hide'); }));
  $('body').on('click', '#update-profile', profile.updateProfile);
};

export default { clickEvents };
