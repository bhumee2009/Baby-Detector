status="";
objects="";
song="";

function preload(){
   song=loadSound('hey_there.mp3');
}

function setup(){
    canvas=createCanvas(380, 380);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status : Object Detecting";
    
}

function modelLoaded(){
    console.log("Model Loaded !");
    status=true;
}

function draw(){
    image(video, 0, 0, 380, 380);

    if(status != ""){

        r=random(255);
        g=random(255);
        b=random(255);

        objectDetector.detect(video, gotResults);

         for(i=0; i<objects.length; i++){

            if(object.length=0){
                document.getElementById("object").innerHTML="Baby not found";
                song.play();
            }
            else{   

              document.getElementById("status").innerHTML="Status : Objects Detected";
              document.getElementById("object").innerHTML="Baby Found";

              fill(r, g, b);
              percent=floor(objects[i].confidence*100);
              text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
              noFill();
              stroke(r, g, b);
              rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
           } 
        } 
    }
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}