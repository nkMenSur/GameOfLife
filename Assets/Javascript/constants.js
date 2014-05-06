"use strict"

var Constants = {
  keyCodes: {
    WUp: 87,
    DRight: 68,
    SDown: 83,
    ALeft: 65,
    ArrowUp: 38,
    ArrowRight: 39,
    ArrowDown: 40,
    ArrowLeft: 37
  },
  colors: {
    BackgroundCanvasColor: '#bef093'
  },
  measurements: {
    BrickWidth: 5,
    BrickHeight: 5,
    CanvasHeight: 500,
    CanvasWidth: 500,
  },
  times: {
    MillisecondsPerTick: 10
  },
  ChanceOfLife: 100
}

console.log('---constants loaded---');