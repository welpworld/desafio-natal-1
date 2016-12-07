Welpworld.MainMenu = function() {};

Welpworld.MainMenu.prototype = {
  create: function() {
   
    this.fundo = jogo.utilizarSprite(0,0,jogo.larguraTela(),jogo.alturaTela(),'fundo');
    jogo.rotacaoImagem(this.fundo,-100,0);
    this.horizonte = jogo.utilizarSprite(0, 250, jogo.larguraTela(), jogo.alturaTela(), 'horizonte');
    jogo.rotacaoImagem(this.horizonte,-100,0);
    this.mar = jogo.utilizarSprite(0, jogo.alturaTela()-145, jogo.larguraTela(), jogo.alturaTela(), 'mar');
    jogo.rotacaoImagem(this.mar,-250,0);

    this.textoInicio = jogo.adicionarTextoBitmap(0, 0, 'minecraftia',"Pressiona ENTER\n para comecar!!!");
    this.textoInicio.x = jogo.larguraTela() / 2 - jogo.largura(this.textoInicio) /2;
    this.textoInicio.y = jogo.alturaTela() / 2 - jogo.altura(this.textoInicio)  / 2;

  },
  update: function() {
   
    if(jogo.teclaPressionada("enter")){
      jogo.activarEstado('Game');
    }
  }
  
};