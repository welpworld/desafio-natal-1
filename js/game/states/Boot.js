
var Welpworld = function() {};

Welpworld.Boot = function() {};

Welpworld.Boot.prototype = {
  preload: function() {

    jogo.carregarImagem('logo', 'assets/images/logo.png');
    jogo.carregarImagem('preloadbar', 'assets/images/preloader-bar.png');
  
},
  create: function() {
    jogo.corFundo('#FFF');
    
    //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
    jogo.numeroToques(1);
    var keyboard = jogo.jogo.input.keyboard;

    keyboard.addKeyCapture(Phaser.Keyboard.UP);
    keyboard.addKeyCapture(Phaser.Keyboard.DOWN);
    keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
    keyboard.addKeyCapture(Phaser.Keyboard.LEFT);
    keyboard.addKeyCapture(Phaser.Keyboard.RIGHT);
    
    if (jogo.paraDispositivoMovel()) {
      jogo.definirDimensoesMovel(568,600,2048,1536,true);
    }

    jogo.activarEstado('Preloader');
  }
};