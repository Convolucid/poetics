import * as THREE from 'three'
import Experience from "../Experience";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


export default class Controls
{
    constructor(world)
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        // this.camera = this.experience.camera.instance
        // this.canvas = this.experience.canvas

        if(world) {
            this.canvas = world.canvas
            this.camera = world.camera.instance
        } else {
            this.canvas = this.experience.canvas
            this.camera = this.experience.camera.instance
        }

        this.instance = new THREE.Vector2()

        window.addEventListener('mousemove', (event) =>
        {
            this.instance.x = event.clientX / this.sizes.width * 2 -1;
            this.instance.y = - (event.clientY / this.sizes.height * 2 -1)

        })

        this.orbit = new OrbitControls(this.camera, this.canvas)
    }
}