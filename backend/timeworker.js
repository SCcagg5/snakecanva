onmessage = function(e) {
  while(1){
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > e.data){
        break;
      }
    }
    postMessage("");
  }
}
