/**
 * Simple formatter
 *   - to: 10 -> 10 h
 *   - from : 10 h -> 10
 */
export const format = {
  to: value => Math.round(value) + ' h',
  from: value => value.replace(' h', '')
}

export function createNewItem(values) {
  return {
    name: values[0],
    credits: parseInt(values[1]),
    workload: parseInt(values[2])
  };
}

/**
 * Create HTML table rows from array of objects
 *   - Every key is in its own cell
 */
export function makeRows(rows) {
  let html = '';

  rows.map(row => {
    const keys = Object.keys(row);
    html += '<tr>';
    keys.map(key => html += `<td>${row[key]}</td>`);
    html += '</tr>';
  });

  return html;
}

// Same as makeRows but cell content is
// wrapped around input element
export function makeEditableRows(rows) {
  let html = '';

  rows.map((row, rowIndex) => {
    const keys = Object.keys(row);
    html += '<tr>';
    keys.map(key => html += `
      <td>
        <input
          class="cell-edit"
          data-row="${rowIndex}"
          data-key="${key}"
          value="${row[key]}"
        >
      </td>`
    );
    html += `
      <td>
        <span class="remove-row icon-trashcan" data-row="${rowIndex}"></span>
      </td>`;
    html += '</tr>';
  });

  return html;
}
