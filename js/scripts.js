const timeDec = (sec, min) => {
  return [sec == 0 ? min == 0 ? gameEnd() : 59 : sec - 1, sec == 0 ? min == 0 ? 0 : min - 1 : min]
}

const gameEnd = () => {
  clearInterval(timer);
  return 0;
}

$(document).ready(() => {

  const timer = setInterval(() => {
    var time = timeDec($("#seconds").text(), $("#minutes").text());
    $("#seconds").text(time[0]);
    $("#minutes").text(time[1]);
  }, 1000)
});
