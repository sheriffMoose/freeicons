import { Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { FreeIconsService } from './freeicons.service';

@Controller()
export class FreeIconsController {
  constructor(private service: FreeIconsService) { }

  @Get('icons')
  listIcons() {
    return this.service.listIcons();
  }

  @Get([
    'icons/:slug',
    'icons/:slug/:fg',
    'icons/:slug/:fg/:bg',
  ])
  getIcon(@Req() req: Request) {
    const options = { ...req.params, ...req.query } as any;
    const icon = this.service.getIcon(options);
    return icon;
  }
}
