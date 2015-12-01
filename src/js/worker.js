import resolver from './resolver';
import randomCourses from './randomCourses';

self.addEventListener('message', function(e) {
  var data = e.data;
  switch (data.cmd) {
    case 'optimize':
      const optimalCourses = resolver(data.targetHours, randomCourses(data.randomCourses));
      self.postMessage(optimalCourses);
      break;
    case 'stop':
      self.close(); // Terminates the worker.
      break;
  };
}, false);
