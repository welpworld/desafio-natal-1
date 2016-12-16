var jogo = new Motor();

jogo.tela(1100,600,'jogo');

jogo.adicionarEstado('Boot', Welpworld.Boot);
jogo.adicionarEstado('Preloader', Welpworld.Preload);
jogo.adicionarEstado('MainMenu', Welpworld.MainMenu);
jogo.adicionarEstado('Game', Welpworld.Game);

jogo.activarEstado('Boot');