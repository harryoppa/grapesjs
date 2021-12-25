export default function(editor, opt = {}) {
  const c = opt;
  let bm = editor.BlockManager;
  let blocks = c.blocks;
  let stylePrefix = c.stylePrefix;
  const flexGrid = c.flexGrid;
  const basicStyle = c.addBasicStyle;
  const rowHeight = c.rowHeight;
  const clsRow = `${stylePrefix}row`;
  const clsCell = `${stylePrefix}cell`;
  const styleRow = flexGrid
    ? `
    .${clsRow} {
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      flex-wrap: nowrap;
      padding: 10px;
    }
    @media (max-width: 768px) {
      .${clsRow} {
        flex-wrap: wrap;
      }
    }`
    : `
    .${clsRow} {
      display: table;
      padding: 10px;
      width: 100%;
    }
    @media (max-width: 768px) {
      .${stylePrefix}cell, .${stylePrefix}cell30, .${stylePrefix}cell70 {
        width: 100%;
        display: block;
      }
    }`;
  const styleClm = flexGrid
    ? `
    .${clsCell} {
      min-height: ${rowHeight}px;
      flex-grow: 1;
      flex-basis: 100%;
    }`
    : `
    .${clsCell} {
      width: 8%;
      display: table-cell;
      height: ${rowHeight}px;
    }`;
  const styleClm30 = `
  .${stylePrefix}cell30 {
    width: 30%;
  }`;
  const styleClm70 = `
  .${stylePrefix}cell70 {
    width: 70%;
  }`;

  const step = 0.2;
  const minDim = 1;
  const currentUnit = 1;
  const resizerBtm = {
    tl: 0,
    tc: 0,
    tr: 0,
    cl: 0,
    cr: 0,
    bl: 0,
    br: 0,
    minDim
  };
  const resizerRight = {
    ...resizerBtm,
    cr: 1,
    bc: 0,
    currentUnit,
    minDim,
    step
  };

  // Flex elements do not react on width style change therefore I use
  // 'flex-basis' as keyWidth for the resizer on columns
  if (flexGrid) {
    resizerRight.keyWidth = 'flex-basis';
  }

  const rowAttr = {
    class: clsRow,
    'data-gjs-droppable': `.${clsCell}`,
    'data-gjs-resizable': resizerBtm,
    'data-gjs-name': 'Row'
  };

  const colAttr = {
    class: clsCell,
    'data-gjs-draggable': `.${clsRow}`,
    'data-gjs-resizable': resizerRight,
    'data-gjs-name': 'Cell'
  };

  if (flexGrid) {
    colAttr['data-gjs-unstylable'] = ['width'];
    colAttr['data-gjs-stylable-require'] = ['flex-basis'];
  }

  // Make row and column classes private
  const privateCls = [`.${clsRow}`, `.${clsCell}`];
  editor.on(
    'selector:add',
    selector =>
      privateCls.indexOf(selector.getFullName()) >= 0 &&
      selector.set('private', 1)
  );

  const attrsToString = attrs => {
    const result = [];

    for (let key in attrs) {
      let value = attrs[key];
      const toParse = value instanceof Array || value instanceof Object;
      value = toParse ? JSON.stringify(value) : value;
      result.push(`${key}=${toParse ? `'${value}'` : `'${value}'`}`);
    }

    return result.length ? ` ${result.join(' ')}` : '';
  };

  const toAdd = name => blocks.indexOf(name) >= 0;
  const attrsRow = attrsToString(rowAttr);
  const attrsCell = attrsToString(colAttr);

  const columnCategory = { id: 'columns', label: 'Columns' };

  toAdd('column1') &&
    bm.add('column1', {
      label: c.labelColumn1,
      category: columnCategory,
      media: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22,20H2V4h20V20z"></path></svg>',
      content: `<div ${attrsRow}>
        <div ${attrsCell}></div>
      </div>
      ${
        basicStyle
          ? `<style>
          ${styleRow}
          ${styleClm}
        </style>`
          : ''
      }`
    });

  toAdd('column2') &&
    bm.add('column2', {
      label: c.labelColumn2,
      media: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10,20H2V4h8V20z M22,4h-8v16h8V4z"></path></svg>',
      category: columnCategory,
      content: `<div ${attrsRow}>
        <div ${attrsCell}></div>
        <div ${attrsCell}></div>
      </div>
      ${
        basicStyle
          ? `<style>
          ${styleRow}
          ${styleClm}
        </style>`
          : ''
      }`
    });

  toAdd('column3') &&
    bm.add('column3', {
      label: c.labelColumn3,
      category: columnCategory,
      media: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6,20H2V4h4V20z M14,4h-4v16h4V4z M22,4h-4v16h4V4z"></path></svg>',
      content: `<div ${attrsRow}>
        <div ${attrsCell}></div>
        <div ${attrsCell}></div>
        <div ${attrsCell}></div>
      </div>
      ${
        basicStyle
          ? `<style>
          ${styleRow}
          ${styleClm}
        </style>`
          : ''
      }`
    });

  toAdd('column3-7') &&
    bm.add('column3-7', {
      label: c.labelColumn37,
      category: columnCategory,
      media: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8,20H2V4h6V20z M22,4H12v16h10V4z"></path></svg>',
      content: `<div ${attrsRow}>
        <div ${attrsCell} style='${
        flexGrid ? 'flex-basis' : 'width'
      }: 30%;'></div>
        <div ${attrsCell} style='${
        flexGrid ? 'flex-basis' : 'width'
      }: 70%;'></div>
      </div>
      ${
        basicStyle
          ? `<style>
          ${styleRow}
          ${styleClm}
          ${styleClm30}
          ${styleClm70}
        </style>`
          : ''
      }`
    });

  toAdd('column7-3') &&
  bm.add('column7-3', {
    label: c.labelColumn73,
    category: columnCategory,
    media: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16,4h6v16h-6V4z M2,20h10V4 H2V20z"></path></svg>',
    content: `<div ${attrsRow}>
        <div ${attrsCell} style='${
      flexGrid ? 'flex-basis' : 'width'
    }: 70%;'></div>
        <div ${attrsCell} style='${
      flexGrid ? 'flex-basis' : 'width'
    }: 30%;'></div>
      </div>
      ${
      basicStyle
        ? `<style>
          ${styleRow}
          ${styleClm}
          ${styleClm30}
          ${styleClm70}
        </style>`
        : ''
    }`
  });

  toAdd('text') &&
    bm.add('text', {
      label: c.labelText,
      category: c.category,
      media: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>',
      content: {
        type: 'text',
        content: 'Insert your text here',
        style: { padding: '10px' },
        activeOnRender: 1
      }
    });

  toAdd('link') &&
    bm.add('link', {
      label: c.labelLink,
      category: c.category,
      media: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',
      content: {
        type: 'link',
        content: 'Link',
        style: { color: '#d983a6' }
      }
    });

  toAdd('image') &&
    bm.add('image', {
      label: c.labelImage,
      category: c.category,
      media: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',
      content: {
        style: { color: 'black' },
        type: 'image',
        activeOnRender: 1
      }
    });

  toAdd('video') &&
    bm.add('video', {
      label: c.labelVideo,
      category: c.category,
      media: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>',
      content: {
        type: 'video',
        src: 'img/video2.webm',
        style: {
          height: '350px',
          width: '615px'
        }
      }
    });

  toAdd('map') &&
    bm.add('map', {
      label: c.labelMap,
      category: c.category,
      media: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>',
      content: {
        type: 'map',
        style: { height: '350px' }
      }
    });
}
