import './style.css'
import html from './index.html'
import Experience from './Experience/Experience.js'

import poem1 from './poems/poem1.md'
import poem2 from './poems/poem2.md'

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

const article1 = document.getElementById('poem1')
article1.innerHTML = poem1
const article2 = document.getElementById('poem2')
article2.innerHTML = poem2

