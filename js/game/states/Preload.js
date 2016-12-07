Welpworld.Preload = function() {
  this.pronto = jogo.falso;
  
};

Welpworld.Preload.prototype = {
  preload: function() {

    this.splash =jogo.utilizarImagem(jogo.centroX(), jogo.centroY(), 0.5, 'logo');
  
    this.barra = jogo.utilizarImagem(jogo.centroX(), jogo.centroY() + 150, 0.5, 'preloadbar');
    
    jogo.definirBarraCarregamento(this.barra);
 
    jogo.carregarImagem('fundo', 'assets/images/Capture.PNG');
    jogo.carregarImagem('horizonte', 'assets/images/mar 2.png');
    jogo.carregarImagem('mar', 'assets/images/mar 1.png');
    
    jogo.carregarSprite('jogador', 'assets/images/barco_bom.png', 213.85, 175.13, 2);
    jogo.carregarSprite('inimigo', 'assets/images/barco_mau.png', 224.8, 175.13,2);
    jogo.carregarImagem('bomba', 'assets/images/bomba.png');

    jogo.carregarTextoBitmap('minecraftia', 'assets/fonts/minecraftia/minecraftia.png', 'assets/fonts/minecraftia/minecraftia.xml');

    //This needs something to load or won't be called'
    jogo.carregamentoCompleto(this.carregamentoCompleto,this);
  },
  
  update: function() {
   if( this.pronto === jogo.verdade ){
   jogo.activarEstado('MainMenu');
    }
  },
 
  carregamentoCompleto: function() {
    this.pronto = jogo.verdade;
  },

 
};