import jQuery from 'jquery';
// Assign jQuery globally before loading velocity
window.jQuery = window.$ = jQuery;
require('./lib/velocity');
require('./lib/velocity-ui');

import resolver from './resolver';

const items = [
  { name: 'Projekti', credits: 20, workload: 200 },
  { name: 'Algoritmit', credits: 2, workload: 40 },
  { name: 'Videot', credits: 5, workload: 20 },
  { name: 'Keikka', credits: 1, workload: 10 },
  { name: 'Ohjelmointi', credits: 9, workload: 90 },
  { name: 'Lopputyö', credits: 17, workload: 100 }
];

const optimalCourses = resolver(200, items);
console.log(optimalCourses);

const $courses = $('#courses');
optimalCourses.courses.map(course => {
  $courses.append(
    `<tr>
      <td>${course.get('name')}</td>
      <td>${course.get('credits')}</td>
      <td>${course.get('workload')}</td>
    </tr>`
  );
});


var $body = $('body');

var loading = [
    { elements: $body, properties: { width: '20%' } },
    { elements: $body, properties: { width: '30%' } },
    { elements: $body, properties: { width: '50%' } },
    { elements: $body, properties: { width: '100%' } },
    { elements: $body, properties: { height: '100%' }, options: {
      complete: function () {
        $('.wrap').velocity( 'transition.slideUpIn' );
        $('img').velocity( 'transition.flipYIn' );
        $('html').css({ background: '#fff' });
      }
    }
  }
];

//$('h1').velocity({ width: 75 });
//Velocity(document.querySelector('h1'), { width: 75 });
$.Velocity.RunSequence(loading);
