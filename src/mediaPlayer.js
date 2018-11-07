/*
 * @author: wayou 
 * @date: 2018-11-07 16:02:02 
 * @description: collections of players with the guarantee of only one player is playing
 */

import { AudioPlayer } from "./audioPlayer";

const defaultOptions = {
  // medias to play,
  // object with type,url and parent node,
  // {id:index,url:'',type:'audio/video',parent:'',duration:''}
  medias: []
};

export default class MediaPlayer {
  constructor(options) {
    this.options = Object.assign({}, defaultOptions, options);
    this.players = [];
    this._init();
  }

  _init() {
    this.players = this.options.medias.map(media => {
      return this.createPlayer(media);
    });
  }

  createPlayer(media) {
    if (media.type === "audio") {
      return new AudioPlayer(media.url);
    }
    if (media.type === "video") {
      return new AudioPlayer(media.url);
    }
  }

  add(media) {
    this.options.media.push(media);
    this.players.push(this.createPlayer(media));
  }

  remove(index) {
    this.medias.splice(index, 1);
    this.players.splice(index, 1);
  }

  clear() {
    this.options.media = [];
    this.players = [];
  }
}
