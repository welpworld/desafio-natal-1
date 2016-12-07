Welpworld.Game = function() {
 
  this.velociadeJogador = 300;
  this.alturaMaxima=250;
  
  this.frequenciaBomba = 2000;
  this.proximaBomba = 0;

  this.frequenciaInimigo = 1000;
  this.proximoInimigo = 0;

  this.pontos = 0;

  this.proximoTiro=0;
  this.frequenciaBala=500;

  this.vivo=jogo.verdade;
  this.reiniciar = jogo.falso;
};

Welpworld.Game.prototype = {
  create: function() {

    this.fundo = jogo.utilizarSprite(0,0,jogo.larguraTela(),jogo.alturaTela(),'fundo');
    jogo.rotacaoImagem(this.fundo,-100,0);
   
    this.horizonte = jogo.utilizarSprite(0, 250, jogo.larguraTela(), jogo.alturaTela(), 'horizonte');
    jogo.rotacaoImagem(this.horizonte,-100,0);
    
    this.mar = jogo.utilizarSprite(0, jogo.alturaTela()-145, jogo.larguraTela(), jogo.alturaTela(), 'mar');
    jogo.rotacaoImagem(this.mar,-250,0);
    
    this.jogador = jogo.utilizarImagem(500, 300, 0.5 , 'jogador');
    jogo.definirEscalaObjecto(this.jogador,.5);
    
    jogo.criarAnimacao('vento',[0,1], this.jogador);
    jogo.iniciarAnimacao('vento',1,true,this.jogador);
  
    //create groups
    this.inimigos = jogo.novoGrupo();   
    this.bombas = jogo.novoGrupo();
    this.balas = jogo.novoGrupo();

    jogo.utilizarFisicaGrupo(this.balas);
    jogo.criarVarios(this.balas, 5, 'bomba');
    jogo.definirParaTodos(this.balas, 'verificarLimitesTela',jogo.verdade);
    jogo.definirParaTodos(this.balas, 'destruirForaTela', jogo.verdade);


    jogo.utilizarFisicaGrupo(this.bombas);
     jogo.criarVarios(this.bombas, 5, 'bomba');
    jogo.definirParaTodos(this.bombas, 'verificarLimitesTela',jogo.verdade);
    jogo.definirParaTodos(this.bombas, 'destruirForaTela', jogo.verdade);
    
     
    jogo.utilizarFisicaGrupo(this.inimigos);
    jogo.criarVarios(this.inimigos, 10, 'inimigo');
    jogo.definirParaTodos(this.inimigos, 'verificarLimitesTela',jogo.verdade);
    jogo.definirParaTodos(this.inimigos, 'destruirForaTela', jogo.verdade);

   
    this.textoPontos = jogo.adicionarTextoBitmap(10,10, 'minecraftia', 'Pontuacao: ' + this.pontos, 24);

    jogo.activarFisica();

    jogo.utilizarFisica(this.jogador);
    jogo.objectoCollideComLimites(this.jogador,jogo.verdade);
       
},
  update: function() {

    if(jogo.tempoAgora()>this.proximaBomba ) {
      this.criarBomba();
      this.proximaBomba = jogo.tempoAgora() + this.frequenciaBomba;
    } 
   
    if(this.proximoInimigo < jogo.tempoAgora()) {
      this.criarInimigo();
      this.proximoInimigo = jogo.tempoAgora() + this.frequenciaInimigo;
    }

   jogo.sobreposicao(this.balas, this.inimigos, this.balaColideInimigo,this)
   jogo.sobreposicao(this.inimigos, this.jogador, this.InimigoColideJogador, this);
   jogo.sobreposicao(this.bombas, this.jogador, this.bombaColideJogador, this);

 
   this.movimentoJogador();

   if(jogo.teclaPressionada("enter") && this.reiniciar===jogo.verdade)
      this.recomecar();
  },
  
  movimentoJogador: function() {
    
    if(jogo.teclaPressionada("cima") && this.jogador.y > this.alturaMaxima){
        jogo.definirVelocidadeY(this.jogador, -this.velociadeJogador);
     }else if (jogo.teclaPressionada("baixo")){
       jogo.definirVelocidadeY(this.jogador, this.velociadeJogador);
     }else{
        jogo.definirVelocidadeY(this.jogador,0);
     }

     if(jogo.teclaPressionada("esquerda"))  {
       jogo.definirVelocidadeX(this.jogador, -this.velociadeJogador);
       jogo.espelharSprite(this.jogador,"esquerda");
     }else if(jogo.teclaPressionada("direita"))  {
        jogo.espelharSprite(this.jogador,"direita");
        jogo.definirVelocidadeX(this.jogador, this.velociadeJogador);
     }else {
        jogo.definirVelocidadeX(this.jogador,0);
        jogo.espelharSprite(this.jogador,"direita");
     }
     
     if(jogo.teclaPressionada("espaco") && this.vivo===jogo.verdade){
        if (jogo.tempoAgora() > this.proximoTiro && jogo.numeroObjectosDestruidos(this.balas) > 0)
        {
          this.proximoTiro = jogo.tempoAgora() + this.frequenciaBala;
          this.criarBala();
          
        }
     }
      
  },
  criarBala: function(){
    var bala = jogo.primeiroElementoDestruido(this.balas);
    jogo.definirEscalaObjecto(bala,0.6);

    jogo.definirPosicao(bala, this.jogador.x - 10, this.jogador.y + 30)
    jogo.definirVelocidadeX(bala, 350);
  },
   criarBomba: function() {
   
    var x = jogo.numeroAleatorio(50, 150);
    var y = -20;
    var gravidadeY = jogo.numeroAleatorio(100, 500);
    var bomba = jogo.primeiroElementoDestruido(this.bombas);

    jogo.definirPosicao(bomba, x, y);
    jogo.definirVelocidadeX(bomba,200);
    jogo.definirGravidadeY(bomba, gravidadeY);
  
  },
  
  criarInimigo: function() {
    var x = jogo.larguraTela();
    var y = jogo.numeroAleatorio(this.alturaMaxima, jogo.alturaTela()-75);

    var inimigo = jogo.primeiroElementoDestruido(this.inimigos);
    jogo.definirEscalaObjecto(inimigo,0.4);

    jogo.definirPosicao(inimigo, x, y)
    jogo.definirVelocidadeX(inimigo,-200);
  },
  bombaColideJogador: function(bomba, jogador) {
   
    jogo.destruirObjecto(bomba);
    jogo.destruirObjecto(jogador);
    
    this.fimJogo();

  },
  InimigoColideJogador: function(inimigo, jogador) {
     jogo.destruirObjecto(inimigo);
     jogo.destruirObjecto(jogador);
    
     
     this.fimJogo();
  },
  balaColideInimigo: function(inimigo,balas){
    jogo.destruirObjecto(inimigo);
    jogo.destruirObjecto(balas);
    
    this.pontos= this.pontos + 1;
    jogo.alterarTexto(this.textoPontos, 'Pontuacao: ' + this.pontos);
  },
  fimJogo: function() {
    
    //this.pontos = 0;
    this.proximaBomba = jogo.numeroMaximo();
    this.proximoInimigo = jogo.numeroMaximo();
    
    jogo.rotacaoImagem(this.fundo, 0,0);
    jogo.rotacaoImagem(this.horizonte, 0,0);
    jogo.rotacaoImagem(this.mar,0,0);
    
    jogo.definirParaTodos(this.inimigos, 'velocidadeX',0);
    //jogo.definirParaTodos(this.bombas, 'velocidadeX',0);
    
    this.vivo=jogo.falso;

    jogo.adicionarRectangulo(0,0,jogo.larguraTela(),jogo.alturaTela(),'#000',0.7)
    
    var texto="Pontuacao final: "+ this.pontos + "\n    Muito Bem!"
    var pontuacao=jogo.adicionarTextoBitmap(0,0,'minecraftia', texto,28);
    pontuacao.x = jogo.larguraTela() / 2 - jogo.largura(pontuacao) /2 ;
    pontuacao.y = jogo.alturaTela() / 2 - jogo.altura(pontuacao)  / 2 - 25;
    
    texto = '(Pressiona ENTER para reiniciar)';
    var reiniciar=jogo.adicionarTextoBitmap(0,0,'minecraftia', texto,12);
    reiniciar.x = jogo.larguraTela() / 2 - jogo.largura(reiniciar) /2 ;
    reiniciar.y = jogo.alturaTela() / 2 - jogo.altura(reiniciar) / 2 + 50;

    this.reiniciar=jogo.verdade;
  },
  recomecar: function() {
    this.reiniciar = jogo.falso;
    this.pontos = 0;
    this.proximaBomba = 0;
    this.proximoInimigo = 0;
    this.proximoTiro = 0;
    this.vivo = jogo.verdade;
    jogo.activarEstado('Game');
}

}