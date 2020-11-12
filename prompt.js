#!/usr/bin/env node

const { prompt } = require("enquirer");
const fs = require("fs");

let isat;

const prmpt = {
  type: "input",
  name: "name",
  message: "Where is Harvey Dent?",
};

const fn = "promptHistory.json";
if (fs.existsSync(fn)) {
  const isatStr = fs.readFileSync(fn).toString();
  const json = JSON.parse(isatStr);
  isat = json.name;
}

if (isat) {
  prmpt.message = `If Harvy Dent is not at ${isat} enter the new location.`;
}

prompt(prmpt)
  .then((result) => {
    if (result.name) {
      fs.writeFileSync(fn, JSON.stringify(result));
    }
    return result;
  })
  .then(console.log)
  .catch(console.error);
