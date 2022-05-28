import * as THREE from 'three'
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

        if(this.debug.active)
        {
            this.debugFolder.add(this.instance, 'fov').min(0.1).max(100).step(0.01)
                .onChange(() => {this.instance.updateProjectionMatrix()})
            this.debugFolder.add(this.instance, 'aspect').min(0.1).max(10).step(0.001)
                .onChange(() => {this.instance.updateProjectionMatrix()})  
            this.debugFolder.add(this.instance, 'near').min(0.1).max(10).step(0.001)
                .onChange(() => {this.instance.updateProjectionMatrix()})  
            this.debugFolder.add(this.instance, 'far').min(10).max(2000).step(0.001)
            .onChange(() => {this.instance.updateProjectionMatrix()})  
        }


        this.scene.add(this.instance)
    }

    setPosition()
    {
        this.instance.position.set(
            0, 
            (this.instance.startingPositionY / this.instance.aspect) - this.scrollPositionY, 
            this.instance.startingPositionZ / this.instance.aspect
        )
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height

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

    scroll()
    {
        this.scrollPositionY = this.controls.scrollY * 0.005

        this.setPosition()
    }

    update()
    {

    }
}