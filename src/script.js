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

canvas1.classList.add('z-top-canvas');
canvas2.classList.add('z-bottom-canvas');

const experience = new Experience(canvas1, canvas2);
