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
`lal.dateFormat({ date: Date, truncate: true})`

#### input:
- `input.date {date object}`: IP to lookup
- `input.truncate {boolean}`: Preferred host


```Javascript
lal.dateFormat();
// returns the current date in a string like: Oct_4_2017_10.12_AM

lal.dateFormat({date: new Date(Date.UTC(96, 1, 2, 3, 4, 5))});
// returns Feb_1_1996_7.04_PM
 
lal.dateFormat({truncate: true});
// returns 010520210741PM 
```

### byteFormat
```Javascript
lal.byteFormat(*bytes*, *decimals*);

lal.byteFormat();
// Will return a string: '0 Bytes'

lal.byteFormat(56739,1);
// Will return a string: '56.7 KB'
```

### checkHexs

Will validate an array of color hex values using [hex-color-regex](https://github.com/regexhq/hex-color-regex) returning an array with corresponding true/false values.

```Javascript

lal.color.checkHexs(['#89f', '#c7c7c7', '090cff', '#ddd']);

// Will return [ true, true, false, true ]

```

### arrayList

Will return any array as a string with each item seperarated by commas and an "and" before the last item. Single item arrays will be only that item. Empty arrays will return null.

```Javascript

lal.arrayList(['apple','banana','orange','watermelon']);

// Will return 'apple, banana, orange and watermelon'

```


### random
Returns a random number between 0-10, or 0 to whatev er number parameter you specify. Nothing special or new.

```Javascript

lal.random();

// Will 0 to 10

lal.random(999);

// Will 0 to 999

```

## lal.color

### accent

Returns a color object with amn accent color that is dark or bright depending on the average value of the input color, as well as a color that is brightened at a decreasing amount depnding on the brightness of the base color.

```Javascript

lal.color.accent({color: '#810059'});

/* 
  Return example:
  {
    accent: '#1f0000', // brightend or darken color based on the input color, in this case: dark
    bright: '#bf4b90' // brightened version.
  }
*/
```
### illuminate

With a channel parameter it will return a single color intended to exagerate the saturation (or lack thereof) of a single channel color. Providing a floor param value will raise the brightness of the darkest color. With a limit param the brightness of a full color can be limited or increased. The range param, alongside floor can be used to scale value changes.

```Javascript

lal.color.illuminate({color: '#ff0000', channel: 0});

// returns #ff623c, blue colors
// 
// something like color: #00000d, channel: 2 returns a grayish #464753
// 
// though there is not the intended purpose, put in different colors and channels and see what happens!
```


### checkHexs

Will validate an array of color hex values using [hex-color-regex](https://github.com/regexhq/hex-color-regex) returning an array with corresponding true/false values.

```Javascript

lal.color.checkHexs(['#89f', '#c7c7c7', '090cff', '#ddd']);

// Will return [ true, true, false, true ]

```

### solo

Solo, when given the value of a single RGB channel will return a hex color with the input value assigned to specified channel.

```Javascript

lal.color.solo({ channel: 0, color: 255});

// Will return #ff0000

```

### reverse

Reverse takes a single 0-255 rgb channel value and returns the an opposite number. For example 0 returns 255, 255 returns 0. To set a lowest possible returned value, set a floor value in the second param.

```Javascript

lal.color.reverse(255, 24);

// Will return 24;

```

### reverseSolo

The reverseSolo function returns a hex color, which the inverse of the provided value assign to the provied channel. If a target value is provided as the third parameter then, as the input value approaches 255, the other channels will increase to match.

```Javascript

lal.color.reverseSolo(255);

// Will return #000000, the inverse of the value;

lal.color.reverseSolo(0,1);

// Will return #00ff00, the inverse of the value, assigned on the green (1) channel
 
lal.color.reverseSolo(255,2,23);

// Will return #171717, the blue (2) channel will lower to the target value, while the other channels raise to the target value. The result being a 0 value produces the full color of selected value, and as the value increases it becomes desaturated.

```


## Tests

`npm test`
