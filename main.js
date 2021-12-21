Status = "";
alarm = "alarm.mp3";
objects = [];

function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = 'Status: Detecting Objects';
}
function modelLoaded() {
    console.log('Model Loaded!');
    Status = true;
    objectDetector.detect(video , gotResult);
}
function gotResult(error, results) {
    if(error) {
        console.log(error);
            }
            console.log(results);
            objects = results;
    }
function draw() {
    image(video, 0, 0, 380 , 380);
    if(Status != "") {
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Baby Detected";  
            document.getElementById("baby").innerHTML = "Baby Found";    
            alarm.stop(); 
            fill("#FF0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+''+percent+'%', objects[i].x ,objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);   
        }        
    } else {
        document.getElementById("status").innerHTML = "Status: Baby Not Detected";
        document.getElementById("baby").innerHTML = "Baby Not Found";  
        alarm.isPlaying();
    }   
    if(objects.length < 0) {
        document.getElementById("status").innerHTML = "Status: Baby Not Detected";
        document.getElementById("baby").innerHTML = "Baby Not Found";    
        alarm.isPlaying();
    }
}