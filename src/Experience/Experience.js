import * as THREE from 'three'
import Sizes from "./Utils/Sizes.js"
import Time from "./Utils/Time.js"
import Controls from "./Utils/Controls.js"
import Camera from "./Camera.js"
import Raycaster from "./Raycaster.js"
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'
import sources from './World/sources.js'
import Chapters from './Chapters.js'
import Debug from './Utils/Debug.js'

let instance = null

export default class Experience
{
    constructor(canvas)
    {
        if(instance)
        { 
            return instance
        }

        instance = this

        // Global access
        window.experience = this

        // Options
        this.canvas = canvas

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.controls = new Controls()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.raycaster = new Raycaster()
        this.world = new World()
        this.chapters = new Chapters()

        this.section = 1

        // Sizes resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Scrolling event
        this.controls.on('scroll', () =>
        {
            this.scroll()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })
        
    }

    resize()
    {
        this.world.resize()
        this.camera.resize()
        this.renderer.resize()
    }

    scroll()
    {
        // Divide experience into scrollable sections
        const currentSection = Math.round(this.controls.scrollY / (this.sizes.height)) + 1
        if(currentSection != this.section) 
        {
            this.section = currentSection

            switch(this.section)
            {
                case 1:
                    this.chapters.title()
                    break;
                case 2:
                    this.chapters.article1()
                    break;
                case 4:
                    this.chapters.article2()
                    break;
            }
        }

        // General scroll-based events
        this.world.scroll()
        this.camera.scroll()
 
    }

    update()
    {
        this.camera.update()
        this.world.update()
        this.raycaster.update()
        this.renderer.update()
    }

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the scene
        this.scene.traverse((child) =>
        {

            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                // Test each value in the material for dispose functions
                for(const key in child.material)
                {
                    const value = child.material[key]
                    
                    if(value && typeof value.dispose === 'function'){
                        value.dispose()
                    }

                }

            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if(this.debug.active)
        {
            this.debug.ui.destroy()
        }

    }
}

