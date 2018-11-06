
const defaultOptions = {
    autoPlay:false
}

export class AudioPlayer(){
    constructor(url,options){
        this.url = url;
        this.options = Object.assign({},defaultOptions,options);
    }

    
}
