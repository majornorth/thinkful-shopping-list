// function progressBar(onStart, onProgress, onEnd, onError) {
//     onStart();
    
//     try {
//         for(var i=0; i<100; i++) {
//             if(i % 10 === 0) {
//                 onProgress(i);
//                 // throw new Error("It broke!");
//             }
//         }
//     } catch(err) {
//         onError(err);
//     }
    
//     onEnd();
// };

var events = require('events');

var ProgressBar = function(){
    events.EventEmitter.call(this);
}

ProgressBar.prototype.__proto__ = events.EventEmitter.prototype;

ProgressBar.prototype.go = function(){
    //instead of onStart(), we need emit an event;
    this.emit('onStart');
    
    try {
        for(var i=0; i<100; i++) {
            if(i % 10 === 0) {
                this.emit('onProgress', i);
                // throw new Error("It broke!");
            }
        }
    } catch(err) {
        this.emit('onError', err);
    }
    
    this.emit('onEnd');
}

module.exports = ProgressBar;