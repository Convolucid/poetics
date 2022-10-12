import EventEmitter from './EventEmitter.js'

export default class Sizes extends EventEmitter
{
    constructor()
    {
        super()

        // Setup
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        // Media query trigger for phone screens
        if(this.width < 786)
        {
            this.responsiveXS = true
        }
        else
        {
            this.responsiveXS = false
        }

        // Resize event
        window.addEventListener('resize', () => {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)
            
            // Media query trigger for phone screens
            if(this.width < 786)
            {
                this.responsiveXS = true
            }
            else
            {
                this.responsiveXS = false
            }

            this.trigger('resize')
        })

        this.scrollY = window.scrollY

        window.addEventListener('scroll', () => {
            this.scrollY = window.scrollY
            this.trigger('scroll')
        })


    }
}