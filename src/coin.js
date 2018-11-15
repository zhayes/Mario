class Coin{
    constructor(game, x, y){
        this.game = game;
        this.x = x;
        this.y = y;
        this.bloodFlow = 1;
        this.actionImageList = [
            this.game.imageTypes['41'],
            this.game.imageTypes['42'],
            this.game.imageTypes['43'],
            this.game.imageTypes['44']
        ];

        this.width = this.game.blockPixel;
        this.height =this.width;

        this.animationAction = new AnimationAction(this.game, this.actionImageList, this.x, this.y);
    }

    update(){
        const mario = this.game.mario;
        this.x -= this.game.map.offsetNum;
        this.animationAction.x = this.x

        this.animationAction.update();
        if( mario && mario.name=='Mario'){
            
            if(this.isCollsion(mario)){
                mario.coins +=1;
                this.bloodFlow = 0;
            }
        }
    }

    draw(){
        if(this.bloodFlow>0){
            this.animationAction.draw();
        }
    }

    isCollsion(role){
        if(role.bloodFlow<=0) return false;
        const x = this.x;
        const y = this.y;
        const rx = role.x;
        const ry = role.y;
       
        if(x>=rx && x<=rx+role.width){
            if(y>=ry && y<=ry+role.height){
                return true;
            }
        }

        if(rx>=x && rx<=x+this.width){
            if(ry>=y && ry<=y+this.height){
                return true;
            }
        }

        return false;
    }
}