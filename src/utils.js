export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getProgressBarVariant(lives) {
  return lives < 2 ? 'danger' : 'success';
}

/*
  Implementing this is not ideal. However, IMO, is better than
  nested setTimeout calls and state handling.
*/
export function sleep(milliseconds) {
  // eslint-disable-next-line no-new, no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export const imageLoader = require.context('../assets/img/', false);
