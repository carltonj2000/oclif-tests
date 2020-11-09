#!/usr/bin/env node

console.log("hello world");
console.log(process.argv);
const args = process.argv.slice(2);
const dir = args[0];
const name = args[1].split("--name=")[1]; // for input => arg0 --name=Carlton
console.log(args);
