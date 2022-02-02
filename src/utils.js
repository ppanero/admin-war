import playerStatus from './playerStatus';

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getProgressBarVariant(hp) {
  if (hp > 74) {
    return 'success';
  }
  if (hp > 24) {
    return 'warning';
  }
  return 'danger';
}

export function getAnimationForStatus(status) {
  switch (status) {
    case playerStatus('APPEAR'):
      return 'animate__fadeInUp';

    case playerStatus('HIT'):
      return 'animate__shakeX';

    case playerStatus('DEAD'):
      return 'animate__fadeOut slow';

    default:
      return '';
  }
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
