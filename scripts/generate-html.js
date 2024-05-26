import Mustache from 'mustache'
import {globSync} from 'glob'
import fs from 'fs'
import path from 'path'

// const view = {
//   title: "Joe",
//   calc: () => ( 2 + 4 )
// };



// const output = Mustache.render("{{title}} spends {{calc}}", view);

// console.log(output)

const sketches = globSync('sketches/*.ts').map(file => {
  return {
    "name": path.basename(file).replace(/\.ts$/, '')
  }
})


globSync('index.mustache').forEach(file => {
  const inputFile = fs.readFileSync(file, 'utf-8')
  const outputPath = file.replace(/\.mustache$/, '.html')
  fs.writeFileSync(outputPath, Mustache.render(inputFile, { sketches }))
})