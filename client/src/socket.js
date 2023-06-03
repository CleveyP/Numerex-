import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';


//call socket.connect after user starts a game
export const socket = io(URL, {
    autoConnect: false
  });