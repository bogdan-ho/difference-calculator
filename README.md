#### Hexlet tests and linter status:
[![Actions Status](https://github.com/bogdan-ho/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/bogdan-ho/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/6a6a42a31b2d693da17c/maintainability)](https://codeclimate.com/github/bogdan-ho/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6a6a42a31b2d693da17c/test_coverage)](https://codeclimate.com/github/bogdan-ho/frontend-project-lvl2/test_coverage)

# Difference Calculator (Gendiff)
Program that determines the difference between two data structures.

## Utility Features
- Support for different input formats: yaml, json
- Generating a report in the form of plain text, stylish and json

## How to install
- Clone a repository
- Go to the working directory of the project `cd frontend-project-lvl2`
- Use `make install`
- Install the package into the system using the `npm link`. It may require starting with `sudo`.

## How it works
The application detects file format based on its extension. It converts config to an object structure (AST), same for different formats.
Then the app creates a diff by comparing the ASTs recursively with a [function](https://github.com/bogdan-ho/frontend-project-lvl2/blob/db0e0bc5c0ca9b4be44e23b6b834babc507a3f7b/src/index.js#L20). Finally, the app renders diff in the selected `format` to the console.

### Options
``
-v, --version        output the version number
-f, --format [type]  output format
-h, --help           output usage information
``

#### Plain JSON files comparison
[![asciicast](https://asciinema.org/a/FPSeWpgEE4t9aVcUktwDDqupH.svg)](https://asciinema.org/a/FPSeWpgEE4t9aVcUktwDDqupH)

#### Plain YAML files comparison
[![asciicast](https://asciinema.org/a/QJ7UfUfV8cuGZPHJ6n69DZoDr.svg)](https://asciinema.org/a/QJ7UfUfV8cuGZPHJ6n69DZoDr)

#### Nested JSON & YAML files comparison
[![asciicast](https://asciinema.org/a/Le8sDO3SKAg1oLMjb1rRe5z69.svg)](https://asciinema.org/a/Le8sDO3SKAg1oLMjb1rRe5z69)

#### Files comparison with '--format plain' output
[![asciicast](https://asciinema.org/a/VSquTkgVk6Mccql1OyTkZbasv.svg)](https://asciinema.org/a/VSquTkgVk6Mccql1OyTkZbasv)

#### Files comparison with '--format json' output
[![asciicast](https://asciinema.org/a/QDJYrrL2AnCM7mwQePq9HxUsm.svg)](https://asciinema.org/a/QDJYrrL2AnCM7mwQePq9HxUsm)
