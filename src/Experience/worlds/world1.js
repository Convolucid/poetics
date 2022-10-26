import gsap from 'gsap'

import Environment from './world1/Environment.js';
import Frame from './world1/Frame.js';
import Subject from './world1/Subject.js'

import './world1/world1.css'
import worldHTML from './world1/world1.html'
import poem1 from './world1/poem1.md'
import poem2 from './world1/poem2.md'

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

    world1.raycastObjects = []

    for(let i = 0; i < subject.meshArray.length; i++)
    {
        subject.meshArray[i].clickHandler = () => {
            console.log(subject.meshArray[i])
        }
        subject.meshArray[i].intersectHandler = async (raycaster) => {
            // Set up unique rotation function that calculates mouse trajectory and spins accordingly
            const trajectory = await getMouseTrajectory(raycaster.controls)

            letterMovement(trajectory, subject.meshArray[i])
            
        }
        world1.raycastObjects.push(subject.meshArray[i])
    }

    async function getMouseTrajectory(vector2) {
        // Get initial position and remove negative values
        const trajectory = {
            x: vector2.x,
            y: vector2.y,
            z: 0
        }

        return new Promise((resolve) => {
            setTimeout(() => {
                trajectory.x -= vector2.x;
                trajectory.y -= vector2.y;
                trajectory.z = (trajectory.x, trajectory.y) / 2
                resolve(trajectory)
            }, 50)
        })
    }

    function letterMovement(trajectory, letter)
    {
        gsap.to(
            letter.rotation,
            {
                duration: 0.5,
                ease: 'expo.out',
                overwrite: true,
                x: '+=' + trajectory.y * 20,
                y: '-=' + trajectory.x * 5,
                z: '+=' + trajectory.z * 20,
            }
        )
    }



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

    world1.scroll = () => {

    }



    return world1;
}