import * as THREE from 'three'
import gsap from 'gsap'
import Experience from '../Experience.js'
import Effects from '../Effects/SubjectEffects.js'



export default class Subject
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.sizes = this.experience.sizes
        this.time = this.experience.time
        this.debug = this.experience.debug


        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Subject')
            this.debugFolder.close()
        }

        // Setup
        this.resource = this.resources.items.lettersModel
        this.effects = new Effects()

        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene

        this.meshArray = []
        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                this.meshArray.push(child)
            }
        })

        // Set attributes to individual meshes
        for(let i = 0; i < this.meshArray.length; i++)
        {
            // Set onclick event to meshes and set activation to false
            this.meshArray[i].clickActivated = false
            this.meshArray[i].onClick = () =>
            {
                this.clickActivation(this.meshArray[i])
            }

            this.setAsRaycastObject(this.meshArray[i])

            // Set individual random modifiers to movement
            this.meshArray[i].randomMovementModifier = Math.random()
            this.meshArray[i].randomSpeedModifier = Math.random()

            // Get starting position
            this.meshArray[i].startingPositionX = this.meshArray[i].position.x
            this.meshArray[i].startingPositionY = this.meshArray[i].position.y
        };

        this.meshArray[0].material.metalness = 1
        this.meshArray[0].material.roughness = 0.3
        this.meshArray[0].material.transparent = true
        this.model.movementModifierX = 1.0
        this.model.movementModifierY = 1.0
        this.model.movementModifierZ = 1.0
        this.model.speedModifier = 1.0


        this.scene.add(this.model)

        // Debug
        if(this.debug.active)
        {
            this.debugFolder.add(this.model, 'movementModifierX').min(0.01).max(30).step(0.001)
            this.debugFolder.add(this.model, 'movementModifierY').min(0.01).max(30).step(0.001)
            this.debugFolder.add(this.model, 'movementModifierZ').min(0.01).max(30).step(0.001)
            this.debugFolder.add(this.model, 'speedModifier').min(0.01).max(3).step(0.001)
            this.debugFolder.add(this.meshArray[0].material, 'metalness').min(0).max(1).step(0.001)
            this.debugFolder.add(this.meshArray[0].material, 'roughness').min(0).max(1).step(0.001)
        }
    }


    setAsRaycastObject(object)
    {
        this.experience.raycaster.raycastObjects.push(object)
    }

    resize()
    {
        // Adjust Subject starting position
        if(this.sizes.responsiveXS === true)
        {
            for(let i=6; i < this.meshArray.length; i++)
            {
                this.meshArray[i].position.x = this.meshArray[i].startingPositionX - 5
                this.meshArray[i].position.y = this.meshArray[i].startingPositionY - 5
            }
        }
        else
        {
            for(let i=6; i < this.meshArray.length; i++)
            {
                this.meshArray[i].position.x = this.meshArray[i].startingPositionX
                this.meshArray[i].position.y = this.meshArray[i].startingPositionY
            }
        }
    }

    update()
    {
        for(let i = 0; i < this.meshArray.length; i++)
        {

            if(this.meshArray[i].clickActivated === true)
            {
                // let tweenStartTime = this.meshArray[0].tweenStartTime
                let tweenElapsedTime = this.experience.time.current - this.meshArray[i].tweenStartTime;

                if(tweenElapsedTime > 200)
                {
                    this.meshArray[i].tweenStartTime = this.experience.time.current

                    this.effects.trailingMesh(this.meshArray[i])
                }            
            }

            if(this.meshArray[i].clickActivated === false)
            {
                let randomMovement = this.meshArray[i].randomMovementModifier
                let randomSpeed = this.meshArray[i].randomSpeedModifier

                this.meshArray[i].position.x += Math.sin(experience.time.elapsed * 0.001 * randomSpeed * this.model.speedModifier) * 0.00025 * randomMovement * this.model.movementModifierX
                this.meshArray[i].position.y += Math.cos(experience.time.elapsed * 0.0005 * randomSpeed * this.model.speedModifier) * 0.00075 * randomMovement * this.model.movementModifierY
                this.meshArray[i].position.z += Math.sin(experience.time.elapsed * 0.002 * randomSpeed * this.model.speedModifier) * 0.001 * randomMovement * this.model.movementModifierZ
            }

            this.effects.update(this.meshArray[i]);
        }
    }



    clickActivation(object)
    {
        if(object.clickActivated === false)
        {

            object.clickActivated = true

            object.tweenStartTime = this.experience.time.current
            object.tweenDuration = 5

            let tweenDuration = object.tweenDuration
            
            // Position
            const positionOrigin = new THREE.Vector3(
                object.position.x,      
                object.position.y,      
                object.position.z
            )

            let positionTween =
                gsap.to(
                    object.position,
                    {
                        delay: '0.01',
                        duration: tweenDuration,
                        ease: 'power4.in',
                        // power1, power2, power3, power4, back, elastic, bounce, rough, slow, steps, circ, expo, sine
                        x: '+=random(-10,10)',
                        y: '+=random(-10,10)',
                        z: '+=random(-5,25)',
                        onComplete: this.positionComplete = () =>
                        {

                            object.position.set(
                                positionOrigin.x,
                                positionOrigin.y,
                                positionOrigin.z
                            )
                        }
                    }
                )
            ;


            // Rotation
            let rotationOrigin = new THREE.Vector3(
                object.rotation.x,
                object.rotation.y,
                object.rotation.z
            )

            let rotationTween = 
                gsap.to(
                    object.rotation,
                    {
                        duration: tweenDuration,
                        ease: 'power4.in',
                        // power1, power2, power3, power4, back, elastic, bounce, rough, slow, steps, circ, expo, sine
                        x: '+=random(-3.14,3.14)',
                        y: '+=random(-3.14,3.14)',
                        z: '+=random(-3.14,3.14)',
                        onComplete: this.rotationComplete = () =>
                        {
                            object.rotation.set(
                                rotationOrigin.x,
                                rotationOrigin.y,
                                rotationOrigin.z
                            )
                        }

                    }
                )
            ;


            // Disappear and reappear
            let transparencyTween =
                gsap.to(
                    object.material,
                    {
                        delay: tweenDuration - (tweenDuration * 0.2),
                        duration: tweenDuration - (tweenDuration * 0.8),
                        opacity: 0,
                        onComplete: this.transparencyComplete = () =>
                        {
                            transparencyTween.reverse()
                            object.clickActivated = false

                        }
                    }
                )
            ;
            
 
        }
    }


}