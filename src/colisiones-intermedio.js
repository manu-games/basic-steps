let canvas, ctx;
let mouse = {x: 0, y: 0};
let particles = [];

window.addEventListener('load', ()=>{
    canvas  = document.querySelector('#myCanvas');
    ctx = canvas.getContext('2d');

    init();
    animate();
});

let colors = ['red', 'blue', 'orange', 'green'];

function init(){
    for(let i=0; i < 30; i++){
        let x = numberBetween(radius, canvas.width-radius);
        let y = numberBetween(radius, canvas.height-radius);
        const radius = 10;
        const color = getRandomColor();

        console.log(color);

        if( i > 0 ){
            for(let j=0; j < particles.length; j++){
                const x2 = particles[j].x;
                const y2 = particles[j].y;

                // - El radio*2 representa la suma de los radios de las
                // dos partículas, y es lo que separa los centros de las partículas
                // (multiplicamos por dos, porque todas las partículas tienen igual radio)
                // - Si la distancia entre los centros de ambas partículas
                // es menor al radio*2 es porque colisionaron
                if(getDistanceBetween(x,y,x2,y2) < radius*2){
                    x = numberBetween(radius, canvas.width-radius);
                    y = numberBetween(radius, canvas.height-radius);
                    // x = Math.random() * canvas.width;
                    // y = Math.random() * canvas.height;

                    // - al cambiar j=-1, reinicia el loop
                    // - verifica si las nuevas coordenadas (x,y) no solapean
                    // con las de otras partículas
                    j = -1;
                }
            }
        }

        particles.push(new Particle(x, y, radius, color));
    }
}

// Alternativa #1: Crear una clase, su constructor y definir los métodos
// Alternativa #2: Hacer un prototipo por cada función de "Circle"
function Particle(x,y,radius,color, opacity){
    this.x = x;
    this.y = y; this.radius = radius;
    this.color = color;
    this.velocity = {
        x: numberBetween(1,3),
        y: numberBetween(1,3)
    };
    this.opacity = 0; // <---

    this.update = function(particles){
        this.draw();

        // validamos colisiones
        for(let i=0; i < particles.length; i++){
            // si es la misma partícula, saltamos a la siguiente iteración
            if(this === particles[i]) continue;

            const x2 = particles[i].x;
            const y2 = particles[i].y;

            if(getDistanceBetween(x,y,x2,y2) < this.radius*2 && this.opacity < 0.6){
                // this.color = 'black';
                this.opacity += 0.2; console.log('BOOOM.! Colisión');
            }
            else if(this.opacity >= 0.6){
                this.opacity -= 0.2;
                // evitamos que supere 0.6 de opacidad
                this.opacity = Math.max(0, this.opacity);
            }
        }

        // - Si la partícula se quiere desplazar fuera del eje X del canvas,
        // entonces invertimos el sentido de dirección de la partícula
        // - Si su posición en X menos el radio es negativo,
        // entonces quiere desplazarse fuera del canvas a izquierda
        // - Si su posición en X más el radio es mayor al ancho del Canvas,
        // entonces se quiere desplazar fura del canvas a derecha
        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width){
            // al multiplicar por (-1) invertimos el sentido de dirección
            this.velocity.x = (-1) * this.velocity.x;
        }

        // Mismo concepto que con el eje-X pero con el eje-Y
        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height){
            // al multiplicar por (-1) invertimos el sentido de dirección
            this.velocity.y = (-1) * this.velocity.y;
        }

        // por cada segundo que pasa se actualiza, y se vuelve a dibujar
        // entonces hacemos que se desplaze en el canvas, cambiando sus coordenadas (x,y)
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    };

    this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI); // (posX, posY, radio, anguloInicial, anguloFinal)
        ctx.save(); // <--
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore(); // <---

        ctx.strokeStyle = this.color;
        ctx.stroke(); // dibuja el borde
        ctx.closePath();
    };
}

// animation loop, recursive function
// Alternativa? Usar setInterval (aunque... para animaciones se
// sugiere requestAnimationFrame)
function animate(){
    // limpia las frames anteriores
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // let distance = getDistanceBetween(circle_1.x, circle_1.y,
    //                                   circle_2.x, circle_2.y);

    // - Si la distancia entre los centros de las circuferencias
    // es menor al radio de ambas
    // - Se compara con la suma de los radios, porque son la
    // longitud de los radios lo que separa los centros de ambas circunferencias

    // if(distance < circle_1.radius + circle_2.radius){


    // - le pasamos las particulas para comparar si colisionan
    particles.forEach(particle => {
        particle.update(particles);
    });

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

function numberBetween(min, max){
    return Math.random() * (max - min) + min;
}

function getRandomColor(){
    const colors = ['red', 'blue', 'orange', 'green'];
    const index = Math.floor(numberBetween(0, colors.length));
    return colors[index];
}

addEventListener('mousemove', function(event){
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

