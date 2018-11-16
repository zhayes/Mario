class Turtle extends Boilogy {
    constructor(game, x, y) {
        super(game, x, y, 100);
        this.game = game;
        this.x = x;
        this.y = y;
        this.name = 'Turtle';
        this.speed = 4;

        this.direction = -1;

        this.width = this.game.blockPixel;
        this.height = this.width;

        this.width = this.game.blockPixel;
        this.height = this.width;

        this.flys = 4;

        this.actionImgsLeft = [this.game.imageTypes['24'], this.game.imageTypes['25']];
        this.actionImgsRight = [this.game.imageTypes['26'], this.game.imageTypes['27']];


        this.animationAction = new AnimationAction(this.game, this.getImgs(), this.x, this.y, this.width, this.height);

    }

    getImgs(){
        return this.direction == -1 ? this.actionImgsLeft : this.actionImgsRight;
    }


    update(){

        this.flys--;

        if(this.flys<=0){
            if(this.flys<=-6){
                this.flys = 4;
            }else{
                this.y-= 4;
            }
        }else{
            super.update();
        }


        if (super.hasBarrier('right') || super.hasBarrier('left')) {
            this.direction = -1 * this.direction;
        }

        if (this.direction < 0) {
            this.x += (this.speed + this.game.map.offsetNum) * this.direction;
        } else {
            this.x += (this.speed - this.game.map.offsetNum)
        }


        this.animationAction.y = this.y;
        this.animationAction.x = this.x;

        this.animationAction.update();

        this.killMario();

        this.animationAction.actionImgs = this.getImgs();;
    }

    draw() {
        this.animationAction.draw();
    }

    killMario() {
        if (this.isCollsion(this.game.mario)) {
            this.game.mario.bloodFlow = 0;
        }
    }

}