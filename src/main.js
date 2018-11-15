(() => {
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


    const config = _config;

    loadImage(config.asset).then((allImages) => {
        const obj = {}
        allImages.map((item)=>{
            obj[item.type] = item;
        })

        __init(obj)
    })

    const __init = (allImages) => {

        const game = new Game('Mario', canvas, allImages, mapData, config)

    }
})()