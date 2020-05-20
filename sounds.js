//zvuky
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

heliSound = new sound("sounds/helicopter.wav");
gunshot = new sound("sounds/gunshot.mp3")
para_death = new sound("sounds/paratrooper-death.wav")
damage = new sound("sounds/turret-damage.mp3")
gameover_s = new sound("sounds/game_over.wav")
hp_up = new sound("sounds/hp_up.wav")
