import Environment2 from './Environment2.js';
import Frame2 from './Frame2.js';
import Subject2 from './Subject2.js'

export default async function world1()
{
    const frame = new Frame2()
    

    const subject = new Subject2()
    const environment = new Environment2()


    


    await subject.load()

    const world1 = [
        frame.mesh,
        subject.model,
        // environment
    ]

    console.log(world1)






    

    

    return world1;
}