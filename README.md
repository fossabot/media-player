# media-player

[![CircleCI](https://circleci.com/gh/wayou/media-player.svg?style=svg)](https://circleci.com/gh/wayou/media-player)

Player with ui written in valinna js, that is, framework free.

The main purpose is to usage anywhere regardless of frontend framework ( for example：angular, react).

## Components

### `RangeSlider`

#### Options

- `className`: custom class name
  - type: `string`
  - optional
  - default: ""
- `value`: setup the slider with a initial value
  - type: `number`
  - optional
  - default: 0
- `draggerSize`: the size of the dot dragger in `px`
  - type: `number`
  - optional
  - default: 12
- `barHeight`: the height of the slider bar in `px`
  - type: `number`
  - optional
  - default: 2
- `onChange`: callback when the slider slides
  - type: `(value)=>{}`
  - optional
  - default: null
- `min`: minimal value of the range
  - type: `number`
  - optional
  - default: 0
- `max`: maxmium value of the range
  - type: `number`
  - optional
  - default: 100
- `precision`: precisoin of the output
  - type: `number`
  - optional
  - default: 0

#### Usage

```js
new RangeSlider(node,options);
```

#### Example

```html
<div id="mySlider"></div>
```

```js
import RangeSlider from "../src/rangeSlider";
new RangeSlider(document.querySelector("#mySlider"));
```

### `AudioPlayer`

#### Options

- `parent`: DOM node to render to
  - type: `DOM Node`
  - required
  - default: `document.body`
- `url`: the url to play
  - type: `string`
  - required
  - default: ``


#### Usage

```js
new AudioPlayer(options);
```

#### Example

```html
<div id="myPlayer"></div>
```

```js
import RangeSlider from "../src/audioPlayer";
new AudioPlayer({
  parent: document.querySelector("#audioPlayer2"),
  url: "url/for/audio"
});
```

### `VideoPlayer`

#### Options

- `parent`: DOM node to render to
  - type: `DOM Node`
  - required
  - default: `document.body`
- `url`: the url to play
  - type: `string`
  - required
  - default: ``
- `isInlinePlay`: play the video inline or in popup dialog
  - type: `boolean`
  - optional
  - default: `true`

#### Usage

```js
new VideoPlayer(options);
```

#### Example

```html
<div id="videoPlayer"></div>
```

```js
import VideoPlayer from "../src/videoPlayer";
new VideoPlayer({
  parent: document.querySelector("#videoPlayer"),
  url: "url/for/video"
});
```

### `MediaPlayer`

Mixed audio and video player with the guarantee that only one of them is playing.

#### Options

- `type`: media type, `audio` or `video`
  - type: `string`
  - required
  - default: N/A
- `options`: same as corresponding media options, see [video options][video-options] or [audio options][audio-options]
  - type: `object`
  - required
  - default: N/A

[video-options]: #options-2
[audio-options]: #options-1

#### Usage

```js
new MediaPlayer(type, options);
```

#### Example

```html
<div id="audioPlayer"></div>
<div id="videoPlayer"></div>
```

```js
import MediaPlayer from "../src/index";

new MediaPlayer('audio',{
  parent: document.querySelector("#audioPlayer"),
  url: "url/for/audio"
});
new MediaPlayer('video',{
  parent: document.querySelector("#videoPlayer"),
  url: "url/for/video"
});
```