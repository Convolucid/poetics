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
        // this.setOrbitControls()
        this.setAspectPosition()
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

    setAspectPosition()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height



        if(this.sizes.responsiveXS === true)
        {
            this.instance.startingPositionY = -6
            this.instance.startingPositionZ = 45
            this.instance.position.set(
                0, 
                this.instance.startingPositionY / this.instance.aspect, 
                this.instance.startingPositionZ / this.instance.aspect
            )
        }
        else
        {
            this.instance.startingPositionY = -3
            this.instance.startingPositionZ = 70
            this.instance.position.set(
                0, 
                this.instance.startingPositionY / this.instance.aspect, 
                this.instance.startingPositionZ / this.instance.aspect
            )
        }

    }

    setOrbitControls()
    {
        this.orbitControls = new OrbitControls(this.instance, this.canvas)
        this.orbitControls.enabled = false
        this.orbitControls.enableDamping = true

        if(this.debug.active)
        {
            this.debugFolder.add(this.orbitControls, 'enabled').name('Orbit Controls')
        }
    }

    resize()
    {
        this.setAspectPosition()
        this.instance.updateProjectionMatrix()
    }

    scroll(section)
    {
        if(section)
        {
        // console.log(section)
        }

        this.instance.position.y = 
            (this.instance.startingPositionY / this.instance.aspect) - this.controls.scrollY * 0.005
    }

    update()
    {
        // if(this.orbitControls.enabled)
        // {
        //     this.orbitControls.update()
        // }
    }
}