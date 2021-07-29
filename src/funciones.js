//--------------------------------------------------------\\
// CLASES

class Empleado{
    constructor(nombre){
        this.nombre = nombre;
    }

    presentarse(){
        console.log(`Hola! Soy ${this.nombre}`);
    }
}

const samuel = new Empleado('samuel');
samuel.presentarse();

//----------------------------------------------------------------------------------\\
// FUNCIONES ANONIMAS / EXPRESIONES LAMBDA / VARIABLES DEFINIDAS CON FUNCIONES

window.addEventListener('load', ()=>{
    const pepe = new Persona('pepe', 15);

    pepe.presentarse(2);
    pepe.preguntar(1);
    pepe.saludar('pedro');
    pepe.despedirse('pedro');
});

function Persona(nombre, edad){
    this.nombre = nombre;
    this.edad = edad;

    // - definimos una variable que tiene asignada una función sin identificador
    // - recibe sólo 1 parámetro "modo"
    this.presentarse = function(modo){
        // manejamos las alternativas con 'switch', podríamos haber usado también if/else
        switch(modo){
        case 1:
            console.log('Mi nombre es '+ this.nombre);
            break;
        case 2:
            console.log('Me llamo '+ this.nombre);
            break;
        }
    };

    // - definimos una variable que tiene asignada una expresión lambda, ó función anónima también
    // - recibe sólo 1 parámetro "modo"
    this.preguntar = (modo) => {
        console.log(this);

        // manejamos las alternativas con if/else, podríamos haber usado switch
        if(modo == 1)
            console.log('Que tal?');
        else if(modo == 2)
            console.log('Cómo estas?');
    };
}

// - extendemos la función Persona, y le agregamos una nueva función "saludar"
// - esta función "saludar" recibe sólo 1 parámetro "nombre"
Persona.prototype.saludar = function(nombre){
    console.log(`Hola ${nombre}`); // <-- Feature de ES6/ECMAScript6/ES2015
    // console.log('Hola '+ nombre);
};

Persona.prototype.despedirse = (nombre) => {
    console.log(`Chau ${nombre}`); // <-- Feature de ES6/ECMAScript6/ES2015
    // console.log('Chau '+ nombre);
};

console.log('--------------------------------------------');

//----------------------------------------------------------------------------------\\
// WINDOW OBJECT Vs. Object

function Foo(){
    this.A = 1;
    this.B = 2;

    return this;
}

var a = Foo();     // <--- retorna un window object
var b = new Foo(); // <--- retorna un object del tipo Foo, pero vacío

console.log(window.A); // <-- devuelve el 1 que le definimos en Foo()
console.log(window.B); // <-- devuelve el 2 que le definimos en Foo()

console.log(a);
console.log(b);

console.log(Object.getPrototypeOf(b));
console.log(Foo.prototype);
console.log(Object.getPrototypeOf(b) == Foo.prototype);

console.log('--------------------------------------------');
//----------------------------------------------------------------------------------\\

var c = function Foo2(){
    this.numero = 1;

    return this;
};

var d = new c();

console.log(c); // <-- imprime una función Foo()
console.log(d); // <-- imprime un object del tipo Foo()

console.log('--------------------------------------------');
