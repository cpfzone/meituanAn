import io from 'socket.io-client';
const config = require('../../config/db');
const dbPath = config.complete ? '114.115.182.108' : 'localhost';
const socket = io(`ws://${dbPath}:${config.port}`);

export const messageListDefault = value => {
  return socket.emit('sendMsg', value);
};
