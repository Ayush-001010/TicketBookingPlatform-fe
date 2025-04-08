interface IMessage {
  content: string;
  duration: number;
}

export default class CommonConfig {
  static loadingMessageAPI: IMessage = {
    content: "loading",
    duration: 0,
  };
  static errorMessageAPI: IMessage = {
    content: "Something Went Wrong",
    duration: 0,
  };
}
