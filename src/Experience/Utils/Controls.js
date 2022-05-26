import * as THREE from 'three'
import Experience from "../Experience";

export default class Controls
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes

        this.instance = new THREE.Vector2()

        window.addEventListener('mousemove', (event) =>
        {
            this.instance.x = event.clientX / this.sizes.width * 2 -1;
            this.instance.y = - (event.clientY / this.sizes.height * 2 -1)

        })

        this.scrollY = window.scrollY
        this.currentSection = 0

        window.addEventListener('scroll', () =>{
            this.scrollY = window.scrollY

            const newSection = Math.round(this.scrollY / this.sizes.height)
            if(newSection != this.currentSection) {
                this.currentSection = newSection
            }
        })
    }
}