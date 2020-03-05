import io from 'socket.io-client';
import Axios from 'axios';
const config = require('../../config/db');
const dbPath = config.complete ? '114.115.182.108' : 'localhost';
const socket = io(`ws://${dbPath}:${config.port}`);

export const messageListDefault = value => {
  return socket.emit('sendMsg', value);
};

export const firstMessageData = value => {
  return Axios({
    method: 'post',
    url: '/server/chat/first',
    data: {
      value,
    },
  });
};
