import React from 'react';
import {Text} from 'react-native';
import Matter from 'matter-js';

import constants from '../constants';
import Pipe from '../components/Pipe';
import PipeTop from '../components/PipeTop';

let tick = 0;
let pose = 1;
let pipes = 0;

// const Pipe = () => <Text>Truba</Text>;
// const PipeTop = () => <Text>Truba top</Text>;

export const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const resetPipes = () => {
  pipes = 0;
};

export const generatePipes = () => {
  let topPipeHeight = randomBetween(100, constants.MAX_HEIGHT / 2 - 100);
  let bottomPipeHeight =
    constants.MAX_HEIGHT - topPipeHeight - constants.GAP_SIZE;

  let sizes = [topPipeHeight, bottomPipeHeight];

  if (Math.random() < 0.5) {
    sizes = sizes.reverse();
  }

  return sizes;
};

export const addPipesAtLocation = (x, world, entities) => {
  let [pipe1Height, pipe2Height] = generatePipes();

  let pipeTopWidth = constants.PIPE_WIDTH + 20;
  let pipeTopHeight = (pipeTopWidth / 205) * 95;

  pipe1Height = pipe1Height - pipeTopHeight;

  let pipe1Top = Matter.Bodies.rectangle(
    x,
    pipe1Height + pipeTopHeight / 2,
    pipeTopWidth,
    pipeTopHeight,
    {isStatic: true},
  );

  let pipe1 = Matter.Bodies.rectangle(
    x,
    pipe1Height / 2,
    constants.PIPE_WIDTH,
    pipe1Height,
    {isStatic: true},
  );

  pipe2Height = pipe2Height - pipeTopHeight;

  let pipe2Top = Matter.Bodies.rectangle(
    x,
    constants.MAX_HEIGHT - 50 - pipe2Height - pipeTopHeight / 2,
    pipeTopWidth,
    pipeTopHeight,
    {isStatic: true},
  );

  let pipe2 = Matter.Bodies.rectangle(
    x,
    constants.MAX_HEIGHT - 50 - pipe2Height / 2,
    constants.PIPE_WIDTH,
    pipe2Height,
    {isStatic: true},
  );

  Matter.World.add(world, [pipe1, pipe1Top, pipe2, pipe2Top]);

  entities['pipe' + (pipes + 1)] = {
    body: pipe1,
    renderer: Pipe,
    scored: false,
  };

  entities['pipe' + (pipes + 2)] = {
    body: pipe2,
    renderer: Pipe,
    scored: false,
  };

  entities['pipe' + (pipes + 1) + 'Top'] = {
    body: pipe1Top,
    renderer: PipeTop,
    scored: false,
  };

  entities['pipe' + (pipes + 2) + 'Top'] = {
    body: pipe2Top,
    renderer: PipeTop,
    scored: false,
  };

  pipes += 2;
};

const Physics = (entities, {touches, time, dispatch}) => {
  let engine = entities.physics.engine;
  let world = entities.physics.world;
  let player = entities.player.body;

  world.gravity.y = 1.2;

  Matter.Engine.update(engine, time.delta);

  // touches.map(t => {
  //   if (t.type === 'move') {
  //     Matter.Body.setVelocity(player, {
  //       x: t.delta.pageX,
  //       y: 0,
  //     });
  //   }
  // });

  return entities;
};

export default Physics;
