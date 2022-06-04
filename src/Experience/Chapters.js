import gsap from 'gsap'
import Experience from './Experience.js'

export default class Chapters
{
    constructor()
    {
        this.experience = new Experience()
        this.camera = this.experience.camera
        this.renderer = this.experience.renderer
        this.resources = this.experience.resources

        this.resources.on('ready', ()=>
        {
            this.frame = this.experience.world.frame
            this.subject = this.experience.world.subject
        })

    }

    // Section 1
    title()
    {
        // Camera
        gsap.to(
            this.camera.instance.rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                overwrite: true,
                x: 0,
                y: 0,
                z: 0
            }
        )

        // Renderer

        gsap.to(
            this.renderer.debugObject.clearColor,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                overwrite: true,
                r: 0.95,
                g: 0.95,
                b: 0.95
            }
        )

        // Frame
        gsap.to(
            this.frame.material.uniforms.uDepthColor.value,
            {
                duration: 1.0,
                ease: 'power1.out',
                overwrite: true,
                r: 0.3373,
                g: 0.5059,
                b: 0.6
            }
        )
        gsap.to(
            this.frame.material.uniforms.uSurfaceColor.value,
            {
                duration: 1.0,
                ease: 'power1.out',
                overwrite: true,
                r: 0.8235,
                g: 0.7137,
                b: 0.7137
            }
        )

        // Subject
        gsap.to(
            this.subject.model.position,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                overwrite: true,
                x: 0,
                y: 0,
                z: 0
            }
        )
        gsap.to(
            this.subject.model.rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                overwrite: true,
                x: 0,
                y: 0,
                z: 0
            }
        )
        gsap.to(
            this.subject.meshArray[0].material,
            {
                duration: 1,
                overwrite: true,
                metalness: 1
            }
        )
    }

    // Sections 2-3
    article1()
    {
        // Camera
        gsap.to(
            this.camera.instance.rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                overwrite: true,
                x: -0.55,
                y: 0,
                z: 0
            }
        )

        // Renderer
        gsap.to(
            this.renderer.debugObject.clearColor,
            {
                duration: 5.0,
                ease: 'power2.inOut',
                overwrite: true,
                r: 0.45,
                g: 0.45,
                b: 0.45
            }
        )

        // Frame
        gsap.to(
            this.frame.material.uniforms.uDepthColor.value,
            {
                duration: 2.0,
                ease: 'power1.out',
                overwrite: true,
                r: 0.95,
                g: 0.95,
                b: 0.95
            }
        )
        gsap.to(
            this.frame.material.uniforms.uSurfaceColor.value,
            {
                duration: 4.0,
                ease: 'power1.out',
                overwrite: true,
                r: 0.2,
                g: 0.2,
                b: 0.2
            }
        )

        // Subject
        // gsap.to(
        //     this.subject.model.position,
        //     {
        //         duration: 3,
        //         ease: 'power2.out',
        //         overwrite: true,
        //         x: 15,
        //         y: -40,
        //         z: 27
        //     }
        // )
        // gsap.to(
        //     this.subject.model.rotation,
        //     {
        //         duration: 3,
        //         ease: 'power2.out',
        //         overwrite: true,
        //         x: -1.1,
        //         y: 0,
        //         z: -1.6
        //     }
        // )
        // gsap.to(
        //     this.subject.meshArray[0].material,
        //     {
        //         duration: 1,
        //         overwrite: true,
        //         metalness: 0
        //     }
        // )
    }

    // Sections 4-6
    article2()
    {
        // Camera
        gsap.to(
            this.camera.instance.rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                overwrite: true,
                x: -0.4,
                y: 0,
                z: 1.7
            }
        )

        // Renderer
        gsap.to(
            this.renderer.debugObject.clearColor,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                overwrite: true,
                r: 0.3373,
                g: 0.5059,
                b: 0.6
            }
        )

        // Frame
        gsap.to(
            this.frame.material.uniforms.uDepthColor.value,
            {
                duration: 3.0,
                ease: 'power1.out',
                overwrite: true,
                r: 0.6,
                g: 0.6,
                b: 0.4
            }
        )
        gsap.to(
            this.frame.material.uniforms.uSurfaceColor.value,
            {
                duration: 4.0,
                ease: 'power1.out',
                overwrite: true,
                r: 0.3,
                g: 0.4,
                b: 0.3
            }
        )

        // Subject
        gsap.to(
            this.subject.model.rotation,
            {
                duration: 3,
                ease: 'power2.out',
                overwrite: true,
                x: 1.1,
                y: 0.8,
                z: 0
            }
        )
    }
}