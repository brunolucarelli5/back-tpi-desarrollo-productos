import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import axios from 'axios';

@Injectable()
export class AuthGuard implements CanActivate {
  // URL del microservicio de autenticación
  url: string = 'http://localhost:3000/users/can-do';

  constructor(private permissionCode: string) {
    // Este constructor pide el código de permiso al servicio de auth
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: Request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;
      console.log('El permissionCode que se está verificando es:', this.permissionCode); // Registro del código de permiso (permiso que se está verificando

      console.log('Authorization header:', authHeader); // Registro del token

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('El token no fue recibido.');
      }

      const token = authHeader.split(' ')[1]; // Obtener el token sin el prefijo Bearer

      console.log('Token:', token); // Registro del token

      const response = await axios.get(`${this.url}/${this.permissionCode}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Response from auth service:', response.data); // Registro de la respuesta del servicio de autenticación

      return true;
    } catch (error) {
      console.error('Error during authentication:', error.message || error);

      if (axios.isAxiosError(error) && error.response) {
        console.error('Response data:', error.response.data);
      }

      throw new UnauthorizedException('El token es inválido.');
    }
  }
}
