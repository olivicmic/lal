# Lal
Assorted NodeJS Utilities

## Installation

`npm install lal --save`

## Usage

Include:

```Javascript
lal = require('lal');
```

### generateUnique

Will generate a string of random characters, and can be checked against existing strings. It by default uses this alphabet but can use a custom alphabet or array of strings.

- `input.charSet {string || array}`: Alphabet to generate from or an array of strings.
- `input.charCount {number}`: string length, or amount of words in a single string if charSet is an array.
- `input.existing {array}`: an array of existing strings to test against so that returned string is unique.
- `input.whiteSpace {boolean}`: Will add spaces between characters or words.
- `input.sentences {string}`: Will add sentence capitalization, with commas and punctuation to string. Will only work for an array charSet
- `input.preset {string}`: Use an optional preset dictionary array or alpahabet string for charSet. Values:
   - `'lorem ipsum'` uses 'greek'/lorem ipsum dictionary array.
   - `'hex'` uses '0123456789abcdef' hex alpahabet.

```Javascript

var unique = lal.generateUnique(input);

console.log(unique);

// Will return a 6 character string like: 'pg99xy'

lal.generateUnique({ charCount: 20 });

// Will return a 20 character string like: 'gm4vex56vpqmqj22mkdq'

lal.generateUnique({ charSet: 'abc' });

// Will return a 6 character string like: 'cbabba'

testSet = [ 'mzw', 'pxk', 'kvz', '6rd', 'gqg', '2r4', 'abq' ];

lal.generateUnique({ charCount: 3, existing: testSet });

// Will return a 3 character unique from testSet strings like: 'yv4'

var myWords = charSet: [
	'Apple',
	'Donut',
	'Banana',
	'Pizza',
	'Grape',
	'Cherry',
	'Taco',
	'Grape',
	'Sandiwch',
	'Orange',
	'Spaghetti',
	'Salad',
	'Sushi',
	'Pho',
	'Tangerine',
	'Bacon'
];

lal.generateUnique({ charCount: 4, charSet: myWords });

// Will return a 6 character string like: 'GrapePizzaAppleDonut'

lal.generateUnique({ charCount: 30, whiteSpace: true, preset: 'lorem ipsum', sentences: true });

// Will return a string like: 
// 'Fugiat tempor, occaecat excepteur qui qui pariatur. Velit nulla lorem ullamco nostrud. Est nulla nostrud? Quis est cillum ex ut officia id aute, reprehenderit, consequat tempor elit eu anim. Qui!'

lal.generateUnique({ charCount: 6, preset: 'hex' });

// Will return a string like: '207e67'

```

### lookupIP
`lal.lookupIP(input, output)`

#### input:
- `input.ip {string}`: IP to lookup
- `input.host {string}`: Preferred host. options:
   - `'ip-api'` ip-api.com (default)
   - `'ipapi'` ipapi.co
   - `'extreme'` extreme-ip-lookup.com
   - `'ipinfo'` ipinfo.io

#### output:
- `err`: error callback
- `result`: ip lookup json object. Properties vary depending on host selected.

```Javascript
lal.lookupIP({ ip: '208.80.152.201', host: 'extreme'}, (err, result) => {
	if (err) console.log(err); // returns error details
	console.log(result);
});

/* 
result example:
{ businessName: 'Wikimedia Foundation Inc.',
  businessWebsite: '',
  city: 'San Francisco',
  continent: 'North America',
  country: 'United States',
  countryCode: 'US',
  ipName: '',
  ipType: 'Business',
  isp: 'Wikimedia Foundation',
  lat: '37.7898',
  lon: '-122.3942',
  org: 'Wikimedia Foundation Inc.',
  query: '208.80.152.201',
  region: 'California',
  status: 'success' }
 */

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
// Will return a string: '0 Bytes'

lal.byteFormat(56739,1);
// Will return a string: '56.7 KB'
```

### hexSetCheck

Will validate an array of color hex values using [hex-color-regex](https://github.com/regexhq/hex-color-regex) returning an array with corresponding true/false values.

```Javascript

lal.hexSetCheck(['#89f', '#c7c7c7', '090cff', '#ddd']);

// Will return [ true, true, false, true ]

```

### arrayList

Will return any array as a string with each item seperarated by commas and an "and" before the last item. Single item arrays will be only that item. Empty arrays will return null.

```Javascript

lal.arrayList(['apple','banana','orange','watermelon']);

// Will return 'apple, banana, orange and watermelon'

```

## Tests

`npm test`
