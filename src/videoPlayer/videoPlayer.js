/*
 * @author: wayou
 * @date: 2018-11-08 14:38:53
 * @description: video player
 */

import './videoPlayer.css';

const defaultOptions = {
  parent: document.body,
  autoPlay: false,
  duration: 0
};

export default class VideoPlayer {
  constructor(options) {
    this.options = Object.assign({}, defaultOptions, options);

    this.container = null;
    this.isPlaying = false;
    this.player = null;

    this.togglePlay = this.togglePlay.bind(this);

    this._init();
  }

  _init() {
    this.container = this._createUI();
    this.options.parent.innerHTML = '';
    this.options.parent.appendChild(this.container);

    this._initialPlayer();
  }

  _initialPlayer() {
    if (!this.options.url) {
      throw new Error(`missing audio url`);
    }

    this.player = document.createElement('video');
    this.player.src = this.options.url;
    this.player.setAttribute('controls', 'controls');
    this.container.appendChild(this.player);
  }

  togglePlay() {
    const isPlaying = !this.isPlaying;
    if (isPlaying) {
      this.play();
    } else {
      this.pause();
    }
  }

  play() {
    this.player.play();
    this._playStatusChange(true);
  }

  pause() {
    this.player.pause();
    this._playStatusChange(false);
  }

  _playStatusChange(isPlaying) {
    this.isPlaying = isPlaying;
  }

  _createUI() {
    const container = document.createElement('div');
    container.className = 'video-player';
    return container;
  }

  _updateTimeDisplay(time, duration) {
    time = this._formatTime2HHMMSS(time);
    duration = this._formatTime2HHMMSS(duration);
    this.timeHoler.innerText = `${time}/${duration}`;
  }

  _formatTime2HHMMSS(seconds) {
    const date = new Date(null);
    date.setMilliseconds(seconds * 1000);
    let result = date.toISOString().substr(11, 8);

    let splits = result.split(':');
    if (splits.length > 2 && splits[0] === '00') {
      result = splits.slice(1).join(':');
    }
    return result;
  }

  destroy() {
    this._removeEvents();
  }
}
