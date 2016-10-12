var ProgressBar = require('./progress-bar');

// var onStart = function() {
//     console.log("Progress bar has started");
// };

// var onProgress = function(progress) { 
//     console.log("Progress:", progress );
// };

// var onEnd = function() {
//     console.log("You have reached 100!");
// };

// var onError = function(err) {
//     console.log("Oh no! There's an error:", err);
// }

// ProgressBar(onStart, onProgress, onEnd, onError);

//Create a new progress bar
var myProgress = new ProgressBar();

//Bind some events
myProgress.on('onStart', function() {
    console.log("Progress bar has started");
});

myProgress.on('onProgress', function(progress) {
    console.log("Progress:", progress );
});

myProgress.on('onEnd', function() {
    console.log("You have reached 100!");
});

myProgress.on('onError', function(err) {
    console.log("Oh no! There's an error:", err);
});

//Start counting
myProgress.go();

