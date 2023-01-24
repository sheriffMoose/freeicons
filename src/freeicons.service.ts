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
      viewBox: '-1 -1 26 26',
      type: 'none',
    };

    width = width || size || defaults.width;
    height = height || size || defaults.height;

    fg = this.formatHex(fg || defaults.fg);
    bg = this.formatHex(bg || defaults.bg);

    px = px || defaults.px;
    py = py || defaults.py;

    const inverted = this.isInverted(fg);

    const foreground = {
      color: inverted ? bg : fg,
      width,
      height,
    };

    let radius = defaults.radius;
    let viewBox = defaults.viewBox;
    if (type === 'rounded') {
      radius = '10%';
      viewBox = '-3 -3 30 30';
    } else if (type === 'circle') {
      radius = '100%';
      viewBox = '-5 -5 35 35';
    }

    const background = {
      color: inverted ? defaults.fg : bg,
      viewBox,
      radius,
    };

    const path = icon.svg.replace(/.+(<path.+\/>)<\/svg>/g, '$1');

    const svg = `
      <svg 
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        viewBox="0 0 100 100"
        fill="${foreground.color}"
        width="${foreground.width}"
        height="${foreground.height}"
      >
        <rect fill="${background.color}" width="100%" height="100%" rx="${background.radius}" />
        <svg viewBox="${background.viewBox}">
          ${path}
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
}
