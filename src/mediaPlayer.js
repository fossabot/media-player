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
    console.warn('onplay triggered',e.target)
    for (var i = 0, len = players.length; i < len; i++) {
      if (players[i].player != e.target) {
        console.warn('paused');
        players[i].pause();
      }
    }
  }, true);
}

initialSingletonPlay();

const defaultOptions = {
  parent: document.body,
  autoPlay: false,
  duration: 0,
  url: ''
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

  // add(options) {
  //   this.options.media.push(options);
  //   this.players.push(this.createPlayer(options));
  // }

  // remove(index) {
  //   this.medias.splice(index, 1);
  //   this.players.splice(index, 1);
  // }

  // clear() {
  //   this.players = [];
  // }
}
