#!/usr/bin/env node

const { prompt } = require("enquirer");
const fs = require("fs");
const Conf = require("conf");
const config = new Conf();
console.log({ configPath: config.path });

const prmpt = {
  type: "input",
  name: "name",
  message: "Where is Harvey Dent?",
};

const isat = config.get("name");
if (isat) {
  prmpt.message = `If Harvy Dent is not at ${isat} enter the new location.`;
}

prompt(prmpt)
  .then((result) => {
    if (result.name) config.set("name", result.name);
    return result;
  })
  .then(console.log)
  .catch(console.error);
