import { ADD_MESSAGE, CLEAR_MESSAGE } from './index';

export function addMessageToContainer(message, messageType) {
  const timeStamp = new Date().toString();
  const id = message + timeStamp;
  const messageObject = { message, id, messageType }
  return { type: ADD_MESSAGE, payload: messageObject };
}

export function clearMessage(id) {
  return { type: CLEAR_MESSAGE, payload: id };
}