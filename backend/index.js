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
   }
 }

 addScript( src ) {
    var s = document.createElement( 'script' );
    s.setAttribute( 'type', 'text/javascript' );
    s.setAttribute( 'src', src );
    document.head.appendChild(s);
  }
}


(function () {
   new Setup(
     {scripts: ["../backend/casu.js", "../backend/game.js"]},
     ["script"]
   );
})()
