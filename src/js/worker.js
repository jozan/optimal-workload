import resolver from './resolver';

self.addEventListener('message', function(e) {
  const data = e.data;
  switch (data.cmd) {
    case 'optimize':
      // Calculate optimal courses
      const optimalCourses = resolver(data.targetHours, data.courses);

      // Send calculated courses back to UI thread
      self.postMessage(optimalCourses);
      break;
    case 'stop':
      self.close(); // Terminates the worker.
      break;
  };
}, false);
