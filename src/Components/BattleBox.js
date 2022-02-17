import React from 'react';
import PropTypes from 'prop-types';
import AttacksBox from './AttacksBox';
import Player from './Player';
import TextBox from './TextBox';

export default function BattleBox({
  enemy,
  enemyStatus,
  hero,
  heroStatus,
  playersHp,
  message,
  attacks,
}) {
  return (
    <div className="px-2 mx-auto panel battle-box">
      {enemy && (
        <Player
          name={enemy}
          hp={playersHp[enemy]}
          status={enemyStatus}
          hero={false}
        />
      )}
      {hero && <Player name={hero} hp={playersHp[hero]} status={heroStatus} />}
      <div className="text-container">
        <div className="text-box">
          <div className="text-box-content">
            <div className="battle-text-content">
              {attacks.length > 0 ? (
                <AttacksBox attacks={attacks} />
              ) : (
                <TextBox message={message} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

BattleBox.propTypes = {
  enemy: PropTypes.string.isRequired,
  enemyStatus: PropTypes.string.isRequired,
  hero: PropTypes.string.isRequired,
  heroStatus: PropTypes.string.isRequired,
  playersHp: PropTypes.objectOf(PropTypes.number).isRequired,
  message: PropTypes.string,
  attacks: PropTypes.arrayOf(PropTypes.string),
};

BattleBox.defaultProps = {
  message: '',
  attacks: [],
};
