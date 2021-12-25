import {
  countdownRef
} from './consts';

export default function(editor, opt = {}) {
  const c = opt;
  const bm = editor.BlockManager;
  const pfx = c.countdownClsPfx;
  const style = c.defaultStyle ? `<style>
    .${pfx} {
      text-align: center;
      font-family: Helvetica, serif;
    }

    .${pfx}-block {
      display: inline-block;
      margin: 0 10px;
      padding: 10px;
    }

    .${pfx}-digit {
      font-size: 5rem;
    }

    .${pfx}-endtext {
      font-size: 5rem;
    }

    .${pfx}-cont,
    .${pfx}-block {
      display: inline-block;
    }
  </style>` : '';

  if (c.blocks.indexOf(countdownRef) >= 0) {
    bm.add(countdownRef, {
      label: c.labelCountdown,
      category: c.labelCountdownCategory,
      media: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
      content: `
        <div class="${pfx}" data-gjs-type="countdown"></div>
        ${style}
      `
    });
  }
}
