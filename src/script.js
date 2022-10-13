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

const experience = new Experience(document.getElementById('canvas1'), document.getElementById('canvas2'))
