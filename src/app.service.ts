import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello keneth! from nestjs,we starting over again';
  }
}
