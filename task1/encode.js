const through2 = require('through2');
const { program } = require('commander');
const { AlphabetLowerCase, AlphabetUpperCase } = require('./alphabet');

const encode = through2((data, enc, cb) => {
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
            return AlphabetLowerCase[
              (AlphabetLowerCase.indexOf(item) + +program.shift) %
                AlphabetLowerCase.length
            ];
          }
          return AlphabetUpperCase[
            (AlphabetUpperCase.indexOf(item) + +program.shift) %
              AlphabetUpperCase.length
          ];
        })
        .join('')
    )
  );
});

module.exports = {
  encode
};
