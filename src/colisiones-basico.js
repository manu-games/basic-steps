let canvas, ctx;
let circle_1, circle_2;
let mouse = {x: 0, y: 0};

window.addEventListener('load', ()=>{
    canvas  = document.querySelector('#myCanvas');
    ctx = canvas.getContext('2d');

    init();
    animate();
});

function init(){
    circle_1 = new Circle(100, 300, 50, 'red');
    circle_1.update();

    circle_2 = new Circle(300, 100, 30, 'black');
    circle_2.update();
}

// Alternativa #1: Crear una clase, su constructor y definir los métodos
// Alternativa #2: Hacer un prototipo por cada función de "Circle"
function Circle(x,y,radius,color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.update = function(){
        this.draw();
    };

    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI); // (posX, posY, radio, anguloInicial, anguloFinal)
        //ctx.stroke(); // dibuja el borde
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };
}

// animation loop, recursive function
// Alternativa? Usar setInterval (aunque... para animaciones se
// sugiere requestAnimationFrame)
function animate(){
    // limpia las frames anteriores
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    circle_1.update();

    circle_2.x = mouse.x;
    circle_2.y = mouse.y;
    circle_2.update();

    let distance = getDistanceBetween(circle_1.x, circle_1.y,
                                      circle_2.x, circle_2.y);

    // console.log(distance);
    // console.log(Math.max(0, distance) + ' '+ Math.max(0, circle_1.radius + circle_2.radius));

    // - Si la distancia entre los centros de las circuferencias
    // es menor al radio de ambas
    // - Se compara con la suma de los radios, porque son la
    // longitud de los radios lo que separa los centros de ambas circunferencias
    if(distance < circle_1.radius + circle_2.radius){
        console.log('boom!');
        circle_1.color = 'blue';
    }
    else{
        circle_1.color = 'red';
    }

    // esto produce la recursividad
    requestAnimationFrame(animate);
}

function getDistanceBetween(x1, y1, x2, y2){
    // - teorema de pitágoras
    // - obtiene la distancia entre el centro de ambas circunferencias
    // - resultado de la raíz cuadrada de sumatoria de los cuadrados
    // de las coordenadas x,y de ambas circunferencias
    // Ej. distancia = raizCuadrada( (x1,y1)^² + (x2,y2)^² )
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

addEventListener('mousemove', function(event){
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

