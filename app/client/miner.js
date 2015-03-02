Miner = {};


Object.defineProperty(Miner, 'mining', {
    get: function () {
        if(!this._dependency && typeof Tracker !== 'undefined')
            this._dependency = new Tracker.Dependency;

        if(this._dependency)
            this._dependency.depend();

        return this.value;
    },
    set: function (newValue) {
        if(newValue !== this.value) {
            this.value = newValue;

            if(this._dependency)
                this._dependency.changed();
        }
    }
});


Object.defineProperty(Miner, 'hashRate', {
    get: function () {
        if(!this._dependency && typeof Tracker !== 'undefined')
            this._dependency = new Tracker.Dependency;

        if(this._dependency)
            this._dependency.depend();

        return this.value;
    },
    set: function (newValue) {
        if(newValue !== this.value) {
            this.value = newValue;

            if(this._dependency)
                this._dependency.changed();
        }
    }
});




// -----
///



// QML Timer
runJavascript('Miner.mining = '+ eth.mining());



// in the browser
// mist.mining(); // true


// Template.bla.helpers({
//     'mining': function(){
//         return mist.mining();
//     }
// });