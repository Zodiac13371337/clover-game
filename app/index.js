import Matter from 'matter-js';
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {GameEngine} from 'react-native-game-engine';

import constants from './constants';
import Player from './components/Player';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      running: true,
    };

    this.gameEngine = null;

    this.entities = this.setupWorld();
  }

  setupWorld = () => {
    let engine = Matter.Engine.create({enableSleeping: false});
    let world = engine.world;

    let player = Matter.Bodies.rectangle(
      constants.MAX_WIDTH / 4,
      constants.MAX_HEIGHT / 2,
      50,
      50,
    );

    Matter.World.add(world, [player]);

    return {
      physics: {engine: engine, world: world},
      player: {body: player, size: [50, 50], color: 'red', renderer: Player},
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <GameEngine
          ref={ref => {
            this.gameEngine = ref;
          }}
          style={styles.gameContainer}
          running={this.state.running}
          entities={this.entities}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});