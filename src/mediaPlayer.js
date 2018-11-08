/*
 * @author: wayou
 * @date: 2018-11-07 16:02:02
 * @description: collections of players with the guarantee of only one player is
 * playing
 */

import AudioPlayer from './audioPlayer';
import VideoPlayer from './videoPlayer';

const players = [];

function initialSingletonPlay() {
  // guarantee that here's only one player is playing
  document.addEventListener('play', e => {
    console.warn('onplay triggered');
    for (var i = 0, len = players.length; i < len; i++) {
      if (players[i].player != e.target) {
        console.warn('paused');
        players[i].player.pause();
      }
    }
  }, true);
}

initialSingletonPlay();

const defaultOptions = {
  parent: document.body,
  autoPlay: false,
  duration: 0,
  url: '',
  // playing the video inline or in popup
  isInlinePlay: true
};

export default class MediaPlayer {
  constructor(type, options) {
    this.options = Object.assign({}, defaultOptions, options);
    this.type = type;
    this._init(this.options);
  }

  _init(options) {
    const player = this.createPlayer(options);
    players.push(player);
  }

  createPlayer(options) {
    if (this.type === 'audio') {
      return new AudioPlayer(options);
    }
    if (this.type === 'video') {
      return new VideoPlayer(options);
    }
  }
}
