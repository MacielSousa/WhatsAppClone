//Importando a nossa LIb PDF
const pdfjsLib = require('pdfjs-dist');
//Importanto Lib path
const path = require('path');
pdfjsLib.GlobalWorkerOptions.workerSrc = path.resolve(__dirname, '../../dist/pdf.worker.bundle.js');
export class DocumentPreviewController{

    //Metodo, construtor que recebe arquivo;
    constructor(file){

        //Variavel, recebendo arquivo;
        this._file = file;

    }

    getPreviewData(){

        return new Promise ((s, f)=>{

            let reader = new FileReader();

            switch(this._file.type){

                case 'image/png':
                case 'image/jpeg':
                case 'image/jpg':
                case 'image/gif':
                    reader.onload = e => {
                        s({
                            src: reader.result,
                            info: this._file.name
                        });
                    }
                    reader.onerror = e =>{
                        f(e);
                    }
                    reader.readAsDataURL(this._file);
                break;

                case 'application/pdf':

                    reader.onload = e =>{

                        pdfjsLib.getDocument(new Uint8Array(reader.result)).then(pdf => {

                            pdf.getPage(1).then(page => {

                                console.log('Page', page);
                                let viewport = page.getViewport(1);

                                let canvas = document.createElement('canvas');
                                let canvasContext = canvas.getContext('2d');

                                canvas.width = viewport.width;
                                canvas.height = viewport.height;

                                page.render({
                                    canvasContext,
                                    viewport
                                }).then(() =>{

                                    let _s = (pdf.numPages > 1) ? 's' : '';
                                    s(
                                        {
                                            src: canvas.toDataURL('image/png'),
                                            info: `${pdf.numPages} página${_s}`
                                        }
                                    );

                                }).catch(err => {
                                    f(err);
                                });

                            }).catch(err =>{
                                f(err);
                            });

                        }).catch(err => {

                            f(err);

                        });
                    }
                    reader.readAsArrayBuffer(this._file);


                break;
                default:
                    f();


            }

        });
        
    }

}