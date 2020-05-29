var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){ 
    	progressTxt = this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30, '0%',{
             font: '25px', fill: 'white', fontWeight: 'normal', align: 'center'
        });
        this.progress.anchor.setTo(0.5, 0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);
  
        loadingTxt = this.add.text(this.game.world.centerX - 37,  this.game.world.centerY - 150, "Loading...", {
            font: '18px', fill: 'lightgrey', fontWeight: 'normal', align: 'center'
        });
        
        this.game.load.image("bg", "assets/israel/images/israel.jpg");
        this.game.load.image("button", "assets/israel/images/button.png");
        this.game.load.image("gear", "assets/israel/images/gearBtn.png");
        this.game.load.image("ok", "assets/israel/images/ok.png");
        this.game.load.image("musicBtn", "assets/israel/images/musicBtn.png");
        this.game.load.image("panel", "assets/israel/images/panel.png");
        
        this.game.load.image("person00", "assets/israel/images/01dbg.png");
        this.game.load.image("person01", "assets/israel/images/02motagur.png");
        this.game.load.image("person02", "assets/israel/images/03begin.png");
        this.game.load.image("person03", "assets/israel/images/04rabin.png");
        this.game.load.image("person04", "assets/israel/images/05hauzner.png");
        this.game.load.image("person05", "assets/israel/images/06brody.png");
        this.game.load.image("person06", "assets/israel/images/07herzog.png");
        this.game.load.image("person07", "assets/israel/images/08clinton.png");
        this.game.load.image("person08", "assets/israel/images/09yavin.png");
        this.game.load.image("person09", "assets/israel/images/10bibi.png");
        this.game.load.image("person010", "assets/israel/images/11ovadia.png");
        this.game.load.image("person011", "assets/israel/images/12Chocolat.png");

        this.game.load.audio('israel1', 'assets/israel/audio/bengurion.ogg');
        this.game.load.audio('israel10', 'assets/israel/audio/bibi.ogg');
        this.game.load.audio('israel6', 'assets/israel/audio/brodi.ogg');
        this.game.load.audio('israel8', 'assets/israel/audio/clinton.ogg');
        this.game.load.audio('israel5', 'assets/israel/audio/hauzner.ogg');
        this.game.load.audio('israel7', 'assets/israel/audio/herzog.ogg');
        this.game.load.audio('israel2', 'assets/israel/audio/motagur.ogg');
        this.game.load.audio('israel11', 'assets/israel/audio/ovadia.ogg');
        this.game.load.audio('israel4', 'assets/israel/audio/rabin.ogg');
        this.game.load.audio('israel9', 'assets/israel/audio/yavin.ogg');
        this.game.load.audio('israel3', 'assets/israel/audio/begin.ogg');
        
        this.game.load.audio('israel12', 'assets/israel/audio/shokolad.ogg');
        this.game.load.audio('israel13', 'assets/israel/audio/golda.ogg');
        this.game.load.audio('israel14', 'assets/israel/audio/katzav.ogg');
        this.game.load.audio('israel15', 'assets/israel/audio/miri.ogg');
        this.game.load.audio('israel16', 'assets/israel/audio/peres.ogg');
        this.game.load.audio('israel17', 'assets/israel/audio/sara.ogg');
        
        this.game.load.audio('music1', 'assets/israel/audio/music1.ogg');
        this.game.load.audio('music2', 'assets/israel/audio/music2.mp3');
        this.game.load.audio('music3', 'assets/israel/audio/music3.ogg');
    },
    
    create: function(){
        this.game.state.start("Game"); 
        
        initAd(); 
    }
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text = progress+"%";
};