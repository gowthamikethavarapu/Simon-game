var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;
$(document).keypress(function(){
  if(started==false)
  {
    $("#level-title").text("level "+level);
    nextSequence();
    started=true;

  }
});

$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("level "+level);
  var randomnumber=Math.floor(Math.random()*4);
  var randoChosenColor=buttonColors[randomnumber];
  gamePattern.push(randoChosenColor);
  $("#"+randoChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randoChosenColor);



}

function playSound(name)
{
  var sound=new Audio("sounds/"+name+".mp3");
  sound.play();

}
function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){ $("#"+currentColor).removeClass("pressed")},100);

  }
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){

  if(gamePattern.length===userClickedPattern.length)
     {
       setTimeout(function(){nextSequence();},1000);
     }
   }
     else
     {
       playSound("wrong");
       $("body").addClass("game-over");
       setTimeout(function(){
         $("body").removeClass("game-over")
       },200);
       $("#level-title").text("game over -press any key to continue");
       startOver();
     }

}
function startOver()
{
  gamePattern=[];
  started=false;
  level=0;

}
