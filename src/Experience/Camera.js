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
        this.resize()
        this.scroll()
    }

    setInstance()
    {
        
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1, 
            150
        )

        this.instance.initialPosition = new THREE.Vector3(this.instance.position.xyz)
        this.instance.scrollPosition = new THREE.Vector3(this.instance.position.xyz)

        // Debug options 
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

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.fov = 35 / this.instance.aspect

        if(this.sizes.responsiveXS === true)
        {
            this.instance.initialPosition.set(0, -5, 45)
        }
        else
        {
            this.instance.initialPosition.set(0, -2.5, 70)
        }

        this.setPosition()
        this.instance.updateProjectionMatrix()
    }

    scroll()
    {
        let scrollSpeed = (this.controls.scrollY / this.sizes.height) * 5
        this.instance.scrollPosition.y = this.instance.initialPosition.y - scrollSpeed

        this.setPosition()

    }

    setPosition()
    {
        this.instance.position.set(
            this.instance.initialPosition.x, 
            this.instance.scrollPosition.y, 
            this.instance.initialPosition.z
        )
    }

    update()
    {

    }
}