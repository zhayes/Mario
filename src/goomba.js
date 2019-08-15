import Boilogy from './biology';
import AnimationAction from './animationAction';

export default class Goomba extends Boilogy {
    constructor(game, x, y) {
        super(game, x, y, 100);
        this.game = game;
        this.x = x;
        this.y = y;
        this.name = 'Goomab';
        this.speed = 4;

        this.direction = -1;

        this.width = this.game.blockPixel;
        this.height = this.width;

        this.width = this.game.blockPixel;
        this.height = this.width;

        this.actionImgs = [this.game.imageTypes['20'], this.game.imageTypes['21']]

        this.animationAction = new AnimationAction(this.game, this.actionImgs, this.x, this.y, this.width, this.height);
    }


    update() {

        super.update();


         if(super.hasBarrier('right') || super.hasBarrier('left')){
            this.direction = -1*this.direction;
        }

        if(this.direction<0){
            this.x += (this.speed+this.game.map.offsetNum)*this.direction;
        }else{
            this.x += (this.speed-this.game.map.offsetNum)
        }

       
        this.animationAction.y = this.y;
        this.animationAction.x = this.x;

        this.animationAction.update();

        this.killMario();
    }

    draw() {
        this.animationAction.draw();
    }

    killMario(){
        if(this.isCollsion(this.game.mario)){
            this.game.mario.bloodFlow = 0;
        }
    }

}