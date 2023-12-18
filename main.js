song="";
LeftWristX=0;
LeftWristY=0;
RightWristX=0;
RightWristY=0;
scoreLeftWrist=0;

function setup(){
    canvas= createCanvas(600,500);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function preload(){
    song= loadSound("thunder.mp3");
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log("POSENET IS INITIALIZED")
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreRightWrist= results[0].pose.keypoints[10].score;
         scoreLeftWrist= results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist = "+scoreLeftWrist , "Score Right Wrist = "+scoreRightWrist);

        LeftWristX= results[0].pose.leftWrist.x;
        LeftWristY= results[0].pose.leftWrist.y;
        console.log("LeftWristX= "+LeftWristX,"LeftWristY= "+ LeftWristY);

        RightWristX= results[0].pose.rightWrist.x;
        RightWristY= results[0].pose.rightWrist.y;
        console.log("RightWristX= "+RightWristX,"RightWristY= "+ RightWristY);

    }
}

function draw(){
    image(video,0,0,600,500);
    fill("FF0000");
    stroke('#FF0000');

     if(scoreRightWrist > 0.2){

    circle(RightWristX,RightWristY,20);

    if(RightWristY>0 && RightWristY <= 100){
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if(RightWristY>100 && RightWristY <= 200){
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if(RightWristY>200 && RightWristY <= 300){
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    else if(RightWristY>300 && RightWristY <= 400){
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    else if(RightWristY>400 && RightWristY <= 500){
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
    
        circle(LeftWristX,LeftWristY,20);
        InNumberLeftWristY = Number(LeftWristY);
        remove_decimals = floor(InNumberLeftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML= "Volume= "+volume;
        song.setVolume(volume);
    }
}

