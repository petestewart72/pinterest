import axios from 'axios';
import apiKeys from '../apiKeys.json';
import pinData from './pinData';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getUserBoards = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${userId}"`)
    .then((response) => {
      const boardsObjects = response.data;
      // format the object into an array of objects
      const userBoards = [];
      // add the id onto each object and put into array
      Object.keys(boardsObjects).forEach((boardId) => {
        boardsObjects[boardId].id = boardId;
        userBoards.push(boardsObjects[boardId]);
      });
      resolve(utils.alphabetize(userBoards, 'name'));
    })
    .catch((err) => reject(err));
});

const getBoardName = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json`)
    .then((response) => {
      const boardName = response.data[boardId].name;
      resolve(boardName);
    })
    .catch((err) => reject(err));
});

const getBoardbyId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards/${boardId}.json`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((err) => reject(err));
});

const getBoardsWithPins = (userId) => new Promise((resolve, reject) => {
  getUserBoards(userId)
    .then((allBoards) => {
      const boardsWithPins = allBoards;
      const getAllPins = [];
      allBoards.forEach((board) => {
        getAllPins.push(pinData.getBoardPins(board.id));
      });
      Promise.all(getAllPins)
        .then((allPins) => {
          allBoards.forEach((board, index) => {
            boardsWithPins[index].pins = allPins[index];
          });
          resolve(boardsWithPins);
        })
        .catch((err) => reject(err));
    });
});

const addBoard = (newBoardObj) => axios.post(`${baseUrl}/boards.json`, newBoardObj);

const deleteBoard = (boardId) => new Promise((resolve, reject) => {
  axios.delete(`${baseUrl}/boards/${boardId}.json`);
  pinData.getBoardPins(boardId)
    .then((pins) => {
      pins.forEach((pin) => {
        pinData.deletePin(pin.id);
      });
      resolve();
    })
    .catch((err) => (reject(err)));
});

export default {
  getUserBoards, getBoardsWithPins, getBoardName, getBoardbyId, deleteBoard, addBoard,
};
