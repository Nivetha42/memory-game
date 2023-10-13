var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["red","blue","green","yellow"];
var level=0;
function nextSequence()
{
    userClickedPattern=[];
    level=level+1;
    $("h1").html("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColors[randomNumber];
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);

}
function startOver()
{
    level=0;
    gamePattern=[];
    count=0;

}
function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("success");
        if(gamePattern.length===userClickedPattern.length)
        {
        setTimeout(function(){ nextSequence()},1000);
        console.log("moved to next level");
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){ $("body").removeClass("game-over");},200);
        $("h1").html("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function playSound(name)
{
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();  
}
$(".btn").on("click",function(event)
{
    var userChosenColour=event.currentTarget.id;
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function animatePress(currentColour)
{
    // $("#"+currentColour).css("background-color","white");
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){ $("#"+currentColour).removeClass("pressed");},200)
}
var count=0;
$(document).keydown(function()
{
    count=count+1;
if(count===1)
{
nextSequence();
}

});
