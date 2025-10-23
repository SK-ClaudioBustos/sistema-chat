import { BadRequestException, Logger, OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { type Message } from './chat.input';
import { ChatService } from './chat.service';

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

        const id = socket.id;

        this.chatService.onClientConnected({
          id,
          username,
        });

        const clientsConnected = this.chatService.getClients();
        const clientsFiltered = clientsConnected.filter(
          (user) => user.id !== id,
        );
        this.server.emit('on-clients-changed', clientsFiltered);

        socket.on('disconnect', () => {
          this.chatService.onClientDisconnected(id);
          const clientsConnectedList = this.chatService.getClients();
          this.server.emit('on-clients-changed', clientsConnectedList);
        });
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @SubscribeMessage('send-message')
  handleMessage(
    @MessageBody()
    messageData: Message,
    @ConnectedSocket() client: Socket,
  ) {
    const { receiverId } = messageData;
    this.server.to(receiverId).emit('message-to-client', messageData);
  }
}
