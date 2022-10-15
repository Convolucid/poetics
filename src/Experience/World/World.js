import Experience from "../Experience";
import Environment from './Environment.js';
import Frame from './Frame.js';
import Subject from './Subject.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources


        // Setup
        this.frame = new Frame()
        this.subject = new Subject()
        this.environment = new Environment()



    }

    resize()
    {
        this.subject.resize()
    }

    scroll()
    {
        this.frame.scroll()
        this.subject.scroll()
    }

    update()
    {
        if(this.subject)
        {
        this.subject.update()
        }

        if(this.frame)
        {
        this.frame.update()
        }
    }
}