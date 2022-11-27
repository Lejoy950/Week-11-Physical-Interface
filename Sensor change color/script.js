let serial;                             // variable to hold an instance of the serialport library
let portName = 'COM5';  // fill in your serial port name here
let inData;                             // for incoming serial data
let portSelector;

let dataMode;
let buttonData;
let potentiometerData;

function setup() {
  createCanvas(1000, 1000);
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);       // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing

  serial.list();                      // list the serial ports
   serial.openPort(portName);              // open a serial port
}

function draw() {
  // black background, white text:
  // background(0);
  // fill(inData,89,45);
  // ellipse(300,300, 56, 50,)

background(170, 233, 224);

//color vars
let white = color(255, 255, 255);
let yellow = color(255, 240, 51);
let cyan = color(51, 255, 235);
let red = color(255, 61, 51);
let blue = color(51, 134, 255);
let lightBlue = color(170, 233, 224);
let strokeColor = color(0, 37, 142);
let sensorColor = color(inData*3,130,1);
let sensorColor1 = color(inData,inData*2,255);
let sensorColor2 = color(255,inData*2,255);



//overStroke Settings
strokeJoin(ROUND);
stroke(strokeColor);
strokeWeight(2);

//head shape
fill(white);
ellipse(426, 297, 366, 401);
ellipse(449, 181, 60, 333);

//eyes
fill(yellow);
ellipse(340, 281, 127, inData);
ellipse(542, 299, 102, inData);

//eyeBall
fill(strokeColor);
ellipse(351, 289, 64, inData-20);
ellipse(551, 305, 65, inData-18);

//mouth
fill(red);
arc(444, 399, 120, inData, 0, radians(180), CHORD);
//rect(390, 390, 107, 70, 0, 0, 90, 90);

//ears
fill(white);
quad(199, 271, 243, 289, 244, 328, 203, 362);
quad(609, 284, 652, 277, 644, 368, 605, 342);

//body
fill(sensorColor);
quad(345, 498, 520, 491, 639, 687, 356, 770);

//body pattern
//right Chest
fill(sensorColor1);
beginShape();
vertex(345, 498);
vertex(405, 540);
vertex(409, 507);
vertex(440, 521);
vertex(454, 574);
vertex(423, 599);
vertex(348, 568);
endShape(CLOSE);

//left Chest
fill(sensorColor1);
beginShape();
vertex(555, 549);
vertex(506, 581);
vertex(468, 571);
vertex(464, 517);
vertex(492, 496);
vertex(506, 533);
vertex(520, 491);
endShape();

//Middle Timer
fill(sensorColor2);
ellipse(457, 552, 21, 21);

//belly pattern
fill(sensorColor1);
beginShape();
vertex(458, 592);
vertex(353, 689);
vertex(356, 770);
vertex(449, 742);
vertex(497, 689);
vertex(577, 705);
vertex(639, 687);
vertex(602, 626);
endShape(CLOSE);

//arms
fill(sensorColor);
quad(145, 425, 346, 517, 349, 592, 107, 523);
quad(527, 502, 706, 407, 776, 498, 563, 563);

//arm pattern
fill(sensorColor1);
triangle(255, 475, 346, 517, 348, 552);
triangle(618, 474, 542, 528, 527, 502);

//hands
fill(white);
ellipse(762, 431, 166, 166);
ellipse(122, 460, 166, 166);

//legs
fill(sensorColor);
quad(368, 766, 469, 737, 527, 906, 383, 941);
quad(542, 715, 632, 689, 764, 713, 695, 824);

//leg pattern
fill(sensorColor1);
triangle(368, 766, 449, 743, 455, 850);
triangle(671, 722, 578, 705, 632, 689);

//feet
fill(white);
quad(340, 893, 538, 864, 546, 956, 340, 968);
//rect(349, 842, 231, 140,90,90,0,0);
//arc(467, 934, 255, 255, 0, radians(180), CHORD);
quad(685, 830, 771, 645, 868, 716, 742, 868);
  
}

// make a serial port selector object:
function printList(portList) {
  // create a select object:
  portSelector = createSelect();
  portSelector.position(10, 10);
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // add this port name to the select object:
    portSelector.option(portList[i]);
  }
  // set an event listener for when the port is changed:
  portSelector.changed(mySelectEvent);
}

function mySelectEvent() {
  let item = portSelector.value();
  // if there's a port open, close it:
  if (serial.serialport != null) {
    serial.close();
  }
  // open the new port:
  serial.openPort(item);
}

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  // read a byte from the serial port, convert it to a number:
  let inString = serial.readLine();

  if(inString.length <= 0) return;

  if (inString === "potentiometer") {
    dataMode = "potentiometer"
  } else if(inString === "button") {
    dataMode = "button"
  } else if(dataMode === "potentiometer") {
    potentiometerData = inString
  } else if (dataMode === "button") {
    buttonData = inString
  }

  inData = inString
}

const softCopy = (i) => i

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}