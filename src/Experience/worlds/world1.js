import gsap from 'gsap'

import Environment from './world1/Environment.js';
import Frame from './world1/Frame.js';
import Subject from './world1/Subject.js'
import Door from '../utils/Door.js'
import Label from '../utils/Label.js'

import './world1/world1.css'
import worldHTML from './world1/world1.html'
import poem1 from './world1/poem1.md'
import poem2 from './world1/poem2.md'

export default async function world1()
{
    const frame = new Frame()
    const subject = new Subject()
    const environment = new Environment()
    const door = new Door(0.008)
    const label1 = new Label(72, 'oh, a door', 'white');


    await subject.load()

    const world1 = [
        frame.mesh,
        subject.model,
        environment.sunLight,
        door.instance,
        label1.instance
    ]

    door.instance.position.y = -70;
    door.instance.position.z = -20;
    door.instance.rotation.z = 1.5;

    label1.instance.position.x = 3;
    label1.instance.position.y = -70;
    label1.instance.position.z = -16;


    world1.raycastObjects = []

    world1.raycastObjects.push(door.instance)

    // Click function on background mesh resets original orientation of letters
    frame.mesh.clickHandler = () => {
        for(let i = 0; i < subject.meshArray.length; i++){
            // Complex OR conditional is because the specific imported model has odd rotation values in some of the meshes
            if(i == 0 || i == 5 || i == 7 || i == 9 || i ==11)
            {
                gsap.to(subject.meshArray[i].rotation,
                    {
                        duration: 1,
                        x: 0,
                        y: -1.59,
                        z: 0
                    })
            } else {
                gsap.to(subject.meshArray[i].rotation,
                    {
                        duration: 1,
                        x: 0,
                        y: 0,
                        z: 0
                    })
            }
        }
    }
    world1.raycastObjects.push(frame.mesh)

    // For loop adds intersect functions that moves letters based on mouse direction and speed
    for(let i = 0; i < subject.meshArray.length; i++)
    {
        subject.meshArray[i].clickHandler = () => {
            console.log(subject.meshArray[i].rotation)
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
        world1.html.classList.remove('z-control-background', 'disable-pointer-events')
        world1.html.classList.add('z-control-foreground')     
    }

    world1.disableWorld = () => {
        world1.html.classList.remove('z-control-foreground')
        world1.html.classList.add('z-control-background', 'disable-pointer-events')   
    }

    world1.scroll = () => {

    }

    return world1;
}