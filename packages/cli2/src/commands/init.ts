import { flags } from "@oclif/command";
import Base, { debug } from "../base";

const { prompt } = require("enquirer");
const copy = require("copy-template-dir");
const path = require("path");
//const execa = require("execa"); // replaced by spawn
const { spawn } = require("yarn-or-npm");
const chalk = require("chalk");
const ora = require("ora");

class Cli2 extends Base {
  static description = "describe the command here";

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({
      char: "n",
      description: "name to print",
    }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: "f" }),
  };

  static args = [{ name: "file" }];
  static strict = false; // disable mandatory req of above args

  async run() {
    const { argv, args, flags } = this.parse(Cli2);
    debug("args", args);
    debug("argv", argv);
    debug("flags", flags);
    if (typeof flags.name === "undefined") {
      if (this.config && this.config.name) {
        flags.name = this.config.name;
      } else {
        flags.name = await prompt({
          type: "input",
          name: "name",
          message: `What is the folder ${chalk.blue("name")}?`,
        })
          .then(({ name }: { name: string }) => name)
          .catch(console.error)
          .finally(() =>
            console.log(
              `name can also be specified via ${chalk.yellow("--name")}`
            )
          );
      }
    }
    const name = flags.name;

    const vars = { projectName: name };
    const inDir = path.resolve(__dirname, "../templates/node");
    const outDir = path.join(process.cwd(), name);

    copy(inDir, outDir, vars, async (err: Error, createdFiles: string[]) => {
      if (err) throw err;
      const spinner = ora({ text: "Installing\n", spinner: "smiley" }).start();
      createdFiles.forEach((filePath) => console.log(`Created ${filePath}`));
      process.chdir(outDir);
      const child = await spawn(["install"]);
      child.on("close", () => spinner.succeed());
    });
  }
}

export = Cli2;
