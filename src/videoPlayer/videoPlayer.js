/*
 * @author: wayou
 * @date: 2018-11-08 14:38:53
 * @description: video player
 */

import './videoPlayer.css';

const defaultOptions = {
  parent: document.body,
  autoPlay: false,
  duration: 0,
  isInlinePlay: true,
  url: ''
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
      throw new Error(`missing video url`);
    }

    this.player = document.createElement('video');
    this.player.src = this.options.url;

    if (!this.options.isInlinePlay) {
      const playBtn = document.createElement('span');
      playBtn.className = 'icon icon-video-start-play';
      playBtn.onclick = () => {
        // TODO:
        // - open popup
        // - show controls
        // - play video
        this._openPopup();
      };
      this.container.appendChild(playBtn);
    } else {
      this.player.setAttribute('controls', 'controls');
    }
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

  _openPopup() {
    const popup = document.createElement('div');
    popup.className = 'video-player-popup';

    const videoWrapper = document.createElement('div');
    videoWrapper.className = 'popup-video-wrapper';
    popup.appendChild(videoWrapper);

    const closeBtn = document.createElement('span');
    closeBtn.className = 'icon icon-video-close';
    closeBtn.onclick = () => {
      document.body.removeChild(popup);
    };

    const player = this.player.cloneNode(true);
    player.setAttribute('controls', 'controls');
    videoWrapper.appendChild(player);
    player.play();

    videoWrapper.appendChild(closeBtn);
    document.body.appendChild(popup);
  }
}
