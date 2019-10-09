class Game {
  constructor(srcs, callbacks) {
    for (var src in srcs){
      this[src] = srcs[src];
    }
    for (var callback of callbacks){
      this[callback]();
    }
  }

  setup(){
    var key = { 37: "LEFT", 38: "TOP", 39: "RIGHT", 40: "DOWN"};
    document.addEventListener('keyup', keyUpHandler, false);
    function keyUpHandler(event) {
      if (event.keyCode > 36 && event.keyCode < 41){
        game.snake.changedir(key[event.keyCode]);
      }
    }
    this.food = [];
    this.base = document.getElementById(this.canva);
    this.canva = this.base.getContext("2d");
    this.width = this.base.offsetWidth;
    this.height = this.base.offsetHeight;
    this.casesize = this.height / 20;
    this.diff = 500;
    this.snake = new Snake(5, 5, 2);
    this.gamestat = 0;
    this.basegame();
  }

  calcsize(){
    if(this.gamestat != 1) {
      this.wsize = Math.floor((this.width - 20) / this.casesize);
      this.hsize = Math.floor((this.height - 20) / this.casesize);
    }
  }

  basegame(){
    this.width = this.base.offsetWidth;
    this.height = this.base.offsetHeight;
    this.canva.fillStyle = 'rgb(200, 200, 200)';
    this.canva.fillRect(0,0,this.width,this.height);
    this.calcsize();
    this.wall();
  }

  wall(){
    this.canva.moveTo(this.casesize, this.casesize);
    this.canva.lineTo(this.casesize, this.casesize * this.hsize);
    this.canva.lineTo(this.casesize * this.wsize, this.casesize * this.hsize);
    this.canva.lineTo(this.casesize * this.wsize, this.casesize);
    this.canva.lineTo(this.casesize, this.casesize);
    this.canva.stroke();
  }

  draw(obj){
    this.canva.fillStyle = obj.color ;
    for (var i of obj.part) {
      this.canva.fillRect(i[0] * this.casesize ,i[1] * this.casesize,this.casesize - 1,this.casesize - 1);
    }
    this.wall();
  }

  drawAll(objs){
    for (var i of objs){
      this.draw(i);
    }
  }

  changesize(width, height){
    this.base.setAttribute( 'height', height);
    this.base.setAttribute( 'width', width);
    this.basegame();
    this.drawAll(this.food);
  }

  checkgameover(){
    if (this.snake.x == 0 || this.snake.x == this.wsize || this.snake.y == 0 || this.snake.y == this.hsize){
      this.gamestat = 0;
      this.snakeworker.terminate();
      this.drawworker.terminate();
      return true;
    }
    return false;
  }

  fullscreen(){
    if (window.innerWidth != this.width || window.innerHeight != this.height){
      this.changesize(window.innerWidth, window.innerHeight);
    }
  }

  changespeed(speed){
    this.diff = speed;
    this.snakeworker.terminate();
    this.snakeworker = new Worker("../backend/timeworker.js");
    this.snakeworker.onmessage = function(e) {game.snake.move()}
    this.snakeworker.postMessage(this.diff + 0);
  }

  checkcollide(a, b){
    for (var i1 of a.part){
      for (var i2 of b.part) {
        if (i2[0] == i1[0] && i2[1] == i1[1]){
          return true;
        }
      }
    }
    return false;
  }

  addfood(){
    var size = this.food.length;
    var food = new Food(Math.floor(Math.random() * Math.floor(this.wsize - 1)) + 1, Math.floor(Math.random() * Math.floor(this.hsize - 1)) + 1);
    while (this.checkcollide(this.snake, food)){
      for (var i in this.food){
          if (this.checkcollide(this.food[i], food))
              return addfood();
      }
    }
    this.food[size] = food;
    this.draw(this.food[size]);
  }

  start(){
    this.gamestat = 1;

    for (var i = 0; i < 100; i++)
      this.addfood();
    this.snakeworker = new Worker("../backend/timeworker.js");
    this.snakeworker.onmessage = function(e) {game.snake.move();}
    this.snakeworker.postMessage(this.diff + 0);

    this.drawworker = new Worker("../backend/timeworker.js");
    this.drawworker.onmessage = function(e) {
    for (var i in game.food)
        if (game.checkcollide(game.snake, game.food[i])){
          game.food.splice(i,1);
          game.snake.size += 1;
          game.changespeed(game.diff - 50 > 100 ? game.diff - 50 : 100);
        }
        game.draw(game.snake);

        game.checkgameover();
    }
    this.drawworker.postMessage(1000 / 30);
  }
}

class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.part = [[this.x, this.y]];
      this.color = 'rgb(200, 0, 0)';
  }
}

class Snake {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.part = [[this.x, this.y]];
    this.dir = "DOWN";
    this.color = 'rgb(0, 0, 0)';

  }

  move(){
    if (direction[this.dir][0] % 2 != 0){
      this.x += direction[this.dir][1];
    } else {
      this.y += direction[this.dir][1];
    }
    this.part.unshift([this.x, this.y]);
    this.checksize();
  }

  checksize(){
    if (game.gamestat != 1){
      return;
    }
    if (this.size < this.part.length){
      var part = this.part.pop();
      game.canva.fillStyle = 'rgb(200, 200, 200)';
      game.canva.fillRect(part[0] * game.casesize - 1 , part[1] * game.casesize - 1, game.casesize + 1,game.casesize + 1);
    }
  }

  changedir(dir){
    if (direction[this.dir][0] != ((direction[dir][0] + 2) % 4)){
      this.dir = dir;
    }
  }
}

(function () {
   game = new Game(
     {"canva": "game"},
     ["setup", "fullscreen", "start"]
   );
})()
