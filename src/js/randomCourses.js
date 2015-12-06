import { List } from 'immutable';

const names = [
  'Algoritmit',
  'Keikka',
  'Lopputyö',
  'Ohjelmointi',
  'Projekti',
  'Videot',
];

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function uniq(array) {
  array = List(array).sortBy(course => course.name).toJS();

  return array.reduce((prev, curr) => {
      if (prev.name !== curr.name) prev.push(curr);
      return prev;
  }, []);
}

export default function randomCourses(n) {
  let courses = [];

  for (var i = 0; i < n; i++) {
    const name = names[rand(0, names.length-1)];
    const credits = rand(1,20);
    const workload = rand(10,200);

    courses.push({
      name: `${name} - ${credits}`,
      credits,
      workload,
    });
  };

  return uniq(courses);
}
