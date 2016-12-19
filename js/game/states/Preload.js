Welpworld.Preload = function() {
  this.pronto = jogo.falso;
  
};

Welpworld.Preload.prototype = {
  preload: function() {

    this.splash =jogo.utilizarImagem(jogo.centroX(), jogo.centroY(), 0.5, 'logo');
  
    this.barra = jogo.utilizarImagem(jogo.centroX(), jogo.centroY() + 150, 0.5, 'preloadbar');
    
    jogo.definirBarraCarregamento(this.barra);
 
    jogo.carregarImagem('fundo', 'assets/images/fundo_natal.png');
    
    jogo.carregarSprite('jogador1', 'assets/images/pai_natal_vermelho.png', 106, 93, 1);
    jogo.carregarSprite('jogador2', 'assets/images/pai_natal_verde.png', 106, 93,1);
    jogo.carregarSprite('bomba', 'assets/images/festa_do_rebucado.png',35, 35, 7);

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