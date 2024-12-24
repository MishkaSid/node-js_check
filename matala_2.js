//modules
const fs = require('fs')
const path = require('path')

//variables
const textDir = 'text'
let output = ""
const outputFilePath = path.join(__dirname, 'output.txt');
const files = fs.readdirSync(textDir)

files.forEach((file, index) => {
    const filePath = path.join(textDir, file);
    //takes file and split it into lines
    const lines = fs.readFileSync(filePath, 'utf8').split('\n').filter(line => line.trim() !== '');
    //how many lines to take
    const linesToTake = index + 1;
    //Slice the intended lines and join them
    const selectedLines = lines.slice(0, linesToTake).join('\n');


    output+=selectedLines + '\n';
});

// Write the final output to the output file
fs.writeFileSync(outputFilePath, output);
console.log(`Data successfully written to ${outputFilePath}`);
