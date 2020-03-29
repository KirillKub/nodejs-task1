const { program } = require('commander');
const fs = require('fs');

let transformerValue;
let isInput = true;
let isOutput = true;

function checkValues() {
  if (!program.action || !program.shift) {
    process.on('exit', code => {
      return console.log(`Bad action or shift, exit with code ${code}`);
    });
    return process.exit(8); // eslint-disable-line
  }
  if (isNaN(+program.shift) || +program.shift < 0 || +program.shift > 26) {
    process.on('exit', code => {
      return console.log(`Bad value for shift, exit with code ${code}`);
    });
    return process.exit(8); // eslint-disable-line
  }
  if (program.action === 'encode') {
    transformerValue = 'encode';
  } else if (program.action === 'decode') {
    transformerValue = 'decode';
  } else {
    process.on('exit', code => {
      return console.log(`Bad action, exit with code ${code}`);
    });
    return process.exit(8); // eslint-disable-line
  }
}

function checkFiles() {
  function throwExit() {
    process.on('exit', code => {
      return console.log(`File not found, exit with code ${code}`);
    });
    return process.exit(8); // eslint-disable-line
  }
  try {
    if (fs.existsSync(program.input)) { // eslint-disable-line
      // file exists
    } else program.input === 'default' ? (isInput = false) : throwExit(); // eslint-disable-line
  } catch (err) {
    console.log(err);
  }
  try {
    if (fs.existsSync(program.output)) { // eslint-disable-line
      // file exists
    } else program.output === 'default' ? (isOutput = false) : throwExit(); // eslint-disable-line
  } catch (err) {
    console.log(err);
  }
}

function getInput() {
  return isInput;
}

function getOutput() {
  return isOutput;
}

function getTransformer() {
  return transformerValue;
}

module.exports = {
  checkValues,
  getTransformer,
  checkFiles,
  getInput,
  getOutput
};
