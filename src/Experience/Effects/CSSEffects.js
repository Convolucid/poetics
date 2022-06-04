import Experience from "../Experience";

export default class CSSEffects
{
    constructor()
    {
        this.experience = new Experience()
        this.time = this.experience.time

        if(document.body.animate)
        {

            this.createClouds()
        }



    }

    randInt(min, max) {
        if (max === undefined) {
            max = min;
            min = 0;
        }
        return Math.random() * (max - min) + min | 0;
    }


    createClouds()
    {
        this.title = document.querySelector('#title').getContext('2d')
        this.title.scale(0.25, 1)



        this.title.cloudArray = []
        this.title.cloudArray.total = 400

        for(let i=0; i < this.title.cloudArray.total; i++)
        {
            let cloud = {}
            cloud.radius = this.randInt(10, 50)
            cloud.x = this.randInt(this.title.canvas.width * 4)
            cloud.y = this.randInt(cloud.radius + 50, this.title.canvas.height - (cloud.radius + 50))
            cloud.randomModifier = Math.random() * 10

            this.title.cloudArray.push(cloud)
        }

        this.drawClouds(this.title)

    }

    drawClouds(context2d)
    {
        context2d.clearRect(0, 0, context2d.canvas.width / 0.25, context2d.canvas.height)

        this.title.timeFactor = Math.sin(this.time.elapsed * 0.0005)
        console.log(this.title.timeFactor)
        
        for(let i=0; i < this.title.cloudArray.total; i++)
        {
            const radius = this.title.cloudArray[i].radius
            const x = this.title.cloudArray[i].x + this.title.timeFactor * this.title.cloudArray[i].randomModifier
            const y = this.title.cloudArray[i].y + this.title.timeFactor * this.title.cloudArray[i].randomModifier

            let gradient = context2d.createRadialGradient(x, y, 0, x, y, radius)
            gradient.addColorStop(
                0, 
                'rgba(256,256,256,' 
                    + (Math.abs(this.title.timeFactor) + Math.sin(this.title.cloudArray[i].randomModifier)) 
                    + ')'
                )
            gradient.addColorStop(1, 'rgba(255,255,255, 0.0)')
    
            context2d.fillStyle = gradient
    
            context2d.beginPath();
            context2d.arc(x, y, radius, 0, Math.PI * 2)
            context2d.fill()
        }

    }


    update()
    {
        this.drawClouds(this.title)
    }



}