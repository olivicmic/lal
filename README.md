# Lal
Assorted NodeJS Utilities

## Installation

`npm install pic-pipe --save`

## Usage

Include:

```Javascript
lal = require('lal');
```

### dateFormat
```Javascript
lal.dateFormat();
// returns a date string like: Oct_4_2017_10.12_AM
```

### byteFormat
```Javascript
lal.byteFormat(*bytes*, *decimals*);

lal.byteFormat();
// Will return a string: '0 Byte'

lal.byteFormat(56739,1);
// Will return a string: '56.7 KB'
```

## Tests

`npm test`
