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

// Generate random courses
const items = randomCourses(20);

const worker = new Worker('js/worker.js');

worker.addEventListener('message', e => {
  showOptimalCourses(e.data);
});

// Show all courses
showAllCourses(items);

$('#optimize').on('click', e => {
  fadeOut('#optimize');
  toggleContent('.all-courses', '.optimized-courses');
  // Calculate optimal courses on worker to keep UI responsive
  worker.postMessage({
    cmd: 'optimize',
    targetHours: format.from($('#target').val()),
    courses: items
  });
});

$('#edit-options').on('click', function() {
  fadeOut('#edit-options');
  toggleContent('.optimized-courses', '.all-courses');
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

function fadeOut(e) {
  $(e).velocity("fadeOut", { duration: 1500 }).addClass('hidden');
}

function fadeIn(e) {
  $(e).velocity("fadeIn", { duration: 1500 }).removeClass('hidden');
}

function toggleContent(courses1, courses2) {
  if ($(courses1).is(':visible') ) {
    $(courses1).velocity("slideUp", {
      duration: 1500,
      complete(el) {
        $(courses2).velocity("slideDown", { duration: 1500 });
      }
    });
  } else {
    $(courses1).velocity("slideDown", {
      duration: 1500,
      complete(el) {
        $(courses2).velocity("slideUp", { duration: 1500 });
      }
    });
  }
}

function slideIn(e) {

}

function showAllCourses(courses) {
  const $courses = $('#courses');
  const $allCourses = $('#all-courses');
  fadeIn('#optimize');

  // Clear previous results;
  $allCourses.html('');

  const htmlCourses = makeRows(courses);
  $allCourses.append(htmlCourses);
}

function showOptimalCourses(optimalCourses) {
  const $courses = $('#courses');
  fadeIn('#edit-options');

  // Clear previous results;
  $courses.html('');

  const htmlOptimalCourses = makeRows(optimalCourses.courses);
  $courses.append(htmlOptimalCourses);
}

/***************************************************************
 * Loading animation
 */
var $body = $('body');

var loading = [
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
