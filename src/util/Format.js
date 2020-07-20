class Format{

    //Metodo que retorna o atributo apontadno para cada id;
    static getCamelCase(text){

        let div = document.createElement('div');

        div.innerHTML = `<div data-${text}="id"</div>`;

        return Object.keys(div.firstChild.dataset)[0];

    }

}