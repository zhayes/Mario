export default class Boilogy{
    constructor(game, x, y, bloodFlow){
        this.x = x;
        this.y = y;
        this.game = game;
        this.bloodFlow = bloodFlow || 100;
        this.g = 2;
        this.vy=0;
        this.width = this.game.blockPixel;
        this.height = this.width;
        this.speed = 4;
        this.direction = -1;
    }

    getGravityControl(){
        this.gravity+=0.4
        this.y += this.g

        if(!this.hasBarrier('bottom')){
            this.y = this.y + this.g;
        }else{
            this.y = Math.floor(this.y/this.game.blockPixel)*this.game.blockPixel;
            this.g = 2;
        }
    }

    update(){
        this.gravity+=0.4
        this.y += 10

        if(this.hasBarrier('top')){
            this.yv=0;
        }

        this.getGravityControl();//每个生物都受重力作用；

    }


    hasBarrier(direction){
        const x = this.x;
        const y = this.y;

        //地图无偏移情况下，马里奥x，y坐标点位于地图的row行，col列
        const col = Math.floor(x/this.game.blockPixel);
        const row = Math.floor(y/this.game.blockPixel);

        //偏移了多少列
        const offsetCol = Math.floor(Math.abs(this.game.map.offset)/40);

        const mapData = this.game.map.map;

        const letTopBlockIndex = (col+offsetCol)*this.game.rows+row;//左上角顶部
        const rightTopBlockIndex = (col+offsetCol+1)*this.game.rows+row;//右上角顶部

        const letBottomBlockIndex = (col+offsetCol)*this.game.rows+row+(this.height/this.game.blockPixel);//左下角顶部
        const rightBottomBlockIndex = (col+offsetCol+1)*this.game.rows+row+(this.height/this.game.blockPixel);//右下角顶部

        const leftTopLeftBlockIndex = Math.abs(col+offsetCol)*this.game.rows+row;//左边
        const leftBottomLeftBlockIndex = (col+offsetCol)*this.game.rows+row+ (this.height/this.game.blockPixel)-1;

        const rightTopRightBlockIndex = (col+offsetCol+1)*this.game.rows+row;//右边
        const rightBottomRightBlockIndex = (col+offsetCol+1)*this.game.rows+row+ (this.height/this.game.blockPixel)-1;

        

        switch(direction){
            case 'top':
                return mapData[letTopBlockIndex]!=0 || mapData[rightTopBlockIndex]!=0;
            case 'bottom':
                return mapData[letBottomBlockIndex]!=0 || mapData[rightBottomBlockIndex]!=0;
            case 'left':
                return mapData[leftTopLeftBlockIndex]!=0 || mapData[leftBottomLeftBlockIndex]!=0;
            case 'right':
                return mapData[rightTopRightBlockIndex]!=0 || mapData[rightBottomRightBlockIndex]!=0;

        }
    }

    fire(bullet){
        this.game.addRole(bullet);
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