# Dev timelapse

This tool enables you to create timelapse of creation of your project.
It takes screenshots throughout your development.

I can't hide that It was highly inspired by [tlapse](https://github.com/typicode/tlapse) so I have to give @typicode credit for the idea however my version is based soley on [chrome in headless mode](https://github.com/juliangruber/capture-chrome) and not on PhantomJS (Thanks to that rendering engine is from newest version of chrome).

## Installation

`npm install dev-timelapse -g`

## Usage

`dev-timelapse`
or using npx
`npx dev-timelapse http://localhost:3000`

## Options

| Option   | Alias  | Description                  |
| -------- | ------ | ---------------------------- |
| --every  | -e     | Interval between screenshots |
| --path   | -p     | Path for screenshots         |
| --size   | -s     | Size of a screenshot         |
| --width  | -w     | Width of a screenshot        |
| --height | -h     | Height of a screenshot       |