Welpworld.Game = function() {
 
  this.velocidadeJogador = 300;
  this.velocidadeBalas = 500;

  this.movimentoMaximoX=500;
  
  this.pontos = 0;

  this.vencedor = "";

  this.proximoTiroJogador1=0;
  this.proximoTiroJogador2=0;
  this.frequenciaBala=500;

  this.vivo=jogo.verdade;
  this.reiniciar = jogo.falso;

};

Welpworld.Game.prototype = {
  create: function() {

    this.fundo = jogo.utilizarSprite(-1,-1,jogo.larguraTela()+1,jogo.alturaTela()+1,'fundo');
 
    
    this.jogador1 = jogo.utilizarImagem(75, 300, 0.5 , 'jogador');
    this.jogador2 = jogo.utilizarImagem(jogo.larguraTela()-75, 300, 0.5 , 'inimigo');

    jogo.definirEscalaObjecto(this.jogador1,.6);
    jogo.definirEscalaObjecto(this.jogador2,.6);


    //create groups 
    this.balas1 = jogo.novoGrupo();
    this.balas2 = jogo.novoGrupo();

    jogo.utilizarFisicaGrupo(this.balas1);
    jogo.criarVarios(this.balas1, 5, 'bomba');
    jogo.definirParaTodos(this.balas1, 'verificarLimitesTela',jogo.verdade);
    jogo.definirParaTodos(this.balas1, 'destruirForaTela', jogo.verdade);

    jogo.utilizarFisicaGrupo(this.balas2);
    jogo.criarVarios(this.balas2, 5, 'bomba');
    jogo.definirParaTodos(this.balas2, 'verificarLimitesTela',jogo.verdade);
    jogo.definirParaTodos(this.balas2, 'destruirForaTela', jogo.verdade);
    
    jogo.activarFisica();

    jogo.utilizarFisica(this.jogador1);
    jogo.utilizarFisica(this.jogador2);
    
    jogo.objectoCollideComLimites(this.jogador1,jogo.verdade);
    jogo.objectoCollideComLimites(this.jogador2,jogo.verdade);
       
},
  update: function() {

 
   this.movimentoJogador1();
   this.movimentoJogador2();
   
   jogo.sobreposicao(this.jogador2,this.balas1,this.destruirInimigo2,this);
   jogo.sobreposicao(this.jogador1,this.balas2,this.destruirInimigo1,this);

   if(jogo.teclaPressionada("r") && this.reiniciar===jogo.verdade)
      this.recomecar();

  },
  
  movimentoJogador1: function() {
    
    if(jogo.teclaPressionada("w")){
        jogo.definirVelocidadeY(this.jogador1, -this.velocidadeJogador);
     }else if (jogo.teclaPressionada("s")){
       jogo.definirVelocidadeY(this.jogador1, this.velocidadeJogador);
     }else{
        jogo.definirVelocidadeY(this.jogador1,0);
     }

     if(jogo.teclaPressionada("a"))  {
       jogo.definirVelocidadeX(this.jogador1, -this.velocidadeJogador);
       jogo.espelharSprite(this.jogador1,"esquerda");
     }else if(jogo.teclaPressionada("d") && this.jogador1.x < this.movimentoMaximoX)  {
        jogo.espelharSprite(this.jogador1,"direita");
        jogo.definirVelocidadeX(this.jogador1, this.velocidadeJogador);
     }else {
        jogo.definirVelocidadeX(this.jogador1,0);
        jogo.espelharSprite(this.jogador1,"direita");
     }
     
     if(jogo.teclaPressionada("espaco") && this.vivo===jogo.verdade){
        if (jogo.tempoAgora() > this.proximoTiroJogador1 && jogo.numeroObjectosDestruidos(this.balas1) > 0)
        {
          this.proximoTiroJogador1 = jogo.tempoAgora() + this.frequenciaBala;
          this.criarBalaJogador1();
          
        }
     }

          
  },

  movimentoJogador2: function() {
  
  if(jogo.teclaPressionada("cima")){
      jogo.definirVelocidadeY(this.jogador2, -this.velocidadeJogador);
    }else if (jogo.teclaPressionada("baixo")){
      jogo.definirVelocidadeY(this.jogador2, this.velocidadeJogador);
    }else{
      jogo.definirVelocidadeY(this.jogador2,0);
    }

    if(jogo.teclaPressionada("esquerda") && this.jogador2.x > jogo.larguraTela()-this.movimentoMaximoX)  {
      jogo.definirVelocidadeX(this.jogador2, -this.velocidadeJogador);
      jogo.espelharSprite(this.jogador2,"esquerda");
    }else if(jogo.teclaPressionada("direita") )  {
      jogo.espelharSprite(this.jogador2,"direita");
      jogo.definirVelocidadeX(this.jogador2, this.velocidadeJogador);
    }else {
      jogo.definirVelocidadeX(this.jogador2,0);
      jogo.espelharSprite(this.jogador2,"esquerda");
    }
    
    if(jogo.teclaPressionada("enter") && this.vivo===jogo.verdade){
      if (jogo.tempoAgora() > this.proximoTiroJogador2 && jogo.numeroObjectosDestruidos(this.balas2) > 0)
      {
        this.proximoTiroJogador2 = jogo.tempoAgora() + this.frequenciaBala;
        this.criarBalaJogador2();
        
      }
    }
},
  criarBalaJogador1: function(){
    var bala = jogo.primeiroElementoDestruido(this.balas1);
    jogo.definirEscalaObjecto(bala,0.8);
    jogo.criarAnimacao('rodar',[0,1,2,3,4,5,6,7],bala);
    jogo.iniciarAnimacao('rodar',10 ,jogo.verdade,bala);

    jogo.definirPosicao(bala, this.jogador1.x, this.jogador1.y)
    jogo.definirVelocidadeX(bala, this.velocidadeBalas);
  },

    criarBalaJogador2: function(){
    var bala = jogo.primeiroElementoDestruido(this.balas2);
    jogo.definirEscalaObjecto(bala,0.8);

    jogo.criarAnimacao('rodar',[0,1,2,3,4,5,6,7],bala);
    jogo.iniciarAnimacao('rodar',10 ,jogo.verdade,bala);
    jogo.espelharSprite(bala,"esquerda");

    jogo.definirPosicao(bala, this.jogador2.x, this.jogador2.y)
    jogo.definirVelocidadeX(bala, -this.velocidadeBalas);
  },

   destruirInimigo1: function(inimigo,bala){
    jogo.destruirObjecto(inimigo);
    jogo.destruirObjecto(bala);
    
    this.vencedor = "Jogador 2";
    this.fimJogo();
   
  },
  
  destruirInimigo2: function(inimigo,bala){
    jogo.destruirObjecto(inimigo);
    jogo.destruirObjecto(bala);
     this.vencedor = "Jogador 1";
    this.fimJogo();
  },
  fimJogo: function() {
    
    //this.pontos = 0;
    jogo.destruirGrupo(this.balas1);
    jogo.destruirGrupo(this.balas2);
    
    this.proximaBomba = jogo.numeroMaximo();
    this.proximoInimigo = jogo.numeroMaximo();
     
    this.vivo=jogo.falso;

    jogo.adicionarRectangulo(0,0,jogo.larguraTela(),jogo.alturaTela(),'#000',0.7)
    
    
      var texto="O vencedor foi: " + this.vencedor; 
    var pontuacao=jogo.adicionarTextoBitmap(0,0,'minecraftia', texto,28);
    pontuacao.x = jogo.larguraTela() / 2 - jogo.largura(pontuacao) /2 ;
    pontuacao.y = jogo.alturaTela() / 2 - jogo.altura(pontuacao)  / 2 - 25;
    
    texto = '(Pressiona R para reiniciar)';
    var reiniciar=jogo.adicionarTextoBitmap(0,0,'minecraftia', texto,12);
    reiniciar.x = jogo.larguraTela() / 2 - jogo.largura(reiniciar) /2 ;
    reiniciar.y = jogo.alturaTela() / 2 - jogo.altura(reiniciar) / 2 + 50;

    this.reiniciar=jogo.verdade;
  },
  recomecar: function() {
    this.reiniciar = jogo.falso;
    this.proximaBomba = 0;
    this.proximoInimigo = 0;
    this.proximoTiro = 0;
    this.vivo = jogo.verdade;
    jogo.activarEstado('Game');
}

}