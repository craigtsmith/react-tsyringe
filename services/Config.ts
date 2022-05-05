import { injectable } from "tsyringe";
import { get } from "lodash";

@injectable()
export default class Config {
  get(path: string, defaultValue: unknown = {}) {
    // eslint-disable-next-line
    return get(CONFIG, path, defaultValue);
  }
}
