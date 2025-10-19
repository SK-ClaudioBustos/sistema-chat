import { Injectable } from '@nestjs/common';
import { Client } from './chat.input';

@Injectable()
export class ChatService {
  private readonly clients: Record<string, Client> = {};

  onClientConnected(client: Client) {
    this.clients[client.id] = client;
  }

  onClientDisconnected(id: string) {
    if (this.clients.hasOwnProperty(id)) {
      delete this.clients[id];
    }
  }

  getClients() {
    return Object.values(this.clients);
  }
}
