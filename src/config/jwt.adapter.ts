import jwt from 'jsonwebtoken';
import { envs } from './envs';

export class JwtAdapter {

  static async generateToken(payload: any, duration: string = '3h') {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        envs.JWT_KEY,
        { expiresIn: duration as jwt.SignOptions['expiresIn'] },
        (error, token) => {
          if (error) return resolve(null);

          resolve(token);
        }
      );
    });
  }


  static async validateToken(token: string) {
    return new Promise((resolve) => {
      jwt.verify(token, envs.JWT_KEY, (err: any, decoded: any) => {
        if (err) return resolve(null);

        resolve(decoded);
      });
    });
  }
}
