import Experience from "../Experience";

export default class CSSEffects
{
    constructor()
    {
        this.experience = new Experience()
        this.time = this.experience.time


        if(document.body.animate)
        {
            this.title = document.querySelector('#title').getContext('2d')
            this.title.scale(0.25, 1)
            // this.title.globalCompositeOperation = 'lighter'
            this.drawClouds(this.title)
        }



    }

    randInt(min, max) {
        if (max === undefined) {
            max = min;
            min = 0;
        }
        return Math.random() * (max - min) + min | 0;
    }


    drawClouds(context2d)
    {


        context2d.clearRect(0, 0, context2d.canvas.width / 0.25, context2d.canvas.height)
        for(let i=0; i<70; i++)
        {
            const radius = this.randInt(10, 70)
            const x = this.randInt(context2d.canvas.width * 4)
            const y = this.randInt(radius, context2d.canvas.height - radius)

            let gradient = context2d.createRadialGradient(x, y, 0, x, y, radius)
            gradient.addColorStop(0, 'rgba(256,256,256, 1.0)')
            gradient.addColorStop(1, 'rgba(255,255,255, 0.0)')
    
            context2d.fillStyle = gradient
    
            context2d.beginPath();
            context2d.arc(x, y, radius, 0, Math.PI * 2)
            context2d.fill()

            // context2d.clearRect(x, y, radius, radius)
        }

    }

    moveClouds(context2d)
    {

    }


    update()
    {
        // this.drawClouds(this.title)
    }



}