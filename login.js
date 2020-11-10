#!/usr/bin/env node

const { prompt } = require("enquirer");
prompt({
  type: "invisible",
  name: "secret",
  message: "What is your secret?",
})
  .then((answer) => console.log("Answer:", { secret: answer }))
  .catch(console.error);
