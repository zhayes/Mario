class Itels{
    constructor(game, x, y, image){
        this.game =game;
        this.x = x;
        this.y = y;
        this.image = image;

        this.width = this.game.blockPixel;
        this.height= this.width;
    }

    update(){
        this.x-= this.game.offset;
    }

    draw(){
        if(this.image && this.x>=-40 && this.x<=1280){
            this.game.context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
}