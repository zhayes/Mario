import Game from './src/game';
import config from './src/config';
import mapData from './src/mapData';

const canvas = document.querySelector('#can');

const loadImage = (srcMap) => {
    return new Promise((resolve) => {

        const imgsRequest = [];

        Object.keys(srcMap).map((type) => {

            imgsRequest.push(
                new Promise((resolve, reject) => {
                    const img = new Image();

                    img.onload = () => {
                        resolve({
                            type,
                            img,
                            path: img.src
                        });

                    }

                    img.src = srcMap[type];
                })
            )
        })

        Promise.all(imgsRequest).then((images) => {
            resolve(images)
        })
    })
}

const __init = (allImages) => {
    const game = new Game('Mario', canvas, allImages, mapData, config)
}


//加载完图片后，游戏初始化；
loadImage(config.asset).then((allImages) => {
    const obj = {}
    allImages.map((item) => {
        obj[item.type] = item;
    })

    __init(obj)
})
