import { WebSocket } from 'ws';

export function setIntervalAndHandleOnClose(ws: WebSocket, callBack: any, time?: number) {
  callBack();

  const interval = setInterval(async () => {
    callBack();
  }, time ?? 5000);

  ws.onclose = () => {
    clearInterval(interval);
  };
}
