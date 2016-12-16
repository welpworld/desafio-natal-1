Welpworld.MainMenu = function() {};

Welpworld.MainMenu.prototype = {
  create: function() {
   
    this.fundo = jogo.utilizarSprite(-1,-1,jogo.larguraTela()+1,jogo.alturaTela()+1,'fundo');

    this.textoInicio = jogo.adicionarTextoBitmap(0, 0, 'minecraftia',"Pressiona ENTER\n para comecar!!!");
    this.textoInicio.x = jogo.larguraTela() / 2 - jogo.largura(this.textoInicio) /2;
    this.textoInicio.y = jogo.alturaTela() / 2 - jogo.altura(this.textoInicio)  / 2;

    this.textoInicio = jogo.adicionarTextoBitmap(0, 0, 'minecraftia',"   Jodador 1\nmovimento: wasd\ndisparar: espaco",16);
    this.textoInicio.x = jogo.larguraTela() / 2 - jogo.largura(this.textoInicio) /2 - 275;
    this.textoInicio.y = jogo.alturaTela() / 2 - jogo.altura(this.textoInicio)  / 2+75;

    this.textoInicio = jogo.adicionarTextoBitmap(0, 0, 'minecraftia',"   Jodador 2\nmovimento: setas\ndisparar: enter",16);
    this.textoInicio.x = jogo.larguraTela() / 2 - jogo.largura(this.textoInicio) /2 + 275;
    this.textoInicio.y = jogo.alturaTela() / 2 - jogo.altura(this.textoInicio)  / 2+75;
  },
  update: function() {
   
    if(jogo.teclaPressionada("enter")){
      jogo.activarEstado('Game');
    }
  }
  
};