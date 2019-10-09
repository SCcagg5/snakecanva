function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

const direction = {
    TOP: [0, -1],
    RIGHT: [1, 1],
    DOWN: [2, 1],
    LEFT: [3, -1]
};
