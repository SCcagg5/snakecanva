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
