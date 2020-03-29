Usage example: 

```
node index.js -a encode -s 7 -o 'input.txt' -i 'output.txt'
```

```
node index.js --action decode -shift 7 --input 'input.txt' --output 'output.txt'
```

1.  **-s, --shift**: a number, values 0-26, required
2.  **-i, --input**: an input file, example: 'input.txt', optional
3.  **-o, --output**: an output file, example: 'output.txt', optional
4.  **-a, --action**: an action, values 'encode'/'decode' required
