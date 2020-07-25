const firebase = require('firebase/app');
require('firebase/firestore');
import 'firebase/auth';


export class Firebase {

    constructor(){

        //Variavel que gurada as informações de conexão com o firebase;
        this._config = {
            apiKey: "AIzaSyDon6zQ-l8VENu4ike9Mj40B9rNVwFjNQc",
            authDomain: "whatsapp-clone-91cfc.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-91cfc.firebaseio.com",
            projectId: "whatsapp-clone-91cfc",
            storageBucket: "whatsapp-clone-91cfc.appspot.com",
            messagingSenderId: "65928823882",
            appId: "1:65928823882:web:403534114ed989b87612b3"
         };
         //Metodo de inicializar a conexão com o firebase
        this.init();

    }

    //Metodo que faz a conexão com o firebase;
    init(){

        //Verifica se o firebase não está inicializado;
        if(!this._initialized){
            //Inicia uma conexão com o firebase;
            firebase.initializeApp(this._config);

            firebase.firestore().settings({});

            //Flag de Verificação se o firebase foi inicializado ou não;
            this._initialized = true;
        }

    }

    //Metodo de armazenar as informações no Firebase Banco de Dados;
    static db(){
        return firebase.firestore();
    }

    //Metodo de armazenar os arquivos no storage do Firebase;
    static hd(){
        return firebase.storage();
    }

    //Metodo de autotenticação do Firebase;
    initAuth(){

        return new Promise ((s, f)=>{

            let provider = new firebase.auth.GoogleAuthProvider();

            //Autentica com a conta do gmail;
            firebase.auth().signInWithPopup(provider)
                .then(result => {
    
                    let token = result.credential.accessToken;
                    let user = result.user;
                   s({
                    user,
                    token
                   });
    
                })
                .catch(err => {
                    f(err);
                });

        })


    }


}