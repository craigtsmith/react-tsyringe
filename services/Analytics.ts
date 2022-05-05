import { singleton } from "tsyringe";

@singleton()
export default class Analytics {
  send(message: string) {
    console.log(`send: ${message}`);
  }
}
