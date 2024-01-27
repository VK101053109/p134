model_status = false;
obj_array = [];


function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    odecter = ml5.objectDetector("cocossd", modelready);
    document.getElementById("status").innerHTML = "Status:object detection started";
}

function modelready() {
    console.log("the best model is workiiiiiiiiiiiiiing!!!!!!!!!!!!!!!!!!!!!!!!");
    model_status = true;
}

function got(e, r) {
    if (e) {
        console.error(e);
    } else {
        console.log(r);
        obj_array = r;
    }
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (model_status != false) {
        odecter.detect(video, got);
        for (i = 0; i < obj_array.length; i++) {
            document.getElementById("obj_n").innerHTML = "Number of objects:" + obj_array.length;
            obj_name = obj_array[i].label;
            obj_p = floor(obj_array[i].confidence * 100);
            if (obj_name == "person") {
                document.getElementById("status").innerHTML = "Status:baby found";

            } else {
                document.getElementById("status").innerHTML = "Status:baby not found";

            }
            r = floor(random(255));
            g = floor(random(255));
            b = floor(random(255));
            fill(r, g, b);
            textSize(25);
            text(obj_name + " " + obj_p + "%", obj_array[i].x + 25, obj_array[i].y + 25);
            noFill();
            stroke(r, g, b);
            rect(obj_array[i].x, obj_array[i].y, obj_array[i].width, obj_array[i].height);
        }
        if (obj_array.length == 0) {
            document.getElementById("status").innerHTML = "Status:baby not found";

        }
    }



}