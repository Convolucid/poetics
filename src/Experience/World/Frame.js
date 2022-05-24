import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Frame
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setGeometry()
        // this.setTextures()
        this.setMaterial()
        this.setMesh()
        this.setAsRaycastObject()

    }

    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(75, 75)
    }

    setTextures()
    {
        this.textures = {}

        this.textures.color = this.resources.items.colorTexture
        this.textures.color.encoding = THREE.sRGBEncoding
        this.textures.color.repeat.set(1.5, 1.5)
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping

        this.textures.normal = this.resources.items.normalTexture
        this.textures.normal.repeat.set(1.5, 1.5)
        this.textures.normal.wrapS = THREE.RepeatWrapping
        this.textures.normal.wrapT = THREE.RepeatWrapping

    }

    setMaterial()
    {
        this.material = new THREE.MeshStandardMaterial({
            // map: this.textures.color,
            // normalMap: this.textures.normal
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        // this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.position.z = -10
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }

    setAsRaycastObject()
    {
        this.experience.raycaster.raycastObjects.push(this.mesh)
    }
}