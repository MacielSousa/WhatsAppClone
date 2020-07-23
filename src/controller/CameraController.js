class CameraController {

    //Metodo construtor recebendo elemento de video;
    constructor(videoEl){

        //Variavel da classe recebendo elemento de video;
        this._videoEl = videoEl;

        //Promise, visualizar imagem da camera;
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(stream => {

            //Cria uma Objeto imagem;
            let mediaStream = new MediaStream(stream);
            //variavel videoEl recebe objeto imagem;
            this._videoEl.srcObject = mediaStream;
            //imagem aparecer no elemento videoCamera
            this._videoEl.play();

        }).catch( err => {
            console.error(err);
        });

    }

}