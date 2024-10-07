const config = {
    title: "Hola Phaser",
    type: Phaser.AUTO,
    parent: "contenedor",
    width: 800,
    height: 600,
    scene: {
        preload,
        create,
        update,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    }
};

let game = new Phaser.Game(config);

let Mundo; // Declaración explícita de la variable Mundo
let particulas; // Declaración explícita de la variable particulas

function preload () {
    this.load.image('fondo', 'assets/image/nebula.jpg');
    this.load.image('planeta', 'assets/image/phaser1.png');
    this.load.image('particula', 'assets/image/yellow.png');
}

function create () {
    // Añadir imágenes de fondo y una partícula estática
    this.add.image(400, 300, 'fondo');
    this.add.image(100, 100, 'particula');

    // Agregar el objeto con física
    Mundo = this.physics.add.image(400, 250, 'planeta');
    Mundo.setFlipX(true);
    Mundo.setOrigin(0.5, 0.5);
    Mundo.setCollideWorldBounds(true);
    Mundo.setBounce(1);
    Mundo.setVelocity(300, 400);

    // Configuración del emisor de partículas
    particulas = this.add.particles('particula');
    let emitter = particulas.createEmitter({
        speed: { min: 100, max: 200 },      // Velocidad de las partículas
        angle: { min: 0, max: 360 },        // Ángulo de emisión
        scale: { start: 1, end: 0 },        // Escala de las partículas
        blendMode: 'ADD',                    // Modo de mezcla
        lifespan: 1000,                      // Vida útil de las partículas en ms
        frequency: 100,                      // Frecuencia de emisión en ms
        gravityY: 0,                         // Sin gravedad para las partículas
        quantity: 2,                         // Número de partículas emitidas por emisión
    });

    // Hacer que el emisor siga al objeto Mundo
    emitter.startFollow(Mundo);
}

function update (time, delta) {
    Mundo.angle += 1;  // Rotación continua del objeto
}