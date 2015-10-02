function sunday() {
  var count = 0;
  var days = 365;
  for (var i = 7; i < days; i+=7) {
    if (365 % i === 0) {
      days -= 1;
    } else {
      count += 1;
      console.log(count);
    }
  }

}

function sunday() {
  var days = ['m', 't', 'w', 'r', 'f', 'sa', 'su'];
  var months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  for (var y = 1900; y <= 1999; y+=1) {
    for (var m = 0; m < months.length; m+=1) {
      for (var n = 1; n <= months[m]; n+=1) {
        
      }
    }
  }
}
sunday();