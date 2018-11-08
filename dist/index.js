// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"/ndc":[function(require,module,exports) {

},{"./assets/play.png":[["play.61d110b8.png","g9im"],"g9im"],"./assets/pause.png":[["pause.aba4bb68.png","nj7I"],"nj7I"]}],"B9qw":[function(require,module,exports) {

},{}],"wntC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./rangeSlider.css");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var defaultOptions = {
  className: "",
  total: 100,
  value: 0,
  draggerSize: 12,
  barHeight: 2,
  onChange: null,
  min: 0,
  max: 100
};

var RangeSlider =
/*#__PURE__*/
function () {
  function RangeSlider(parent, options) {
    _classCallCheck(this, RangeSlider);

    this.options = Object.assign({}, defaultOptions, options);
    this.parent = parent || document.body;
    this.isMoving = false;
    this.container = null;
    this.dragger = null;
    this.bar = null;
    this._handleMouseDown = this._handleMouseDown.bind(this);
    this._handleMouseUp = this._handleMouseUp.bind(this);
    this._handleMouseMove = this._handleMouseMove.bind(this);
    this._handleResize = this._handleResize.bind(this);

    this._init();
  }

  _createClass(RangeSlider, [{
    key: "_init",
    value: function _init() {
      this._render();

      var position = this._calculatePosition(this.options.value);

      this._updateUI(position);
    }
  }, {
    key: "_createContainer",
    value: function _createContainer() {
      var container = document.createElement("div");
      container.className = "range-slider ".concat(this.options.className);
      container.style.height = "".concat(this.options.barHeight, "px");
      this.container = container;
      return container;
    }
  }, {
    key: "_createBar",
    value: function _createBar() {
      var bar = document.createElement("span");
      bar.style.height = "".concat(this.options.barHeight, "px");
      bar.style.paddingLeft = "".concat(this.options.draggerSize / 2, "px");
      bar.style.paddingRight = "".concat(this.options.draggerSize / 2, "px");
      bar.className = "progress-bar";
      this.bar = bar;
      return bar;
    }
  }, {
    key: "_createDragger",
    value: function _createDragger() {
      var dragger = document.createElement("span");
      dragger.style.width = "".concat(this.options.draggerSize, "px");
      dragger.style.height = "".concat(this.options.draggerSize, "px");
      dragger.style.top = "-".concat((this.options.draggerSize - this.options.barHeight) / 2, "px");
      dragger.className = "progress-dragger";
      this.dragger = dragger;
      return dragger;
    }
  }, {
    key: "_calculateValue",
    value: function _calculateValue(position, positionMax) {
      var value = position * (this.options.max - this.options.min) / positionMax + this.options.min;
      return Math.round(value);
    }
  }, {
    key: "_calculatePosition",
    value: function _calculatePosition(value) {
      var positionMax = this._getPositionMax();

      return (value - this.options.min) * positionMax / (this.options.max - this.options.min);
    }
  }, {
    key: "_createSlider",
    value: function _createSlider() {
      var container = this._createContainer();

      var bar = this._createBar();

      var dragger = this._createDragger();

      bar.appendChild(dragger);
      container.appendChild(bar);

      this._bindEvent(container);

      return container;
    }
  }, {
    key: "_move",
    value: function _move(event) {
      if (!this.isMoving) return;

      var min = 0,
          max = this._getPositionMax(); // Instead of using `offsetLeft`, we need to using `getBoundingClientRect().left. Because the offsetLeft is relative to none static parent.


      var elementLeft = this.container.getBoundingClientRect().left; // fix for scroll

      elementLeft += document.documentElement.scrollLeft;
      if (elementLeft < 0) elementLeft = Math.abs(elementLeft) / 2;
      var mousePos = event.pageX - elementLeft - this.dragger.offsetWidth / 2,
          position = mousePos > max ? max : mousePos < min ? min : mousePos;

      var value = this._calculateValue(position, max);

      this.setValue(value);

      if (this.options.onChange) {
        this.options.onChange(value);
      }
    }
  }, {
    key: "_getPositionMax",
    value: function _getPositionMax() {
      return this.container.offsetWidth - this.dragger.offsetWidth;
    }
  }, {
    key: "_updateUI",
    value: function _updateUI(position) {
      var positionMax = this._getPositionMax();

      this.dragger.style.left = "".concat(position, "px");
      var width = position / positionMax * 100;
      this.bar.style.width = "".concat(width, "%");
    }
  }, {
    key: "_handleMouseDown",
    value: function _handleMouseDown(event) {
      this.isMoving = true;

      this._move(event);
    }
  }, {
    key: "_handleMouseUp",
    value: function _handleMouseUp(event) {
      this.isMoving = false;
    }
  }, {
    key: "_handleMouseMove",
    value: function _handleMouseMove(event) {
      this._move(event);
    }
  }, {
    key: "_handleResize",
    value: function _handleResize(event) {
      this._init();
    }
  }, {
    key: "_bindEvent",
    value: function _bindEvent(container) {
      container.addEventListener("mousedown", this._handleMouseDown);
      document.addEventListener("mouseup", this._handleMouseUp);
      document.addEventListener("mousemove", this._handleMouseMove);
      window.addEventListener("resize", this._handleResize, true);
    }
  }, {
    key: "_removeEvent",
    value: function _removeEvent() {
      if (!this.container) return;
      this.container.removeEventListener("mousedown", this._handleMouseDown);
      document.removeEventListener("mouseup", this._handleMouseUp);
      document.removeEventListener("mousemove", this._handleMouseMove);
    }
  }, {
    key: "_render",
    value: function _render() {
      var slider = this._createSlider();

      this.parent.innerHTML = "";
      this.parent.appendChild(slider);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._removeEvent();
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.options.value;
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      this.options.value = value;

      var position = this._calculatePosition(value);

      this._updateUI(position);
    }
  }]);

  return RangeSlider;
}();

exports.default = RangeSlider;
},{"./rangeSlider.css":"B9qw"}],"G4J6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _rangeSlider.default;
  }
});

var _rangeSlider = _interopRequireDefault(require("./rangeSlider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./rangeSlider":"wntC"}],"gQPQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./audioPlayer.css");

var _rangeSlider = _interopRequireDefault(require("../rangeSlider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var defaultOptions = {
  parent: document.body,
  autoPlay: false,
  duration: 0,
  url: ''
};

var AudioPlayer =
/*#__PURE__*/
function () {
  function AudioPlayer(options) {
    _classCallCheck(this, AudioPlayer);

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

  _createClass(AudioPlayer, [{
    key: "_init",
    value: function _init() {
      this.container = this._createUI();
      this.options.parent.innerHTML = '';
      this.options.parent.appendChild(this.container);

      this._initialPlayer();

      this._initialEvents();
    }
  }, {
    key: "_initialEvents",
    value: function _initialEvents() {
      this.toggleBtn.onclick = this.togglePlay;
    }
  }, {
    key: "_initialPlayer",
    value: function _initialPlayer() {
      var _this = this;

      if (!this.options.url) {
        throw new Error("missing audio url");
      }

      this.player = new Audio(this.options.url);

      this.player.onloadedmetadata = function () {
        _this._initializeSlider(_this.player.duration);

        _this._updateTimeDisplay(_this.player.currentTime, _this.player.duration);
      };

      this.player.ontimeupdate = function (event) {
        var time = event.currentTarget.currentTime;

        _this.slider.setValue(time);

        _this._updateTimeDisplay(time, _this.player.duration);
      };

      this.player.onended = function () {
        _this._playStatusChange(false);
      };

      this.player.onpause = function () {
        _this._playStatusChange(false);
      };

      this.player.onerror = function () {
        _this._playStatusChange(false);
      };

      this.player.preload = 'metadata'; // we need to append the audio to DOM or the document.addEventListener won't
      // fire

      this.container.appendChild(this.player);
    }
  }, {
    key: "_removeEvents",
    value: function _removeEvents() {
      this.toggleBtn.onclick = undefined;
    }
  }, {
    key: "togglePlay",
    value: function togglePlay() {
      var isPlaying = !this.isPlaying;

      if (isPlaying) {
        this.play();
      } else {
        this.pause();
      }
    }
  }, {
    key: "play",
    value: function play() {
      this.player.play();

      this._playStatusChange(true);
    }
  }, {
    key: "pause",
    value: function pause() {
      this.player.pause();

      this._playStatusChange(false);
    }
  }, {
    key: "_playStatusChange",
    value: function _playStatusChange(isPlaying) {
      this.isPlaying = isPlaying;
      this.toggleBtn.className = "icon icon-".concat(this.isPlaying ? 'pause' : 'play');
    }
  }, {
    key: "_initializeSlider",
    value: function _initializeSlider(duration) {
      var _this2 = this;

      this.slider = new _rangeSlider.default(document.querySelector("#".concat(this.sliderId)), {
        max: duration,
        onChange: function onChange(value) {
          _this2.player.currentTime = value;
        }
      });
    }
    /**
     * guid generation taken from
     * https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id/6860916#6860916
     */

  }, {
    key: "_getSliderId",
    value: function _getSliderId() {
      var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      return randLetter + Date.now();
    }
  }, {
    key: "_createUI",
    value: function _createUI() {
      var container = document.createElement('div');
      container.className = 'audio-player';
      var toggle = document.createElement('div');
      toggle.className = 'player-section player-toggle';
      this.toggleBtn = document.createElement('span');
      this.toggleBtn.className = "icon icon-play";
      toggle.appendChild(this.toggleBtn);
      container.appendChild(toggle);
      var progress = document.createElement('div');
      progress.className = 'player-section player-progress';
      progress.innerHTML = "<div class=\"player-slider\" id=\"".concat(this.sliderId, "\"></div>");
      container.appendChild(progress);
      var timer = document.createElement('div');
      timer.className = 'player-section player-time';
      this.timeHoler = document.createElement('div');
      this.timeHoler.className = 'time';
      this.timeHoler.innerText = '00:00';
      timer.append(this.timeHoler);
      container.appendChild(timer);
      return container;
    }
  }, {
    key: "_updateTimeDisplay",
    value: function _updateTimeDisplay(time, duration) {
      time = this._formatTime2HHMMSS(time);
      duration = this._formatTime2HHMMSS(duration);
      this.timeHoler.innerText = "".concat(time, " / ").concat(duration);
    }
  }, {
    key: "_formatTime2HHMMSS",
    value: function _formatTime2HHMMSS(seconds) {
      var date = new Date(null);
      date.setMilliseconds(seconds * 1000);
      var result = date.toISOString().substr(11, 8);
      var splits = result.split(':');

      if (splits.length > 2 && splits[0] === '00') {
        result = splits.slice(1).join(':');
      }

      return result;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._removeEvents();
    }
  }]);

  return AudioPlayer;
}();

exports.default = AudioPlayer;
},{"./audioPlayer.css":"/ndc","../rangeSlider":"G4J6"}],"vJnp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _audioPlayer.default;
  }
});

var _audioPlayer = _interopRequireDefault(require("./audioPlayer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./audioPlayer":"gQPQ"}],"VEf3":[function(require,module,exports) {

},{"./assets/play.png":[["play.d936b1b1.png","CzLn"],"CzLn"],"./assets/close.png":[["close.910def3e.png","aQqF"],"aQqF"]}],"ul3z":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./videoPlayer.css");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var defaultOptions = {
  parent: document.body,
  autoPlay: false,
  duration: 0,
  isInlinePlay: true
};

var VideoPlayer =
/*#__PURE__*/
function () {
  function VideoPlayer(options) {
    _classCallCheck(this, VideoPlayer);

    this.options = Object.assign({}, defaultOptions, options);
    this.container = null;
    this.isPlaying = false;
    this.player = null;
    this.togglePlay = this.togglePlay.bind(this);

    this._init();
  }

  _createClass(VideoPlayer, [{
    key: "_init",
    value: function _init() {
      this.container = this._createUI();
      this.options.parent.innerHTML = "";
      this.options.parent.appendChild(this.container);

      this._initialPlayer();
    }
  }, {
    key: "_initialPlayer",
    value: function _initialPlayer() {
      var _this = this;

      if (!this.options.url) {
        throw new Error("missing video url");
      }

      this.player = document.createElement("video");
      this.player.src = this.options.url;

      if (!this.options.isInlinePlay) {
        var playBtn = document.createElement("span");
        playBtn.className = "icon icon-video-start-play";

        playBtn.onclick = function () {
          // TODO:
          // - open popup
          // - show controls
          // - play video
          _this._openPopup();
        };

        this.container.appendChild(playBtn);
      } else {
        this.player.setAttribute("controls", "controls");
      }

      this.container.appendChild(this.player);
    }
  }, {
    key: "togglePlay",
    value: function togglePlay() {
      var isPlaying = !this.isPlaying;

      if (isPlaying) {
        this.play();
      } else {
        this.pause();
      }
    }
  }, {
    key: "play",
    value: function play() {
      this.player.play();

      this._playStatusChange(true);
    }
  }, {
    key: "pause",
    value: function pause() {
      this.player.pause();

      this._playStatusChange(false);
    }
  }, {
    key: "_playStatusChange",
    value: function _playStatusChange(isPlaying) {
      this.isPlaying = isPlaying;
    }
  }, {
    key: "_createUI",
    value: function _createUI() {
      var container = document.createElement("div");
      container.className = "video-player";
      return container;
    }
  }, {
    key: "_openPopup",
    value: function _openPopup() {
      var popup = document.createElement("div");
      popup.className = "video-player-popup";
      var videoWrapper = document.createElement("div");
      videoWrapper.className = "popup-video-wrapper";
      popup.appendChild(videoWrapper);
      var closeBtn = document.createElement("span");
      closeBtn.className = "icon icon-video-close";

      closeBtn.onclick = function () {
        document.body.removeChild(popup);
      };

      var player = this.player.cloneNode(true);
      player.setAttribute("controls", "controls");
      videoWrapper.appendChild(player);
      player.play();
      videoWrapper.appendChild(closeBtn);
      document.body.appendChild(popup);
    }
  }]);

  return VideoPlayer;
}();

exports.default = VideoPlayer;
},{"./videoPlayer.css":"VEf3"}],"gdOT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _videoPlayer.default;
  }
});

var _videoPlayer = _interopRequireDefault(require("./videoPlayer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./videoPlayer":"ul3z"}],"o0va":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _audioPlayer = _interopRequireDefault(require("./audioPlayer"));

var _videoPlayer = _interopRequireDefault(require("./videoPlayer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var players = [];

function initialSingletonPlay() {
  // guarantee that here's only one player is playing
  document.addEventListener('play', function (e) {
    for (var i = 0, len = players.length; i < len; i++) {
      if (players[i].player != e.target) {
        players[i].player.pause();
      }
    }
  }, true);
}

initialSingletonPlay();
var defaultOptions = {
  parent: document.body,
  autoPlay: false,
  duration: 0,
  url: '',
  // playing the video inline or in popup
  isInlinePlay: true
};

var MediaPlayer =
/*#__PURE__*/
function () {
  function MediaPlayer(type, options) {
    _classCallCheck(this, MediaPlayer);

    this.options = Object.assign({}, defaultOptions, options);
    this.type = type;

    this._init(this.options);
  }

  _createClass(MediaPlayer, [{
    key: "_init",
    value: function _init(options) {
      var player = this.createPlayer(options);
      players.push(player);
    }
  }, {
    key: "createPlayer",
    value: function createPlayer(options) {
      if (this.type === 'audio') {
        return new _audioPlayer.default(options);
      }

      if (this.type === 'video') {
        return new _videoPlayer.default(options);
      }
    }
  }]);

  return MediaPlayer;
}();

exports.default = MediaPlayer;
},{"./audioPlayer":"vJnp","./videoPlayer":"gdOT"}],"Focm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _mediaPlayer.default;
  }
});

var _mediaPlayer = _interopRequireDefault(require("./mediaPlayer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./mediaPlayer":"o0va"}]},{},["Focm"], null)
//# sourceMappingURL=/index.map