class Food {
  constructor(maxh, maxw) {
    this.x = Math.floor(Math.random() * Math.floor(maxw - 1)) + 1;
    this.y =  Math.floor(Math.random() * Math.floor(maxh - 1)) + 1;
    this.part = [[this.x, this.y]];
    this.color = 'rgb(200, 0, 0)';
  }
}
