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
            this.article1 = document.querySelector('#article1').getContext('2d')
            this.article2 = document.querySelector('#article2').getContext('2d')

            this.loadingComplete = false;
            
            window.addEventListener('load', (event) =>
            {
                this.createClouds(this.title)
                this.createClouds(this.article1)
                this.createClouds(this.article2)
                this.loadingComplete = true;
            })

        }



    }

    randInt(min, max) {
        if (max === undefined) {
            max = min;
            min = 0;
        }
        return Math.random() * (max - min) + min | 0;
    }


    // Need to create clouds with an adaptive count and radius depending on canvas-width and height, also with a color variable
    createClouds(context2d)
    {
        // context2d.scale(0.5, 1)

        context2d.cloudArray = []
        context2d.cloudArray.total = 300

        const canvasW = context2d.canvas.getBoundingClientRect().width
        const canvasH = context2d.canvas.getBoundingClientRect().height

        console.log(canvasW, canvasH)

        for(let i=0; i < context2d.cloudArray.total; i++)
        {
            let cloud = {}
            cloud.radius = this.randInt(10, 50)
            cloud.x = this.randInt(context2d.canvas.width * 2)
            cloud.y = this.randInt(cloud.radius + 50, context2d.canvas.height - (cloud.radius + 50))
            cloud.randomModifier = Math.random() * 10

            console.log(canvasW, canvasH)
            context2d.cloudArray.push(cloud)
        }

        this.drawClouds(context2d)

    }

    drawClouds(context2d)
    {
        context2d.clearRect(0, 0, context2d.canvas.width / 0.5, context2d.canvas.height)

        context2d.timeFactor = Math.sin(this.time.elapsed * 0.0005)
        
        for(let i=0; i < context2d.cloudArray.total; i++)
        {
            const radius = context2d.cloudArray[i].radius
            const x = context2d.cloudArray[i].x + context2d.timeFactor * context2d.cloudArray[i].randomModifier
            const y = context2d.cloudArray[i].y + context2d.timeFactor * context2d.cloudArray[i].randomModifier

            let gradient = context2d.createRadialGradient(x, y, 0, x, y, radius)
            gradient.addColorStop(
                0, 
                'rgba(256,256,256,' 
                    + (Math.abs(context2d.timeFactor) + Math.sin(context2d.cloudArray[i].randomModifier)) 
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
        if(this.loadingComplete === true)
        {
            this.drawClouds(this.title)
            this.drawClouds(this.article1)
            this.drawClouds(this.article2)
        }

    }



}