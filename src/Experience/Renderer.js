import * as THREE from 'three'
import Experience from './Experience.js'

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.debug = this.experience.debug

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Renderer')
            this.debugFolder.close()
        }

        this.setInstance()
        
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })

        const debugObject = {}
        debugObject.clearColor = '#e0e0e6'

        this.instance.physicallyCorrectLights = true
        this.instance.outputEncoding = THREE.sRGBEncoding
        this.instance.toneMapping = THREE.CineonToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = false
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setClearColor(debugObject.clearColor)
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)

        // Debug Options
        this.debugFolder.addColor(debugObject, 'clearColor').name('clearColor')
            .onChange(() =>
            {
                this.instance.setClearColor(debugObject.clearColor)
            })
        ;
        this.debugFolder.add(this.instance, 'toneMapping', {
            None: THREE.NoToneMapping,
            Linear: THREE.LinearToneMapping,
            Reinhard: THREE.ReinhardToneMapping,
            Cineon: THREE.CineonToneMapping,
            ACESFilmic: THREE.ACESFilmicToneMapping
        })
        this.debugFolder.add(this.instance, 'toneMappingExposure')
            .min(0).max(10).step(0.001)
        ;


    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    update()
    {
        this.instance.render(this.scene, this.camera.instance)
    }

}