import loadStyles from './styles';
import loadFilter from './filter';

export default (editor, opts = {}) => {
  let defaults = {
    // Grapick options
    grapickOpts: {},

    colorPicker: '',

    inputDirection: 1,
    inputType: 1,
    selectEdgeStops: 1,
    onCustomInputChange: () => 0,
  };

  // Load defaults
  const config = { ...defaults, ...opts };

  // Add styles
  loadStyles(editor, config);
  loadFilter(editor, config);
};
