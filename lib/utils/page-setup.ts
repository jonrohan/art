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
  const id = control.id || crypto.randomUUID()
  const template = (document.querySelector('template#form-control') as HTMLTemplateElement).content.cloneNode(true) as HTMLElement
  const labelElement = template.querySelector('label')
  const rowElement = document.createElement('div')

  rowElement.className = 'mb-5 relative'

  labelElement.textContent = label
  labelElement.setAttribute('for', id)

  control.id = id
  control.addEventListener('change', (event) => {
    const input = event.target as HTMLInputElement
    input.setAttribute('data-value', input.value)
  })

  template.appendChild(control)
  rowElement.appendChild(template)
  controlsContainer.appendChild(rowElement)
}

export function createRange(value: number, min: number, max: number, step: number, id?: string) {
  const range = document.createElement('input');
  range.id = id || crypto.randomUUID()
  range.type = 'range'
  range.value = value.toString()
  range.setAttribute('data-value', value.toString())
  range.step = step.toString()
  range.min = min.toString()
  range.max = max.toString()
  return range
}