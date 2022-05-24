import Experience from "../Experience";
import Environment from './Environment.js';
import Frame from './Frame';
import Subject from './Subject.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resources.on('ready', () =>
        {
            // Setup
            this.frame = new Frame()
            this.subject = new Subject()
            this.environment = new Environment()



            // console.log(this.experience.raycaster.raycastObjects)
        })


    }

    update()
    {
        if(this.subject)
        {
        this.subject.update()
        }
    }
}