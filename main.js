rightWristX=0;
rightWristY=0;

leftWristX=0;
leftWristY=0;

scorerightwrist=0;
scoreleftwrist=0;

song = "";

function preload()
{

song = loadSound("music.mp3");
}

function setup() 
{
 
    canvas = createCanvas(600,500);
    canvas.center();

  video= createCapture(VIDEO);
  video.hide();
  poseNet=ml5.poseNet(video,modelLoaded);
  poseNet.on('pose',gotposes);
}

function modelLoaded() {

    console.log("Model worked");
}

function gotposes(result) {
 

    if(result.length>0){
     console.log(result);

 scorerightwrist=result[0].pose.keypoints[10].score;
 scoreleftwrist=result[0].pose.keypoints[9].score;

     rightWristX=result[0].pose.rightWrist.x;
     rightWristY=result[0].pose.rightWrist.y;

     leftWristX=result[0].pose.leftWrist.x;
     leftWristY=result[0].pose.leftWrist.y;
    }
}

function draw() {

    image(video,0,0,600,500);

    fill("#3ac25e");
    stroke("#000000");

    if(scoreleftwrist>0.2){
        circle(leftWristX,leftWristY,20);
        innumberleftWristY=Number(leftWristY);
        remove_decimals=floor(innumberleftWristY);
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="Volume="+volume;
        song.setVolume(volume);
    }

}

function play() {

    song.play();
    song.setVolume(1);
    song.rate(1);
}