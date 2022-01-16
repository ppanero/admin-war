const PlayerStatus = {
  APPEAR: 'APPEAR',
  HIT: 'HIT',
  DEAD: 'error',
};

export default function playerStatus(status) {
  return PlayerStatus[status];
}
