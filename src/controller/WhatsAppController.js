import {Format} from './../util/Format';
import {CameraController} from './CameraController';
import {MicrophoneController} from './MicrophoneController';
import { DocumentPreviewController } from './DocumentPreviewController';
import {Firebase} from './../util/Firebase';
import { User } from '../model/User';
import { Chat } from '../model/Chats';
import { Message } from '../model/Message';
import { Base64 } from '../util/base64';
import { ContactsController } from './ContactsController';
import { Upload } from '../util/Upload';


//Classe padrão do Projeto, invocada pelo o meu app;
export  class WhatsAppController{

    //Metodo construtor padrão;
    constructor(){

        //Criando objeto firebase;
        this._firebase = new Firebase();
        //Meetodo auteticanção;
        this.initAuth();

        //Metodo para amarrar o escopo da pagina;
        this.elementProtorype();
        //Metodo para criar o objeto el, para manipulação do DOM;
        this.loadElements();
        //Metodo que inicia todos os eventos;
        this.initEvents();
        
    }

    //Metodo de autenticção
    initAuth(){

        this._firebase.initAuth()
            .then(response=> {
                this._user = new User(response.user.email);

                this._user.on('datachange', data =>{

                    document.querySelector('title').innerHTML = data.name + ' - WhatsApp Clone';
                    this.el.inputNamePanelEditProfile.innerHTML = data.name;

                    if(data.photo){

                        let photo = this.el.imgPanelEditProfile;
                        photo.src = data.photo;
                        photo.show();
                        this.el.imgDefaultPanelEditProfile.hide();
                        
                        let photo2 = this.el.myPhoto.querySelector('img');
                        photo2.src = data.photo;
                        photo2.show();
     
                     }

                     this.initContacts();

                });

                this._user.name = response.user.displayName;
                this._user.email = response.user.email;
                this._user.photo = response.user.photoURL;

                this._user.save().then(()=> {

                    this.el.appContent.css({
                        display:'flex'
                    });

                });

            })
            .catch(err =>{
                console.log(err);
            });

    }

    initContacts(){

        this._user.on('contactschange', docs => {

            this.el.contactsMessagesList.innerHTML = '';

            docs.forEach(doc => {

                let contact = doc.data();

                let div = document.createElement('div');

                div.className = 'contact-item';
        
                div.innerHTML =`
                        <div class="dIyEr">
                            <div class="_1WliW" style="height: 49px; width: 49px;">
                                <img src="#" class="Qgzj8 gqwaM photo" style="display:none;">
                                <div class="_3ZW2E">
                                    <span data-icon="default-user" class="">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="212" height="212">
                                            <path fill="#DFE5E7" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z"></path>
                                            <g fill="#FFF">
                                                <path d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z"></path>
                                            </g>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="_3j7s9">
                            <div class="_2FBdJ">
                                <div class="_25Ooe">
                                    <span dir="auto" title="${contact.name}" class="_1wjpf">${contact.name}</span>
                                </div>
                                <div class="_3Bxar">
                                    <span class="_3T2VG">${contact.lastMessageTime}</span>
                                </div>
                            </div>
                            <div class="_1AwDx">
                                <div class="_itDl">
                                    <span title="digitando…" class="vdXUe _1wjpf typing" style="display:none">digitando…</span>
        
                                    <span class="_2_LEW last-message">
                                        <div class="_1VfKB">
                                            <span data-icon="status-dblcheck" class="">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18">
                                                    <path fill="#263238" fill-opacity=".4" d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"></path>
                                                </svg>
                                            </span>
                                        </div>
                                        <span dir="ltr" class="_1wjpf _3NFp9">${contact.lastMessage}</span>
                                        <div class="_3Bxar">
                                            <span>
                                                <div class="_15G96">
                                                    <span class="OUeyt messages-count-new" style="display:none;">1</span>
                                                </div>
                                        </span></div>
                                        </span>
                                </div>
                            </div>
                        </div>
        
                `;

                if(contact.photo){
                    let img = div.querySelector('.photo');
                    img.src = contact.photo;
                    img.show();
                }

                div.on('click', e => {
                    this.setActiveChat(contact);
                });

                this.el.contactsMessagesList.appendChild(div);

            });

        });
        this._user.getContacts();
    }

    setActiveChat(contact){

        this._contactAtive = contact;
        if(this._contactAtive){
            Message.getRef(this._contactAtive.chatId).onSnapshot(()=>{});
        }

        this.el.activeName.innerHTML = contact.name;
        this.el.activeStatus.innerHTML = contact.status;
        if(contact.photo){

            let img = this.el.activePhoto;
            img.src = contact.photo;
            img.show();

        }

        this.el.main.css({
            display: 'flex'
        });

        this.el.panelMessagesContainer.innerHTML = '';

        Message.getRef(this._contactAtive.chatId).orderBy('tipeStamp').onSnapshot(docs => {

            let scrollTop = this.el.panelMessagesContainer.scrollTop;
            let scrollTopMax = (this.el.panelMessagesContainer.scrollHeight - 
                                this.el.panelMessagesContainer.offsetHeight);
            let autoScroll = (scrollTop >= scrollTopMax);

            docs.forEach(doc => {
                let data = doc.data();
                data.id = doc.id;
                let message = new Message();
                message.fromJSON(data);
                let me = (data.from === this._user.email);
                let view = message.getViewElement(me);

                if(!this.el.panelMessagesContainer.querySelector('#_'+data.id)){

                    if(!me){
                        doc.ref.set({
                            status: 'read',
                        },{
                            merge: true
                        });
                    }
                      
                    this.el.panelMessagesContainer.appendChild(view);

                }else {

                   let parent =  this.el.panelMessagesContainer.querySelector('#_'+data.id).parentNode;

                   parent.replaceChild(view, this.el.panelMessagesContainer.querySelector('#_'+data.id));


                }
                
                
                if(this.el.panelMessagesContainer.querySelector('#_'+data.id) && me){

                   let msgEl = this.el.panelMessagesContainer.querySelector('#_'+data.id);

                   msgEl.querySelector('.message-status').innerHTML = message.getStatusViewElemnets().outerHTML;

                }

                if(message.type === 'contact'){

                   view.querySelector('.btn-message-send').on('click', e => {

                        Chat.createIfNotExists(this._user.email, message.content.email).then(chat => {

                            let contact = new User(message.content.email);
                                contact.on('datachange', data => {

                                contact.chatId = chat.id;
                                this._user.addContact(contact);
                                this._user.chatId = chat.id;
                                contact.addContact(this._user);

                                this.setActiveChat(contact);
                            });

                        });

                   });

                }

            });

            if(autoScroll){
 
                this.el.panelMessagesContainer.scrollTop = (
                    this.el.panelMessagesContainer.scrollHeight - 
                    this.el.panelMessagesContainer.offsetHeight
                );

            }else{

               this.el.panelMessagesContainer.scrollTop = scrollTop;

            }

        });

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


        this.el.inputSearchContacts.on('keyup', e => {
            if(this.el.inputSearchContacts.value.length > 0){

                this.el.inputSearchContactsPlaceholder.hide();

            }else{
                this.el.inputSearchContactsPlaceholder.show();
            }

            this._user.getContacts(this.el.inputSearchContacts.value);
        });

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

        this.el.inputProfilePhoto.on('change', e=>{

            if(this.el.inputProfilePhoto.files.length > 0){

                let file = this.el.inputProfilePhoto.files[0];

                Upload.send(file, this._user.email).then(downloadURL => {

                    this._user.photo = downloadURL;
                    this._user.save().then(() => {

                        this.el.btnClosePanelEditProfile.click();

                    });

                });

            }

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

            this.el.btnSavePanelEditProfile.disabled = true;
            this._user.name = this.el.inputNamePanelEditProfile.innerHTML;
            this._user.save().then(()=>{

                this.el.btnSavePanelEditProfile.disabled = false;

            });

        });

        //Evento, procurando contato;
        this.el.formPanelAddContact.on('submit', e => {

            e.preventDefault();
            let formData = new FormData(this.el.formPanelAddContact);

            let contact = new User(formData.get('email'));

            contact.on('datachange', data => {

                if(data.name){

                    Chat.createIfNotExists().then(chat => {

                        contact.chatId = chat.id;
                        this._user.chatId = chat.id;
                        contact.addContact(this._user);

                        this._user.addContact(contact).then(()=> {
                            this.el.btnClosePanelAddContact.click();
                            console.info('Contato foi adicionado!');
                        });

                    });

                }else {
                    console.error('Usuário não foi encontrado!');
                }

            });

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

                Message.sendImage(this._contactAtive.chatId, this._user.email, file);

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

            this.el.btnSendPicture.disabled = true;

            let regex = /^data:(.+);base64,(.*)$/;
            let result = this.el.pictureCamera.src.match(regex);
            let mimeType = result[1];
            let ext = mimeType.split('/')[1];
            let filename = `camera${Date.now()}.${ext}`;

            fetch(this.el.pictureCamera.src)
                .then(res => { return res.arrayBuffer(); })
                .then(buffer => { return new File([buffer], filename, {type: mimeType}); })
                .then(file => {

                    Message.sendImage(this._contactAtive.chatId, this._user.email, file);
                    this.el.btnSendPicture.disabled = false;

                    this.closeAllMainPanel();
                    this._camera.stop();
                    this.el.btnReshootPanelCamera.hide();
                    this.el.pictureCamera.hide();
                    this.el.videoCamera.show();
                    this.el.containerSendPicture.hide();
                    this.el.containerTakePicture.show();
                    this.el.panelMessagesContainer.show();

                });
            console.log(result);

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
        this.el.btnSendDocument.on('click', e => {

            let file = this.el.inputDocument.files[0];
            let base64 = this.el.imgPanelDocumentPreview.src;

            if(file.type === 'application/pdf'){

                Base64.toFile(base64).then(filePreview => {

                    Message.sendDocument(
                        this._contactAtive.chatId, 
                        this._user.email, file, filePreview, this.el.infoPanelDocumentPreview.innerHTML, );

                });

            }else {

                Message.sendDocument(this._contactAtive.chatId, this._user.email, file);

            }

            this.el.btnClosePanelDocumentPreview.click();

        });

        //Evento, fechar painel documento;
        this.el.btnClosePanelDocumentPreview.on('click', e => {

            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();

        });

        //Evento, para abrir tela de contatos;
        this.el.btnAttachContact.on('click', e => {

            this._contactsController = new ContactsController(this.el.modalContacts, this._user);

            this._contactsController.on('select', contact => {

                Message.sendContact(
                    this._contactAtive.chatId,
                    this._user.email,
                    contact
                );

            });

            this._contactsController.open();
           
        });

        //Evento, Fechar tela de contatos;
        this.el.btnCloseModalContacts.on('click', e =>{

            this._contactsController.close();
           

        });

        //Evento, exibir painel de gravação;
        this.el.btnSendMicrophone.on('click', e=>{

            this.el.recordMicrophone.show();
            this.el.btnSendMicrophone.hide();
            
            this._microphoneController = new MicrophoneController();

            this._microphoneController.on('ready', musica=>{
                console.log('ready event');
                this._microphoneController.startRecorder();

            });

            this._microphoneController.on('recordtimer', timer => {

                this.el.recordMicrophoneTimer.innerHTML = Format.toTime(timer);

            });

        });

        //Evento, cancelar gravação do audio;
        this.el.btnCancelMicrophone.on('click', e =>{

            this._microphoneController.stopRecorder();
            this.closeRecordMicrophone();

        });

        //Evento, finalizar gravação do audio;
        this.el.btnFinishMicrophone.on('click', e =>{

            this._microphoneController.on('recorded', (file, metadata) => {

                Message.sendAudio(
                    this._contactAtive.chatId,
                    this._user.email,
                    file,
                    metadata,
                    this._user.photo
                )

            });
            this._microphoneController.stopRecorder();
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

            Message.send(this._contactAtive.chatId, this._user.email, 'text', this.el.inputText.innerHTML);

            this.el.inputText.innerHTML = '';
            this.el.panelEmojis.removeClass('open');

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

    //Metodo, ocultar elementos de gravação de audio, e exibir botão de gravar audio;
    closeRecordMicrophone(){
        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();
       
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