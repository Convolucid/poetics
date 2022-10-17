import * as THREE from 'three'

import Frame from './Frame.js';


export default async function world2()
{
    const frame = new Frame()
    
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