objects = [];
status = "";
inputValue = "";

function setup()
{
    canvas = createCanvas(480, 320);
    canvas.center();
    video = createCapture();
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    inputValue = document.getElementById("input").value;
}

function modelLoaded()
{
    console.log("model loaded");
    status = true;
}

function draw()
{
    image(video, 0, 0, 480, 320);
    if (status != "")
    {
        for(i = 0; i < objects.length; i++)
        {
            fill("#0000FF");
            percent = floor(objects[i].confidence * 100);
            thing = objects[i].label;
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#0000FF");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(inputValue == label)
        {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_status").innerHTML = "object mentioned found";
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(thing + "found");
            synth.speak(utterThis);
        }
        else
        {
            document.getElementById("object_status").innerHTML = "object mentioned not found";
        }
        }
    }
}

function gotResult(error, result)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results
}