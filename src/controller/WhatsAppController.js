//Classe padrão do Projeto, invocada pelo o meu app;
class WhatsAppController{

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
            this.el.menuAttach.addClass('open');
            document.addEventListener('click', this.closeMenuAttach.bind(this));

        });

        //Evento, de pegar foto;
        this.el.btnAttachPhoto.on('click', e => {
            console.log('photo');
        });

        //Evento, de abrir camera;
        this.el.btnAttachCamera.on('click', e => {
            console.log('Camera');
        });

        //Evento, de pegar documento;
        this.el.btnAttachDocument.on('click', e => {
            console.log('Documento');
        });

        //Evento, de pegar contato ;
        this.el.btnAttachContact.on('click', e => {
            console.log('Contato');
        });

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