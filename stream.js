#!/usr/bin/env node

const { spawn } = require("child_process");

const child = spawn("ls", ["-lh", "/home/carltonj2000/cj/goals"]);
child.stdout.on("data", (data) => console.log(`stdout: ${data}`));
child.on("close", (code) => console.log(`Child exited with ${code}`));

/*
const child = spawn("ls", ["-lh", "/home/carltonj2000/cj/goals"], {
  stdio: ["ignore", process.stdout, process.stderr],
});

process.stdin.pipe(child.stdin);
child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);
*/
