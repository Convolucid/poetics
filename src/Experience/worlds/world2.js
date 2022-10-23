import * as THREE from 'three'
import Experience from '../Experience.js';

export default async function world2()
{
    const experience = new Experience();
    const time = experience.time;

    // Lights
    const light1 = new THREE.PointLight(0x00F3FF, 3);
	light1.position.set(10,10,10)

	const light2 = new THREE.PointLight(0x000FFF, 3);
	light2.position.set(-10,-10,10)

    // Doors
    function randInt(min, max) {
        if (max === undefined) {
            max = min;
            min = 0;
        }
        return Math.random() * (max - min) + min | 0;
    }

    function makeDoorCanvas() 
    {
        const ctx = document.createElement('canvas').getContext('2d');
		ctx.canvas.width = 256;
		ctx.canvas.height = 256;
	   
		ctx.globalAlpha = 1
		ctx.fillStyle = '#D7E4FF';
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		

		drawDoorPattern(ctx);

		return ctx.canvas;
	}

    function drawDoorPattern(ctx) {
		
		// hsl sets the random color to blue
		ctx.globalAlpha = 0.3
		let h = 240
		let s = Math.floor(Math.random() * 100);
		let l = Math.floor(Math.random() * 100);
		let gradient1 = ctx.createLinearGradient(0, 0, 100, 0)
			gradient1.addColorStop(0, 'hsl(' + h + ', ' + s/4 + '%, ' + l/4 + '%)')
			gradient1.addColorStop(1, 'hsl(' + h + ', ' + s + '%, ' + l + '%)')

		ctx.fillStyle = gradient1;
		// ctx.fillStyle = `#${randInt(0x1000000).toString(16).padStart(6, '0')}`;
		ctx.beginPath();
	
		const x = randInt(256);
		const y = randInt(256);
		const radius = randInt(10, 36);
		ctx.arc(x, y, radius, 0, Math.PI * 2);
		ctx.fillRect(x, y, radius, radius);
		ctx.fill();	
	};

    const doorGeometry = new THREE.PlaneGeometry(1, 2)
    const paintCanvas = makeDoorCanvas();
    const texture = new THREE.CanvasTexture(paintCanvas);

    function makeDoor() 
    {
        texture.minFilter = THREE.LinearFilter;
		texture.wrapS = THREE.ClampToEdgeWrapping;
		texture.wrapT = THREE.ClampToEdgeWrapping;

        const doorMaterial = new THREE.MeshPhongMaterial({
			map: texture,
		});

		
		const door = new THREE.Mesh(doorGeometry, doorMaterial);
	
	
		// if units are meters then 0.01 here makes size
		// of the label into centimeters.
		const doorBaseScale = 0.05;
		door.scale.x = paintCanvas.width  * doorBaseScale;
		door.scale.y = paintCanvas.height * doorBaseScale;

        return door;
    }

    const door = makeDoor()
    door.update = () => {
        drawDoorPattern(paintCanvas.getContext('2d'))
        texture.needsUpdate = true
    }
    door.position.z = -5;



	// Words
	function makeLabelCanvas(size, text, color) {
		const borderSize = 2;
		const ctx = document.createElement('canvas').getContext('2d');
		const font =  `${size}px bold sans-serif`;
		ctx.font = font;
		// measure how long the name will be
		const doubleBorderSize = borderSize * 2;
		const width = ctx.measureText(text).width + doubleBorderSize;
		const height = size + doubleBorderSize;
		ctx.canvas.width = width;
		ctx.canvas.height = height;
	   
		// need to set font again after resizing canvas
		ctx.font = font;
		ctx.textBaseline = 'top';
		ctx.globalAlpha = 0
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, width, height);
		ctx.globalAlpha = 1
		ctx.fillStyle = color;
		ctx.fillText(text, borderSize, borderSize);
	   
		return ctx.canvas;
	}

    function makeLabel(size, text, color) {
	
		const canvas = makeLabelCanvas(size, text, color);
		const texture = new THREE.CanvasTexture(canvas);
	
		texture.minFilter = THREE.LinearFilter;
		texture.wrapS = THREE.ClampToEdgeWrapping;
		texture.wrapT = THREE.ClampToEdgeWrapping;
	
		// const labelMaterial = new THREE.MeshBasicMaterial({
		//     map: texture,
		//     side: THREE.DoubleSide,
		//     transparent: true,
		// });
	
		const labelMaterial = new THREE.SpriteMaterial({
			map: texture,
			transparent: true,
		});
	
		
		// label = new THREE.Mesh(labelGeometry, labelMaterial);
		const label = new THREE.Sprite(labelMaterial);
	
		// if units are meters then 0.01 here makes size
		// of the label into centimeters.
		const labelBaseScale = 0.01;
		label.scale.x = canvas.width  * labelBaseScale;
		label.scale.y = canvas.height * labelBaseScale;
	
		return(label)
	}
    
    const label1 = makeLabel(48, 'the Word Was God', 'white');
	const label2 = makeLabel(32, 'the Words Were Big God, a true tragedy of compliance', 'white');
	const label3 = makeLabel(36, 'the word was a small god, a splintering seed, a moment hatched among Possibility', 'white');
	const label4 = makeLabel(54, 'the Word was a fever-breaking sweat on the brow of the universe', 'white');
	const label5 = makeLabel(82, 'the Word is a weapon', 'white');
	const label6 = makeLabel(16, 'the Word must be crusted in salt', 'white');
	const label7 = makeLabel(48, 'the Word was not', 'white');
	const label8 = makeLabel(24, 'mister thought and missus image love each other very much and the Word is in a stork sack', 'white');
	const label9 = makeLabel(50, 'the word is a ghost in the fog', 'white');
	const label10 = makeLabel(36, 'the Word had her way with you', 'white');

	const label11 = makeLabel(48, 'the Word defies / deifies', 'white');
	const label12 = makeLabel(32, 'the Word cannot be a question', 'white');
	const label13 = makeLabel(36, 'the Word was the bolt itself.  Babel burst at the seams.', 'white');
	const label14 = makeLabel(54, 'the Word, all dressed in ink and paint and neon', 'white');
	const label15 = makeLabel(82, 'the Word is a wet mirror', 'white');
	const label16 = makeLabel(16, 'the Word is gray matter grunting', 'white');
	const label17 = makeLabel(48, 'the Word must be', 'white');
	const label18 = makeLabel(24, 'the word ate wolf meat and howled', 'white');
	const label19 = makeLabel(50, 'the words are wheels in the wind', 'white');
	const label20 = makeLabel(36, 'the Word has a key for you', 'white');

	const label21 = makeLabel(48, 'the Word blinds the unworthy', 'white');
	const label22 = makeLabel(32, 'the Word has never been immutable and always will be', 'white');
	const label23 = makeLabel(36, 'her first word was secret.', 'white');
	const label24 = makeLabel(54, 'the Word washed ashore, a bobbing bottle in the sky foam.  We read it through the stained glass.', 'white');
	const label25 = makeLabel(82, 'the Word cannot be satisfied', 'white');
	const label26 = makeLabel(16, 'there are no words for what came before silence', 'white');
	const label27 = makeLabel(48, 'the whole Word must never come true', 'white');
	const label28 = makeLabel(24, 'the word was already ancient when voices learned to wield it', 'white');
	const label29 = makeLabel(50, 'these words are all for you', 'white');
	const label30 = makeLabel(36, 'and the Word was good.', 'white');

	const label31 = makeLabel(64, 'the Word is a fit of making', 'white');
	const label32 = makeLabel(72, 'the word is a fit of order', 'white');
	const label33 = makeLabel(72, 'the word is another word', 'white');
	const label34 = makeLabel(72, 'the word poked a hole in a glitter balloon', 'white');
	const label35 = makeLabel(32, 'the Word swells', 'white');
	const label36 = makeLabel(18, 'the Word shrinks, petals closing', 'white');
	const label37 = makeLabel(24, 'women study the Word and men long to speak it', 'white');
	const label38 = makeLabel(36, 'the Word waited with a small blade in the shadows', 'white');
	const label39 = makeLabel(72, 'nothing I have ever done compares to the wyrd', 'white');
	const label40 = makeLabel(24, 'the soldier says his first words', 'white');

	const label41 = makeLabel(64, 'the Word wants to go home', 'white');
	const label42 = makeLabel(24, 'the wyrd is a central scar', 'white');
	const label43 = makeLabel(72, 'the word births the worldEater', 'white');
	const label44 = makeLabel(72, 'the word guides itself into the crevice', 'white');
	const label45 = makeLabel(32, 'the Word gilds the altar', 'white');
	const label46 = makeLabel(18, 'the Word flexes in harmony', 'white');
	const label47 = makeLabel(24, 'five hours ago the Word wished you well', 'white');
	const label48 = makeLabel(36, 'we bear words', 'white');
	const label49 = makeLabel(72, 'the true Word is one, the binding, the strong nuclear force', 'white');
	const label50 = makeLabel(24, 'there are no such things as words', 'white');

	const label51 = makeLabel(64, 'the Word is wasted on them', 'white');
	const label52 = makeLabel(72, 'the wurd wants to be underestimated', 'white');
	const label53 = makeLabel(72, 'the word is a pattern in a spiderweb', 'white');
	const label54 = makeLabel(72, 'the word is written in the blood of cartographers', 'white');
	const label55 = makeLabel(32, 'the Word gelds the stallion', 'white');
	const label56 = makeLabel(18, 'once upon a time when the Word was very young, another word spoke eloquently in Its ear', 'white');
	const label57 = makeLabel(24, 'five hours from now the Word pinches your tongue', 'white');
	const label58 = makeLabel(36, 'a million like me, the word knows', 'white');
	const label59 = makeLabel(72, 'Word walking, word asking', 'white');
	const label60 = makeLabel(24, 'the word is clear and bright', 'white');


    const labels = [label1, label2, label3, label4, label5, label6, label7, label8, label9, label10];
	const labels2 = [label11, label12, label13, label14, label15, label16, label17, label18, label19, label20];
	const labels3 = [label21, label22, label23, label24, label25, label26, label27, label28, label29, label30];
	const labels4 = [label31, label32, label33, label34, label35, label36, label37, label38, label39, label40];
	const labels5 = [label41, label42, label43, label44, label45, label46, label47, label48, label49, label50];
	const labels6 = [label51, label52, label53, label54, label55, label56, label57, label58, label59, label60];

    function addContentsToArray(contents, targetArray)
    {
        for(let i=0; i < contents.length; i++)
        {
            contents[i].modifier = Math.random() - 0.5
            contents[i].modifier2 = Math.random() - 0.5
            contents[i].update = () => wordFloat(contents[i])

    
            targetArray.push(contents[i])
        }
    }

    function wordFloat(words) 
    {
        let r = words.modifier
        let r2 = words.modifier2
        let t = time.elapsed


        words.position.set(
            Math.sin(t * r * 0.0001) * r2 * 50,
            Math.cos(t * r2 * 0.00007) * r * 50,
            Math.sin(t * r * 0.00005) * r2 * 50,
        )
    }
   
    const world2 = [
        light1,
        light2,
        door
    ]

    addContentsToArray(labels, world2)
    addContentsToArray(labels2, world2)
    addContentsToArray(labels3, world2)
    addContentsToArray(labels4, world2)
    addContentsToArray(labels5, world2)
    addContentsToArray(labels6, world2)

    world2.fog = new THREE.FogExp2(0x6699FF, 0.015)
    world2.background = new THREE.Color(0x3366bb);

	world2.enableWorld = () => {

    }

    world2.disableWorld = () => {

    }
    

    return world2;
}