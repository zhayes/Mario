const tilesPath = 'asset/tiles/ground/';
const bigMarioPath = 'asset/characters/big/';
const smallMarioPath = 'asset/characters/small/';

const goomba = 'asset/characters/'

const _config = {
    asset:{
        //地图对应的材料图片地址
        1: tilesPath + 'bricks.bmp',
        2: tilesPath + 'bricks2.bmp',
        3: tilesPath + 'cloud.bmp',
        4: tilesPath + 'grass.bmp',
        5: tilesPath + 'metal.bmp',
        6: tilesPath + 'sand.bmp',
        7: tilesPath + 'snowy.bmp',

        //马里奥动作图片地址

        //大人
        //往右走动画
        8: bigMarioPath + 'player1r.png',
        9: bigMarioPath + 'player2r.png',
        10: bigMarioPath + 'player3r.png',

        //往左走动画
        11: bigMarioPath + 'player1l.png',
        12: bigMarioPath + 'player2l.png',
        13: bigMarioPath + 'player3l.png',

        //小孩
        // 14: smallMarioPath + 'player1r.png',
        // 15: smallMarioPath + 'player2r.png',
        // 16: smallMarioPath + 'player3r.png',

        //往左走动画
        // 17: smallMarioPath + 'player1l.png',
        // 18: smallMarioPath + 'player2l.png',
        // 19: smallMarioPath + 'player3l.png'

        //goomba
        20: goomba + 'goomba1.png',
        21: goomba + 'goomba2.png',


        //马里奥的子弹
        31: 'asset/fire1.png',
        32: 'asset/fire2.png',
        33: 'asset/fire3.png',
        34: 'asset/fire4.png',

        //资源道具
        //金币
        41: 'asset/bonus/coin1.png',
        42: 'asset/bonus/coin2.png',
        43: 'asset/bonus/coin3.png',
        44: 'asset/bonus/coin4.png',
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
        [1500,500]
    ]
}