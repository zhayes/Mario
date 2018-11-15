class Map {
    constructor(game, mapData) {
        this.game = game;
        this.map = mapData;

        this.cols = this.game.cols;
        this.rows = this.game.rows;

        this.itelsWidth = this.game.blockPixel;
        this.itelsHeight = this.itelsWidth;

        this.imageTypes = this.game.imageTypes;

        this.offset = 0;//偏移量

        this.offsetNum = 0;

    }

    draw(){
        if(this.offset>0) this.offset = 0;
        let startIndex = (Math.floor(Math.abs(this.offset/40)))* this.rows;
        if(startIndex<0){
            startIndex = Math.abs(startIndex);
        }

        const endIndex = startIndex + (this.cols+1)*this.rows;

        
        for(let i=startIndex; i< endIndex; i++){

            const col = i%16;
            const row = Math.floor(i/16);
            const type = this.map[i];
            const image = type ? this.imageTypes[type].img : undefined;

            const pixelX = row*this.itelsWidth + this.offset;
            const pixelY = col*this.itelsHeight;

            
            if(image){
                this.drawItel(image, pixelX, pixelY, this.itelsWidth, this.itelsHeight);
            }
        }
    }

    scrollFront(){
        return this.offset>0;
    }

    scrollEnd(){
        return  this.offset <= ( this.game.canvasElement.width - (this.map.length/this.game.rows) * this.game.blockPixel);
    }

    update(){
        this.offset-=this.offsetNum;

        if(this.scrollFront()) this.offset = 0;//如果滚到了最左边则不予滚动
        //如果滚到了最右边则不予滚动
        if(this.scrollEnd()){
            this.offset = this.game.canvasElement.width- ((this.map.length/16) *40);
        }
    }

    drawItel(image, x, y, w, h){
        this.game.context.drawImage(image, x, y, w, h);
    }

}