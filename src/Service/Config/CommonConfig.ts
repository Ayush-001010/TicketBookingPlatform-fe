interface IMessage {
  content: string;
  duration: number;
}

export default class CommonConfig {
  static loadingMessageAPI: IMessage = {
    content: "loading",
    duration: 0,
  };
}
