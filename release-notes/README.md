# Lal 2.0.0 Release Notes
## January 18, 2021

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
