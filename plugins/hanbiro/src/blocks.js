import {
  typeForm,
  typeInput,
  typeTextarea,
  typeSelect,
  typeCheckbox,
  typeRadio,
  typeButton,
  typeLabel,
} from './components';

export default function (editor, opt = {}) {
  const c = opt;
  const bm = editor.BlockManager;
  const addBlock = (id, def) => {
    c.blocks.indexOf(id) >= 0 && bm.add(id, {
      ...def,
      category: { id: 'forms', label: 'Forms' },
    });
  }

  addBlock(typeForm, {
    label: 'Form',
    media: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M16 4a2 2 0 0 0-2-2H8L2 8v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2M2 8h6V2m3 15H6m3-4H6m12.396-6.671c1.104-1.104 2.563-.453 3 0s1.104 1.896 0 3L15.725 15.5l-4.5 1.5 1.5-4.5 5.671-6.171z"></path></svg>',
    content: {
      type: typeForm,
      components: [
        {
          type: 'div',
          attributes: {
            class: 'mb-3',
          },
          components: [
            { type: typeLabel, components: 'Name' },
            { type: typeInput },
          ]
        },
        {
          type: 'div',
          attributes: {
            class: 'mb-3',
          },
          components: [
            { type: typeLabel, components: 'Email' },
            { type: typeInput, attributes: { type: 'email' } },
          ]
        },
        {
          type: 'div',
          attributes: {
            class: 'mb-3',
          },
          components: [
            { type: typeLabel, components: 'Gender' },
            { type: typeCheckbox, attributes: { value: 'M' } },
            { type: typeLabel, components: 'M' },
            { type: typeCheckbox, attributes: { value: 'F' } },
            { type: typeLabel, components: 'F' },
          ]
        },
        {
          type: 'div',
          attributes: {
            class: 'mb-3',
          },
          components: [
            { type: typeLabel, components: 'Message' },
            { type: typeTextarea },
          ]
        },
        {
          type: 'div',
          attributes: {
            class: 'mb-3',
          },
          components: [{ type: typeButton }]
        },
      ]
    }
  });

  addBlock(typeInput, {
    label: 'Input',
    media: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-input-cursor" viewBox="0 0 16 16">\n' +
      '  <path d="M10 5h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4v1h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4v1zM6 5V4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v-1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4z"/>\n' +
      '  <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13A.5.5 0 0 1 8 1z"/>\n' +
      '</svg>',
    content: { type: typeInput },
  });

  addBlock(typeTextarea, {
    label: 'Textarea',
    media: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-textarea" viewBox="0 0 16 16">\n' +
      '  <path d="M1.5 2.5A1.5 1.5 0 0 1 3 1h10a1.5 1.5 0 0 1 1.5 1.5v3.563a2 2 0 0 1 0 3.874V13.5A1.5 1.5 0 0 1 13 15H3a1.5 1.5 0 0 1-1.5-1.5V9.937a2 2 0 0 1 0-3.874V2.5zm1 3.563a2 2 0 0 1 0 3.874V13.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V9.937a2 2 0 0 1 0-3.874V2.5A.5.5 0 0 0 13 2H3a.5.5 0 0 0-.5.5v3.563zM2 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>\n' +
      '</svg>',
    content: { type: typeTextarea },
  });

  addBlock(typeSelect, {
    label: 'Select',
    media: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-menu-button" viewBox="0 0 16 16">\n' +
      '  <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h8A1.5 1.5 0 0 1 11 1.5v2A1.5 1.5 0 0 1 9.5 5h-8A1.5 1.5 0 0 1 0 3.5v-2zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-8z"/>\n' +
      '  <path d="m7.823 2.823-.396-.396A.25.25 0 0 1 7.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2H1zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2h14zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>\n' +
      '</svg>',
    content: { type: typeSelect },
  });

  addBlock(typeButton, {
    label: 'Button',
    media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M4 11.5h16v1H4z"/></svg>',
    content: { type: typeButton },
  });

  addBlock(typeLabel, {
    label: 'Label',
    media: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-server"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>',
    content: { type: typeLabel },
  });

  addBlock(typeCheckbox, {
    label: 'Checkbox',
    media: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-square"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>',
    content: {
      type: 'div',
      attributes: {
        class: 'form-check'
      },
      components: [
        {
          type: typeCheckbox
        }
      ]
    },
  });

  addBlock(typeRadio, {
    label: 'Radio',
    media: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
    content: { type: typeRadio },
  });
}
