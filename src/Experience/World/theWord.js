import * as THREE from 'three'
import Experience from '../Experience.js'


export default function theWord()
{
    const theWord = {}
    const experience = new Experience();
    const scene = experience.scene
    const camera = experience.camera.instance


    // scene.background = new THREE.Color(0x6699FF);
	// scene.fog = new THREE.FogExp2(0x6699FF, 0.05)

    camera.position.set(0, 0, 20)



    return theWord;
}