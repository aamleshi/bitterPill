var onGetDevices = function(ports) {
    for (var i=0; i<ports.length; i++) {
        console.log(ports[i].path);
    }
}
chrome.serial.getDevices(onGetDevices);
chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('window.html', {
    'outerBounds': {
        'width': 400,
        'height': 500
    }
    });
});

// var onConnect = function(connectionInfo) {
//     // The serial port has been opened. Save its id to use later.
//     _this.connectionId = connectionInfo.connectionId;
//    // Do whatever you need to do with the opened port.
// }
//  // Connect to the serial port /dev/ttyS01
// chrome.serial.connect("/dev/tty.wchusbserial1420", {bitrate: 9600}, onConnect);

// var writeSerial=function(str) {
//     chrome.serial.send(connectionId, convertStringToArrayBuffer(str), onSend);
// }
//   // Convert string to ArrayBuffer
// var convertStringToArrayBuffer=function(str) {
//     var buf=new ArrayBuffer(str.length);
//     var bufView=new Uint8Array(buf);
//     for (var i=0; i<str.length; i++) {
//     bufView[i]=str.charCodeAt(i);
//     }
//     return buf;
// }


var connectionId = -1;

var convertStringToArrayBuffer=function(str) {
    var buf=new ArrayBuffer(str.length);
    var bufView=new Uint8Array(buf);
    for (var i=0; i<str.length; i++) {
    bufView[i]=str.charCodeAt(i);
    }
    return buf;
}

function onOpen(connectionInfo) {
    if (!connectionInfo) {
        console.log('Could not open');
        return;
    }
    connectionId = connectionInfo.connectionId;
    console.log(connectionId);
    console.log(connectionInfo);
    console.log('Connected');

    chrome.serial.send(connectionId, convertStringToArrayBuffer('k'), onSend);
};


function onSend(connectionInfo){
    if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
    } else {
        // Tab exists
    }
    if (!connectionInfo) {
        console.log('Could not send');
        return;
    }
    connectionId = connectionInfo.connectionId;
    console.log("onSend?")
}

var writeSerial=function() {
    chrome.serial.connect("/dev/cu.usbmodem14201", {bitrate: 9600}, onOpen);

    console.log(connectionId);
    
}
  // Convert string to ArrayBuffer


var activateLasers = function() {
    writeSerial();
}

chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
    if (request.activateLasers) {
        var success = activateLasers();
        //sendResponse({activateLasers: success});
        console.log("Activating The LAzorz")
    }
    });
