const config = {
    title: "Hola Phaser",
      scale: { // Se agrega ':' después de 'scale'
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        type: Phaser.AUTO,
        parent: "contenedor",
        width: 800,
        height: 600,
    },
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

var game = new Phaser.Game(config);

function preload () {
    this.load.image('fondo', 'assets/image/nebula.jpg');
    this.load.image('planeta', 'assets/image/phaser1.png');
    this.load.image('particula', 'assets/image/yellow.png');
    this.load.image('raqueta', 'assets/image/raqueta.png');
    this.load.audio('audio', 'assets/sound/audio.mp3');


};

function create () {
    this.add.image(400, 600, 'fondo');
    raqueta = this.add.image(400,500, 'raqueta').setInteractive();

    // Agregar el objeto con física
    Mundo = this.physics.add.image(400, 250, 'planeta');
    Mundo.setAlpha(0.6);
    Mundo.setFlipX(true);
    Mundo.setOrigin(0.5, 0.5);
    Mundo.setCollideWorldBounds(true);
    Mundo.setBounce(1);
    Mundo.setVelocity(300, 400);

    const texto = this.add.text(400, 550, "Hola Mundo", {
        fontSize: '20px',  // Especifica la unidad para el tamaño de fuente
        color: 'green',
        backgroundColor: 'white',
        padding: {
            top: 15,
            bottom: 15,
            right: 15,
            left: 15
        },
        //align: center
    }).setOrigin(0.5); // Esto centra el texto en las coordenadas dadas (300, 550)
    
    texto.setAlpha(0.5);

    const eventos = Phaser.Input.Events; 
    console.log(eventos);
    this.input.on('pointermove', function(pointer){
        raqueta.x = pointer.x;
    });
    this.input.on(eventos.GAMEOBJECT_DOWN,(pointer, gameObject)=>{
        gameObject.setTint(0x00ff00)
    });
    this.input.on(eventos.GAMEOBJECT_DOWN,(pointer, gameObject)=>{
        gameObject.clearTint(0x00ff00)
    });
/*
    // Configuración del emisor de partículas
    particulas = this.add.particles('particula');
    var emitter = particulas.createEmitter({
        speed: 100,  // Sin gravedad para las partículas
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

   
    // Seguir al objeto Mundo
    emitter.startFollow(Mundo);
*/
  
};

function update (time, delta) {
    Mundo.angle += 1;  // Rotación continua del objeto
};