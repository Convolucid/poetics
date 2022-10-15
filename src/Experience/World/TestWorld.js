import * as THREE from 'three'
import Controls from "../Utils/Controls.js"
import Camera from "../Camera.js"
import Raycaster from "../Raycaster.js"
import Renderer from '../Renderer.js'
import Experience from "../Experience";

export default class World
{
    constructor(canvas, contents)
    {
        this.canvas = canvas
        this.scene = new THREE.Scene()
        this.controls = new Controls();
        this.camera = new Camera();
        this.raycaster = new Raycaster();
        this.renderer = new Renderer(this);
        // this.experience = new Experience();

        console.log()

        this.renderer.debugObject.clearColor = new THREE.Color(0, 0, 0)


        // Scene
        // contents will consist of the different pieces of each individual World
        for(let i = 0; i < contents.length; i++)
        {
            this.scene.add(contents[i])
        }

        this.contents = contents

        // this.scene.add(cube)

    }

    resize()
    {
        this.renderer.resize()
    }

    update()
    {
        this.renderer.update()
        for(let i = 0; i < this.contents.length; i++)
        {
            this.contents[i].update ? this.contents[i].update() : false
        }
    }
}