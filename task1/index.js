const { program } = require('commander');
const { pipeline } = require('stream');
const fs = require('fs');
const { encode } = require('./encode');
const { decode } = require('./decode');
const stream = require('stream');
const {
  checkValues,
  getTransformer,
  checkFiles,
  getInput,
  getOutput
} = require('./check');

program
  .option('-s, --shift [number]', 'a shift', '')
  .option('-i, --input [file]', 'an input file', 'default')
  .option('-o, --output [file]', 'an output file', 'default')
  .option('-a, --action [value]', 'an action encode/decode', '');
program.parse(process.argv);

const input = program.input;
const output = program.output;
let readStream;
let transformer = '';
checkValues();
checkFiles();
const isInput = getInput();
const isOutput = getOutput();
transformer = getTransformer() === 'encode' ? encode : decode;

if (!isInput) {
  readStream = process.stdin.on('readable', () => {
    let chunk; // eslint-disable-line
    while ((chunk = process.stdin.read()) !== null) { // eslint-disable-line
      continue;
    }
  });
}

const echoStream = new stream.Writable();
echoStream._write = function writeStream(chunk, encoding, done) {
  process.stdout.write(chunk.toString());
  done();
};

pipeline(
  isInput ? fs.createReadStream(input) : readStream,
  transformer,
  isOutput ? fs.createWriteStream(output, { flags: 'a' }) : echoStream,
  err => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
);
