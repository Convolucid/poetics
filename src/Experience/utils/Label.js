import * as THREE from 'three'

export default class Label
{
    constructor(size, text, color)
    {
        const canvas = this.makeLabelCanvas(size, text, color)
        this.instance = this.makeLabel(canvas)
    }

    makeLabelCanvas(size, text, color)
    {
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

    makeLabel(canvas)
    {
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
	
		return label;
    }
}