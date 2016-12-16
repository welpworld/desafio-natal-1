var Motor = function () {
    
    this.verdade=true;
    this.falso=false;
    
    this.tecla={
        "enter" : Phaser.KeyCode.ENTER,
        "cima" : Phaser.KeyCode.UP,
        "esquerda" : Phaser.KeyCode.LEFT,
        "direita" : Phaser.KeyCode.RIGHT,
        "baixo" : Phaser.KeyCode.DOWN,
        "espaco" : Phaser.KeyCode.SPACEBAR,
        "a" : Phaser.KeyCode.A,
        "b" : Phaser.KeyCode.B,
        "c" : Phaser.KeyCode.C,
        "d" : Phaser.KeyCode.D,
        "e" : Phaser.KeyCode.E,
        "f" : Phaser.KeyCode.F,
        "g" : Phaser.KeyCode.G,
        "h" : Phaser.KeyCode.H,
        "i" : Phaser.KeyCode.I,
        "j" : Phaser.KeyCode.J,
        "k" : Phaser.KeyCode.K,
        "l" : Phaser.KeyCode.L,
        "m" : Phaser.KeyCode.M,
        "n" : Phaser.KeyCode.N,
        "o" : Phaser.KeyCode.O,
        "p" : Phaser.KeyCode.P,
        "q" : Phaser.KeyCode.Q,
        "r" : Phaser.KeyCode.R,
        "s" : Phaser.KeyCode.S,
        "t" : Phaser.KeyCode.T,
        "u" : Phaser.KeyCode.U,
        "v" : Phaser.KeyCode.V,
        "w" : Phaser.KeyCode.W,
        "x" : Phaser.KeyCode.X,
        "y" : Phaser.KeyCode.Y,
        "z" : Phaser.KeyCode.Z,
    }
    this.propriedade={
        "verificarLimitesTela" : 'checkWorldBounds',
        "destruirForaTela" : 'outOfBoundsKill',
        "velocidadeX" : 'body.velocity.x',
        "velocidadeY" : 'body.velocity.y',
        "rodar" : 'angle'
    }
    
}

Motor.prototype = {
    tela: function(width,height,parent) {
        this.jogo = new Phaser.Game(width,height,Phaser.AUTO,parent);
    },

    corFundo: function(cor){
        this.jogo.stage.backgroundColor = cor;  
    },

    adicionarEstado: function(nomeEstado, estado){
       this.jogo.state.add(nomeEstado, estado);
    },

    carregarImagem: function(id,origem){
        return this.jogo.load.image(id, origem);
    },

    numeroToques: function(nToques){
        this.jogo.input.maxPointers = nToques;
    },

    activarEstado: function(estado){
        this.jogo.state.start(estado);
    },

    definirBarraCarregamento: function(imagem){
         return this.jogo.load.setPreloadSprite(imagem);
    },

    utilizarImagem: function(x,y, ancora,id){
       var imagem = this.jogo.add.sprite(x, y, id);
       imagem.anchor.setTo(ancora);
       return imagem;
    },

    paraComputador: function(){
        return this.jogo.device.desktop;
    },

    paraDispositivoMovel: function(){
        return !this.jogo.device.desktop;
    },

    definirDimensoesMovel: function(minX,minY,maxX,maxY,horizontal){
      this.jogo.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.jogo.scale.minWidth = minX;
      this.jogo.scale.minHeight = minY;
      this.jogo.scale.maxWidth = maxX;
      this.jogo.scale.maxHeight = maxY;
      this.jogo.scale.forceLandscape = horizontal;
      this.jogo.scale.pageAlignHorizontally = true;
     
    },

    carregarAtlas: function(id,origemPNG,origemJSON){
        return this.jogo.load.atlas(id, origemPNG, origemJSON);
    },

    carregarSprite: function(id, origem, largura,altura, nImg){
        return this.jogo.load.spritesheet(id, origem, largura, altura, nImg);
    },

    carregarTextoBitmap: function(id,origemPNG,origemXML){
       return this.jogo.load.bitmapFont(id, origemPNG, origemXML);

    },
    carregarSom: function(id, origem){
        return this.jogo.load.audio(id, [origem[0], origem[1]]);
    },

    utilizarSom: function(id){
        return this.jogo.add.audio(id);
    },

    IniciarSom: function(objecto, volume,repetir){
         objecto.play('',0,volume,repetir);
    },

    utilizarSprite: function(xInicial,yInicial,xFinal,yFinal,id){
        return this.jogo.add.tileSprite(xInicial, yInicial, xFinal, yFinal, id);
    },
    rotacaoImagem: function(imagem,rotacaoX,rotacaoY){
        imagem.autoScroll(rotacaoX, rotacaoY);
    },
   
    centroX: function(){
        return this.jogo.world.centerX;
    },
    centroY: function(){
        return this.jogo.world.centerY;
    },

    larguraTela: function(){
         return this.jogo.width;
    },

    alturaTela: function(){
         return this.jogo.height;
    },
    largura: function(objecto){
        if(objecto)
            return objecto.width;
        else
            return 0;
    },
    altura: function(objecto){
        if(objecto)
            return objecto.height;
        else
            return 0;
    },

    somDescodificado: function(id){
        return this.jogo.cache.isSoundDecoded(id);
    },

    carregamentoCompleto: function(metodo,id){
        this.jogo.load.onLoadComplete.add(metodo, id);
    },

    adicionarTexto: function(x,y,texto,estilo){
        return this.jogo.add.text(x,y,texto, estilo);
    },

    alterarTexto: function(objecto, texto){
        return objecto.text = texto;
    },

    adicionarTextoBitmap: function(x,y,id,texto,tamanho){
        return this.jogo.add.bitmapText(x, y, id,texto,tamanho);
    },

    teclaPressionada: function(idTecla){
        if(this.jogo.input.keyboard.isDown(this.tecla[idTecla]))
             return true;
         return false;
    },

    criarAnimacao: function(id,ordemAnimancao,objecto){
        objecto.animations.add(id, ordemAnimancao);
    },
    iniciarAnimacao: function(id,velocidade,repetir,objecto){
        objecto.animations.play(id, velocidade, repetir);
    },
    
    activarFisica: function(){
         this.jogo.physics.startSystem(Phaser.Physics.ARCADE);
    },
    utilizarFisica: function(objecto){
        this.jogo.physics.arcade.enableBody(objecto);
    },
    utilizarFisicaGrupo: function(grupo){
        grupo.enableBody = true;
        grupo.physicsBodyType = Phaser.Physics.ARCADE;
    },
    objectoPermiteFisica: function(objecto,valor){
        objecto.body.allowGravity = valor;
    },
    objectoNaoMovel: function(objecto,valor){
        objecto.body.immovable = valor;
    },
    
    objectoCollideComLimites: function(objecto, valor){
        objecto.body.collideWorldBounds = valor;
    },

    definirGravidadeY: function(objecto, valor){
            objecto.body.gravity.y = valor;
    },

    definirGravidadeX: function(objecto, valor){
            objecto.body.gravity.x = valor;
    },

    definirVelocidadeY: function(objecto, valor){
            objecto.body.velocity.y = valor;
    },

    definirVelocidadeX: function(objecto, valor){
            objecto.body.velocity.x = valor;
    },

    tocarNoChao: function(objecto){
       return objecto.body.touching.down;
    },
    espelharSprite: function(objecto,lado){
        if(lado === "direita" && objecto.scale.x<0)
            objecto.scale.x *= -1;
        else if (lado === "esquerda" && objecto.scale.x>0)
            objecto.scale.x *= -1;

    },

    definirEscalaObjecto: function(objecto, escala){
        objecto.scale.setTo(escala);
    },

    novoGrupo: function(){
        return this.jogo.add.group();    
    },
    
    colisao: function(objecto,colisao){
         this.jogo.physics.arcade.collide(objecto, colisao);
    },

    sobreposicao: function(objecto,colisao,funcao, contexto){
        this.jogo.physics.arcade.overlap(objecto,colisao,funcao, null, contexto);
    },

    numeroAleatorio: function(inicio, fim){
        return this.jogo.rnd.integerInRange(inicio, fim );

    },

    adicionarElementoExistente(objecto){
        this.jogo.add.existing(objecto);
    },

    devolvePrimeiroElemento: function(objecto, valor){
       return objecto.getFirstExists(valor);
    },

    numeroMaximo: function(){
        return Number.MAX_VALUE;
    },

    tempoAgora: function(){
        return this.jogo.time.now;
    },

    definirParaTodos: function(objecto, propriedade, valor){
        objecto.setAll(this.propriedade[propriedade],valor);
    }, 
    
    criarVarios: function(objecto, numeroObejctos, id){
        objecto.createMultiple(numeroObejctos, id);
    },
    destruirObjecto: function(objecto){
        objecto.kill();
    },

    destruirGrupo: function(objecto){
        objecto.destroy();
    },

    definirPosicao: function(objecto, x, y){
        objecto.reset(x,y);
    },

    adicionarRectangulo: function(xInicial,yInicial, xFinal,yFinal,cor,alpha){
        var bmd = this.jogo.add.bitmapData(xFinal-xInicial, yFinal-yInicial);
        bmd.ctx.fillStyle = cor;
        bmd.ctx.fillRect(xInicial,yInicial, xFinal, yFinal);
        var rectangulo = this.jogo.add.sprite(xInicial, yInicial, bmd);
        rectangulo.alpha = alpha;

        return rectangulo;
    },
    
    numeroObjectosDestruidos: function(grupo){
    
        return grupo.countDead();
    
        
    },

    primeiroElementoDestruido: function(grupo){
        return grupo.getFirstDead();
    }

}