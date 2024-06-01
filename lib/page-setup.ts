function controlWidth() {
  return document.getElementById("controls").offsetWidth;
}

export function basicSetup() {
  createCanvas(windowWidth - controlWidth(), windowHeight);
  rectMode(CENTER).noFill().frameRate(30);
}

export function basicResize() {
  resizeCanvas(windowWidth - controlWidth(), windowHeight);
}

const controlsContainer = document.getElementById("controls")

export function addFormControl(label: string, control: HTMLElement) {
  const template = (document.querySelector('template#form-control') as HTMLTemplateElement).content.cloneNode(true) as HTMLElement
  template.appendChild(control)
  template.querySelector('label').textContent = label
  controlsContainer.appendChild(template)
}