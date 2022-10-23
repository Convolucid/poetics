import './style.css'
import html from './index.html'
import Experience from './Experience/Experience.js'

function component(htmlStructure) {
    const element = document.createElement("div");
    element.classList.add("container");
    element.innerHTML = htmlStructure;

    return element;
}

const bodyHTML = component(html);
document.body.appendChild(bodyHTML);

const canvas1 = document.getElementById('canvas1');
const canvas2 = document.getElementById('canvas2');

function styleCanvas(canvas) {
    canvas.style.position = 'fixed'
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.outline = 'none';
    canvas.style.minHeight = '100vh';
}

styleCanvas(canvas1);
styleCanvas(canvas2);

canvas1.style.zIndex = 0;
canvas2.style.zIndex = -10;

const experience = new Experience(canvas1, canvas2);

