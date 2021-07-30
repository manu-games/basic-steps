let canvas, ctx;
let pelotas = [];
const gravedad = 1;
const friccion = 0.90;

window.addEventListener('load', ()=>{
    canvas = document.querySelector('#myCanvas');
    ctx = canvas.getContext('2d');

    init();
    animate();
});

function init(){
    pelotas = [];

    for(let i=0; i < 50; i++){
        const radius = numberBetween(10, 30);
        let x = numberBetween(radius, canvas.width - radius);
        let y = numberBetween(radius, canvas.height - radius);
        const color = getRandomColor();
        const velocidad = {
            vx: numberBetween(-2, 2),
            vy: numberBetween(2, 5)
        };

        const pelota = new Pelota(x, y, velocidad, radius, color);

        pelotas.push(pelota);
    }
}

addEventListener('click', ()=>{
    init();
});

// Alternativa #1: Crear una clase, su constructor y definir los métodos
// Alternativa #2: Hacer un prototipo por cada función de "Circle"
function Pelota(x, y, velocidad, radius, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocidad = velocidad;

    this.update = function(){
        this.draw();

        // - Si la pelota quiere salirse del canvas => invertimos el sentido de dirección
        // - Al cambiar el sentido
        // 1. generamos el efecto de rebote contra una superficie
        // 2. contenemos la pelota dentro del canvas
        // - Debemos sumar la velocidad vy, para evitar que parte de la pelota quede por fuera del canvas
        if(this.y + this.radius + this.velocidad.vy >= canvas.height){
            // - multiplicamos por -1 para cambiar el sentido
            // - multiplicamos por un valor de fricción, esa fricción reduce la velocidad hasta que quede
            // en reposo (detenida)
            this.velocidad.vy = (-1) * this.velocidad.vy * friccion;
        }
        else{
            // si la pelota cae dentro del canvas => incrementamos en 1 su velocidad en el Eje-Y
            this.velocidad.vy += gravedad;
        }

        // - Generamos un efecto de rebote con los bordes del Canvas, limitamos su movimiento dentro del canvas
        // - Invertimos el sentido de dirección si y sólo si..
        // 1. Si la posición actual + el radio de la pelota es mayor al ancho del Canvas (trate de irse hacia la der.)
        // 2. Si la posición actual es menor o igual a su radio, trata de irse hacia la izq. del Canvas
        if(this.x+this.radius > canvas.width || this.x <= this.radius){
            this.velocidad.vx = (-1) * this.velocidad.vx;
        }


        // actualizamos su posición en eje-y, emulando un movimiento vertical (hacia abajo ó arriba)
        this.y += this.velocidad.vy;
        // actualizaos su posición en eje-x, emulando que se desplaza hacia los costados
        this.x += this.velocidad.vx;
    };

    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI); // (posX, posY, radio, anguloInicial, anguloFinal)

        ctx.strokeSyle = this.color;
        ctx.lineWidth = 4; // cambiamos el grosor del borde
        ctx.stroke(); // dibuja el borde de la figura

        ctx.fillStyle = this.color;
        ctx.fill(); // rellena la figura

        ctx.closePath();
    };
}

// animation loop, recursive function
// Alternativa? Usar setInterval (aunque... para animaciones se
// sugiere requestAnimationFrame)
function animate(){
    // limpia las frames anteriores
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pelotas.forEach( pelota => {
        pelota.update();
    });

    // esto produce la recursividad
    requestAnimationFrame(animate);
}

// ---------------------------------------------------------------------------\\
// funciones auxiliares
function numberBetween(min, max){
    return Math.random() * (max - min) + min;
}

function getRandomColor(){
    const colors = ['red', 'blue', 'orange', 'green'];
    const index = Math.floor(numberBetween(0, colors.length));
    return colors[index];
}
