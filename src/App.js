import React from 'react';
import TextBox from './Components/TextBox';
import Enemy from './Components/Enemy';
import Player from './Components/Player';

export default function App() {
  return (
    <div className="container h-100">
      <div className="row row h-100 justify-content-center align-items-center">
        <div className="col-sm-12">
          <div id="battle-container" className="px-2 mx-auto">
            <Enemy
              name="Mario"
              img="../assets/img/mario.jpeg"
              lives={2}
              hide={false}
              faint={false}
            />
            <Player
              name="Luis"
              img="../assets/img/luis.jpeg"
              lives={1}
              hide={false}
              faint={false}
            />
            <div id="text-box">
              <div id="text-box-content">
                <TextBox messageOne="A wild Mario appeared!" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
