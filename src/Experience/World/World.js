import * as THREE from 'three'
import Controls from "../Utils/Controls.js"
import Camera from "../Camera.js"
import Raycaster from "../Raycaster.js"
import Renderer from '../Renderer.js'

export default class World
{
    constructor(canvas, contents)
    {
        this.canvas = canvas
        this.scene = new THREE.Scene()
        this.camera = new Camera(this);
        this.controls = new Controls(this);
        this.raycaster = new Raycaster(this);
        this.renderer = new Renderer(this);

        this.renderer.debugObject.clearColor = new THREE.Color(0, 0, 0)


        // Scene
        // contents will consist of the different pieces of each individual World
        for(let i = 0; i < contents.length; i++)
        {
            this.scene.add(contents[i])
        }

        this.contents = contents
    }

    scroll()
    {
        for(let i = 0; i < this.contents.length; i++)
        {
            this.contents[i].scroll ? this.contents[i].scroll() : false
        }
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
        for(let i = 0; i < this.contents.length; i++)
        {
            this.contents[i].resize ? this.contents[i].resize() : false
        }
    }

    update()
    {
        this.camera.update()
        this.renderer.update()
        for(let i = 0; i < this.contents.length; i++)
        {
            this.contents[i].update ? this.contents[i].update() : false
        }
    }
}