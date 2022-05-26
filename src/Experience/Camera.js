import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import Experience from './Experience.js'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.controls = this.experience.controls
        this.debug = this.experience.debug

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Camera')
            this.debugFolder.close()
        }

        this.setInstance()
        this.scroll()
        this.resize()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1, 
            150
        )

        this.scene.add(this.instance)
    }

    setPosition()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height

        this.instance.position.set(
            0, 
            (this.instance.startingPositionY / this.instance.aspect) - this.scrollPositionY, 
            this.instance.startingPositionZ / this.instance.aspect
        )
    }

    resize()
    {
        if(this.sizes.responsiveXS === true)
        {
            this.instance.startingPositionY = -6
            this.instance.startingPositionZ = 45
        }
        else
        {
            this.instance.startingPositionY = -3
            this.instance.startingPositionZ = 70
        }

        this.setPosition()
        this.instance.updateProjectionMatrix()
    }

    scroll(section)
    {
        switch(section)
        {
            case 1:
                this.section1()
                break;
            case 2:
                this.section2()
                break;
            case 3:
                this.section3()
                break;
        }

        this.scrollPositionY = this.controls.scrollY * 0.005
       
        this.setPosition()
    }

    update()
    {

    }



    // Section Transformations
    section1()
    {
        gsap.to(
            this.instance.rotation,
            {
                duration: 1.5,
                ease: 'power2.out',
                x: 0,
                y: 0,
                z: 0
            }
        )
    }

    section2()
    {
        gsap.to(
            this.instance.rotation,
            {
                duration: 1.5,
                ease: 'power2.out',
                x: -1.1,
                y: 0,
                z: 0
            }
        )
    }

    section3()
    {
        gsap.to(
            this.instance.rotation,
            {
                duration: 1.5,
                ease: 'power2.out',
                x: -0.9,
                y: 0,
                z: 1.6
            }
        )
    }
}