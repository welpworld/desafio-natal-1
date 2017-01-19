
var Welpworld = function() {};

Welpworld.Boot = function() {};

Welpworld.Boot.prototype = {
  preload: function() {

    jogo.carregarImagem('logo', 'assets/images/logo.png');
    jogo.carregarImagem('preloadbar', 'assets/images/preloader-bar.png');
  
    jogo.jogo.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    jogo.jogo.scale.forceOrientation(true, false);

    jogo.jogo.scale.enterIncorrectOrientation.add(this.handleIncorrect);
    jogo.jogo.scale.leaveIncorrectOrientation.add(this.handleCorrect);
   
},
  create: function() {
    jogo.corFundo('#FFF');
    
    //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
    jogo.numeroToques(2);
    var keyboard = jogo.jogo.input.keyboard;

    keyboard.addKeyCapture(Phaser.Keyboard.UP);
    keyboard.addKeyCapture(Phaser.Keyboard.DOWN);
    keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
    keyboard.addKeyCapture(Phaser.Keyboard.LEFT);
    keyboard.addKeyCapture(Phaser.Keyboard.RIGHT);
    
    if (jogo.paraDispositivoMovel()) {
      jogo.definirDimensoesMovel(500,300,1100,600,true);
    }

    jogo.activarEstado('Preloader');
  },
  	 handleIncorrect:function(){
   	if(!jogo.jogo.device.desktop){
     		document.getElementById("turn").style.display="block";
     	}
	},
	
	handleCorrect:function(){
		if(!jogo.jogo.device.desktop){
			document.getElementById("turn").style.display="none";
		}
	}
};