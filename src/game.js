import Mario from './mario';
import Goomba from './goomba';
import Turtle from './turtle';
import Coin from './coin';
import Map from './map';

export default class Game {
    constructor(name, canvasElement, imageTypes, mapData, config) {
        this.name = name || 'Mario Game';
        this.canvasElement = canvasElement;
        this.context = this.canvasElement.getContext('2d');
        this.blockPixel = 40;
        this.rows = 16;
        this.cols = 32;

        this.config = config;

        this.roleList = [];

        this.actionMap = {};

        this.imageTypes = imageTypes;

        this.mapData = mapData;

        this.map = new Map(this, this.mapData);

        this.addRole(this.map);

        this.framerate = 50;

        this.offset = 0;



        this.mario = new Mario(this);//加载马里奥
        this.addRole(this.mario);

        this.drawCoins();//初始化金币的位置


        this.addGoomba();
        this.addTurtle();

        this.setup();

    }

    addGoomba() {
        const time = 400;
        this.addGoombaInterval = setInterval(() => {
            if (this.roleList.length >= 50 || Math.random() * Math.abs(this.map.offset) < time) return;
            const x = Math.random() * 1200 + 40;
            const y = Math.random() * 200;
            const goomba = new Goomba(this, x, y);
            this.addRole(goomba);
        }, 1000)
    }

    addTurtle() {
        const time = 400;
        this.addGoombaInterval = setInterval(() => {
            if (this.roleList.length >= 50 || Math.random() * Math.abs(this.map.offset) < time) return;
            const x = Math.random() * 1200 + 40;
            const y = Math.random() * 200;
            const turtle = new Turtle(this, x, y);
            this.addRole(turtle);
        }, 1000)
    }

    addRole(role) {
        this.roleList.push(role);
    }

    listenAction() {
        const actions = Object.keys(this.actionMap);
        for (let i = 0; i < actions.length; i++) {
            const action = this.actionMap[actions[i]];

            if (action.dispatch) {
                action.eventFunc && action.eventFunc();
            }
        }
    }

    registerAction(key, eventFunc) {
        this.actionMap[key] = {
            key,
            eventFunc,
            dispatch: false
        }
    }

    initEventBind() {
        window.addEventListener('keydown', (e) => {
            const key = e.key;
            this.actionMap[key] && (this.actionMap[key].dispatch = true);
        })

        window.addEventListener('keyup', (e) => {
            const key = e.key;
            this.actionMap[key] && (this.actionMap[key].dispatch = false);
            const keys = ['a', 's', 'w', 'd'];
            if (keys.indexOf(key) != -1) {
                this.map.offsetNum = 0;
            }
        })
    }

    setup() {
        this.initEventBind();

        this.loop();
    }

    loop() {
        if (this.mario.bloodFlow<=0) return;
       
        setTimeout(() => {
            this.update();
            this.draw();

            this.loop();
        }, this.framerate)
    }

    update() {
        this.listenAction();


        this.roleList = this.roleList.filter((role) => {
            role.update && role.update(this.canvasElement);
            return !this.isOutOfGame(role);
        })

    }

    draw() {
        if(this.mario.bloodFlow<=0){
            this.showGameOver();
            return;
        }
        this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        for (let i = 0; i < this.roleList.length; i++) {
            const role = this.roleList[i];
            role.draw && role.draw(this.canvasElement);
        }

        this.drawKillCountsAndCoins()
    }

    isOutOfGame(role) {//检测范围 || 或者血量为0;
        if(role.constructor.name=='Coin' && role.bloodFlow>0) return false;
        if ((role.x + this.canvasElement.width) < 0 || role.x > this.canvasElement.width || role.bloodFlow <= 0) {
            return true;
        } else {
            return false;
        }
    }

    drawKillCountsAndCoins() {
        this.context.font = "18px Verdana";
        this.context.fillStyle = '#f1a22f'
        this.context.fillText('kills：' + this.mario.killCounts, 10, 20)
        this.context.fillText('coins：' + this.mario.coins, 10, 40)
    }

    drawCoins() {
        const coins = this.config.coinPositions;
        for (let i = 0; i < coins.length; i++) {
            const coin = new Coin(this, coins[i][0], coins[i][1]);
            this.addRole(coin);
        }

    }

    showGameOver() {
        clearInterval(this.addGoombaInterval);
        this.roleList = [];
       
        const ctx = this.context;
        const can = this.canvasElement;

        ctx.strokeStyle = '#000';
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(0, 0, can.width, can.height);


        ctx.font = "100px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText('GAME OVER', can.width / 2, can.height / 2 -50);

        ctx.font = "20px Comic Sans MS";
        ctx.fillStyle = "#f1a22f";
        ctx.textAlign = "center";
        ctx.fillText('杀怪数：'+ this.mario.killCounts, can.width / 2, can.height / 2 +50);
        ctx.fillText('金币数：'+this.mario.coins, can.width / 2, can.height / 2 +100);
        
    }

}