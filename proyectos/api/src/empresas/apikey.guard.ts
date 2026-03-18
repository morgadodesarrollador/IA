import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const header = request.headers['x-api-key'] || request.headers['authorization']
    const key = process.env.API_KEY
    if (!key) return true // si no está configurada, no hacemos check
    if (!header) return false
    const token = Array.isArray(header) ? header[0] : header
    return token === key || token === `Bearer ${key}`
  }
}
