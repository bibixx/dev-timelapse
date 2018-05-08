#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const capture = require("capture-chrome");
const looksSame = require("looks-same");
const chalk = require("chalk");

const yargs = require("yargs")
  .usage("Usage: $0 <website to timelapse> [options]")
  .option("every", {
    alias: "e",
    describe: "interval between screenshots",
    default: "1m",
    type: "string",
  })
  .option("path", {
    alias: "p",
    describe: "path for screenshots",
    default: "./timelapse",
    type: "string",
  })
  .option("width", {
    alias: "w",
    describe: "screenshot width",
    default: 1024,
    type: "number",
  })
  .option("height", {
    alias: "h",
    describe: "screenshot height",
    default: 1024,
    type: "number",
  })
  .help()
  .version();

const { argv } = yargs;

const getTimeFromString = (t) => {
  const trimmedT = String(t).replace(" ", "");

  const [time, unit] = trimmedT.match(/([0-9]+)(.)/).slice(1);

  switch (unit) {
    case "h":
      return time * 60 * 60 * 1000;
    case "m":
      return time * 60 * 1000;
    case "s":
      return time * 1000;
    case "ms":
      return time * 1;

    // no default
  }

  return +time;
};

const getFormattedTime = (d) => {
  const pad = s => String(s).padStart(2, "0");
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const looksSamePromise = (...args) => new Promise((resolve, reject) => {
  looksSame(...args, (error, equal) => {
    error ? reject(error) : resolve(equal);
  });
});

const imageUrlPath = argv._[0] || "http://localhost:8080";
const imageWidth = argv.width;
const imageHeight = argv.height;
const imageSavePath = argv.path;
const imageInteval = getTimeFromString(argv.every);

const savePath = path.join(__dirname, imageSavePath);
let lastSavePath = "";

const getSS = async () => {
  setTimeout(getSS, imageInteval);

  const imgBuffer = await capture({
    url: imageUrlPath,
    width: imageWidth,
    height: imageHeight,
  });

  if (!fs.existsSync(savePath)) {
    fs.mkdirSync(savePath);
  }

  const currentFileName = `${String(Date.now())}.png`;
  const currentSavePath = path.join(savePath, currentFileName);

  let isSameAsLast = false;

  if (fs.existsSync(lastSavePath)) {
    isSameAsLast = await looksSamePromise(lastSavePath, imgBuffer, { strict: true });
  }

  const formattedTime = getFormattedTime(new Date());

  if (isSameAsLast) {
    console.log(`${chalk.bold("💤")} ${chalk.bold(formattedTime)} No changes found, skipping.`);
  } else {
    fs.writeFileSync(currentSavePath, imgBuffer);
    lastSavePath = currentSavePath;
    console.log(`${chalk.bold.green("📷")} ${chalk.bold(formattedTime)} Screenshot created.`);
  }
};

console.log(`Creating timelapse of ${chalk.green.bold(imageUrlPath)}`);
getSS();
