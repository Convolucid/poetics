import * as THREE from 'three'
import Experience from '../Experience.js'
import oceanVertexShader from '../shaders/ocean/vertex.glsl';
import oceanFragmentShader from '../shaders/ocean/fragment.glsl';

export default class Frame
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.debugObject = {}

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Hallucination')
            // this.debugFolder.close()
        }

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        this.setAsRaycastObject()

    }

    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(100, 100, 256, 256)
    }


    setMaterial()
    {
        this.debugObject.depthColor = '#568199'
        this.debugObject.surfaceColor = '#d2b6b6'

        this.material = new THREE.ShaderMaterial(
            {
                // wireframe: true,
                vertexShader: oceanVertexShader,
                fragmentShader: oceanFragmentShader,
                uniforms: {
                    uTime: { value: 0 },

                    uPosition: { value: new THREE.Vector3( 0, 0, -5) },
        
                    uBigWavesElevation: { value: 1.5 },
                    uBigWavesFrequency: { value: new THREE.Vector3(0.07, 0.15, 1.0) },
                    uBigWavesSpeed: { value: 0.1 },
        
                    uSmallWavesElevation: { value: 0.35 },
                    uSmallWavesFrequency: { value: 0.3 },
                    uSmallWavesSpeed: { value: 0.2 },
                    uSmallWavesIterations: { value: 1 },
        
                    uDepthColor: { value: new THREE.Color(this.debugObject.depthColor)},
                    uSurfaceColor: { value: new THREE.Color(this.debugObject.surfaceColor)},
                    uColorOffset: { value: 0.5 },
                    uColorMultiplier: { value: 1.15 }
                }
            }
        )

        // Debug
        this.debugFolder.add(this.material.uniforms.uBigWavesElevation, 'value').min(0).max(4).step(0.001).name('uBigWavesElevation')
        this.debugFolder.add(this.material.uniforms.uBigWavesFrequency.value, 'x').min(0).max(1).step(0.001).name('uBigWavesFrequencyX')
        this.debugFolder.add(this.material.uniforms.uBigWavesFrequency.value, 'y').min(0).max(1).step(0.001).name('uBigWavesFrequencyY')
        this.debugFolder.add(this.material.uniforms.uBigWavesSpeed, 'value').min(0).max(2).step(0.001).name('uBigWavesSpeed')
        this.debugFolder
            .addColor(this.debugObject, 'surfaceColor').name('surfaceColor')
            .onChange(() =>
            {
                this.material.uniforms.uSurfaceColor.value.set(this.debugObject.surfaceColor)
            })
        this.debugFolder
            .addColor(this.debugObject, 'depthColor').name('depthColor')
            .onChange(() =>
            {
                this.material.uniforms.uDepthColor.value.set(this.debugObject.depthColor)
            })
        this.debugFolder.add(this.material.uniforms.uColorOffset, 'value').min(0).max(2).step(0.001).name('uColorOffset')
        this.debugFolder.add(this.material.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('uColorMultiplier')
        this.debugFolder.add(this.material.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation')
        this.debugFolder.add(this.material.uniforms.uSmallWavesFrequency, 'value').min(0).max(2).step(0.001).name('uSmallWavesFrequency')
        this.debugFolder.add(this.material.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')
        this.debugFolder.add(this.material.uniforms.uSmallWavesIterations, 'value').min(0).max(5).step(1).name('uSmallWavesIterations')
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.receiveShadow = false
        this.scene.add(this.mesh)
    }

    setAsRaycastObject()
    {
        this.experience.raycaster.raycastObjects.push(this.mesh)
    }

    update()
    {
        this.material.uniforms.uTime.value = this.time.elapsed * 0.001;
    }
}