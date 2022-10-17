import Environment2 from './Environment.js';
import Frame2 from './Frame.js';
import Subject2 from './Subject.js'

export default async function world1()
{
    const frame = new Frame2()

    const subject = new Subject2()
    const environment = new Environment2()

    await subject.load()

    const world1 = [
        frame.mesh,
        subject.model,
        environment.sunLight
    ]

    return world1;
}