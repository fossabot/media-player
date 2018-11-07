import AudioPlayer from "../src/audioPlayer";

export function runAudioPlayerExamples() {
    const player = new AudioPlayer({
        parent: document.querySelector('#audioPlayer'),
        // url: 'https://umu-pd.bj.bcebos.com/audio/teacher/resource/cv7894/1465824387.3164.mp3?responseContentType=audio%2Fmp3'
        url: 'http://wayou.github.io/selected/content/songs/ai_la_la.mp3'
    })
}