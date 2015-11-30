import { Map, List } from 'immutable';

function resolve(i, w, items) {
  if (i < 0 || w == 0) {
    return {
      name: '',
      workload: 0,
      credits: 0,
    };
  } else if (items[i].workload > w) {
    return resolve(i-1, w, items);
  }

  const temp = resolve(i-1, w, items);
  const i0 = temp.name;
  const w0 = temp.workload;
  const v0 = temp.credits;

  const temp2 = resolve(i-1, w-items[i].workload, items);
  let i1 = temp2.name;
  let w1 = temp2.workload;
  let v1 = temp2.credits;
  v1 += items[i].credits;

  if (v1 > v0) {
    return {
      name: (i1 + ';;' + items[i].name).trim(),
      workload: w1 + items[i].workload,
      credits: v1
    }
  }

  return {
    name: i0,
    workload: w0,
    credits: v0
  }
}

export default function(capacity, items) {
  const solution = resolve(items.length-1, capacity, items);
  const optimal = List(solution.name.split(';;')).delete(0);

  const courses = List(items)
    .map(i => Map(i))
    .filter(i => {
      return optimal.includes(i.get('name'));
    });

  return {
    courses,
    totalWorkload: solution.workload,
    totalCredits: solution.credits
  }
}
