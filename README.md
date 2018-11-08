# media-player

Player with ui written in valinna js, that is, framework free.

The main purpose is to usage anywhere regardless of frontend framework ( for example：angular, react).

## Components

### `RangeSlider`

#### Usage


```html
<div id="mySlider"></div>
```

```js
import RangeSlider from "../src/rangeSlider";
new RangeSlider(document.querySelector("#mySlider"));
```

### `AudioPlayer`


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