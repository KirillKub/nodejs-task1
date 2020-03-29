const through2 = require('through2');
const { program } = require('commander');
const { AlphabetLowerCase, AlphabetUpperCase } = require('./alphabet');

const decode = through2((data, enc, cb) => {
  cb(
    null,
    new Buffer.from(
      data
        .toString()
        .split('')
        .map(item => {
          if (
            AlphabetUpperCase.indexOf(item) === -1 &&
            AlphabetLowerCase.indexOf(item) === -1
          ) {
            return item;
          }
          if (AlphabetLowerCase.includes(item)) {
            const index = AlphabetLowerCase.indexOf(item) - +program.shift;
            return AlphabetLowerCase[
              index < 0 ? AlphabetLowerCase.length + index : index
            ];
          }
          const index = AlphabetUpperCase.indexOf(item) - +program.shift;
          return AlphabetUpperCase[
            index < 0 ? AlphabetUpperCase.length + index : index
          ];
        })
        .join('')
    )
  );
});

module.exports = {
  decode
};
