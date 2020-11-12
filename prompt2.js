#!/usr/bin/env node

const { prompt } = require("enquirer");
const c = require("ansi-colors");
const Conf = require("conf");
const config = new Conf();

const presets = [
  "apple",
  "grape",
  "watermelon",
  "cherry",
  "strawberry",
  "lemon",
  "orange",
];

const priorChoices = config.get("choices") || [];
const separator = priorChoices &&
  priorChoices.length && { role: "separator", value: c.dim("-----") };
const choices = [
  ...priorChoices,
  separator,
  ...presets.filter((x) => !priorChoices.includes(x)),
].filter(Boolean);

const prmpt = {
  type: "multiselect",
  name: "fruits",
  message: "Pick your favorite fruits.",
  choices,
};

prompt(prmpt)
  .then((result) => {
    if (result.fruits) config.set("choices", result.fruits);
    return result;
  })
  .then(console.log)
  .catch(console.error);
