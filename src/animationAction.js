class AnimationAction{
    constructor(game, actionImgs, x, y, width, height){
        this.actionImgs = actionImgs || [];
        this.game = game;
        this.x = x;
        this.y = y;
        this.actionIndex = 0;

        this.width = width || this.game.blockPixel;
        this.height = height || this.width;

        this.rate = 2;
    }

    draw(){
        const img = this.actionImgs[this.actionIndex].img;
        if(!img) return;
        const context = this.game.context;
        const x = this.x;
        const y = this.y;
        context.drawImage(img, x, y, this.width, this.height);
    }

    update(){
        this.rate -=1;
        if(this.rate<0) this.rate = 2;

        if(this.rate!=0) return;

       
        this.actionIndex+=1;
       
        if(this.actionIndex >= this.actionImgs.length){
            this.actionIndex = 0;
        }
    }
}