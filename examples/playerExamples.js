import MediaPlayer from '../src/mediaPlayer';

export function runPlayerExamples() {
  const player = new MediaPlayer('audio', {
    parent: document.querySelector('#player'),
    url:
        'https://umu-pd.bj.bcebos.com/audio/teacher/resource/cv7894/1465824387.3164.mp3?responseContentType=audio%2Fmp3'
  });

  new MediaPlayer('video', {
    parent: document.querySelector('#player2'),
    url:
        'https://www.w3schools.com/html/mov_bbb.mp4'
  });

  new MediaPlayer('audio', {
    parent: document.querySelector('#player3'),
    url: 'http://wayou.github.io/selected/content/songs/ai_la_la.mp3'
  });

  new MediaPlayer('video', {
    parent: document.querySelector('#player4'),
    url:
        'http://umu-pd.bj.bcebos.com/videoweike/teacher/weike/96a38d/transcoding/1539077181.1311.36085.mp4'
  });
}
