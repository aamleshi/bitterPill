console.log("ayooo")
var appID = "gbpfadaecdclbcknnkfmijgpddhnmjfb";


function sendMsg() {
    if (!document.hidden){
        console.log("sending the message to fire the cannons");
        chrome.runtime.sendMessage(appID, { activateLasers: true });
    } else {
        console.log("page hidden");
    }
}

// function sendMsg(){
//     chrome.runtime.sendMessage(appID, {activateLasers: true},
//     function(response) {
//         console.log("fired activation message")
//     // if (targetInRange(response.targetData))
//     //     //chrome.runtime.sendMessage(appID, {activateLasers: false});
//     //     console.log("fired activation message")
//     });
// }

refreshIntervalID = setInterval(sendMsg, 3000);

console.log("hjkjhjhjhj");