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
  const detailFile = fs.readFileSync('sketches/detail.mustache', 'utf-8')
  const detailOut = `sketches/${sketch.name}.html`
  fs.writeFileSync(detailOut, Mustache.render(detailFile, sketch))

  const sketchFile = fs.readFileSync('sketches/sketch.mustache', 'utf-8')
  const sketchOut = `sketches/_${sketch.name}.html`
  fs.writeFileSync(sketchOut, Mustache.render(sketchFile, sketch))
})