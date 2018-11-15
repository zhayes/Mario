class Mario extends Boilogy {
    constructor(game, x, y) {
        super(game, x, y);
        this.game = game;
        this.name = 'Mario';
        this.lifeCounts = 3;
        this.isLittleBoy = 0;
        this.direction = 1;

        this.speed = 8;
        this.coins = 0;//金币数；
        this.killCounts = 0;//杀死的怪物数量

        this.x = x || 80;
        this.y = y || 520;

        this.yv = 0//起跳加速度

        this.mapScrollInstance = 600;

        this.g = 3;//重力加速度

        this.fireTime = 8//开火频率

        this.fireColdTime = 0//还剩多少冷却频率

        this.width = this.game.blockPixel;
        this.height = this.game.blockPixel * 2;

        this.actionsImgTypeMap = {
            left: {
                big: [this.game.imageTypes['8'], this.game.imageTypes['9'], this.game.imageTypes['10']],
                small: [this.game.imageTypes['14'], this.game.imageTypes['15'], this.game.imageTypes['16']]
            },
            right: {
                big: [this.game.imageTypes['11'], this.game.imageTypes['12'], this.game.imageTypes['13']],
                small: [this.game.imageTypes['17'], this.game.imageTypes['18'], this.game.imageTypes['19']]
            }
        }

        this.directionAction = {
            '1': 'left',
            '-1': 'right',
        }

        this.actionType = {
            jump: false
        }

        this.bulletImgs = [
            this.game.imageTypes['31'],
            this.game.imageTypes['32'],
            this.game.imageTypes['33'],
            this.game.imageTypes['34']
        ]

        this.setup();
    }

    setup() {

        const images = this.getImages();

        this.animationAction = new AnimationAction(this.game, images, this.x, this.y, this.width, this.height);

        this.initActionEvents();
    }

    getImages() {
        const action = this.directionAction[this.direction];

        const status = this.isLittleBoy ? 'small' : 'big';

        const images = this.actionsImgTypeMap[action][status];

        return images;
    }


    initActionEvents() {//绑定键盘按键
        this.game.registerAction('a', () => {
            this.direction = -1
            this.move(this.direction);
        })

        this.game.registerAction('d', () => {
            this.direction = 1
            this.move(this.direction)
        })

        this.game.registerAction('w', () => {
            if (this.actionType.jump) return;
            this.yv = -25;
            this.actionType.jump = true;
        })

        this.game.registerAction('j', () => {
            if (this.fireColdTime != 0 || this.bloodFlow<=0) return;
            this.fireColdTime = this.fireTime;
            const bullet = new Bullet(this.game, this.bulletImgs, this.x + (this.width / 2), this.y + (this.height / 2) + 10, this.direction, this.name);
            this.fire(bullet);
        })
    }

    move(direction) {

        if (direction > 0) {//往右
            if (this.hasBarrier('right')) {
                this.game.map.offsetNum = 0;
            } else {
                if (this.x <= this.mapScrollInstance || this.game.map.scrollEnd()) {
                    this.x += this.speed;
                    this.game.map.offsetNum = 0;
                } else {
                    this.game.map.offsetNum = this.speed;
                }
            }

        } else if (direction < 0) {//往左
            if (this.hasBarrier('left')) {
                this.game.map.offsetNum = 0;
            } else {
                if (this.game.map.offset == 0 || this.game.map.scrollEnd()) {
                    this.x -= this.speed;
                    if (this.x <= 0) {
                        this.x = 0;
                    }
                } else {

                    this.game.map.offsetNum = -this.speed;


                }
            }

        }

        this.animationAction.actionImgs = this.getImages();//根据不同的方向切换马里奥走动方向的图片

    }



    update() {
        this.fireColdTime--;//消耗开火冷却时间
        this.fireColdTime = this.fireColdTime <= 0 ? 0 : this.fireColdTime;

        if (this.yv < 0) {

            if (this.hasBarrier('top')) {
                this.yv = 0;
            } else {
                this.yv += 1.6;
                this.y += this.yv;
            }


        } else {
            this.g += 2
            if (this.g > 15) this.g = 15;
            if (!this.hasBarrier('bottom')) {
                this.y = this.y + this.g;
            } else {
                this.y = Math.floor(this.y / this.game.blockPixel) * 40;
                this.actionType.jump = false;
                this.g = 1;
            }
        }


        this.animationAction.x = this.x;
        this.animationAction.y = this.y;

        this.animationAction.update();

        if(this.y>this.game.canvasElement.height){
            this.bloodFlow=0;
        }

    }

    draw() {
        this.animationAction.draw();
    }

}