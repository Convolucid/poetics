export default class Time
{
    constructor()
    {

        // Setup
        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 6
        
    }

    update()
    {
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start

        // console.log(this.delta, this.current, this.elapsed)
    }


}