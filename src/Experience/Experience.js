import * as THREE from 'three'
import Sizes from "./Utils/Sizes.js"
import Time from "./Utils/Time.js"
import CSSEffects from "./Effects/CSSEffects.js"
import Controls from "./Utils/Controls.js"
import Camera from "./Camera.js"
import Raycaster from "./Raycaster.js"
import Renderer from './Renderer.js'
import World from './World/World.js'

import world1 from './World/world1.js'
import world2 from './World/world2.js'
import Chapters from './Chapters.js'

import Debug from './Utils/Debug.js'

let instance = null

export default class Experience
{
    constructor(canvas, canvas2)
    {
        if(instance)
        { 
            return instance
        }

        instance = this

        // Global access
        window.experience = this

        // Canvas
        this.canvas = canvas
        this.canvas2 = canvas2



        // Setup
        // New architecture will assign canvas to World classes, which will each have their own camera, renderer, and scenes.

        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time(this.update)
        
        
        // this.scene = new THREE.Scene()
        // this.camera = new Camera()
        // this.controls = new Controls()
        this.cssEffects = new CSSEffects()
        // this.resources = new Resources(sources)
        // this.renderer = new Renderer()
        // this.raycaster = new Raycaster()




        // this.world = new World()

        this.loadWorlds()


        // this.chapters = new Chapters()

        this.section = 1

        // Sizes resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Scrolling event
        this.sizes.on('scroll', () =>
        {
            this.scroll()
        })

        window.requestAnimationFrame(() =>
        {
            this.update()
        })
        
    }

    async loadWorlds()
    {
        const worldOne = await world1()
        this.world1 = new World(this.canvas, worldOne)
        
        this.chapters = new Chapters()

        const worldTwo = await world2()
        this.world2 = new World(this.canvas2, worldTwo)
    }

    resize()
    {
        this.cssEffects.resize()
        this.world1.resize()
        this.camera.resize()
        this.renderer.resize()

        this.world1 ? this.world1.resize() : false
        this.world2 ? this.world2.resize() : false
    }

    scroll()
    {
        // Divide experience into scrollable sections
        const currentSection = Math.round(this.sizes.scrollY / (this.sizes.height)) + 1
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
        this.world1 ? this.world1.scroll() : false
        this.world2 ? this.world2.scroll() : false
        // this.camera.scroll()
 
    }

    update()
    {
        this.time.update()
        this.cssEffects.update()
        // this.camera.update()
        // this.raycaster.update()
        // this.renderer.update()

        this.world1 ? this.world1.update() : false
        this.world2 ? this.world2.update() : false

        window.requestAnimationFrame(() =>
        {
            this.update()
        })
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

