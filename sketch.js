

//Variables for

var kit;  //Drumkit selection
var amp; //Amplitude
var kick, snare, hat, clap; //drum kit componets

var uploadLoading = false; //Check if uploaded


var mic, recorder, soundFile; // Microphone
var Recordtext;

var state = 0; // mousePress will increment from Record, to Stop, to Play



var w= 3;  //variable for width of each band in frequency analysis

var delay; 


//var setVolume;



var checkboxDLY;

var reverb;
var chkRVB; //function for checking reverb box
var checkboxRVB;

var distortion;
var checkboxDST; //distortion checkboc
var DSTlvlSlider; //Slider for distortion level
var DSTlvl;

var mysound1; //mysound files
var mysound2;
var mysound3;
var mysound4;


var fft;

var volhistory = []; //record history of volume on amp

var apidata; //variable for apidata



 

function preload() { //preload to make sure they are ready when canvas is ready
    


kick =loadSound('antidote.wav');  //load in sound ready to play for kick, snare, clap and hat
snare =loadSound('sunnyboy uno.wav');
clap =loadSound('xool.wav');
hat = loadSound('sunnyboy dos.wav');1

    
mysound1 = loadSound('mysound1.wav');  //load in pre set mysounds assigned to the pads
 mysound2 = loadSound('mysound2.wav');
 mysound3 = loadSound('mysound3.wav');
 mysound4 = loadSound('mysound4.wav');
    

  fft = new p5.FFT(); //new fft to visualise frequency

    
loadJSON('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Roland_TR-808&format=json', gotData, 'jsonp'); //load in json file for 808, in JSONP format

}

function gotData(data) { //gotData Function
    console.log(data);//The function logs the data in the console which is being retrieved from the JSON
    apidata=data;  //the apidata variable is the data 
}


function uploaded1(file) { //when uploading a new file the file data is ran under the uploadedAudioPlay function below
	uploadLoading1 = true;
	uploadedAudio1 = loadSound(file.data, uploadedAudioPlay1);
    
}
function uploaded2(file) {
	uploadLoading2 = true;
	uploadedAudio2 = loadSound(file.data, uploadedAudioPlay2);
    
}
function uploaded3(file) {
	uploadLoading3 = true;
	uploadedAudio3 = loadSound(file.data, uploadedAudioPlay3);
    
}

function uploaded4(file) {
	uploadLoading4= true;
	uploadedAudio4 = loadSound(file.data, uploadedAudioPlay4);
    
}
function uploadedAudioPlay1(audioFile) { //when a file upbaod button is uploaded,


	uploadLoading = false; //stop loading


	mysound1 = audioFile; //becomes sound mapped to corressponding pad
}

function uploadedAudioPlay2(audioFile) {

	uploadLoading = false;

	

	mysound2 = audioFile;
}

function uploadedAudioPlay3(audioFile) {

	uploadLoading = false;

	

	mysound3 = audioFile;
}

function uploadedAudioPlay4(audioFile) { 
	uploadLoading = false;

	

	mysound4 = audioFile; 
}



function setup() { //setup
  	
  
    
 amp = new p5.Amplitude(); //amp variable is new p5 amplitude
createCanvas(1200, 650);

    
uploadBtn1 = createFileInput(uploaded1); //file upload 
uploadBtn1.position(60,450); //position button
    
uploadBtn2 = createFileInput(uploaded2);
uploadBtn2.position(160,450);
	
uploadBtn3 = createFileInput(uploaded3);
uploadBtn3.position(260,450);
    
uploadBtn4 = createFileInput(uploaded4);
uploadBtn4.position(360,450);

 fill(255);

    
checkboxRVB = createCheckbox('Reverb', false); //checkboxes for reverb
checkboxRVB.position(600,200);
checkboxRVB.style('color', '#ff0000');
    
checkboxDLY = createCheckbox('Delay', false); //checkboxes for delay
checkboxDLY.position(600,220);
checkboxDLY.style('color', '#ff0000');
    
checkboxDST = createCheckbox('Distortion (Level Below)', false); //checkboxes for distortion
checkboxDST.position(600,240);
checkboxDST.style('color', '#ff0000');


DSTlvlSlider = createSlider(0,10, 0 ,2);
DSTlvlSlider.position (600,270);
    
    delay = new p5.Delay();   //new delay
    distortion = new p5.Distortion(); //new distortion
    reverb = new p5.Reverb(); //new reverb

    checkboxDST.changed(DSTlvlFunction);
    checkboxDLY.changed(chkDLY);
    checkboxRVB.changed(RVBlvlFunction);
    
  kit = createSelect();
  kit.position(200,10);
  kit.option('808');
  kit.option('Hip-Hop');
  kit.option('Lo-Fi');
  kit.option('House');
  kit.option('Live');
  kit.changed(mySelectEvent);
    
  text("Choose A Kit to Play",10,10)
    
    
    
}





function draw() { //looping function
background(0); //black background
    

//variables for colours of drumpad
var red = color(223, 65, 44); 
var orange = color(242, 122, 48);
var yellow = color(221, 219, 44);
var cream = color(231, 233, 192);
var white = color(255);
    


    
    //FFT
    
  line(volhistory.length, 0, volhistory.length, height/8); 
 
        var spectrum = fft.analyze();  //spectrum variable is fft.analyse
   
    stroke(50); //output lines are dark grey
    
    //for loop to create graphic analysis of frequency
    
    for (var i=0; i < spectrum.length; i++){ //for loop, i = 0 and is less than spectrum length, increment itself until its spectrum length.
        var freq = spectrum[i]; //frequency is equal to the spectrum. so i=frequency
        var y=map(freq,0,256, height/4,0); //maps frequency between values of 0-256, between height of sketch/4 and 0 the ground
       line(i * w, height, i * w,y); //draw line for each value. i times width of band, and height. i(frequency) x width (2)
    }
    
    if(keyIsDown (UP_ARROW)) { //when up arrow is pressed
fill (white)}   else {  //fill circle white
   fill (red); //otherwise fill red        
 }
  ellipse(100, 200, 100, 100); //draw circle at 100x 200y and 100x100 px
 if(keyIsDown (DOWN_ARROW)) { //when up arrow is pressed        
fill (white)}   else { //fill circle white
   fill (orange); //otherwise fill orange  
 }
  ellipse(200, 200, 100, 100); //draw circle at 200x 200y and 100x100 px
  if(keyIsDown (LEFT_ARROW)) {
fill (white)}   else {
   fill (yellow);  //otherwise fill yellow        
 }
  ellipse(300, 200, 100, 100);  //draw circle at 300x 200y and 100x100 px
   if(keyIsDown (RIGHT_ARROW)) {
fill (white)}   else {
   fill (cream);         //otherwise fill cream 
 }
  ellipse(400, 200, 100, 100); //draw circle at 400x 200y and 100x100 px
    
    
    
if(keyIsDown (49)) { //if 1 key down
    fill (white)}   else {
    fill (red); //otherwise fill red           
 }
    ellipse(100, 400, 100, 100); //draw circle at 100x 400y and 100x100 px
if(keyIsDown (50)) { //if 2 key down
    fill (white)}   else {
    fill (orange);  //otherwise fill orange         
 }
    ellipse(200, 400, 100, 100); //draw circle at 200x 400y and 100x100 px
if(keyIsDown (51)) { //if 3 key down
   fill (white)}   else {
   fill (yellow);  //otherwise fill yellow          
 }
  ellipse(300, 400, 100, 100); //draw circle at 300x 400y and 100x100 px
if(keyIsDown (52)) { //if 4 key down
   fill (white)}   else {
   fill (cream);   //otherwise fill cream         
 }
  ellipse(400, 400, 100, 100); //draw circle at 400x 400y and 100x100 px

    

    
    
  fill(255); //fill white
  textAlign(LEFT); //align text to the left
  textSize(20);  //make text size 20pt
  text("Press UP = Kick     Press DOWN = Snare     Press LEFT = HiHat     Press RIGHT = Clap", 200, 140); // text for instructions 
  text("Make Your Own Kit using .Wav files. To play them press corresponding number ", 55, 320); //text for file upload area
  textSize(12); //make text size 12
  noStroke(); //no outer line colour
  text("1", 100, 400); //text for each number to press
  text("2", 200, 400);
  text("3", 300, 400);
  text("4", 400, 400); 
  text('Effect Board', 600, 180); //text for effect board
  apitext = text(apidata.query.pages[158696].extract,50,500,1000,500); //draws text that is from the apidata variable which is getting its data from the JSON. It is the directory for that section of text from the wikipedia api
    textSize(20);  //make text size 20pt
    text("Choose A Kit to Play",10,25);

     textSize(12); //make text size 12
text('This is the audio recorder. Press R to start recording, S to stop the recording,', 560,370); //text for audio recorder
text('P to playback to recording and D to download it to your device',560,390);
    
  
    textSize(32); //make text for recording status 32
text(Recordtext, 650, 430); //recording status text
    stroke(255,0,0); //red line
    line(550, 350, 550, 470); //lines to make border round record feature Draws like from point 550x 350y  to  550x 470y

     line(550, 470, 980, 470);
    line(980, 350, 980, 470);
    line (980, 350, 550, 350);

    //Amp
    
  var vol = amp.getLevel(); //vol variable gets level of aplitude
  volhistory.push(vol); //pushes vol into volume history
  stroke(244, 182, 100);// makes lines orange
  noFill(); //no fill
  push();
  var currentY = map(vol, 0 , 1, 190, 200); //the Y value is mapped so original range of 0-1 is now 190-200
  translate(0, height / 4.7 - currentY);  //translate to quarter height of canvas - the current y value
  beginShape();// start drawing shape
  for (var i = 0; i < volhistory.length; i++) { //for loop for volume history
    var y = map(volhistory[i], 0, 4, height/4.7, 0); //maps volume history between 0, 4 and quarter of height to zero, making history save and go off to the left
    vertex(i, y); //vertex is i and y
  }
  endShape(); //finish shape
  pop();
  if (volhistory.length > width - 50) { //if volume history length is 50 pixels off the edge of canvas
    volhistory.splice(0, 1); //stop tracking its history
  }
    
}

function keyPressed() { //fuctions called when key is pressed

 if(keyCode == UP_ARROW) { //when up arrow is pressed kick plays
  kick.play(); 
 }
  if(keyCode == DOWN_ARROW) { //when down arrow is pressed snare plays
  snare.play(); 
 }
  if(keyCode == LEFT_ARROW) { //when left arrow is pressed hihat plays
  hat.play(); 
 }
  if(keyCode == RIGHT_ARROW) { //when right arrow is pressed clap plays
  clap.play();  
  }
      
    if(keyCode == 49) { //when 1 key is pressed sound 1 plays
  mysound1.play(); 
 }
  if(keyCode == 50) { //when 2 key is pressed sound 2 plays
  mysound2.play(); 
 }
  if(keyCode == 51) { //when 3 key is pressed sound 3 plays
  mysound3.play(); 
 }
  if(keyCode == 52) { //when 4 key is pressed sound 4 plays
  mysound4.play(); 

 }
}



function RVBlvlFunction(){  //Function for reverb
    
      if (checkboxRVB.checked()) { //if reverb checkbox checked
      
            reverb.process(kick , 6, 4);  //process reverb (instrument, time, level)
            reverb.process(snare , 6, 4);
            reverb.process(clap , 6, 4);
            reverb.process(hat , 6, 4);
            reverb.process(mysound1 , 6, 4);
            reverb.process(mysound2 , 6, 4);
            reverb.process(mysound3 , 6, 4);
            reverb.process(mysound4 , 6, 4);
      }

  if (!checkboxRVB.checked()){ //if chackbox isnt checked
    reverb.amp(0); //no amp output of reverb 
    console.log('no reverb!'); 
    }
  
}

function DSTlvlFunction(){ //Function for distortion
var val = DSTlvlSlider.value(); //val is Distortion level slider value
    
    if (checkboxDST.checked){ //if distorion checkvox checked

        distortion.process(kick , val , 'none'); //process distotion(instrument, rate (0-10), no oversample)
        distortion.process(snare , val, 'none');
        distortion.process(clap ,  val, 'none');
        distortion.process(hat ,  val, 'none');

        distortion.process(mysound1 ,  val, 'none');
        distortion.process(mysound2 ,  val, 'none');
        distortion.process(mysound3 ,  val, 'none');
        distortion.process(mysound4 ,  val, 'none');

//console.log(DSTlvlSlider.value());
        }
  if (!checkboxDST.checked()){ //if chackbox isnt checked
    distortion.amp(0); //no amp output of reverb 
    console.log('no distortion!'); 
    }
    }



function chkDLY(){ //Checkbox distortion function

    if (checkboxDLY.checked()) { //if delay checkbox is checked
        
    

          delay.process(kick, .12 , .7, 2300); //process the sound file 
          delay.process(snare, .12, .7, 2300); //process the sound file 
          delay.process (clap, .12, .7, 2300); //process the sound file 
          delay.process(hat, .12, .7, 2300); //process the sound file 
          delay.process(mysound1, .12, .7, 2300); //process the sound file 
          delay.process(mysound2, .12, .7, 2300); //process the sound file 
          delay.process(mysound3, .12, .7, 2300); //process the sound file 
          delay.process(mysound4, .12, .7, 2300); //process the sound file 



        console.log('delay'); //log delay
            }

    if (!checkboxDLY.checked()){  //if delay checkbox isn't checked
  delay.amp(0); //no delay output
    console.log('no delay!'); //log no delay
    }
}





    
    

    
 function keyTyped() { //function for keys types
     
  // make sure user enabled the mic
        if (key === 'r') {
              // create an audio in
            var mic = new p5.AudioIn();

              mic.start(); //start microphone

              // create a sound recorder
              recorder = new p5.SoundRecorder();

              // create an empty sound file that to playback the recording
              soundFile = new p5.SoundFile();

    

        // record to p5.SoundFile
        soundFile.stop(); //stop current audio to prevent crashing
        recorder.record(soundFile); //record the sound file

        
        Recordtext=('Recording!'); //Text on recorder says its recording
        state++; //increment state so user can go onto next stage
  }
  else if (key === 's') { //if s key pressed
        // stop recorder and
        // send result to soundFile
        recorder.stop();
 Recordtext=('Stopped!'); //stop recorder and text says its stopped
        ('', 700, 500);
        state++;
  }

  else if (key === 'p') { //if p key pressed
        soundFile.stop();
        soundFile.play(); // play the result!
        state++; //onto next stage
      
       Recordtext=('Playing Back!');
  } else if (key === 'o') { //stop playback by pressing O
    	soundFile.stop();
  }
  else if (key === 'd') { //Press D to download
     	save(soundFile, 'mySound.wav'); //save to files
       Recordtext=('Saving!');
  }
}


function mySelectEvent() {
var package = kit.value();// package variable is the value of the dropdown select i
if (package == '808'){ //If package is 808
        kick = loadSound('antidote.wav');  //808 drum pack loaded onto pag
        snare = loadSound('sunnyboy uno.wav');
        hat = loadSound('xool.wav');
        clap = loadSound('sunnyboy dos.wav');
   

}else if  (package == 'Hip-Hop'){ //If package is hip hop
    
        kick= loadSound ('Major Kick 1.wav'); //Load Hip hop drum pack onto pad
        snare= loadSound('Major Snare 1.wav');
        hat= loadSound ('Major Closed Hat 1.wav'); 
        clap= loadSound('Major Clap 1.wav');

}else if  (package == 'Lo-Fi'){ //If package is Lo-Fi
        kick= loadSound ('kick 02.wav');//load lo fi kit onto pack
        snare= loadSound('snare 02.wav');
        hat= loadSound ('hat 02.wav'); 
        clap= loadSound('perc 01.wav');
    
}else if  (package == 'House'){  //If package is 
        kick= loadSound ('housekick.wav');
        snare= loadSound('housesnare.wav');
        hat= loadSound ('househat.wav'); 
        clap= loadSound('houseclap.wav');

}else if  (package == 'Live'){  //If package is 
        kick= loadSound ('livekick.wav');
        snare= loadSound('livesnare.wav');
        hat= loadSound ('livehat.wav'); 
        clap= loadSound('liveclap.wav');

    

    


}
}


