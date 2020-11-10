import { Command, flags } from "@oclif/command";
export const debug = require("debug")("cli2:init");
const { cosmiconfig } = require("cosmiconfig");
const explorer = cosmiconfig("cli2");

type ConfigType = {
  name?: string;
};

export default abstract class Base extends Command {
  static config: null | ConfigType;
  async init() {
    const { config, filepath } = await explorer.search();
    debug("config", { config, filepath });
    this.config = config;
  }
}
