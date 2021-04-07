var buttoncolors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
$(document).keypress(function(){
  if(started===false)
  {
    $("#level-title").html("level "+level);
    nextSequence();
    started=true;
  }
});


$(".btn").click(function(){
  var userChosencolor=$(this).attr("id");
  $("#"+userChosencolor).addClass("pressed");
  setTimeout(function(){
    $("#"+userChosencolor).removeClass("pressed")
  },100);
  playSound(userChosencolor);
  userClickedPattern.push(userChosencolor);
  checkAnswer(userClickedPattern.length-1);

});
function nextSequence()
{
  userClickedPattern=[];
  level++;
  $("#level-title").html("level "+level);
  var randomnumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttoncolors[randomnumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}
function checkAnswer(currentkey)
{
  if (gamePattern[currentkey]===userClickedPattern[currentkey])
  {
    if(gamePattern.length==userClickedPattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over") },200);
    $("#level-title").html("gameover press any key to continue");
    startover();
  }

}

function startover(){
  level=0;
  started=false;
  gamePattern=[];
}

function playSound(currentColor){
  var sound=new Audio("sounds/"+currentColor+".mp3");
  sound.play();
}
