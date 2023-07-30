import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import { STORAGE_KEY_VIDEO_TIME } from './common';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(currentTime) {
  const { seconds } = currentTime;

  localStorage.setItem(STORAGE_KEY_VIDEO_TIME, seconds);
}

player.setCurrentTime(localStorage.getItem(STORAGE_KEY_VIDEO_TIME));
