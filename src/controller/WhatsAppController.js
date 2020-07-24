import {Format} from './../util/Format';
import {CameraController} from './CameraController';
import { DocumentPreviewController } from './DocumentPreviewController';


//Classe padrão do Projeto, invocada pelo o meu app;
export  class WhatsAppController{

    //Metodo construtor padrão;
    constructor(){

        //Mensagem de KO, minha classe está correta;
        console.log("WhatsAppController OK!");

        //Metodo para amarrar o escopo da pagina;
        this.elementProtorype();
        //Metodo para criar o objeto el, para manipulação do DOM;
        this.loadElements();
        //Metodo que inicia todos os eventos;
        this.initEvents();

    }

    //Metodo que cria o objeto el, para manipulação o Dom;
    loadElements(){

        //Objeto el, no qual vai receber todos os atributos do meu Template;
        this.el = {};


        //Selecionando todos elementos e colocando na classe el;
        document.querySelectorAll('[id]').forEach(element => {
            
            //Passando os elementos para serem atributos da classe el;
            this.el[Format.getCamelCase(element.id)] = element;

        });

    }

    //Metodo que vai acrescentar funções aos elementos da pagina;
    elementProtorype(){

        //Metodo, escondendo qualquer elemento;
        Element.prototype.hide = function(){
            this.style.display = 'none';
            return this;
        }

        //Metodo, Mostrando qualque elemento;
        Element.prototype.show = function(){
            this.style.display = 'block';
            return this;
        }

        //Metodo, quando o elemento estiver visivel, ele fica invisicel e virse e versa;
        Element.prototype.toggle = function(){
            this.style.display = (this.style.display === 'none') ? 'block' : 'none';
            return this;
        }

        //Metodo, proporciona o meu JavaScript,a travabalhar com mais de um elemento por vez;
        Element.prototype.on = function(events, fn){
            events.split(' ').forEach(event =>{
                this.addEventListener(event, fn);
            });
            return this;
        }

        //Metodo, aplicar modelo de css no elemnto;
        Element.prototype.css = function(styles){
            for(let name in styles){
                this.style[name] = styles[name];
            }
            return this;
        }

        //Metodo, adiciona um class;
        Element.prototype.addClass = function(name){
            this.classList.add(name);
            return this;
        }

        //Metodo, remove uma classe;
        Element.prototype.removeClass = function(name){
            this.classList.remove(name);
            return this;
        }

        //Metodo, verifica se tem se não tem ele acrescenta;
        Element.prototype.toggleClass = function(name){
            this.classList.toggle(name);
            return this;
        }

        //Metodo, verificar se tem a classe;
        Element.prototype.hasClass = function(name){
           return this.classList.contains(name);
        }

        //Metodo, recuperando os dados do formulario;
        HTMLFormElement.prototype.getForm = function () {
            return new FormData(this);
        }

        //Metodo, recuperando os dados do formulario;
        HTMLFormElement.prototype.toJSON = function () {

            let json = {};
            this.getForm().forEach((value, key )=> {

                json[key] = value;
                
            });

            return json;

        }




    }

    //Metodo, que inicia todos os evetos;
    initEvents(){

        //Evento, abrir panel editar perfil;
        this.el.myPhoto.on('click', e => {

            this.closeAllLeftPanel();
            this.el.panelEditProfile.show();
            setTimeout(()=>{
                this.el.panelEditProfile.addClass('open');
            }, 300)
            

        });

        //Evento, para adicionar um novo contato;
        this.el.btnNewContact.on('click', e => {

            this.closeAllLeftPanel();
            this.el.panelAddContact.show();
            setTimeout(()=>{
                this.el.panelAddContact.addClass('open');
            }, 300);
            

        });

        //Evento, para editar foto;
        this.el.btnClosePanelEditProfile.on('click', e =>{

            this.el.panelEditProfile.removeClass('open');

        });

        //Evento, remover painel dos contatos
        this.el.btnClosePanelAddContact.on('click', e => {

                this.el.panelAddContact.removeClass('open');

        });

        //Evento, editar photo de perfil;
        this.el.photoContainerEditProfile.on('click', e => {

            this.el.inputProfilePhoto.click();

        });

        //Evento, Pegando o nome que foi editado no perfil;
        this.el.inputNamePanelEditProfile.on('keypress', e => {

            if(e.key === 'Enter'){

                e.preventDefault();
                this.el.btnSavePanelEditProfile.click();

            }

        });

        //Evento, Salvando nome que foi editado no perfil;
        this.el.btnSavePanelEditProfile.on('click', e => {

            console.log(this.el.inputNamePanelEditProfile.innerHTML);

        });

        //Evento, procurando contato;
        this.el.formPanelAddContact.on('submit', e => {

            e.preventDefault();
            let formData = new FormData(this.el.formPanelAddContact);

        });

        //Evento, mostrando painel de conversa.
        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item => {

            item.on('click', e => {

                this.el.main.css({
                    display:'flex'
                });
                
            });

        });

        //Evento, mostrar menu de anexo(foto, camera, documento, contato);
        this.el.btnAttach.on('click', e =>{
            
                e.stopPropagation();
                this.el.menuAttach.toggleClass('open');
                document.addEventListener('click', this.closeMenuAttach.bind(this));

        });

        //Evento, de pegar foto;
        this.el.btnAttachPhoto.on('click', e => {
            this.el.inputPhoto.click();
        });

        //Evento, anexar foto;
        this.el.inputPhoto.on('change', e =>{

            console.log(this.el.inputPhoto.files);
            [...this.el.inputPhoto.files].forEach(file => {

                console.log(file);

            });

        });

        //Evento, de abrir camera;
        this.el.btnAttachCamera.on('click', e => {
            this. closeAllMainPanel();
            this.el.panelCamera.addClass('open');
            this.el.panelCamera.css({
                'height':'100%'
            });

            //Criando um objeto camera, passando elemento video como parametro;
            this._camera = new CameraController(this.el.videoCamera);

        });

        //Evento, fechar camera;
        this.el.btnClosePanelCamera.on('click', e =>{

            this.el.panelCamera.removeClass('open');
            this.el.panelMessagesContainer.show();
            this._camera.stop();

        });

        //Evento, de tirar photo;
        this.el.btnTakePicture.on('click', e=>{

            //Recebendo imagem;
            let dataURL = this._camera.takePicture();

            //Elemento pictureCamera recebedo imagem;
            this.el.pictureCamera.src = dataURL;
            //Exibindo picture camera;
            this.el.pictureCamera.show();
            //Escondendo elemento videoCamera;
            this.el.videoCamera.hide();
            //Apresentar botão de tirar foto novamente;
            this.el.btnReshootPanelCamera.show();
            //Ocultar Botão de tirar foto;
            this.el.containerTakePicture.hide();
            //Mostrar Botão de enviar foto;
            this.el.containerSendPicture.show();

        });

        //Evento, para tirar uma nova foto;
        this.el.btnReshootPanelCamera.on('click', e => {

            //Ocultar pictureCamera;
            this.el.pictureCamera.hide();
            //Exibindo elemento videoCamera;
            this.el.videoCamera.show();
            //Ocultar botão de tirar foto novamente;
            this.el.btnReshootPanelCamera.hide();
            //Exibir Botão de tirar foto;
            this.el.containerTakePicture.show();
            //Ocultar Botão de enviar foto;
            this.el.containerSendPicture.hide();

        });

        //Evento, para enviar foto;
        this.el.btnSendPicture.on('click', e =>{

            console.log(this.el.pictureCamera.src);

        });

        //Evento, abrir tela de anexar documento;
        this.el.btnAttachDocument.on('click', e => {
            this. closeAllMainPanel();
            this.el.panelDocumentPreview.addClass('open');
            this.el.panelDocumentPreview.css({
                'height':'100%'
            });
            this.el.inputDocument.click();
        });

        //Evento, exibir tela de enviar documento;
        this.el.inputDocument.on('change', e => {

            //Verificando se meu elemento está vazio;
            if(this.el.inputDocument.files.length){

                //Passando o primeiro documento que foi selecionado para a variavel file
                let file = this.el.inputDocument.files[0];

                //Metodo que recebe uma previa do documento que foi selecionado;
                this._documentPreviewController = new DocumentPreviewController(file);

                //Promessa, para receber. a imagem de previsualização do documento;
                this._documentPreviewController.getPreviewData().then(result => {
                    //Passando imagem para o elemento;
                    this.el.imgPanelDocumentPreview.src = result.src;
                    //Passando informação da imagem para o elemento;
                    this.el.infoPanelDocumentPreview.innerHTML = result.info;
                    //Exibir Painel de Imagem;
                    this.el.imagePanelDocumentPreview.show();
                    //Ocultado painel de exibir previa do documento;
                    this.el.filePanelDocumentPreview.hide();
                }).catch(err =>{
                    console.log(file.type);

                    switch(file.type){
                        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                        case 'application/vnd.ms-excel':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-xls';

                        break;

                        case 'application/vnd.ms-powerpoint':
                        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-ppt';

                        break;
                        case 'application/vnd.msword':
                        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-doc';
    
                        break;

                        
                        default:
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-generic';
                        break;

                    }
                    //Passando o nome do documento para o elemento;
                    this.el.filenamePanelDocumentPreview.innerHTML = file.name;
                    //Esconder Painel de Imagem;
                    this.el.imagePanelDocumentPreview.hide();
                    // exibir painel previa do documento;
                    this.el.filePanelDocumentPreview.show();
                });

            }

        });

        //Evento, enviar documento;
        this.el.btnSendDocument.on('click', e=>{

            console.log('send document');

        });

        //Evento, fechar painel documento;
        this.el.btnClosePanelDocumentPreview.on('click', e => {

            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();

        });

        //Evento, para abrir tela de contatos;
        this.el.btnAttachContact.on('click', e => {
            this.el.modalContacts.show();
        });

        //Evento, Fechar tela de contatos;
        this.el.btnCloseModalContacts.on('click', e =>{

            this.el.modalContacts.hide();

        });

        //Evento, exibir painel de gravação;
        this.el.btnSendMicrophone.on('click', e=>{

            this.el.recordMicrophone.show();
            this.el.btnSendMicrophone.hide();
            this.startRecordMicrophoneTime();

        });

        //Evento, cancelar gravação do audio;
        this.el.btnCancelMicrophone.on('click', e =>{

            this.closeRecordMicrophone();

        });

        //Evento, finalizar gravação do audio;
        this.el.btnFinishMicrophone.on('click', e =>{

            this.closeRecordMicrophone();

        });

        //Evento, enviar mensagem quando dá um enter;
        this.el.inputText.on('keypress', e=>{

            if(e.key === 'Enter' && !e.ctrlKey){
                e.preventDefault();
                this.el.btnSend.click();
            }

        });

        //Evento, configurando campo de texto;
        this.el.inputText.on('keyup', e =>{

            //Oculta frase padrão do PlaceHolder e Botão de gravar audio, e apresenta botaão de enviar texto;
            if(this.el.inputText.innerHTML.length){

                this.el.inputPlaceholder.hide();
                this.el.btnSendMicrophone.hide();
                this.el.btnSend.show();

            }//Oculta botão de enviar texto, e mostra Botão de audio e apresenta mensagem padrão do PlaceHolder;
            else{

                this.el.inputPlaceholder.show();
                this.el.btnSendMicrophone.show();
                this.el.btnSend.hide();

            }

        });

        //Evento, eviar mensagem de texto;
        this.el.btnSend.on('click', e => {

            console.log(this.el.inputText.innerHTML);

        });

        //Evento, botão que apresenta tela de emojis;
        this.el.btnEmojis.on('click', e =>{

            this.el.panelEmojis.toggleClass('open');

        });

        //Evento, seleciona o emojis e apresenta no campo de texto;
        this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji =>{

            //Evento, selecionar o emoji para aprecer no inputText;
            emoji.on('click', e =>{
                
                let img = this.el.imgEmojiDefault.cloneNode();
                img.style.cssText = emoji.style.cssText;
                img.dataset.unicode = emoji.dataset.unicode;
                img.alt = emoji.dataset.unicode;

                emoji.classList.forEach(name => {
                    img.classList.add(name);
                });

                let cursor = window.getSelection();
                //Verifica se o cursor não tem valor null, e aponta o cursor para o inputText
                if(!cursor.focusNode || cursor.focusNode.id == 'input-text'){
                    this.el.inputText.focus();
                    cursor = window.getSelection();
                }

                let range = document.createRange();

                range = cursor.getRangeAt(0);
                range.deleteContents();

                let frag = document.createDocumentFragment();

                frag.appendChild(img);

                range.insertNode(frag);

                range.setStartAfter(img);

                this.el.inputText.dispatchEvent(new Event('keyup'));


            });

        });




    }

    //Metodo, mostrar o tempo de gravação do audio;
    startRecordMicrophoneTime(){

        let start = Date.now();
        this._recordMicrophoneInterval = setInterval(() => {

            this.el.recordMicrophoneTimer.innerHTML = Format.toTime(Date.now() - start);

        }, 100);

    }

    //Metodo, ocultar elementos de gravação de audio, e exibir botão de gravar audio;
    closeRecordMicrophone(){
        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();
        clearInterval(this._recordMicrophoneInterval);
    }

    //Metodo, fechar paineis, e deixar somente das mensagens;
    closeAllMainPanel(){
        this.el.panelMessagesContainer.hide();
        this.el.panelDocumentPreview.removeClass('open');
        this.el.panelCamera.removeClass('open');

    }

    //Metodo, remove menu: (foto, camera, documento, contato);
    closeMenuAttach(e){

        document.removeEventListener('click', this.closeMenuAttach);
        this.el.menuAttach.removeClass('open');

    }

    //Metodo, fechar paineis;
    closeAllLeftPanel(){
        
        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();

    }


}