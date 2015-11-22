import { Map, List } from 'immutable';
import _ from 'lodash';

const items = [
  { name: 'Tussi', credits: 20, workload: 2000 },
  // { name: 'Projekti', credits: 20, workload: 200 },
  { name: 'Algoritmit', credits: 2, workload: 40 },
  { name: 'Videot', credits: 5, workload: 20 },
  { name: 'Keikka', credits: 1, workload: 10 },
  { name: 'Ohjelmointi', credits: 9, workload: 90 },
  { name: 'Lopputyö', credits: 17, workload: 100 }
];

function resolve(capacity, items) {

  if (! _.isNumber(capacity)) {
    throw "Capacity is not a number";
  }

  if (! _.isArray(items)) {
    throw "Items is not an array";
  }

  let leftCap = capacity,
      itemsFiltered;

  // Create immutable list
  const list = List(items);

  items = list
    // Exclude items that exceed the given capacity
    // TODO: this might be unnecessary...
    .filter(item =>
      item.workload >= 0 && item.workload <= capacity
    )

    // Sort by workload
    .sortBy(item => -item.workload)

    // Filter over capacity
    .filter(item => {
      const value = parseInt(item.workload, 10);

      if ((leftCap - value) >= 0) {
        leftCap = leftCap - value;
        return true;
      }

      return false;
    });

  return items;
}

// Run resolver
const optimalWorkload = resolve(200, items);

console.log(optimalWorkload.toJS());
