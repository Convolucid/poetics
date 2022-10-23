import * as THREE from 'three'
import Controls from "./utils/Controls.js"
import Camera from "./Camera.js"
import Raycaster from "./Raycaster.js"
import Renderer from './Renderer.js'

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
        this.active = false;
    }

    changeWorld(){
        if(this.active == true)
        {
            this.contents.enableWorld ? this.contents.enableWorld() : false
            this.canvas.classList.replace(
                "z-bottom-canvas",
                "z-top-canvas"
            );
        } else {
            this.contents.disableWorld ? this.contents.disableWorld() : false
            this.canvas.classList.replace(
                "z-top-canvas",
                "z-bottom-canvas"
            );
        }
    }

    scroll()
    {
        if(this.active == true)
        {
            this.camera.scroll()
            for(let i = 0; i < this.contents.length; i++)
            {
                this.contents[i].scroll ? this.contents[i].scroll() : false
            }
        }
    }

    resize()
    {
        if(this.active == true)
        {
            this.camera.resize()
            this.renderer.resize()
            for(let i = 0; i < this.contents.length; i++)
            {
                this.contents[i].resize ? this.contents[i].resize() : false
            }
        }
    }

    update()
    {
        if(this.active == true)
        {
            this.camera.update()
            this.renderer.update()
            for(let i = 0; i < this.contents.length; i++)
            {
                this.contents[i].update ? this.contents[i].update() : false
            }
        }
    }
}