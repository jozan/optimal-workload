import jQuery from 'jquery';
// Assign jQuery globally before loading velocity
window.jQuery = window.$ = jQuery;
require('./lib/velocity.min');
require('./lib/velocity-ui.min');

import slider from 'nouislider';

// const items = [
//   { name: 'Projekti', credits: 20, workload: 200 },
//   { name: 'Algoritmit', credits: 2, workload: 40 },
//   { name: 'Videot', credits: 5, workload: 20 },
//   { name: 'Keikka', credits: 1, workload: 10 },
//   { name: 'Ohjelmointi', credits: 9, workload: 90 },
//   { name: 'Lopputyö', credits: 17, workload: 100 }
// ];

const worker = new Worker('js/worker.js');

worker.addEventListener('message', e => {
  showOptimalCourses(e.data);
});

// Calculate optimal courses on worker to keep UI responsive
worker.postMessage({
  cmd: 'optimize',
  targetHours: 200,
  randomCourses: 170
});

function showOptimalCourses(optimalCourses) {
  const $courses = $('#courses');
  const $allCourses = $('#all-courses');
  optimalCourses.courses.map(course => {
    $courses.append(
      `<tr>
        <td>${course.name}</td>
        <td>${course.credits}</td>
        <td>${course.workload}</td>
      </tr>`
    );
    $allCourses.append(
      `<tr>
        <td>${course.name}</td>
        <td>${course.credits}</td>
        <td>${course.workload}</td>
      </tr>`
    );
  });
}

var $body = $('body');

var loading = [
    { elements: $body, properties: { width: '20%' } },
    { elements: $body, properties: { width: '30%' } },
    { elements: $body, properties: { width: '50%' } },
    { elements: $body, properties: { width: '100%' } },
    { elements: $body, properties: { height: '100%' }, options: {
      complete: function () {
        $('.wrap').velocity( 'transition.slideUpIn' );
        $('html').css({ background: '#F1F3F2' });
      }
    }
  }
];

//$('h1').velocity({ width: 75 });
//Velocity(document.querySelector('h1'), { width: 75 });
$.Velocity.RunSequence(loading);

$('#show-all').on('click', e => {
  $('.wrap').velocity('transition.slideDownOut');
});

$('.card-two').on('mouseenter', e => {

  if ($(e.target).hasClass('velocity-animating')) {
    return;
  }

  $('.card-one').velocity({
    rotateX: '84deg',
    translateY: '-316px'
  }, { easing: 'easeOutQuid' });

  $('.card-two').velocity({
    rotateX: '.1deg',
    translateY: '1px'
  }, { easing: 'easeOutQuid' });

}).on('mouseleave', e => {
  $('.card-one').velocity({
    rotateX: '84deg',
    translateY: '47px'
  }, { easing: 'easeOutQuid' });

  $('.card-two').velocity({
    rotateX: '84deg',
    translateY: '-316px'
  }, { easing: 'easeOutQuid' });
});

$('.card-one').on('mouseenter', e => {

  if ($(e.target).hasClass('velocity-animating')) {
    return;
  }

  $('.card-one').velocity({
    rotateX: '.1deg',
    translateY: 0
  }, { easing: 'easeOutQuid' });
}).on('mouseleave', e => {
  $('.card-one').velocity({
    rotateX: '84deg',
    translateY: '47px'
  }, { easing: 'easeOutQuid' });
});
