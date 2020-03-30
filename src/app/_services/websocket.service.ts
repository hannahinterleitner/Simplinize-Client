import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  websocket: WebSocket;

  constructor() { }

  connectToServer(url: string) {
    this.websocket = new WebSocket(url);
  }

  closeConnection(code: number, reason: string) {
    this.websocket.close(code, reason);
  }

}
