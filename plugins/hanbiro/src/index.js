import loadTraits from './traits';
import loadBlocks from './blocks';
import loadComponents from './components';
// import { appendStyle } from "./utils";
import filterStyle from './styles/filter';


export default (editor, opts = {}) => {

  const config = {
    blocks: ['form', 'input', 'textarea', 'select', 'button', 'label', 'checkbox', 'radio'],
    style: [

    ],
    ...opts
  };
  editor.Config.canvas.styles.push('https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css')


  filterStyle(editor, config.filterStyle || {});

  loadComponents(editor, config);
  loadTraits(editor, config);
  loadBlocks(editor, config);
};
