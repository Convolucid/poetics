import * as THREE from 'three'
import gsap from 'gsap'

import Controls from "./utils/Controls.js"
import Camera from "./Camera.js"
import Raycaster from "./Raycaster.js"
import Renderer from './Renderer.js'

import Chapters from './Chapters.js'

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

            // Get mouse position and viewport dimensions for onclick event calculation.
            const mousePosX = this.controls.instance.x;
            const viewportWidth = this.controls.sizes.width
            const mousePosY = this.controls.instance.y;
            const viewportHeight = this.controls.sizes.height

            // Convert mouse position to pixels to be used with style.
            const pixelsX = (mousePosX + 1) * viewportWidth / 2
            const pixelsY = viewportHeight - ((mousePosY + 1) * viewportHeight / 2)

            // Random variables to implement into transform
            const r1 = (Math.random() * 90) - 45;
            const r2 = (Math.random() * 90) - 45;
            const r3 = Math.random() * 180;

            this.canvas.style.top = pixelsY + 'px';
            this.canvas.style.left = pixelsX + 'px';
            this.canvas.style.maxWidth = '1%';
            this.canvas.style.maxHeight = '1%';
            this.canvas.style.minHeight = '1vh';
            this.canvas.style.zIndex = 0;
            this.canvas.style.transform = 'skew(' + r1 + 'deg, ' + r2 + 'deg)'
            this.canvas.style.filter = 'hue-rotate(' + r3 + 'deg)'
            this.canvas.style.boxShadow = '0px 0px 0px 0px white'

            // Lerp top and bottom percentages with gsap to expand from a certain point on screen.
            gsap.to(
                this.canvas.style,
                {
                    duration: 1,
                    ease: 'expo.out',
                    boxShadow: '0px 0px 200px 200px white'
                }
            )
            gsap.to(
                this.canvas.style,
                {
                    duration: 3,
                    ease: 'expo.in',
                    top: '0px',
                    left: '0px',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    minHeight: '100vh',
                    transform: 'skew(0deg, 0deg)',
                    filter: 'hue-rotate(0deg)'
                }
            )
        } else {
            this.contents.disableWorld ? this.contents.disableWorld() : false;
            this.canvas.style.zIndex = -10;
        }
        this.resize();
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