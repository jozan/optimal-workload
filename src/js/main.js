import { List } from 'immutable';
import jQuery from 'jquery';

// Assign jQuery globally for depending libraries
window.jQuery = window.$ = jQuery;
require('./lib/velocity');
require('./lib/velocity-ui');
require('./slider');

import {
  format,
  makeRows,
  makeEditableRows,
  createNewItem,
} from './helpers';

// Uncomment if needed
// import randomCourses from './randomCourses';

const defaultItems = [
  { name: 'Projekti', credits: 20, workload: 200 },
  { name: 'Algoritmit', credits: 2, workload: 40 },
  { name: 'Videot', credits: 5, workload: 20 },
  { name: 'Keikka', credits: 1, workload: 10 },
  { name: 'Ohjelmointi', credits: 9, workload: 90 },
  { name: 'Lopputyö', credits: 17, workload: 100 }
];

/***************************************************************
 * Initialize application
 */

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
let items = List(defaultItems);

// Create Web Worker
const worker = new Worker('js/worker.js');

// Show all courses in the start
showAllCourses(items);

// Listen Web Worker when it has finished its job
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
  const $coursesSymmary = $('#courses-summary');
  $('.all-courses').velocity('slideUp');

  // Clear previous results;
  $courses.html('');
  $coursesSymmary.html('');

  const htmlCoursesSummary = makeRows([{
    empty: 'Total',
    totalCredits: optimalCourses.totalCredits,
    totalWorkload: optimalCourses.totalWorkload
  }]);

  $coursesSymmary.append(htmlCoursesSummary);

  const htmlOptimalCourses = makeRows(optimalCourses.courses);
  $courses.append(htmlOptimalCourses);
}

/***************************************************************
 * Edit rows
 */
$('table').on('change', '.cell-edit', e => {
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
 * Add new row
 */
$('form').on('submit', e => {
  e.preventDefault();
  const $inputs = $('form').find('input');
  const values = [];

  $inputs.each((i, item) => {
    const $item = $(item);
    values.push($item.val());
    $item.val('')
  });

  items = items.push(createNewItem(values));

  // Re-render list
  showAllCourses(items);
});

/***************************************************************
 * Remove row
 */
$('table').on('click', '.remove-row', e => {
  const $row = $(e.target);
  const row = $row.data('row');

  // Remove row
  items = items.delete(row);

  // Re-render list
  showAllCourses(items);
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
  { elements: $body, properties: { height: '100%' },
    options: {
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
