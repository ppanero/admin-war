import React from 'react';
import PropTypes from 'prop-types';
import Enemy from './Enemy';
import Hero from './Hero';
import TextBox from './TextBox';

export default function BattleBox({
  enemy,
  enemyHit,
  hero,
  playerLives,
  message,
}) {
  return (
    <div className="px-2 mx-auto panel battle-box">
      {enemy && (
        <Enemy name={enemy} lives={playerLives[enemy]} shake={enemyHit} />
      )}
      {hero && <Hero name={hero} lives={playerLives[hero]} />}
      <div className="text-container">
        <div className="text-box">
          <div className="text-box-content">
            {enemy && <TextBox message={message} />}
          </div>
        </div>
      </div>
    </div>
  );
}

BattleBox.propTypes = {
  enemy: PropTypes.string.isRequired,
  enemyHit: PropTypes.bool.isRequired,
  hero: PropTypes.string.isRequired,
  playerLives: PropTypes.objectOf(PropTypes.number).isRequired,
  message: PropTypes.string.isRequired,
};
