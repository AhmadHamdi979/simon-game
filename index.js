var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var toggle = false;

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound($(this).attr("id"));
    animatePress($(this).attr("id"));
    checkAnswer(userClickedPattern.length-1);
})

function newSequence(){
    userClickedPattern =[];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);    
    $("#level-title").text("level "+level);
    level++;
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(Currentcolour){
    $("#"+Currentcolour).addClass("pressed");
    setTimeout(function(){
        $("#"+Currentcolour).removeClass("pressed");
    } ,100)
}

$("body").keypress(function(){
    if(!toggle){
        $("#level-title").text("level "+level);
        newSequence();
        toggle = true;
    }
})

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                newSequence();
            }, 1000);
        }
    } else{
        console.log("wrong");
        var audio = new Audio("sounds/wrong.mp3");
        $("body").addClass("game-over");
        setInterval(function(){
            $("body").removeClass("game-over");
        } ,200)      
        $("#level-title").text("Game Over , Press Any Key to Restart");
        startOver();

    }
}

function startOver(){
    gamePattern=[];
    level=0;
    toggle=0;
}