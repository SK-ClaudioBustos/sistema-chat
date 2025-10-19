import { BadRequestException, Logger, OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { Client } from './chat.input';

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
  @WebSocketServer() server: Server;

  private readonly logger = new Logger();
  constructor(private readonly chatService: ChatService) {}

  onModuleInit() {
    try {
      this.server.on('connection', (socket: Socket) => {
        const { username } = socket.handshake.auth;

        if (!username) {
          socket.disconnect();
          throw new BadRequestException('No se envio ningun nombre de usuario');
        }

        const clientId = `id_${username}`;
        this.chatService.onClientConnected({
          id: clientId,
          name: username,
        });

        const clientsConnected: Client[] = this.chatService.getClients();
        this.server.emit('on-clients-changed', clientsConnected);

        socket.on('disconnect', () => {
          this.logger.debug('cliente desconectado');
          this.chatService.onClientDisconnected(clientId);
        });
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
