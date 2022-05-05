import ILogger from "./Logger";
import unfetch from "isomorphic-unfetch";

export interface JokesConfig {
  hostname: string;
}

export interface Joke {
  setup: string;
  punchline: string;
}

export default class Jokes {
  private hostname: string;

  constructor(
    config: JokesConfig,
    private logger: ILogger,
    private fetch: typeof unfetch
  ) {
    this.hostname = config.hostname;
    logger.error("error!");
  }

  async getRandomJoke(): Promise<Joke> {
    this.logger.info(`Getting random joke from ${this.hostname}`);
    const response = await this.fetch(`https://${this.hostname}/random_joke`);
    return response.json();
  }
}
