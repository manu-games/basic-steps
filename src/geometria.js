window.onload = function(){
    const canvas  = document.querySelector('#myCanvas');
    const context = canvas.getContext('2d');

    //------------------------------------------------------------------------------\\
    // CUADRADO con fondo

    // - con fondo color rojo
    // - width=25px, height=25px
    // - posX = 10, posY = 0
    context.fillStyle = 'red';
    context.fillRect(10, 0, 25, 25);

    //------------------------------------------------------------------------------\\
    // CUADRADO con borde

    // - sin fondo
    // - width=50px, height=50px
    // - posX = 10, posY = 50
    // - borde azul de grosor 5px
    context.strokeStyle = 'blue';
    context.strokeRect(10,100,50,50);  // (posX, posY, width, height)
    context.lineWidth = 5;

    //------------------------------------------------------------------------------\\
    // TRIANGULO
    // - Partimos de (x=50, y=10) y haremos dos trazos en diagonal
    // bajando unos 60px en ambos lados, y nos desplazamos 40px hacia los costados

    // Empezamos el trazo
    context.beginPath();
    // empieza con la punta superior del triángulo (posX=50, posY=10)
    context.moveTo(50, 10);
    // hace un trazo 40px hacia la izq, y 60px hacia abajo
    // partiendo de la posición (x=50,y=10)
    context.lineTo(10, 70);
    // hace un trazo 40px hacia la der.y 60px hacia abajo
    // partiendo de la posición (x=50,y=10)
    context.lineTo(90, 70);
    // rellena la figura
    context.fill();

    //------------------------------------------------------------------------------\\
    // RECTAS HORIZONTALES

    // comenzamos el trazo
    context.beginPath();
    // - hará trazos con 10 px de grosor (por incrementar y += 10 en cada iteración)
    for(let y=10; y < 100; y += 10){
        // - cada iteración hará un trazo desde posX=100 hasta posX=200 (recta horizontal)
        // - y aumentará 10 en el posY
        context.moveTo(100, y);
        context.lineTo(200, y);
    }
    context.stroke(); // finaliza el dibujo

    //------------------------------------------------------------------------------\\
    // CIRCUNFERENCIAS

    context.beginPath();
    // - posX=150, posY=150
    // - radio = 50px <- 100px de diámetro
    // - ángulo 0 a 2PI (360º la vuelta entera)
    context.arc(150,150, 50, 0, 2 * Math.PI);
    //context.fillStyle = 'green'; <-- NO FUNCIONA (???)
    context.stroke();

    context.beginPath();
    // - posX=150, posY=150
    // - radio = 50px <- 100px de diámetro
    // - ángulo 0 a 1/2*PI (45º un cuarto de circunferencia)
    context.arc(150,150, 50, 0, 0.5 * Math.PI); // (posX, posY, radio, anguloInicla, anguloFinal)
    // - le damos color al borde
    context.strokeStyle = 'red';
    context.stroke();

    //------------------------------------------------------------------------------\\
    // TRANSFORMATION

    // - redimensiona todos los elementos del CANVAS
    // que estén debajo de esta sentencia
    // - redimensiona el tamaño, quedando 80% de tamaño original de ancho y de alto
    context.scale(0.8, 0.8);

    // dibujamos una linea vertical
    context.fillRect(380, 0, 1, canvas.height); // (posX, posY, lineWidth, lineHeight)
    //context.save();

    // - trasladamos todos los elementos a la posición (posX=10, posY=5)
    // - mueve todo 10px hacia la derecha, y 5px hacia abajo
    context.translate(10, 5); // (posX, posY)

    //context.restore();

    //context.rotate(Math.PI*2);

    //------------------------------------------------------------------------------\\
    // TEXTO

    context.font = '45px Arial';
    context.fillStyle = 'blue';
    context.fillText('Hi..!', 210, 50); // (texto, posX, posY)

    //------------------------------------------------------------------------------\\
    // IMAGEN con new Image()

    // 1. Creamos la instancia de la clase Image (crea un object de tipo imagen)
    // (como si  usaramos la etiqueta <img> de html)
    const kitten = new Image(100, 100);
    kitten.src = '/assets/sprites/kitten.png';
    // 2. Cuando se cargó el recurso => se dibuja en el canvas
    kitten.addEventListener('load', () =>{
        // 3. la agregamos al DOM
        context.drawImage(kitten, 10, 180); // (imagen, posX, posY, width, height)
    });

    //------------------------------------------------------------------------------\\
    // IMAGEN con createElement()

    // Similar al anterior pero creamos un elemento en el DOM (una etiqueta)
    // - La w3c recomienda esta manera
    const kitten2 = document.createElement('img');
    kitten2.src = '/assets/sprites/kitten.png';
    // 2. Cuando se cargó el recurso => se dibuja en el canvas
    kitten2.addEventListener('load', e =>{
        // 3. Dibujamos la imagen dentro del canvas
        context.drawImage(kitten2, 150, 180, 100, 100); // (imagen, posX, posY, width, height)

        // - si NO le pasamos el width/height => dibujará el tamaño original de la imagen
        //context.drawImage(kitten, 10, 180); // (imagen, posX, posY, width, height)
    });

    //------------------------------------------------------------------------------\\
    // ANIMACIONES con setInterval()

    const playerSprite = new Image(48, 32); // width=24px, height=32px
    playerSprite.src = '/assets/sprites/player.png';
    const spriteWidth = 48, spriteHeight = 90;
    playerSprite.addEventListener('load', updatePlayer);

    function updatePlayer(){
        let frame = 0;
        setInterval(() => {
            // clearRect, borrará el frame anterior
            context.clearRect(400, 50, spriteWidth, spriteHeight);
            // dibujamos el sprite en cada iteración
            context.drawImage(playerSprite,
                              // recortamos un rectángulo del spriteSheet
                              // - comienza en (x=48, y=0)
                              // - por cada iteración hace x=48, 48*2, 48*3, 48*4,...
                              // - nos desplazamos 48px hacia la derecha
                              frame*spriteWidth, 0, spriteWidth, spriteHeight,
                              // destino del rectángulo dentro del canvas
                              // - estará en (x=400, y=50)
                              400, 50, spriteWidth, spriteHeight);

            // - Sumamos 1 para avanzar la posición del frame
            // - Hacemos módulo 8, porque queremos que los números estén entre 0 y 7
            //
            // Ej. 0%8=0, 1%8=1, .., 6%8=6, 7%8=7, 8%8%=0, 9%8=1, 10%8=2, ..
            // cuando supera el valor 7 vuelve al 0, y asi...
            frame = (frame + 1) % 8;
        }, 90); // 120ms (milisegundos)
    }

    //------------------------------------------------------------------------------\\
    // ANIMACIONES con requestAnimationFrame()

    const gatito = new Image(100, 100);
    // let angulo = Math.PI / 2;
    gatito.src = '/assets/sprites/kitten.png';
    gatito.addEventListener('load', function(){
        context.drawImage(gatito, 500, 50, 100, 100);
        //updateGatito();
    });

    let angulo = 5;
    const rad = Math.PI * 180;
    function updateGatito(){
        angulo += 1;
        // context.strokeRect(500,200,150,150);
        // context.rotate(rad*angulo);
        // context.fillRect(500,200, 100, 100);

        // gatito.style.top = (Math.sin(angulo)*20) + 'px';
        // gatito.style.left = (Math.sin(angulo)*200) + 'px';
        requestAnimationFrame(updateGatito);
    }

    requestAnimationFrame(updateGatito);
}
