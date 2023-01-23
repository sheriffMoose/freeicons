import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import * as icons from 'simple-icons';

@Injectable()
export class FreeIconsService {

  listEmojis() {

  }

  listIcons() {
    return _.chain(icons)
      .values()
      .map('slug')
      .value();
  }

  getIcon({ slug, fg, bg, size, width, height, type, px, py }) {
    const icon = _.chain(icons)
      .values()
      .find(['slug', slug])
      .value();

    const defaults = {
      width: 300,
      height: 300,
      fg: `#${icon.hex}`,
      bg: 'white',
      px: '15',
      py: '15',
      radius: '0',
      type: 'none',
    };

    width = width || defaults.width;
    height = height || defaults.height;

    fg = this.formatHex(fg || defaults.fg);
    bg = this.formatHex(bg || defaults.bg);


    const inverted = this.isInverted(fg);

    const foreground = {
      color: inverted ? bg : fg,
      width,
      height,
    };

    let radius = defaults.radius;
    if (type === 'rounded') {
      radius = '10%';
      px = '5%';
      py = '5%';
      width = '90%';
      height = '90%';
    } else if (type === 'circle') {
      radius = '100%';
      px = '10%';
      py = '10%';
      width = '80%';
      height = '80%';
    }

    const background = {
      color: inverted ? defaults.fg : bg,
      width: width,
      height,
      px,
      py,
      radius,
    };

    const svg = `
      <svg 
        fill="${foreground.color}"
        width="${foreground.width}"
        height="${foreground.height}"
      >
        <rect fill="${background.color}" width="100%" height="100%" rx="${background.radius}" />
        <svg width="${background.height}" height="${background.height}" x="${px}" y="${py}" >
          ${icon.svg}
        </svg>
      </svg>
    `;
    return svg;
  }

  isInverted(fg) {
    return fg === 'null' || fg === 'false' || fg === '0';
  }

  formatHex(str) {
    return /[0-9A-Fa-f]{6}/g.test(str) ? `#${str}`.replace('##', '#') : str;
  }

  calcDimension(dimension, str) {
    return str.endsWith('%') ? (parseFloat(str) * dimension / 100) : parseFloat(str);
  }
}
