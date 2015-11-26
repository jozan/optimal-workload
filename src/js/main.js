import resolver from './resolver';
import ui from 'popmotion';
import $ from 'jquery';

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


var ACTOR_DATA = 'actor',
    ripple = new ui.Tween({
        values: {
            radius: {
                current: 0,
                to: 100
            },
            opacity: {
                current: .5,
                to: 0
            }
        },
        dilate: .3,
        duration: 500,
        ease: 'easeOut'
    }),
    getXY = function(event) {
        var isTouch = false;

        event = event.originalEvent || event;
        isTouch = (event.touches);

        return {
            x: isTouch ? event.touches[0].pageX - event.touches[0].target.offsetLeft : event.offsetX,
            y: isTouch ? event.touches[0].pageY - event.touches[0].target.offsetTop : event.offsetY
        };
    };

$('body').on('touchstart mousedown', 'button', function(e) {
    var button = this,
        $button = $(button),
        rippleActor = $button.data(ACTOR_DATA) || new ui.Actor(),
        coordinates = getXY(e);

    $button.data(ACTOR_DATA, rippleActor);
    e.preventDefault();
    e.stopPropagation();

    rippleActor.start(ripple.extend({
        onUpdate: function(output) {
            var gradient = 'radial-gradient(' + output.radius + 'px at ' + coordinates.x + 'px ' + coordinates.y + 'px, rgba(255,255,255, ' + output.opacity + ') 0%, rgba(255,255,255, ' + output.opacity + ') ' + output.radius + 'px,  rgba(255,255,255, 0) ' + (output.radius + 1) + 'px)';

            ui.css.set(button, 'backgroundImage', gradient);
        }
    }));

    // Animate at full speed on mouseup
    $('body').on('mouseup touchend', function() {
        rippleActor.dilate = 1;
    });
});
