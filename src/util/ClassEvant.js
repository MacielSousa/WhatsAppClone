export class ClassEvent{
    
    constructor(){

        this._events = {};

    }

    on(eventName, fn){

        if(!this._events[eventName]) this._events[eventName] = new Array();

        this._events[eventName].push(fn);

    }
    trigger(){
        let args = [...arguments];
        let eventNam = args.shift();

        args.push(new Event(eventNam));

        if(this._events[eventNam] instanceof Array){

            this._events[eventNam].forEach(fn  =>{

                fn.apply(null, args);

            });
        }

    }


}