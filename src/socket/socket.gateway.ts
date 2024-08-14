import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import * as dotenv from 'dotenv';
import { Server, Socket } from 'socket.io';

dotenv.config();

@WebSocketGateway({
  cors: {
    origin: process.env.WEBSITE_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Accept'],
    credentials: true
  }
})
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`User connected: ${client.id}`);
    client.emit('connection', `User connected: ${client.id}`);
  }
}
