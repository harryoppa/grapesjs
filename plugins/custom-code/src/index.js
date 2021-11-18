import loadComponents from './components';
import loadBlocks from './blocks';
import loadCommands from './commands';

export default (editor, opts = {}) => {
  const options = { ...{
    blockLabel: 'Custom Code',

    blockCustomCode: {},

    propsCustomCode: {},

    placeholderContent: '<span>Insert here your custom code</span>',

    toolbarBtnCustomCode: {},

    placeholderScript: `<div style="pointer-events: none; padding: 10px;">
      <svg viewBox="0 0 24 24" style="height: 30px; vertical-align: middle;">
        <path d="M13 14h-2v-4h2m0 8h-2v-2h2M1 21h22L12 2 1 21z"></path>
        </svg>
      Custom code with <i>&lt;script&gt;</i> can't be rendered on the canvas
    </div>`,

    modalTitle: 'Insert your code',

    codeViewOptions: {},

    buttonLabel: 'Save',

    commandCustomCode: {},
  },  ...opts };

  loadComponents(editor, options);

  loadBlocks(editor, options);

  loadCommands(editor, options);
};
