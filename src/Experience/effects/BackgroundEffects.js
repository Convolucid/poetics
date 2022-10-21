import * as THREE from 'three';
import gsap from 'gsap';
import Experience from "../Experience";
import oceanVertexShader from '../shaders/ocean/vertex.glsl';
import oceanFragmentShader from '../shaders/ocean/fragment.glsl';

export default class BackgroundEffects
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Hallucination')
        }

        // Setup Trailing Mesh
        this.trailingMeshArray = []
        // this.meshCloneMaterial = new THREE.MeshBasicMaterial({
        //     transparent: true,
        //     opacity: 1
        // })

        this.meshCloneMaterial = new THREE.ShaderMaterial(
            {
                vertexShader: oceanVertexShader,
                fragmentShader: oceanFragmentShader,
                uniforms: {
                    uTime: { value: 0 },

                    uPosition: { value: new THREE.Vector3( 0, 0, 0) },
        
                    uBigWavesElevation: { value: 0.2 },
                    // uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
                    uBigWavesFrequency: { value: new THREE.Vector3(4, 1.5, 1.0) },
                    uBigWavesSpeed: { value: 0.75 },
        
                    uSmallWavesElevation: { value: 0.15 },
                    uSmallWavesFrequency: { value: 3 },
                    uSmallWavesSpeed: { value: 0.2 },
                    uSmallWavesIterations: { value: 4 },
        
                    uDepthColor: { value: new THREE.Color('#186691')},
                    uSurfaceColor: { value: new THREE.Color('#9bd8ff')},
                    uColorOffset: { value: 0.08 },
                    uColorMultiplier: { value: 5 }
                }
            }
        )

    }

    trailingMesh(object)
    {
        // create Shadow Clone from Object

        this.meshCloneGeometry = object.geometry.clone()

        let meshClone = new THREE.Mesh(
            this.meshCloneGeometry,
            this.meshCloneMaterial
        )
        meshClone.position.set(
            object.position.x,
            object.position.y,
            object.position.z - 3
        )
        meshClone.rotation.set(
            object.rotation.x,
            object.rotation.y,
            object.rotation.z
        )

        this.trailingMeshArray.push(meshClone)
        this.scene.add(meshClone);

        let effectDuration = object.tweenDuration

        // this.hallucinateColor(meshClone, effectDuration);
        // this.hallucinateScale(meshClone, effectDuration);
        // this.hallucinatePosition(meshClone, effectDuration);
        // this.appear(meshClone, effectDuration);
        this.disappear(meshClone, effectDuration);

        return(meshClone)
    }

    hallucinateColor(object, duration)
    {
        gsap.to(
            object.material.color,
            {
                duration: duration,
                r: 'random(0,1)',
                g: 'random(0,1)',
                b: 'random(0,1)'
            }
        )
    }

    hallucinateScale(object, duration)
    {
        gsap.to(
            object.scale,
            {
                duration: duration,
                ease: 'slow',
                x: '40',
                y: 'random(0.5, 1.5)',
                z: 'random(0.5, 1.5)'
            }
        )
    }

    hallucinatePosition(object, duration)
    {
        gsap.to(
            object.position,
            {
                duration: duration,
                ease: 'slow',
                x: '+=random(-1,1)',
                y: '+=random(-1,1)',
                z: '-10'
            }
        )
    }

    appear(object, duration)
    {
        gsap.to(
            object.material,
            {
                duration: duration * 0.5,
                opacity: '1',
            }
        )
    }

    disappear(object, duration)
    {
        gsap.to(
            object.material,
            {
                delay: duration * 0.5,
                duration: duration * 0.5,
                opacity: '0',
                ease: 'power2',
                onComplete: this.objectDisposal = () =>
                {
                    this.trailingMeshArray.shift(object)
                    this.scene.remove(object)
                    object.geometry.dispose()
                }
            }
        )
    }

    update(object)
    {
        this.meshCloneMaterial.uniforms.uTime.value = this.time.elapsed * 0.001;
        this.meshCloneMaterial.uniforms.uPosition.value.x = object.position.x;
        this.meshCloneMaterial.uniforms.uPosition.value.y = object.position.y;
        this.meshCloneMaterial.uniforms.uPosition.value.z = object.position.z;
    }
    


}