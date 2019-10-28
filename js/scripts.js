// Business Functions

const timeDec = (sec, min, timer) => {
  return [sec == 0 ? min == 0 ? gameEnd(timer) : 59 : sec - 1, sec == 0 ? min == 0 ? 0 : min - 1 : min];
}

const shuffleScenarios = () => {
  return [{prompt: "s0", choiceTrue: "s00", choiceFalse: "s01"}, {prompt: "s1", choiceTrue: "s10", choiceFalse: "s11"}, {prompt: "s2", choiceTrue: "s20", choiceFalse: "s21"}, {prompt: "s3", choiceTrue: "s30", choiceFalse: "s31"}, {prompt: "s4", choiceTrue: "s40", choiceFalse: "s41"}, {prompt: "s5", choiceTrue: "s50", choiceFalse: "s51"}, {prompt: "s6", choiceTrue: "s60", choiceFalse: "s61"}, {prompt: "s7", choiceTrue: "s70", choiceFalse: "s71"}, {prompt: "s8", choiceTrue: "s80", choiceFalse: "s81"}, {prompt: "s9", choiceTrue: "s90", choiceFalse: "s91"}].sort(() => Math.random() - 0.5);
}

const gameEnd = (timer) => {
  console.log("game over");
  clearInterval(timer);
  return 0;
}

const choiceOut = (scenarios,i,j) => {
  return j ? [scenarios[i].prompt,scenarios[i].choiceFalse,scenarios[i].choiceTrue] : [scenarios[i].prompt,scenarios[i].choiceTrue,scenarios[i].choiceFalse];
}

const answer = (bool) => {
  if (bool) {
    console.log("true");
    changeGas(10);
  } else {
    console.log("false");
    changeGas(-10);
  }
}

const random = () => {
  return Math.round(Math.random());
}

// UI Functions

const showScenarios = (scenarios,index,randomChoice) => {
  let arrayOut = choiceOut(scenarios,index,randomChoice);
  $("#prompt p").text(arrayOut[0]);
  $("#choice0 p").text(arrayOut[1]);
  $("#choice1 p").text(arrayOut[2]);
}

const changeGas = (amount) => {
  $("#gas").text((parseFloat($("#gas").text()) + amount).toPrecision(3));
}

$(document).ready(() => {
  let randomChoice = random();
  let index = 0;
  const scenarios = shuffleScenarios();
  showScenarios(scenarios,index,randomChoice);

  $(".choice").click(function(){
    answer(scenarios[index].choiceTrue == $(this).find("p").text() ? true : false);
    index = index == 9 ? 0 : index + 1;
    showScenarios(scenarios,index, random());
  });

  let timer = setInterval(() => {
    var time = timeDec($("#seconds").text(), $("#minutes").text(), timer);
    $("#seconds").text(time[0]);
    $("#minutes").text(time[1]);
    $("#gas").text((parseFloat($("#gas").text()) - parseFloat($("#rate").text())).toPrecision(3));
  }, 1000);

  $("#increase").click(() => {
    $("#rate").text((parseFloat($("#rate").text()) + .1).toPrecision(2))
  });
  $("#decrease").click(() => {
    $("#rate").text((parseFloat($("#rate").text()) - .1).toPrecision(2))
  });
});
