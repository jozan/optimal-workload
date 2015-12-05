export const format = {
  to: value => Math.round(value) + ' h',
  from: value => value.replace(' h', '')
}
