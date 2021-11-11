import Grapick from 'grapick';

const cpKey = 'data-cp';
let inputDirection, inputType;

const getColor = color => {
  let cl = color.getAlpha() === 1 ? color.toHexString() : color.toRgbString();
  return cl.replace(/ /g, '');
}

export default (editor, config = {}) => {
  const sm = editor.StyleManager;
  const { selectEdgeStops } = config;
  let colorPicker = config.colorPicker;
  let lastOpts = {};
  const defDir = [ 'top', 'right', 'bottom', 'left' ];
  const updateLastOpts = opts => {
    lastOpts = opts || { fromTarget: 1, avoidStore: 1 };
    setTimeout(() => lastOpts = {});
  }

  sm.addType('gradient', {
    view: {

      // I don't need any event
      events: {
        'click [data-clear-style]': 'clear',
      },

      templateInput: () => '',

      setValue(value) {
        const { gp } = this;
        if (!gp) return;
        const defValue = this.model.getDefaultValue();
        value = value || defValue;
        updateLastOpts();
        gp.setValue(value);

        const dir = gp.getDirection();
        const valueDir = defDir.filter(i => dir.indexOf(i) >= 0)[0] || dir;
        gp.setDirection(valueDir); // Ensure the new value
        inputType && inputType.setValue(gp.getType());
        inputDirection && inputDirection.setValue(valueDir);
        const handlers = gp.getHandlers();
        selectEdgeStops &&
          [handlers[0], handlers[handlers.length - 1]].filter(i => i)
            .map(h => h.select({ keepSelect: 1 }));
      },

      destroy() {
        const { gp } = this;
        gp && gp.destroy();
      },

      onRender() {
        const { ppfx, em, model } = this;
        const conf = {
          ...config,
          ...(model.get('gradientConfig') || {}),
        };
        const { onCustomInputChange } = conf;
        const el = document.createElement('div');
        const colorEl = colorPicker && `<div class="grp-handler-cp-wrap">
          <div class="${ppfx}field-colorp-c">
            <div class="${ppfx}checker-bg"></div>
            <div class="${ppfx}field-color-picker" ${cpKey}></div>
          </div>
        </div>`;

        const gp = new Grapick({
          el,
          colorEl,
          ...conf.grapickOpts,
        });
        const fields = this.el.querySelector(`.${ppfx}fields`);
        fields.style.flexWrap = 'wrap';
        fields.appendChild(el.children[0]);
        this.gp = gp;

        gp.on('change', complete => {
          model.setValueFromInput(gp.getValue(), complete, lastOpts);
        });

        // Add custom inputs, if requested
        [
          ['inputDirection', 'select', 'setDirection', {
            name: 'Direction',
            property: '__gradient-direction',
            defaults: 'right',
            options: defDir.map(value => ({ value }))
          }],
          ['inputType', 'select', 'setType', {
            name: 'Type',
            defaults: 'linear',
            property: '__gradient-type',
            options: [
              {value: 'radial'},
              {value: 'linear'},
              {value: 'repeating-radial'},
              {value: 'repeating-linear'},
            ]
          }]
        ].forEach(input => {
            const inputName = input[0];
            const inputConfig = conf[inputName];
            if (inputConfig) {
              const { parent } = model;
              const type = input[1];
              const inputObj = typeof inputConfig == 'object' ? inputConfig : {};
              const propInput = sm.createType(inputObj.type || type, {
                model: { ...input[3], ...inputObj },
                view: { propTarget: this.propTarget },
              });
              parent && (propInput.model.parent = parent);
              propInput.render();
              propInput.model.on('change:value', (model, val, opts = {}) => {
                updateLastOpts(opts);
                gp.el && gp[input[2]](model.getFullValue() || model.getDefaultValue(), { complete: !opts.avoidStore });
                onCustomInputChange({ model, input, inputDirection, inputType, opts });
              });
              fields.appendChild(propInput.el);
              inputName === 'inputDirection' && (inputDirection = propInput);
              inputName === 'inputType' && (inputType = propInput);
            }
        })

        // Add the custom color picker, if requested
        if (colorPicker === 'default') {
          colorPicker = handler => {
            const el = handler.getEl().querySelector(`[${cpKey}]`);
            const elStyle = el.style;
            elStyle.backgroundColor = handler.getColor();
            const emConf = em && em.getConfig() || {};
            const colorPickerConfig = emConf.colorPicker || {};
            const elToAppend = emConf.el;
            const updateColor = (color, complete = 1) => {
              const cl = getColor(color);
              elStyle.backgroundColor = cl;
              handler.setColor(cl, complete);
            };
            const cpOpts = {
              color: handler.getColor(),
              change(color) {
                updateColor(color);
              },
              move(color) {
                updateColor(color, 0);
              },
            }
            const baseCp = em && em.initBaseColorPicker;
            baseCp ? baseCp(el, cpOpts) : editor.$(el).spectrum({
              containerClassName: `${ppfx}one-bg ${ppfx}two-color`,
              appendTo: elToAppend || 'body',
              maxSelectionSize: 8,
              showPalette: true,
              palette: [],
              showAlpha: true,
              chooseText: 'Ok',
              cancelText: '⨯',
              ...cpOpts,
              ...colorPickerConfig,
            });
          };

          gp.on('handler:remove', handler => {
            const el = handler.getEl().querySelector(`[${cpKey}]`);
            const $el = editor.$(el);
            $el.spectrum && $el.spectrum('destroy');
          })
        }

        colorPicker && gp.setColorPicker(colorPicker);
      },
    }
  })
}
