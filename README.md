# Lal
Assorted NodeJS Utilities

## Installation

`npm install pic-pipe --save`

## Usage

Include:

```Javascript
lal = require('lal');
```

### generateUnique

Will generate a string of random characters, and can be checked against existing strings. It by default uses this alphabet but can use a custom alphabet or array of strings.

- `input.charSet {string || array}`: Alphabet to generate from or an array of strings.
- `input.charCount {number}`: string length, or amount of words in a single string if charSet is an array.
- `input.existing {number}`: an array of existing strings to test against so that returned string is unique.

```Javascript

lal.generateUnique();

// Will return something 6 character string like: 'pg99xy'

lal.generateUnique({ charCount: 20 });

// Will return something 20 character string like: 'gm4vex56vpqmqj22mkdq'

lal.generateUnique({ charSet: 'abc' });

// Will return something 6 character string like: 'cbabba'

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

lal.generateUnique({ charCount: 10, charSet: myWords });

// Will return something 6 character string like: 'GrapePizzaAppleDonutSpaghettiBananaPizzaCherryGrapeDonut'

```

### lookupIP
`lal.lookupIP(input, output)`

#### input:
- `input.ip {string}`: IP to lookup
- `input.host {string}`: Preferred host. options:
   - `'ip-api'` ip-api.com (default)
   - `'freegeoip'` freegeoip.net
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
// Will return a string: '0 Byte'

lal.byteFormat(56739,1);
// Will return a string: '56.7 KB'
```

### hexSetCheck

Will validate an array of color hex values using [hex-color-regex](https://github.com/regexhq/hex-color-regex) returning an array with corresponding true/false values.

```Javascript

lal.hexSetCheck(['#89f', '#c7c7c7', '090cff', '#ddd']);

// Will return [ true, true, false, true ]

```

## Tests

`npm test`
