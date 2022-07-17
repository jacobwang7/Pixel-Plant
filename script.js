const waterBtn = document.getElementById('water-btn');
let dateNum = 0;
let consecutiveNum = 0;
const getData = async () => {
    try {
        const response = await axios.get('http://localhost:8000/plant/62d1c1bb14642d27e7852668');
        if(response) {
            const plant = response.data;
            console.log(plant.data);
            dateNum = plant.data.lastWatered;
            consecutiveNum = plant.data.consecutive;
            if(plant.data.watered == false) {
                const canvas = document.getElementById("canvas");
                const ctx = canvas.getContext("2d");
                const CANVAS_WIDTH = canvas.width = window.innerWidth;
                const CANVAS_HEIGHT = canvas.height = window.innerHeight;
                const saplingSpriteSheet = new Image();
                saplingSpriteSheet.src = "saplingspritesheet.png";

                let spriteWidth = 100;
                let srcX = 0;

                let frame = 0;
                let framesDrawn = 10;

                function animate() {
                    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                    ctx.drawImage(saplingSpriteSheet, srcX * spriteWidth, 0, 100, 100, CANVAS_WIDTH/2 - 50, CANVAS_HEIGHT/2 - 50, 100, 100);
                    if (frame % framesDrawn == 0) {
                        if (srcX < 3) {
                            srcX++;
                        } else {
                            srcX = 0;
                        } 
                    }
                    frame++;
                    requestAnimationFrame(animate);
                };
                animate();
            } else if(plant.data.watered == true){
                const canvas = document.getElementById("canvas");
                const ctx = canvas.getContext("2d");
                const CANVAS_WIDTH = canvas.width = window.innerWidth;
                const CANVAS_HEIGHT = canvas.height = window.innerHeight;
                const saplingSpriteSheet = new Image();
                saplingSpriteSheet.src = "wateredsaplingspritesheet.png";

                let spriteWidth = 100;
                let srcX = 0;

                let frame = 0;
                let framesDrawn = 10;

                function animate() {
                    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                    ctx.drawImage(saplingSpriteSheet, srcX * spriteWidth, 0, 100, 100, CANVAS_WIDTH/2 - 50, CANVAS_HEIGHT/2 - 50, 100, 100);
                    if (frame % framesDrawn == 0) {
                        if (srcX < 5) {
                            srcX++;
                        } else {
                            srcX = 0;
                        } 
                    }
                    frame++;
                    requestAnimationFrame(animate);
                };
                animate();
            }
        }
    } catch (err) {
        console.log(err)
    }
};

const waterPlant = async () => {
    try {
        let today = new Date();
        today = Date.parse(today)
        const oneDay =  1000 * 60 * 60 * 24; 
        
        if(today-dateNum >= oneDay && today-dateNum < 2 * oneDay) {
            newUpdate = {
                "name": "Jake's Plant",
                "watered": true,
                "lastWatered": today,
                "consecutive": consecutiveNum + 1
            }
        } else if(today-dateNum < oneDay) {
            newUpdate = {
                "name": "Jake's Plant",
                "watered": true,
                "lastWatered": today,
                "consecutive": consecutiveNum
            }
        } else {
            newUpdate = {
                "name": "Jake's Plant",
                "watered": true,
                "lastWatered": today,
                "consecutive": 1
            }
        }

        const resp = await axios.patch('http://localhost:8000/watered_plant/62d1c1bb14642d27e7852668', newUpdate);
        if(resp) {
            console.log(resp.data);
            getData();
        }
    } catch (err) {
        console.log(err)
    }
}

getData()
waterBtn.addEventListener('click', waterPlant);
