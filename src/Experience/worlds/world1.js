import Environment from './world1/Environment.js';
import Frame from './world1/Frame.js';
import Subject from './world1/Subject.js'

import './world1/world1.css'
import worldHTML from './world1/world1.html'
import poem1 from './world1/poem1.md'
import poem2 from './world1/poem1.md'

export default async function world1()
{
    const frame = new Frame()
    const subject = new Subject()
    const environment = new Environment()

    await subject.load()

    const world1 = [
        frame.mesh,
        subject.model,
        environment.sunLight
    ]

    world1.html = document.createElement('div')
    world1.html.classList.add('container')
    world1.html.innerHTML = worldHTML

    document.body.appendChild(world1.html)

    const article1 = document.getElementById('poem1')
    article1.innerHTML = poem1
    const article2 = document.getElementById('poem2')
    article2.innerHTML = poem2

    world1.enableWorld = () => {
        world1.html.classList.remove('z-control-background')
        world1.html.classList.add('z-control-foreground')      
    }

    world1.disableWorld = () => {
        world1.html.classList.remove('z-control-foreground')
        world1.html.classList.add('z-control-background')
    }

    return world1;
}