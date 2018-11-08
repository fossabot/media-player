/*
 * @author: wayou
 * @date: 2018-11-08 10:25:29
 * @description: audio player with ui control
 * media events references:
 * https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
 *
 */

import './audioPlayer.css';
import RangeSlider from '../rangeSlider';

const defaultOptions = {
  parent: document.body,
  autoPlay: false,
  duration: 0,
  url: ''
};

const players = [];

function initialSingletonPlay() {
  console.count('listenall');
  // guarantee that here's only one player is playing
  // const players = document.querySelectorAll("audio");
  document.addEventListener('play', e => {
    console.warn('onplay');
    for (var i = 0, len = players.length; i < len; i++) {
      if (players[i] != e.target) {
        console.warn('paused');
        players[i].pause();
      }
    }
  }, true);
}

initialSingletonPlay();

export default class AudioPlayer {
  constructor(options) {
    this.options = Object.assign({}, defaultOptions, options);

    this.container = null;
    this.timeHoler = null;
    this.toggleBtn = null;
    this.slider = null;
    this.isPlaying = false;
    this.player = null;
    this.sliderId = this._getSliderId();

    this.togglePlay = this.togglePlay.bind(this);

    this._init();
  }

  _init() {
    this.container = this._createUI();
    this.options.parent.innerHTML = '';
    this.options.parent.appendChild(this.container);

    this._initialPlayer();
    this._initialEvents();
  }

  _initialEvents() {
    this.toggleBtn.onclick = this.togglePlay;
  }

  _initialPlayer() {
    if (!this.options.url) {
      throw new Error(`missing audio url`);
    }

    this.player = new Audio(this.options.url);
    this.player.onloadedmetadata = () => {
      this._initializeSlider(this.player.duration);
      this._updateTimeDisplay(this.player.currentTime, this.player.duration);
    };

    this.player.ontimeupdate = event => {
      const time = event.currentTarget.currentTime;
      this.slider.setValue(time);
      this._updateTimeDisplay(time, this.player.duration);
    };

    this.player.onended = () => {
      this._playStatusChange(false);
    };

    this.player.onpause = () => {
      this._playStatusChange(false);
    };

    this.player.onerror = () => {
      this._playStatusChange(false);
    };

    this.player.preload = 'metadata';

    // we need to append the audio to DOM or the document.addEventListener won't
    // fire
    this.container.appendChild(this.player);
    players.push(this.player);
  }

  _removeEvents() {
    this.toggleBtn.onclick = undefined;
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
    this.toggleBtn.className = `icon icon-${this.isPlaying ? 'pause' : 'play'}`;
  }

  _initializeSlider(duration) {
    this.slider = new RangeSlider(document.querySelector(`#${this.sliderId}`), {
      max: duration,
      onChange: value => {
        this.player.currentTime = value;
      }
    });
  }

  /**
   * guid generation taken from
   * https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id/6860916#6860916
   */
  _getSliderId() {
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    return randLetter + Date.now();
  }

  _createUI() {
    const container = document.createElement('div');
    container.className = 'audio-player';

    const toggle = document.createElement('div');
    toggle.className = 'player-section player-toggle';
    this.toggleBtn = document.createElement('span');
    this.toggleBtn.className = `icon icon-play`;
    toggle.appendChild(this.toggleBtn);
    container.appendChild(toggle);

    const progress = document.createElement('div');
    progress.className = 'player-section player-progress';
    progress.innerHTML =
        `<div class="player-slider" id="${this.sliderId}"></div>`;
    container.appendChild(progress);

    const timer = document.createElement('div');
    timer.className = 'player-section player-time';
    this.timeHoler = document.createElement('div');
    this.timeHoler.className = 'time';
    this.timeHoler.innerText = '00:00';
    timer.append(this.timeHoler);

    container.appendChild(timer);
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
