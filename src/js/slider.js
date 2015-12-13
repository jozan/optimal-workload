import { format } from './helpers';
import noUiSlider from 'nouislider';

const slider = document.getElementById('slider');

noUiSlider.create(slider, {
  start: 200,
  step: 1,
  connect: 'lower',
  range: {
    min: 1,
    max: 300
  },
  format,
});

const inputTarget = document.getElementById('target');

slider.noUiSlider.on('update', (values, handle) => {
  inputTarget.value = values[handle];
});

inputTarget.addEventListener('change', e => {
  slider.noUiSlider.set(e.target.value);
});
