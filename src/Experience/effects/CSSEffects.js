import Experience from "../Experience";

export default class CSSEffects
{
    constructor()
    {
        this.experience = new Experience()
        this.time = this.experience.time

        if(document.body.animate)
        {
            // Get canvases and 2d contexts
            this.title = document.querySelector('#title').getContext('2d')
            this.article1 = document.querySelector('#article1').getContext('2d')
            this.article2 = document.querySelector('#article2').getContext('2d')
            

            // Attach cloud colors to contexts, leaving alpha option open for drawClouds()
            this.title.color = 'rgb(255, 240, 190,'
            this.article1.color = 'rgb(220, 220, 220,'
            this.article2.color = 'rgb(215, 245, 205,'


            // Toggle loadingComplete to begin animating clouds in update function
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
        context2d.canvas.width = context2d.canvas.getBoundingClientRect().width
        context2d.canvas.height = context2d.canvas.getBoundingClientRect().height
        
        // Create an area factor to adjust radius
        const canvasHeightScalar = context2d.canvas.height / 5

        context2d.cloudArray = []
        const cloudCount = 200

        for(let i=0; i < cloudCount; i++)
        {
            let cloud = {}
            cloud.randomModifier = Math.random() * 10
            cloud.radius = this.randInt(canvasHeightScalar / 5, canvasHeightScalar * 1.5)
            cloud.x = this.randInt(context2d.canvas.width)
            cloud.y = this.randInt(cloud.radius * 2, context2d.canvas.height - (cloud.radius * 2))

            context2d.cloudArray.push(cloud)
        }

        this.drawClouds(context2d)

    }


    resizeClouds(context2d)
    {
        // Gets current canvas height and width, resets it to actual values, and calculates the ratio between the last value and new
        let canvasW = context2d.canvas.width
        let canvasH = context2d.canvas.height

        context2d.canvas.width = context2d.canvas.getBoundingClientRect().width
        context2d.canvas.height = context2d.canvas.getBoundingClientRect().height

        let canvasWidthScalar = context2d.canvas.width / canvasW
        let canvasHeightScalar = context2d.canvas.height / canvasH
        
    
        // Adjust cloud radius and position based on new canvas sizes

        for(let i=0; i < context2d.cloudArray.length; i++)
        {
            let cloud = context2d.cloudArray[i]
            cloud.radius *= canvasHeightScalar
            cloud.x *= canvasWidthScalar
            cloud.y *= canvasHeightScalar
        }
    }

    drawClouds(context2d)
    {
        context2d.clearRect(0, 0, context2d.canvas.width, context2d.canvas.height)

        context2d.timeFactor = Math.sin(this.time.elapsed * 0.0005)

        for(let i=0; i < context2d.cloudArray.length; i++)
        {
            // Draw circle and place it
            const radius = context2d.cloudArray[i].radius
            const x = context2d.cloudArray[i].x + context2d.timeFactor * context2d.cloudArray[i].randomModifier
            const y = context2d.cloudArray[i].y + context2d.timeFactor * context2d.cloudArray[i].randomModifier

            context2d.beginPath();
            context2d.arc(x, y, radius, 0, Math.PI * 2)

            // Create gradient and fill circle
            let radialGradient = context2d.createRadialGradient(x, y, 0, x, y, radius)
            
            
            radialGradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)')
            radialGradient.addColorStop(
                0.5, 
                context2d.color
                    + (Math.abs(context2d.timeFactor) + Math.sin(context2d.cloudArray[i].randomModifier)) 
                    + ')'
            )

            radialGradient.addColorStop(1, context2d.color + '0.0)')

            context2d.fillStyle = radialGradient
            context2d.fill()


        }
    }


    resize()
    {
        this.resizeClouds(this.title)
        this.resizeClouds(this.article1)
        this.resizeClouds(this.article2)
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