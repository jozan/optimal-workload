import { List } from 'immutable';
import jQuery from 'jquery';

// Assign jQuery globally before loading velocity
window.jQuery = window.$ = jQuery;
require('./lib/velocity');
require('./lib/velocity-ui');

import noUiSlider from 'nouislider';
import { format } from './helpers';
import randomCourses from './randomCourses';

// const items = [
//   { name: 'Projekti', credits: 20, workload: 200 },
//   { name: 'Algoritmit', credits: 2, workload: 40 },
//   { name: 'Videot', credits: 5, workload: 20 },
//   { name: 'Keikka', credits: 1, workload: 10 },
//   { name: 'Ohjelmointi', credits: 9, workload: 90 },
//   { name: 'Lopputyö', credits: 17, workload: 100 }
// ];

/**
 * Global application state
 *
 * To keep track of which view is currently
 * visible so we don't need to rely on
 * slow DOM checks.
 */
window.state = {
  showEdit: true,
  showOptimized: false,
  isOptimizing: false
};

// Generate random courses
let items = List(randomCourses(5));

// TODO: remove me
window.items = items;

// Create Web Worker
const worker = new Worker('js/worker.js');

worker.addEventListener('message', e => {
  state.isOptimizing = false;

  const { data } = e;
  data.courses = List(data.courses);
  showOptimalCourses(data);

  if (!state.showOptimized) {
    $('.optimized-courses').velocity('slideDown', {
      duration: 400,
      complete(el) {
        state.showOptimized = true;
      }
    });
  }
});

// Show all courses
showAllCourses(items);

$('#optimize').on('click', e => {
  $('.all-courses').velocity('slideUp', 400);

  state.showEdit = false;
  state.isOptimizing = true;

  // Calculate optimal courses on worker to keep UI responsive
  worker.postMessage({
    cmd: 'optimize',
    targetHours: format.from($('#target').val()),
    courses: items.toJS()
  });
});

$('#edit-options').on('click', e => {
  state.showOptimized = false;

  $('.optimized-courses').velocity('slideUp', 400);

  if (!state.showEdit) {
    $('.all-courses').velocity('slideDown', {
      duration: 400,
      complete(el) {
        state.showEdit = true;
      }
    });
  }
});


/**
 * Create HTML table rows from array of objects
 *   - Every key is in its own cell
 */
function makeRows(rows) {
  let html = '';

  rows.map(row => {
    const keys = Object.keys(row);
    html += '<tr>';
    keys.map(key => html += `<td>${row[key]}</td>`);
    html += '</tr>';
  });

  return html;
}

// Same as makeRows but cell content is
// wrapped around input element
function makeEditableRows(rows) {
  let html = '';

  rows.map((row, rowIndex) => {
    const keys = Object.keys(row);
    html += '<tr>';
    keys.map(key => html += `
      <td>
        <input
          class="cell-edit"
          data-row="${rowIndex}"
          data-key="${key}"
          value="${row[key]}"
        >
      </td>`
    );
    html += '</tr>';
  });

  return html;
}

function showAllCourses(courses) {
  const $allCourses = $('#all-courses');
  $('.optimized-courses').velocity('slideUp');

  // Clear previous results;
  $allCourses.html('');

  const htmlCourses = makeEditableRows(courses);
  $allCourses.append(htmlCourses);
}

function showOptimalCourses(optimalCourses) {
  const $courses = $('#courses');
  $('.all-courses').velocity('slideUp');

  // Clear previous results;
  $courses.html('');

  const htmlOptimalCourses = makeRows(optimalCourses.courses);
  $courses.append(htmlOptimalCourses);
}

/***************************************************************
 * Edit rows
 */
$('.cell-edit').on('change', e => {
  const $cell = $(e.target);
  const row = $cell.data('row');
  const key = $cell.data('key');
  const value = $cell.val();

  // Update row value
  items = items.update(row, r => {
    r[key] = parseInt(value, 10);
    return r;
  });
});

/***************************************************************
 * Loading animation
 */
const $body = $('body');

const loading = [
    { elements: $body, properties: { width: '20%' } },
    { elements: $body, properties: { width: '30%' } },
    { elements: $body, properties: { width: '50%' } },
    { elements: $body, properties: { width: '100%' } },
    { elements: $body, properties: { height: '100%' }, options: {
      complete() {
        $('.wrap').velocity('transition.slideUpIn', {
            complete(el) {
              $(el).css('transform', '');
            }
        });
        $('html').css({ background: '#F1F3F2' });
      }
    }
  }
];

$.Velocity.RunSequence(loading);

/***************************************************************
 * Slider
 */
const slider = document.getElementById('slider');

noUiSlider.create(slider, {
  start: 40,
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
