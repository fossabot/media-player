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
