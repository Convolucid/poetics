import * as THREE from 'three'
import Experience from './Experience'

export default class Raycaster
{
    constructor()
    {
        this.experience = new Experience()
        this.mouse = this.experience.mouse.instance
        this.camera = this.experience.camera.instance

        this.setInstance()
    }

    setInstance()
    {
        this.instance = new THREE.Raycaster()
        this.instance.setFromCamera(this.mouse, this.camera)
        this.raycastObjects = []

        this.currentIntersect = null

        window.addEventListener('click', () =>
        {
            if(this.currentIntersect)
            {
                console.log(this.currentIntersect.object)
                this.currentIntersect.object.onClick()
            }
        })
    }

    update()
    {
        this.instance.setFromCamera(this.mouse, this.camera)
        this.intersects = this.instance.intersectObjects(this.raycastObjects)
        
        for(const object of this.raycastObjects)
        {
            // console.log(object)
        }

        for(const intersect of this.intersects)
        {
            // console.log(intersect)
        }

        if(this.intersects.length) {
            if(this.currentIntersect === null) {
                // console.log('mouse enter')
            }
            this.currentIntersect = this.intersects[0]
        }
        else {
            if(this.currentIntersect) {
                // console.log('mouse leave');
            }
            this.currentIntersect = null
        }

    }
}