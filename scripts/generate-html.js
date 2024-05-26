import Mustache from 'mustache'
import {globSync} from 'glob'
import fs from 'fs'
import path from 'path'

const sketches = globSync('sketches/*.ts').map(file => {
  return {
    "name": path.basename(file).replace(/\.ts$/, ''),
    "path": file
  }
})

// Render index.mustache to index.html
globSync('index.mustache').forEach(file => {
  const inputFile = fs.readFileSync(file, 'utf-8')
  const outputPath = file.replace(/\.mustache$/, '.html')
  fs.writeFileSync(outputPath, Mustache.render(inputFile, { sketches }))
})

// Render sketch.mustache to sketch.html
sketches.forEach(sketch => {
  const inputFile = fs.readFileSync('sketches/template.mustache', 'utf-8')
  const outputPath = `sketches/${sketch.name}.html`
  fs.writeFileSync(outputPath, Mustache.render(inputFile, sketch))
})