import { Command, flags } from "@oclif/command";
export const debug = require("debug")("cli2:init");
const { cosmiconfig } = require("cosmiconfig");
const explorer = cosmiconfig("cli2");
const updateNotifier = require("update-notifier");
const pkg = require("../package.json");

type ConfigType = {
  name?: string;
};

export default abstract class Base extends Command {
  static config: null | ConfigType;
  async init() {
    const notifier = updateNotifier({
      pkg,
      updateCheckInterval: 0,
      shouldNotifyInNpmScript: true,
    });
    notifier.notify();
    debug("pkg", pkg);
    debug("notifier", notifier.update);
    const result = await explorer.search();
    debug("result", result);
    const { config, filepath } = result || { config: null, filepath: null };
    debug("config", { config, filepath });
    this.config = config;
  }
}
