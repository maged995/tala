import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';  
@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  messageReceived = new EventEmitter<Message>();  
  connectionEstablished = new EventEmitter<Boolean>();  
  
  private connectionIsEstablished = false;  
  private _hubConnection: HubConnection;  
  
  constructor() {  
    this.createConnection();  
    this.registerOnServerEvents();  
    this.startConnection();  
  }  
  
  sendMessage(message: Message) {  
    this._hubConnection.invoke('NewMessage', message);  
  }  
  
  private createConnection() {  
    this._hubConnection = new HubConnectionBuilder()  
      .withUrl("https://localhost:44315/"+ 'MessageHub')  
      .build();  
 

  }  
  
  private startConnection(): void {  
    Object.defineProperty(WebSocket, 'OPEN', { value: 1, });
    this._hubConnection.serverTimeoutInMilliseconds = 100000;
    this._hubConnection  
      .start()  
      .then(() => {  
        this.connectionIsEstablished = true;  
        console.log('Hub connection started');  
        this.connectionEstablished.emit(true);  
        console.log("startConnection");
      }) ;
      
  }  
  
  private registerOnServerEvents(): void {  
    this._hubConnection.on('MessageReceived', (data: any) => {  
      this.messageReceived.emit(data); 
      console.log("registerOnServerEvents") 
    });  
  }  
}
