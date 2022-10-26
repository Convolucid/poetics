import * as THREE from 'three'

export default class Door
{
    constructor(baseScale)
    {
        const doorGeometry = new THREE.PlaneGeometry(1, 2)
        this.paintCanvas = this.makeDoorCanvas();
        this.texture = new THREE.CanvasTexture(this.paintCanvas);

        this.texture.minFilter = THREE.LinearFilter;
		this.texture.wrapS = THREE.ClampToEdgeWrapping;
		this.texture.wrapT = THREE.ClampToEdgeWrapping;

        const doorMaterial = new THREE.MeshPhongMaterial({
			map: this.texture,
		});

		
		this.instance = new THREE.Mesh(doorGeometry, doorMaterial);
	
	
		// if units are meters then 0.01 here makes size
		// of the label into centimeters.
		const doorBaseScale = baseScale;
		this.instance.scale.x = this.paintCanvas.width  * doorBaseScale;
		this.instance.scale.y = this.paintCanvas.height * doorBaseScale;

        this.instance.update = () => {this.update()}
    }

    randInt(min, max)
    {
        if (max === undefined) {
            max = min;
            min = 0;
        }
        return Math.random() * (max - min) + min | 0;
    }

    makeDoorCanvas()
    {
        const ctx = document.createElement('canvas').getContext('2d');
		ctx.canvas.width = 256;
		ctx.canvas.height = 256;
	   
		ctx.globalAlpha = 1
		ctx.fillStyle = '#D7E4FF';
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		

		this.drawDoorPattern(ctx);

		return ctx.canvas;
    }

    drawDoorPattern(ctx)
    {
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
	
		const x = this.randInt(256);
		const y = this.randInt(256);
		const radius = this.randInt(10, 36);
		ctx.arc(x, y, radius, 0, Math.PI * 2);
		ctx.fillRect(x, y, radius, radius);
		ctx.fill();	
    }

    update()
    {
        this.drawDoorPattern(this.paintCanvas.getContext('2d'))
        this.texture.needsUpdate = true
    }
}