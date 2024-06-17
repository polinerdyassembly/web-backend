import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  public async home(): Promise<object> {
    const currentDateTime = new Date().toISOString();
    return {
      message: `Polinerdy Assembly API (${currentDateTime})`,
    };
  }
}
