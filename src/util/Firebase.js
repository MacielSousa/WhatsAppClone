const firebase = require('firebase/app');
require('firebase/firestore');


export class Firebase {

    constructor(){

        this._config = {
            apiKey: "AIzaSyDon6zQ-l8VENu4ike9Mj40B9rNVwFjNQc",
            authDomain: "whatsapp-clone-91cfc.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-91cfc.firebaseio.com",
            projectId: "whatsapp-clone-91cfc",
            storageBucket: "whatsapp-clone-91cfc.appspot.com",
            messagingSenderId: "65928823882",
            appId: "1:65928823882:web:403534114ed989b87612b3"
         };
        this.init();

    }

    init(){

        if(!this._initialized){
            firebase.initializeApp(this._config);

            firebase.firestore().settings({});

            this._initialized = true;
        }

    }

    static db(){
        return firebase.firestore();
    }

    static hd(){
        return firebase.storage();
    }


}