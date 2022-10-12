import * as THREE from 'three'
import Experience from "../Experience";
import EventEmitter from './EventEmitter.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


export default class Controls extends EventEmitter
{
    constructor()
    {
        super()

        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.camera = this.experience.camera.instance
        this.canvas = this.experience.canvas

        this.instance = new THREE.Vector2()

        window.addEventListener('mousemove', (event) =>
        {
            this.instance.x = event.clientX / this.sizes.width * 2 -1;
            this.instance.y = - (event.clientY / this.sizes.height * 2 -1)

        })

        this.orbit = new OrbitControls(this.camera, this.canvas)


    }
}