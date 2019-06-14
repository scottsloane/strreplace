# Javascript strReplace

Javascript string replace library by *Scott Sloane*.

## What is it
strReplace is a library built for NodeJS that helps manage replacing parts of any string.

## Why use it
String replacement in Javascript is not very straight forward. There are various approaches to it. Such as ``Regex.Replace()`` or ``String.Replace()``, but these come with their own issues.

> Regex.Replace()
> Regex can suffer from performance issues, plus is one extra syntax to maintain in your code if you are not already using it.

> String.Replace()
> String.Replace does not have the best performance. Also, it must use regex/g to remove all occurrences within a single string.

The most common solution is to chain ``String.Split()`` with ``String.Join()``. Internally this is the method used by strReplace.

> String.Split().Join()
> Has decent performance but when doing many replaces becomes very cumbersome to maintain.
> i.e.:
> mystring.split('.').join('_').spit('0').join('O').split('A').join('AA'); //does just three replacements

## How to use strReplace

### Install
Use NPM to Install
```bash
npm i @scottsloane/strreplace
```

### Include strReplace
Add at the top of your Javascript source:
```Javascript
const strReplace = require('@scottsloane/strreplace');
```

### (optional) Set Default replacements
Somewhere in your code before executing a default replacement add:
```Javascript
// Directly set defaults
strReplace.set([
	['.', '▄', true, true],
	['NOT ', '!', false, false]
]);
```
or:
```Javascript
// Set defaults one at a time
strReplace.add('O', '0', false, false);
strReplace.add(' 0R ', '~', false, false);
strReplace.add(' 0R', '', false, true);
strReplace.add('0R ', '', false, false);
```
### Do a replacement
```Javascript
let t_str = "OR 12~34.5678 NOT O.1.2.3.4 OR 4.3.2.1.0 OR";
let r_str = strReplace.do(t_str);
```

## API Reference
### strReplace.set(replacements)
#### Arguments
``replacements`` **Array**: List of default replacements to set
#### Returns
``none``
#### Function
``strReplace.set(replacements)`` allows for setting the entire set of default replacements at once. The replacement array must be formated as:

idx | typeof | description
----|--------|------------
0 | string | search
1 | string | replacement
2 | bool | Use Regex Escape on undo
3 | bool | Use in undo (reverse)

### strReplace.get()
#### Arguments
``none``
#### Returns
**Array**: Current default replacements
#### Function
Gets the list of current default replacements

### strReplace.add(search, replacement, regex, reverse)
#### Arguments
``search`` **String**: The search string to replace

``replacement`` **String**: The string to replace occurrences of search with

``regex`` **Boolean**: Escapes Regex character '[]' when true

``reverse`` **Boolean**: Includes the reverse replacement on undo

#### Returns
``none``

#### Function
Adds a replacement item to the default replacement list

### strReplace.del
#### Arguments
``search`` **String**: The search string to replace

``replacement`` **String**: The string to replace occurrences of search with

``regex`` **Boolean**: Escapes Regex character '[]' when true

``reverse`` **Boolean**: Includes the reverse replacement on undo

#### Returns
``none``

#### Function
Removes the specified replacement item from the default replacement list if it exists

### strReplace.do(str, [replacements])
#### Arguments
``str`` **String**: The string to apply replacements to.

*(optional)* `replacements` **Array**: a list of replacement items to use instead of the default replacement list

#### Returns
**String**: The string with applied replacements

#### Function
Takes a string and makes the replacements.

### strReplace.undo(str, regex, [replacements])
#### Arguments
``str`` **String**: The string to undo replacements from

``regex`` **Boolean**: Applies Regex Escape rules when true

*(optional)* ``replacements`` **Array**: a list of replacement items to use instead of the default replacement list

#### Returns
**String**: The string with applied reverse replacements

#### Function
Takes a string and reverses the replacements.

### strReplace.invalid
#### Function
Helper Object to identify and remove invalid characters or substrings within a string

### strReplace.invalid.set(invalids)
#### Arguments
``invalids`` **Array**: A list of characters or strings that are invalid
#### Returns
``none``
#### Function
Sets the list of default invalid items

### strReplace.invalid.get()
#### Arguments
``none``
#### Returns
**Array**: The default list of invalid items

### strReplace.invalid.check(str, [invalids])
#### Arguments
``str`` **String**: the string to check for invalids

*(Optional)* ``invalids`` **Array**: A list of invalid items to use instead of the default invalid item list
#### Returns
**Boolean**:
``true`` Invalids exist in string,
``false`` No invalids exist in string
#### Function
Checks a string to see if it contains any invalid items

### strReplace.invalid.remove(str, invalids)
#### Arguments
``str`` **String**: the string to remove invalids from

*(Optional)* ``invalids`` **Array**: A list of invalid items to use instead of the default invalid item list
#### Returns
**String** The string with invalid items removed
#### Function
Removes all occurrences of invalid items within a string
