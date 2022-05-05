import { singleton, inject } from "tsyringe";
import Logger from "./Logger";

export interface GitHubConfig {
  hostname: string;
}

export interface Repo {
  id: string;
  name: string;
}

@singleton()
export default class GitHub {
  private hostname: string;

  constructor(
    @inject("Config.GitHub") config: GitHubConfig,
    private logger: Logger
  ) {
    this.hostname = config.hostname;
  }

  async getRepos(): Promise<Repo[]> {
    this.logger.info(`Getting GitHub repos from ${this.hostname}`);
    const response = await fetch(`https://${this.hostname}/users/benkno/repos`);
    return response.json();
  }
}
