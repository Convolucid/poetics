import * as THREE from "three";
import Sizes from "./utils/Sizes.js";
import Time from "./utils/Time.js";
import CSSEffects from "./effects/CSSEffects.js";

import World from "./World.js";
import world1 from "./worlds/world1.js";
import world2 from "./worlds/world2.js";
import Chapters from "./Chapters.js";

import Debug from "./utils/Debug.js";

let instance = null;

export default class Experience {
    constructor(canvas, canvas2) {
        // This creates the singleton
        if (instance) {
            return instance;
        }
        instance = this;

        // Global access and universal utilities
        window.experience = this;
        this.debug = new Debug();
        this.sizes = new Sizes();
        this.time = new Time();

        // Webgl Canvases (should create a function that iterates over .webgl class and constructs array, then attaches individual canvases to experience)
        this.canvas = canvas;
        this.canvas2 = canvas2;
        this.canvasArray = [
            this.canvas,
            this.canvas2
        ]


        
        // Setup
        // New architecture will assign canvas to World classes, which will each have their own camera, renderer, and scenes.

        // Asynchronous function that creates new Worlds from the numbered world content functions
        this.loadWorlds();


        // this.cssEffects = new CSSEffects();
        // this.textContent = document.getElementById('z-control')
        // this.titleWorld = document.getElementById('titleWorld')
        this.section = 1;

        // Scroll, resize, and update functions.  Experience functions run the active World's functions.
        window.addEventListener("scroll", () => {
            this.scroll();
        });

        window.addEventListener("resize", () => {
            this.resize();
        });

        window.requestAnimationFrame(() => {
            this.update();
        });
    }

    async loadWorlds() {
        const worldOne = await world1();
        this.world1 = new World(this.canvas, worldOne);
        this.world1.active = true;

        this.cssEffects = new CSSEffects();
        this.chapters = new Chapters();

        const worldTwo = await world2();
        this.world2 = new World(this.canvas2, worldTwo);
        this.world2.scene.fog = worldTwo.fog;
        this.world2.scene.background = worldTwo.background;
        // this.world2.active = false;

        this.worldArray = [
            this.world1,
            this.world2
        ]

        this.world1.contents.raycastObjects[0].clickHandler = () => {
            this.changeWorld(this.world2)
        }
        this.world2.contents.raycastObjects[0].clickHandler = () => {
            this.changeWorld(this.world1)
        }
        // document.body.addEventListener("click", () => {
        //     if(this.world1.active == true) {
        //         this.changeWorld(this.world2);
        //     } else {
        //         this.changeWorld(this.world1);
        //     }
        // });
    }

    // Switch between active worlds
    changeWorld(destination) {
        for(let i = 0; i < this.worldArray.length; i++)
        {
            if(destination == this.worldArray[i])
            {
                this.worldArray[i].activateWorld(true)
            } else {
                this.worldArray[i].activateWorld(false);
            }
        }
    }
    

    resize() {
        this.sizes.resize();
        this.cssEffects ? this.cssEffects.resize() : false;

        this.world1 ? this.world1.resize() : false;
        this.world2 ? this.world2.resize() : false;
    }

    scroll() {
        this.sizes.scroll();
        // Divide experience into scrollable sections
        const currentSection =
            Math.round(this.sizes.scrollY / this.sizes.height) + 1;
        if (currentSection != this.section) {
            this.section = currentSection;

            switch (this.section) {
                case 1:
                    this.chapters.title();
                    break;
                case 2:
                    this.chapters.article1();
                    break;
                case 4:
                    this.chapters.article2();
                    break;
            }
        }

        // General scroll-based events
        this.world1 ? this.world1.scroll() : false;
        this.world2 ? this.world2.scroll() : false;
        // this.camera.scroll()
    }

    update() {
        this.time.update();
        this.cssEffects ? this.cssEffects.update() : false;

        this.world1 ? this.world1.update() : false;
        this.world2 ? this.world2.update() : false;

        window.requestAnimationFrame(() => {
            this.update();
        });
    }

    destroy() {
        this.sizes.off("resize");
        this.time.off("tick");

        // Traverse the scene
        this.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose();

                // Test each value in the material for dispose functions
                for (const key in child.material) {
                    const value = child.material[key];

                    if (value && typeof value.dispose === "function") {
                        value.dispose();
                    }
                }
            }
        });

        this.camera.controls.dispose();
        this.renderer.instance.dispose();

        if (this.debug.active) {
            this.debug.ui.destroy();
        }
    }
}
