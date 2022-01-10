export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getProgressBarVariant(lives) {
  return lives < 2 ? 'danger' : 'success';
}
