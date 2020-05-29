var gameMain = function(game){
    var sounds;
   
    multiSounds = false;
    
    playModes = ['toggle', 'trigger', 'gate', 'pause', 'none'];
    mode = playModes[1];
    
    musicPlayed = false;
    
    musicButtons = [];
    musicText = [];
    textsMusicText = [ // text for each music button
    	'Techno', 'Klezmer', 'March'
    ];
    MUSIC_BUTTONS_N = textsMusicText.length;
};

gameMain.prototype = {
    create: function(){
        bg = this.add.image(0, 0, 'bg');
        bg.alpha = 0.6;
 
        buttonsGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
        
        createMusicBtns();

        button1 = buttonsGroup.create(126, 121, 'button');
        button1.tint = '0x000fff';
        button2 = buttonsGroup.create(295+106, 15+106, 'button');
        button3 = buttonsGroup.create(570+106, 15+106, 'button');
        button3.tint = '0x000fff';
        button4 = buttonsGroup.create(20+106, 235+106, 'button');
        button4.tint = '0x000fff';
        button5 = buttonsGroup.create(295+106, 235+106, 'button');
        button6 = buttonsGroup.create(570+106, 235+106, 'button');
        button6.tint = '0x000fff';
        
        button71 = buttonsGroup.create(20+106, 455+106, 'button');
        button71.tint = '0x000fff';
        button81 = buttonsGroup.create(295+106, 455+106, 'button');
        button91 = buttonsGroup.create(570+106, 455+106, 'button');
        button91.tint = '0x000fff';
        button101 = buttonsGroup.create(20+106, 675+106, 'button');
        button101.tint = '0x000fff';
        button111 = buttonsGroup.create(295+106, 675+106, 'button');
        button121 = buttonsGroup.create(570+106, 675+106, 'button');
        button121.tint = '0x000fff';
        
        buttons = [button1, button2, button3, button4, button5, button6, button71, button81, button91, button101, button111, button121];
        
        for (n=0; n<12; n++){
        	image = this.add.image(buttons[n].x, buttons[n].y, 'person0' + n);
        	buttons[n].alpha = 0.7;
        	image.alpha = 0.9;
        	image.anchor.set(.5,.5);
        	buttons[n].inputEnabled = true;
        	buttons[n].anchor.set(.5,.5);
        }

        button7 = this.add.sprite(720, 880, 'gear');
        button7.scale.set(.55,.55);
        button7.tint = 0xffff00;

        button7.inputEnabled = true;

		loadSounds();

        modal = new gameModal(game);

        button1.events.onInputDown.add(function(){
            playSound(sfxisrael1, button1, 0xaa55ff, '#000055');
        }, this);
            
        button2.events.onInputDown.add(function(){
            playSound(sfxisrael2, button2, 0xaa55ff, '#00ff00');
        }, this);
        
        button3.events.onInputDown.add(function(){
            playSound(sfxisrael3, button3, 0xaa55ff, '#f3fff5');
        }, this);
        
        button4.events.onInputDown.add(function(){
            playSound(sfxisrael4, button4, 0xaa55ff, '#00ffff');
        }, this);
        
        button5.events.onInputDown.add(function(){
            playSound(sfxisrael5, button5, 0xaa55ff, '#000000');
        }, this);
        
        button6.events.onInputDown.add(function(){
            playSound(sfxisrael6, button6, 0xaa55ff, '#ffd00f');
        }, this);
        
        button71.events.onInputDown.add(function(){
            playSound(sfxisrael7, button71, 0xaa55ff, '#000055');
        }, this);
        
        button81.events.onInputDown.add(function(){
            playSound(sfxisrael8, button81, 0xaa55ff, '#00ff00');
        }, this);
        
        button91.events.onInputDown.add(function(){
            playSound(sfxisrael9, button91, 0xaa55ff, '#f3fff5');
        }, this);
        
        button101.events.onInputDown.add(function(){
            playSound(sfxisrael10, button101, 0xaa55ff, '#00ffff');
        }, this);
        
        button111.events.onInputDown.add(function(){
            playSound(sfxisrael11, button111, 0xaa55ff, '#ffd00f');
        }, this);
        
        button121.events.onInputDown.add(function(){
            playSound(rndSounds[game.rnd.integerInRange(0, 5)], button121, 0xaa55ff, '#000000');
        }, this);

        button7.events.onInputDown.add(function(){
            openOptions();
        }, this);
        
        for (b = 0; b< buttons.length; b++){
            buttons[b].events.onInputUp.add(function(){
                if (mode == 'gate') stopSounds();
            }, this);  
        } 
		
		setTimeout(function(){
			try{
                StatusBar.hide;
            } catch(e){} 
	        try{
	            window.plugins.insomnia.keepAwake();
	        } catch(e){}   
		}, 1000);
    }
};

function stopSounds(){
    for (n = 0; n < sounds.length; n++){
        sounds[n].stop();
    }   
}

function playSound(sound, button, color1, color2){
    if (!sound.isPlaying){
        if (!multiSounds) stopSounds();

        if (!sound.paused){
            sound.play();    
        }
        else{
            sound.resume();
        }
        
        button.scale.set(0.87, 0.87);

        sound.onStop.add(function(){
           button.scale.set(1,1);
        }, this);
        
        game.stage.backgroundColor = color2;
    } 
    
    else{
        if (mode == 'toggle'){
            sound.stop();
            game.stage.backgroundColor = '#fffa6f';
        }
        else if (mode == 'trigger'){
            sound.play();
        }
        else if (mode == 'pause'){
            sound.pause();
        }
    }    
}

function openOptions(){
    button7.inputEnabled = false;
    optionsColor = '0x49FFFE';
    optionsFontSize = 45;
    
    modal.createModal({
        type:"options",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [
            {
                type: "image", content: "panel", offsetY: 0, offsetX: 0, contentScale: 2
            },
            {
                type: "text", content: "Try different play modes:", fontSize: 34, color: "0xFEFF49",
                offsetY: -250, stroke: "0x000000", strokeThickness: 5, fontFamily: "Luckiest Guy",
            },
            {
                type: "text", content: "Toggle", fontSize: optionsFontSize, color: optionsColor,
                stroke: "0x000000", strokeThickness: 4,
                offsetY: -150, fontFamily: "Luckiest Guy",
                callback: function () {
                    changePlayMode(playModes[0], this);         
                }
            },
            {
                type: "text", content: "Trigger", fontSize: optionsFontSize,
                color: optionsColor, stroke: "0x000000", strokeThickness: 4,
                offsetY: -70, fontFamily: "Luckiest Guy",
                callback: function () {
                    changePlayMode(playModes[1], this);
                }
            },
            {
                type: "text", content: "Gate", fontSize: optionsFontSize, 
                color: optionsColor, stroke: "0x000000", strokeThickness: 4,
                offsetY: 10, fontFamily: "Luckiest Guy",
                callback: function () {
                    changePlayMode(playModes[2], this);
                }
            },
            {
                type: "text", content: "Pause", fontSize: optionsFontSize,
                color: optionsColor, stroke: "0x000000", strokeThickness: 4,
                offsetY: 90, fontFamily: "Luckiest Guy",
                callback: function () {
                    changePlayMode(playModes[3], this);
                }
            },
            {
                type: "text", content: "None", fontSize: optionsFontSize,
                color: optionsColor, stroke: "0x000000", strokeThickness: 4,
                offsetY: 170,  fontFamily: "Luckiest Guy",
                callback: function () {
                    changePlayMode(playModes[4], this);
                }
            },
            {
                type: "text", content: "Multichannel", fontSize: optionsFontSize, color: '0xa9a9a9',
                offsetY: 270, offsetX: 0,  fontFamily: "Luckiest Guy",
                stroke: "0x000000", strokeThickness: 4, 
                callback: function () {
                    allowMultiple(this);
                }
            },
            {
                type: "image", content: "ok", offsetY: 100, offsetX: 300, contentScale: 0.75,
                callback: function () {
                    modal.hideModal('options');
                    button7.inputEnabled = true;
                }
            },
        ]
   });
   
   modal.showModal("options"); 

   if (multiSounds) modal.getModalItem('options',9).tint = 0x00ff00;
   
   if (mode == 'toggle') modal.getModalItem('options',4).tint = 0x00ff00;
   else if (mode == 'trigger') modal.getModalItem('options',5).tint = 0x00ff00;
   else if (mode == 'gate') modal.getModalItem('options',6).tint = 0x00ff00;
   else if (mode == 'pause') modal.getModalItem('options',7).tint = 0x00ff00;
   else if (mode == 'none') modal.getModalItem('options',8).tint = 0x00ff00;

   for (n=0; n<11; n++){
       game.add.tween(modal.getModalItem('options',n)).from( { y: - 800 }, 500, Phaser.Easing.Linear.In, true);
   }    
}

function changePlayMode(_mode, btn){
    mode = _mode;
    for (n=8; n>3; n--){
        modal.getModalItem('options', n).tint = 0xffffff;
    }
    btn.tint = 0x00ff00;
}

function allowMultiple(btn){
    if (multiSounds) multiSounds = false;
    else { multiSounds = true; }
    
    if (btn.tint == 0xffffff) btn.tint = 0x00ff00;
    else { btn.tint = 0xffffff; }
}

function createMusicBtns(){
	musicBtnsGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
	
    for(m = 0; m < MUSIC_BUTTONS_N; m++){
    	musicButtons[m] = musicBtnsGroup.create(15 + (280 * m), 960, 'musicBtn');
    	musicButtons[m].alpha = 0.87;
    	musicButtons[m].inputEnabled = true;
    	//musicButtons[m].tint = 0xffff00;

    	musicButtons[m].events.onInputDown.add(playMusic, this);        
    }
 
    for(t = 0; t < MUSIC_BUTTONS_N; t++){
    	musicText[t] = game.add.text(0, 0, textsMusicText[t], {
        	font: '48px ' + font, fill: 'white', align: 'center'
   		});
   		
   		musicText[t].x = musicButtons[t].x + musicButtons[t].width / 2 - musicText[t].width / 2 - 45;
   		musicText[t].y = musicButtons[t].y + musicButtons[t].height / 2 - musicText[t].height / 2;
    }
}


function playMusic(item){
	var place = musicButtons.indexOf(item);
	
	var sprite = musicButtons[place];
	var music = musics[place];
	
	if (!musics[place].isPlaying){
   	 	musics[place].play();
   	 	sprite.tint = 0xff33ff;
   	 	sprite.scale.set(0.95, 0.95);
   	 	
   	 	for (m=0; m<musics.length; m++){
   	 		if (musics[m].isPlaying && m != place){
   	 			musics[m].stop();
   	 			musicButtons[m].tint = 0xffffff;
   	 			sprite.scale.set(1, 1);
   	 		}
   	 	}
   	 	
   	 	var rnd = game.rnd.integerInRange(0, 4);
   	 	if (rnd == 2){ 	 	 	
			if(AdMob) AdMob.showInterstitial();
	  	}
    }
    else{
    	musics[place].stop();
    	sprite.tint = 0xffffff;
    	sprite.scale.set(1, 1);
    }
}

function loadSounds(){
    sounds = [ 
        sfxisrael1 = game.add.audio('israel1'),
        sfxisrael2 = game.add.audio('israel2'),
        sfxisrael3 = game.add.audio('israel3'),
        sfxisrael4 = game.add.audio('israel4'),
        sfxisrael5 = game.add.audio('israel5'),
        sfxisrael6 = game.add.audio('israel6'),
        sfxisrael7 = game.add.audio('israel7'),
        sfxisrael8 = game.add.audio('israel8'),
        sfxisrael9 = game.add.audio('israel9'),
        sfxisrael10 = game.add.audio('israel10'),
        sfxisrael11 = game.add.audio('israel11'),
        //random
        sfxisrael12 = game.add.audio('israel12'),
        sfxisrael13 = game.add.audio('israel13'),
        sfxisrael14 = game.add.audio('israel14'),
        sfxisrael15 = game.add.audio('israel15'),
        sfxisrael16 = game.add.audio('israel16'),
        sfxisrael17 = game.add.audio('israel17')
    ];
    
    rndSounds = [
    	sfxisrael12,
    	sfxisrael13,
    	sfxisrael14,
    	sfxisrael15,
    	sfxisrael16,
    	sfxisrael17
    ];
    
    sfxMusic = game.add.audio('music1', 0.7, true);
    sfxMusic2 = game.add.audio('music2', 0.9, true);
    sfxMusic3 = game.add.audio('music3', 0.7, true);
    
    musics = [sfxMusic, sfxMusic2, sfxMusic3];
}

function initAd(){
	admobid = {
      banner: 'ca-app-pub-9795366520625065/2380650752',
      interstitial: 'ca-app-pub-9795366520625065/7119854921'
    };
    
    if(AdMob) AdMob.createBanner({
	    adId: admobid.banner,
	    position: AdMob.AD_POSITION.TOP_CENTER,
    	autoShow: true 
	});
	
	if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );
}