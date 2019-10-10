class Setup {
  constructor(srcs, callbacks) {
    for (var src in srcs){
      this[src] = srcs[src];
    }
    for (var callback of callbacks){
      this[callback]();
    }
  }

 script(){
   for (const script of this.scripts) {
     this.addScript(script);
     try {sleep(1000);}catch(error) {}
   }
 }

 addScript( src ) {
    var s = document.createElement( 'script' );
    s.setAttribute( 'type', 'text/javascript' );
    s.setAttribute( 'src', this.path + src );
    document.head.appendChild(s);
  }
}


(function () {
   new Setup(
     {path: "../backend/", scripts: ["casu.js", "snake.js", "food.js", "game.js"]},
     ["script"]
   );
})()
