import { Command, flags } from "@oclif/command";

class Cli2 extends Command {
  static description = "describe the command here";

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({
      char: "n",
      description: "name to print",
      default: "people",
    }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: "f" }),
  };

  static args = [{ name: "file" }];
  static strict = false; // disable mandatory req of above args

  async run() {
    const { argv, args, flags } = this.parse(Cli2);
    console.log("args", args);
    console.log("argv", argv);
    const name = flags.name ?? "world 2";
    this.log(`hello ${name} from build`);
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`);
    }
  }
}

export = Cli2;
