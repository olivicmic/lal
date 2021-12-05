# Lal 5.4.0 Release Notes
## May 6, 2021

## New Features
* **Added lal.isObject** - Will return true if given an ocject and not an array.
* **Added lal.objector** - WIll take an array of objects and will return an object of objects where each is keyed by its own name/title property.
* **Added objectify param to lal.api** - If the response contains an array of objects, convert it to an addressable object described above with objector.

# Lal 5.3.0 Release Notes
## May 6, 2021

## New Features
* **Added lal.log** - Will conditionally run console log alongside a provided function.
* **Fixed lal.dateFormat** - Some hours were not converting from 24 to 12 format correctly.

# Lal 5.2.0 Release Notes
## April 30, 2021

## New Features
* **Added lal.objectsMatch** - If two objects match, it returns true, if they don't then false.

# Lal 5.1.0 Release Notes
## April 29, 2021

## New Features
* **Added lal.uno** - Uno allows for functions to recieve params as objects or individual values.

# Lal 5.0.0 Release Notes
## April 27, 2021

## New Features
* **Updated lal.api** - Lal.api has been rewritten somewhat, with different parameters, potentially breaking some usage. So: 5.0.0

# Lal 4.2.0 Release Notes
## April 21, 2021

## New Features
* **Added lal.api** - Wraps Axios along with lal.queryString to simplify api requests, so that a query object can be passed alongside a route, and it will be appended to the url.

# Lal 4.1.0 Release Notes
## March 30, 2021

## New Features
* **Added lal.queryString** - Takes an object and returns and URI encoded query string.

# Lal 4.0.0 Release Notes
## March 12, 2021

## New Features
* **Revised lal.is.image and lal.is.doc** - lal.is.doc and lal.is.image return a short file type string when given a valid mimetype instead of true, but it will return false if is not valid. 

* **Added lal.ellipsis** - Takes a string as the first parameter and a cutoff length for the second. If the string is over the cutoff ' ...' ellipsis will be appended to the string at the cutoff point.

# Lal 3.4.0 Release Notes
## March 11, 2021

## New Features
* **Added lal.is.image and lal.is.doc** - lal.is.doc and lal.is.image simply take a mimetype string and returns whether or not is a valid image type. Images are currently limited to png, jpeg/jpg, and gifs, whereas docs are txt, pdf, and docs.

# Lal 3.0.1 Release Notes
## January 23, 2021

## New Features
* **Added lal.color.reverseSolo** - lal.color.reverseSolo functions like lal.color.reverse but returns a hex color with the rverse value assigend to the designated channel param (0-2). If a target param is provided, the main channel will lower as the value increases to hit that target, while the other channels will raise to meet it. The result being an inverse desaturation effect.

# Lal 3.0.0 Release Notes
## January 22, 2021

## New Features
* **Unified color functions under lal.color** - Exisitinng color functions are now called via lal.color and have been renamed. lal.contrasted has been split into lal.color.accent and lal.color.illuminate. lal.hexSetCheck is now lal.color.checkHexs. lal.isolateChannel is now lal.color.solo.

* **Added lal.color.reverse** - lal.color.reverse can be given the value of a single rgb channel and it will return, an opposite value. For example giving 0 will return 255, 250 returns 0, but a floor param can given to raise the lowest returned value. For example a floor of 24 will return values from 24-255. 

## New Features
* **Added contrasted function** - Contrasted is cosmetic function that when given a color will return colors intended to contrast against the input function. For example, a dark color will return an object with an 'accent' color that is much brighter, or vice-versa. Good for maintaining readability dynamically. The object also contain a 'bright' color which is brightened in a decreasing amount depending on the base color average value, which is good for subtle highlights.
Additionally a 'channel' (0,1,2 for rgb) parameter can be input into the function, which iniates a mode to illustration the saturation (or lack thereof) of a single channel color. For example inputting #330000 will return an almost gray color, and #ff0000 will return a bright red-orangish color. You can also put in full channel colors like #76cdef, which not designed for use with, produce interesting results.
It's output is ultimately subjective on my part.

* **Added isolateChannel function** - this function takes a 0-255 number and a channel number (0,1,2 for rgb) and will return a hex color with the desired value applied to only the desired channel. For example 255 on channel 0 will return #ff0000;

* **Added random function** - This does what it sounds like. lal.random() returns a random number 0-10. The parameter is will set a ceiling for a random number, such as lal.random(300) will return 0-300. Nothing new or inventive here, but why not?

* **Fixed dateFormat hour bug** - hour numbers were wrong, now they are right.

# Lal 1.3.0 Release Notes
## January 5, 2021

## New Features
* **Expanded dateFormat function** - You can now pass a parameter object with "date" or  "truncate" properties. Date allows for static date objects to be inputted. Truncate is a boolean, that if true will produce a more concise  14 character string such as "010220210505PM".

# Lal 1.2.0 Release Notes
## January 3, 2021

## New Features
* **Added array list function** - Returns a string list seperated with proper commas and an "and" before the last item.

# Lal 1.0.0 Release Notes
## December 19, 2020

## New Features
* **FreeGeoIP ip lookup removed** - FreeGeoIP requires an API key so it has been removed since this is just a quick and simple collection of IP lookups.
* **Dependcy updates** - Gulp and other packages updated. Removed run-sequence and gulp-refresh. Replaced 'request' with Axios.
