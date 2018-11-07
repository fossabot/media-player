import AudioPlayer from "../src/audioPlayer";

export function runAudioPlayerExamples() {
    const player = new AudioPlayer({
        parent: document.querySelector('#audioPlayer'),
        // url: 'https://umu-pd.bj.bcebos.com/audio/teacher/resource/cv7894/1465824387.3164.mp3?responseContentType=audio%2Fmp3'
        url: 'https://m10.music.126.net/20181107133750/e12282ab5738b8c3ccd716d7c3584e0e/ymusic/07fa/a2a1/35ea/732937117d6d0a8c13a81bb40184662e.mp3'
    })
}