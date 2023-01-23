import { Controller, Get, Header, Param, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
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
  getIcon(@Req() req: Request, @Res() res: Response) {
    const options = { ...req.params, ...req.query } as any;
    const icon = this.service.getIcon(options);
    res.header('content-type', 'image/svg+xml');
    res.send(icon);
  }
}
