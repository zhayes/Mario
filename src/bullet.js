import AnimationAction from './animationAction';

export default  class Bullet{
    constructor(game,imageList, x, y, direction, fireName, killability){
        this.game = game;
        this.direction = direction // 1是向右， -1向左
        this.x = x;
        this.y = y;
        this.a = 5;//加速度
        this.v = 1; //速度
        this.fireName = fireName  //发射者的名字
        this.killability = killability || 100; //子弹杀伤力;
        this.width = 15;
        this.height = 15;
        this.imageList= imageList;
        this.context = this.game.context;

        this.bloodFlow = 1;

        this.animationAction = new AnimationAction(this.game, this.imageList, this.x, this.y, this.height);
    }

    update(){
        this.animationAction.update();
        this.kill();

        this.v+=this.a;
        this.x += (this.v*this.direction);

        this.animationAction.x = this.x;
        
        this.a-= 0.4;
        
        this.a = this.a<=0 ? 0 : this.a;

    }

    draw(){
        this.animationAction.draw();
    }


    kill(){
        const roleList = this.game.roleList;
        for(let i=0; i<roleList.length; i++){
            const role = roleList[i];
         
            if(role.constructor.name!=Bullet && this.isCollsion(role) && role.name!=undefined && role.name!=this.fireName){
                role.bloodFlow-=this.killability;
                this.bloodFlow = 0;
                this.game.mario.killCounts++;
                continue;
            }
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