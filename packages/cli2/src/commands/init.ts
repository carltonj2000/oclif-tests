import { flags } from "@oclif/command";
import Base, { debug } from "../base";

const { prompt } = require("enquirer");
const copy = require("copy-template-dir");
const path = require("path");

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
          message: "What is the folder name?",
        })
          .then(({ name }: { name: string }) => name)
          .catch(console.error)
          .finally(() => console.log("name can also be specified via --name"));
      }
    }
    const name = flags.name;

    const vars = { projectName: name };
    const inDir = path.resolve(__dirname, "../templates/html");
    const outDir = path.join(process.cwd(), name);

    copy(inDir, outDir, vars, (err: Error, createdFiles: string[]) => {
      if (err) throw err;
      createdFiles.forEach((filePath) => console.log(`Created ${filePath}`));
      console.log("done!");
    });
  }
}

export = Cli2;
