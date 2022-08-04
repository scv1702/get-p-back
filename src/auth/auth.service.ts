import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { pbkdf2Sync } from 'crypto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email, { salt: 1 });
    if (user) {
      const key = pbkdf2Sync(password, user.salt, 100000, 64, 'sha512');
      const findedUser = await this.usersService.findOneByEmailAndPassword(
        email,
        key.toString('base64'),
      );
      if (findedUser && findedUser.verify) {
        const { password, salt, ...result } = findedUser;
        return result;
      }
    }
    return null;
  }
}
