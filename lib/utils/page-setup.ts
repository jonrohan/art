const controlsContainer = document.getElementById("controls")

function controlWidth() {
  return document.getElementById("controls").offsetWidth;
}

export function basicSetup() {
  createCanvas(windowWidth - controlWidth(), windowHeight);
  rectMode(CENTER).noFill().frameRate(30);

  const pauseButton = document.createElement('button')
  pauseButton.textContent = 'Pause'
  pauseButton.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
  pauseButton.onclick = () => {
    if (isLooping()) {
      noLoop()
      pauseButton.textContent = 'Play'
    } else {
      loop()
      pauseButton.textContent = 'Pause'
    }
  }
  controlsContainer.appendChild(pauseButton)
  const hr = document.createElement('hr')
  hr.className = 'my-4'
  controlsContainer.appendChild(hr)
}

export function basicResize() {
  resizeCanvas(windowWidth - controlWidth(), windowHeight);
}

export function addFormControl(label: string, control: HTMLElement) {
  const template = (document.querySelector('template#form-control') as HTMLTemplateElement).content.cloneNode(true) as HTMLElement
  template.appendChild(control)
  const labelElement = template.querySelector('label')
  const id = crypto.randomUUID()
  labelElement.textContent = label
  labelElement.setAttribute('for', id)
  control.id = id
  controlsContainer.appendChild(template)
  control.addEventListener('change', (event) => {
    console.log(event.target.value)
  })
}