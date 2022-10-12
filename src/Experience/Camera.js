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
    }

    setInstance()
    {
        
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1, 
            150
        )

        this.instance.chapterPosition = new THREE.Vector3()
        this.instance.resizePosition = new THREE.Vector3()
        this.instance.scrollFactor = 0

        // Setting the chapter position includes the resize function, which includes the general setPosition function
        this.setChapterPosition(0, -2.5, 70)


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

    // setChapterPosition modifies the camera's stored position variable based on chapter and runs the resize function for responsive sizing of that variable.
    setChapterPosition(x, y, z)
    {
        this.instance.chapterPosition.set(x, y, z)
        this.resize()
    }

    // Resize function allows for window.innerWidth to alter the fov, aspect ratio, and position of the camera with a toggle set in sizes (can be expanded to other sizes in the future).  It then runs setPosition to move the camera.
    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.fov = 35 / this.instance.aspect

        if(this.sizes.responsiveXS === true)
        {
            this.instance.resizePosition.set(
                this.instance.chapterPosition.x,
                this.instance.chapterPosition.y - 2.5,
                this.instance.chapterPosition.z * 0.65
            )
        }
        else
        {
            this.instance.resizePosition.set(
                this.instance.chapterPosition.x,
                this.instance.chapterPosition.y,
                this.instance.chapterPosition.z,
            )
        }

        this.setPosition()
        this.instance.updateProjectionMatrix()
    }

    // scroll function calculates the total amount scrolled and sets the position of the camera to include that offset.
    scroll()
    {
        // scrollFactor allows a constant rate of scrolling regardless of window height and captures the total scrolled amount
        this.instance.scrollFactor = (this.sizes.scrollY / this.sizes.height) * 5
        this.setPosition()
    }



    // setPosition function takes the responsive resizePosition, reduces Y by the scrollFactor, and sets the camera.
    setPosition()
    {
        this.instance.position.set(
            this.instance.resizePosition.x, 
            this.instance.resizePosition.y - this.instance.scrollFactor, 
            this.instance.resizePosition.z
        )
    }

    update()
    {

    }
}