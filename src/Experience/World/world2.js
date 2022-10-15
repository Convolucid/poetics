import * as THREE from 'three'
import Environment from './Environment.js';
import Frame2 from './Frame2.js';
import Subject from './Subject.js'

export default function world2()
{
    const frame = new Frame2()
    
    // console.log(frame)
    // const subject = new Subject()
    // const environment = new Environment()
    
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial()
    
    const cube = new THREE.Mesh(geometry, material);
    
    const world2 = [
        cube,
        frame.mesh
        // frame,
        // subject,
        // environment
    ]
    
    cube.update = function()
    {
        cube.rotation.x += 0.001
        cube.rotation.y -= 0.001
    }

    return world2;
}