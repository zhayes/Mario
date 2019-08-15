
//砖块图片类型
const brick1 = require('../asset/tiles/ground/bricks.bmp');
const brick2 = require('../asset/tiles/ground/bricks2.bmp');
const brick3 = require('../asset/tiles/ground/cloud.bmp');
const brick4 = require('../asset/tiles/ground/grass.bmp');
const brick5 = require('../asset/tiles/ground/bricks.bmp');
const brick6 = require('../asset/tiles/ground/sand.bmp');
const brick7 = require('../asset/tiles/ground/snowy.bmp');


//mario动作图片
const mario8 = require('../asset/characters/big/player1r.png');
const mario9 = require('../asset/characters/big/player2r.png');
const mario10 = require('../asset/characters/big/player3r.png');
const mario11 = require('../asset/characters/big/player1l.png');
const mario12 = require('../asset/characters/big/player2l.png');
const mario13 = require('../asset/characters/big/player3l.png');


//蘑菇动作图片
const goomba1 = require('../asset/characters/goomba1.png');
const goomba2 = require('../asset/characters/goomba2.png');


//乌龟动作图片
const turtle1 = require('../asset/characters/turtle/flyl1.png');
const turtle2 = require('../asset/characters/turtle/flyl2.png');
const turtle3 = require('../asset/characters/turtle/flyr1.png');
const turtle4 = require('../asset/characters/turtle/flyr2.png');


//子弹图片
const bullet1 = require('../asset/fire1.png');
const bullet2 = require('../asset/fire2.png');
const bullet3 = require('../asset/fire3.png');
const bullet4 = require('../asset/fire4.png');

//金币图片
const coin1 = require('../asset/bonus/coin1.png');
const coin2 = require('../asset/bonus/coin2.png');
const coin3 = require('../asset/bonus/coin3.png');
const coin4 = require('../asset/bonus/coin4.png');

const _config = {
    asset:{
        //地图对应的材料图片地址
        1: brick1,
        2: brick2,
        3: brick3,
        4: brick4,
        5: brick5,
        6: brick6,
        7: brick7,

        //马里奥动作图片地址

        //大人
        //往右走动画
        8: mario8,
        9: mario9,
        10: mario10,

        //往左走动画
        11: mario11,
        12: mario12,
        13: mario13,

        //goomba
        20: goomba1,
        21: goomba2,
        //tumple left
        24: turtle1,
        25: turtle2,
        //right
        26: turtle3,
        27: turtle4,

        //马里奥的子弹
        31: bullet1,
        32: bullet2,
        33: bullet3,
        34: bullet4,

        //资源道具
        //金币
        41: coin1,
        42: coin2,
        43: coin3,
        44: coin4
    },
    coinPositions:[
        [1000,400],
        [1040,400],
        [1080,400],
        [1120,400],
        [1160,400],
        [1200,400],
        [1300,500],
        [1340,500],
        [1380,500],
        [1420,500],
        [1460,500],
        [1500,500],

        [2000,400],
        [2040,400],
        [2080,400],
        [2120,400],
        [2160,400],
        [2200,400],
        [3300,500],
        [3340,500],
        [3380,500],
        [3420,500],
        [3460,500],
        [3500,500]
    ]
}

export default _config;