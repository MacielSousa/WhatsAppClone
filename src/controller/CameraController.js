export class CameraController {

    //Metodo construtor recebendo elemento de video;
    constructor(videoEl){

        //Variavel da classe recebendo elemento de video;
        this._videoEl = videoEl;

        //Promise, visualizar imagem da camera;
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(stream => {

            //Criando variavel stream;
            this._stream = stream;

            //Cria um Objeto imagem;
            let mediaStream = new MediaStream(stream);
            //variavel videoEl recebe objeto imagem;
            this._videoEl.srcObject = mediaStream;
            //imagem aparece no elemento videoCamera;
            this._videoEl.play();

        }).catch( err => {
            console.error(err);
        });

    }
    //Metodo, para fechar camera;
    stop(){
        this._stream.getTracks().forEach(track => {
            track.stop();
        });
    }

    //Metodo, criando a foto;
    takePicture(mimeType = 'image/png'){

        //Criando elemento canvas;
        let canvas = document.createElement('canvas');

        //Definindo altura da imagem;
        canvas.setAttribute('height', this._videoEl.videoHeight);
        //Definindo largura da imagem;
        canvas.setAttribute('width', this._videoEl.videoWidth);

        //Variavel contexto, trabalhando canvas em 2D;
        let context = canvas.getContext('2d');

        //Desenhando imagem;
        context.drawImage(this._videoEl, 0, 0, canvas.width, canvas.height);

        return canvas.toDataURL(mimeType);

    }

}