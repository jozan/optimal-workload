/**
 * Simple formatter
 *   - to: 10 -> 10 h
 *   - from : 10 h -> 10
 */
export const format = {
  to: value => Math.round(value) + ' h',
  from: value => value.replace(' h', '')
}

/**
 * Create a new object from given values
 */
export function createNewItem(values) {
  return {
    name: values[0],
    credits: parseInt(values[1], 10),
    workload: parseInt(values[2], 10)
  };
}

/**
 * Create HTML table rows from array of objects
 *   - Every key is in its own cell
 */
export function makeRows(rows) {
  return rows.reduce((html, row) => {
    const keys = Object.keys(row);

    html += '<tr>';
    keys.forEach(key => html += `<td>${row[key]}</td>`);
    html += '</tr>';

    return html;
  }, '');
}

/**
 * Create HTML table with editable rows from array of objects
 */
export function makeEditableRows(rows) {
  return rows.reduce((html, row, rowIndex, rows) => {
    const keys = Object.keys(row);

    html += '<tr>';

    keys.forEach(key => html += `
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
      </td>
    `;

    html += '</tr>';

    return html;
  }, '');
}
