export class MicrophoneController{

    //Metodo construtot
    constructor(){


        //Promise, mandar audio;
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream => {

            //Criando variavel stream;
            this._stream = stream;
            let audio = new Audio();
            audio.srcObject = stream;
            audio.play();

            this.trigger('play', audio);

        }).catch( err => {
            console.error(err);
        });

    }

    //Metodo, parar audio;
    stop(){
        this._stream.getTracks().forEach(track => {
            track.stop();
        });
    }
    

}