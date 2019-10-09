onmessage = function(e) {
  var time = 0;
  var start;
  var i;
  while(1){
    start = new Date().getTime();
    for (i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > e.data){
        break;
      }
    }
    time += 1;
    postMessage(time);
  }
}
