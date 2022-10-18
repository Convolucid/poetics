import gsap from 'gsap'
import Experience from './Experience.js'

export default class Chapters
{
    constructor()
    {
        this.experience = new Experience()
        this.cssEffects = this.experience.cssEffects
        this.camera = this.experience.world1.camera
        this.renderer = this.experience.world1.renderer

        this.frame = this.experience.world1.contents[0]
        this.subject = this.experience.world1.contents[1]
    }

    // Section 1
    title()
    {
        // CSS
        this.cssEffects.title.color = 'rgb(255, 240, 190,'


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
        this.frame.material.uniforms.uBigWavesElevation.value = 1.5
        this.frame.material.uniforms.uBigWavesSpeed.value = 0.1
        this.frame.material.uniforms.uSmallWavesSpeed.value = 0.2
        this.frame.material.uniforms.uSmallWavesIterations.value = 4
        this.frame.material.uniforms.uColorOffset.value = 0.19
        this.frame.material.uniforms.uColorMultiplier.value = 1.02
        
        gsap.to(
            this.frame.material.uniforms.uSmallWavesFrequency,
            {
                duration: 3.0,
                ease: 'power1.out',
                overwrite: true,
                value: 0.112
            }
        )
        gsap.to(
            this.frame.material.uniforms.uSmallWavesElevation,
            {
                duration: 3.0,
                ease: 'power1.out',
                overwrite: true,
                value: 0.96
            }
        )
        gsap.to(
            this.frame.material.uniforms.uDepthColor.value,
            {
                duration: 1.0,
                ease: 'power1.out',
                overwrite: true,
                r: 0.58,
                g: 0.40,
                b: 0.0
            }
        )
        gsap.to(
            this.frame.material.uniforms.uSurfaceColor.value,
            {
                duration: 1.0,
                ease: 'power1.out',
                overwrite: true,
                r: 0.84,
                g: 0.69,
                b: 0.26,
            }
        )

        // Subject
        gsap.to(
            this.subject.position,
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
            this.subject.rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                overwrite: true,
                x: 0,
                y: 0,
                z: 0
            }
        )
    }

    // Sections 2-3
    article1()
    {
        // CSS
        this.cssEffects.title.color = 'rgb(220, 220, 220,'

        // Camera
        gsap.to(
            this.camera.instance.rotation,
            {
                duration: 1.5,
                ease: 'slow',
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
        this.frame.material.uniforms.uBigWavesElevation.value = 6.0
        this.frame.material.uniforms.uBigWavesSpeed.value = 0.1
        this.frame.material.uniforms.uSmallWavesSpeed.value = 0.2
        this.frame.material.uniforms.uSmallWavesIterations.value = 5
        this.frame.material.uniforms.uColorOffset.value = 4
        this.frame.material.uniforms.uColorMultiplier.value = 0.105
        
        gsap.to(
            this.frame.material.uniforms.uSmallWavesFrequency,
            {
                duration: 3.0,
                ease: 'power1.out',
                overwrite: true,
                value: 0.321
            }
        )
        gsap.to(
            this.frame.material.uniforms.uSmallWavesElevation,
            {
                duration: 3.0,
                ease: 'power1.out',
                overwrite: true,
                value: 2.84
            }
        )
        gsap.to(
            this.frame.material.uniforms.uDepthColor.value,
            {
                duration: 4.0,
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
                r: 0.1,
                g: 0.4,
                b: 0.2
            }
        )

        // Frame
        this.frame.material.uniforms.uBigWavesElevation.value = 2.0
        this.frame.material.uniforms.uBigWavesSpeed.value = 0.1
        this.frame.material.uniforms.uSmallWavesSpeed.value = 0.2
        this.frame.material.uniforms.uSmallWavesIterations.value = 5
        this.frame.material.uniforms.uColorOffset.value = 0.19
        this.frame.material.uniforms.uColorMultiplier.value = 0.75

        gsap.to(
            this.frame.material.uniforms.uSmallWavesFrequency,
            {
                duration: 2.0,
                ease: 'power1.out',
                overwrite: true,
                value: 0.05
            }
        )
        gsap.to(
            this.frame.material.uniforms.uSmallWavesElevation,
            {
                duration: 2.0,
                ease: 'power1.out',
                overwrite: true,
                value: 3.5
            }
        )
        gsap.to(
            this.frame.material.uniforms.uDepthColor.value,
            {
                duration: 1.0,
                ease: 'power1.out',
                overwrite: true,
                r: 0.3,
                g: 0.8,
                b: 0.4
            }
        )
        gsap.to(
            this.frame.material.uniforms.uSurfaceColor.value,
            {
                duration: 1.0,
                ease: 'power1.out',
                overwrite: true,
                r: 0.7,
                g: 1.0,
                b: 0.7
            }
        )

        // Subject
        gsap.to(
            this.subject.rotation,
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