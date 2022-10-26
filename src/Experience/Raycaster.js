import * as THREE from 'three'

export default class Raycaster
{
    constructor(world)
    {
        this.world = world
        this.canvas = world.canvas
        this.controls = world.controls.instance
        this.camera = world.camera.instance


        this.setInstance()
    }

    setInstance()
    {
        this.instance = new THREE.Raycaster()
        this.instance.setFromCamera(this.controls, this.camera)



        this.raycastObjects = []

        this.currentIntersect = null

        window.addEventListener('click', () =>
        {
            // this.checkCurrentIntersect()
            if(this.currentIntersect)
            {
                console.log(this.world)
                this.currentIntersect.object.clickHandler()
            }
        })
    }

    checkCurrentIntersect()
    {
        this.intersects = this.instance.intersectObjects(this.raycastObjects)
        
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

    update()
    {
        this.instance.setFromCamera(this.controls, this.camera)
        // this.intersects = this.instance.intersectObjects(this.raycastObjects)
        this.checkCurrentIntersect()
        
        for(const object of this.raycastObjects)
        {
            // object.clickHandler ? object.clickHandler() : false;
        }

        for(const intersect of this.intersects)
        {
            intersect.object.intersectHandler()
        }

        // if(this.intersects.length) {
        //     if(this.currentIntersect === null) {
        //         // console.log('mouse enter')
        //     }
        //     this.currentIntersect = this.intersects[0]
        // }
        // else {
        //     if(this.currentIntersect) {
        //         // console.log('mouse leave');
        //     }
        //     this.currentIntersect = null
        // }

    }
}