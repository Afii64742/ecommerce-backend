import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        
        if (!authHeader) {
            throw new UnauthorizedException('Authorization header is missing');
        }

        const token = authHeader.split(' ')[1]; 

        try {
            const decodedToken = this.jwtService.verify(token);
            
            if (decodedToken.isAdmin) {
                return true;
            } else {
                throw new UnauthorizedException('Only admins can access this route');
            }
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
