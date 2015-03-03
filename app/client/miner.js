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
        if (typeof this.value == "undefined") {
            this.value = 0 
            if(this._dependency)
                this._dependency.changed();
        
        } else if(newValue !== this.value) {
            this.value = newValue;

            if(this._dependency)
                this._dependency.changed();
        }
    }
});

var hashrateValue;

Object.defineProperty(Miner, "hashrate", {
    get: function() { 
        if(!this._dependency && typeof Tracker !== 'undefined')
            this._dependency = new Tracker.Dependency;

        if(this._dependency)
            this._dependency.depend();

        return hashrateValue; 
    },    
    set: function(setValue) { 
       if (setValue != this.value){
            hashrateValue = setValue;

            if(this._dependency)
                this._dependency.changed();
        } 
    },
    enumerable: true
})


var timeSpentMiningValue;

Object.defineProperty(Miner, "timeSpentMining", {
    get: function() { 
        if(!this._dependency && typeof Tracker !== 'undefined')
            this._dependency = new Tracker.Dependency;

        if(this._dependency)
            this._dependency.depend();

        //timeSpentMiningValue = localStorage.timeSpentMining; 

        return Number(localStorage.timeSpentMining); 
    },    
    set: function(setValue) { 
        if (typeof localStorage.timeSpentMining == "undefined") {
            
            localStorage.timeSpentMining = 0;
            timeSpentMiningValue = 0;

        } else if (setValue != timeSpentMiningValue){
            localStorage.timeSpentMining = Number(setValue);
            timeSpentMiningValue = Number(setValue); 

            if(this._dependency)
                this._dependency.changed();
        }
    },
    enumerable: true
})



Object.defineProperty(Miner, "totalRewards", {
    get: function() { 
        if(!this._dependency && typeof Tracker !== 'undefined')
            this._dependency = new Tracker.Dependency;

        if(this._dependency)
            this._dependency.depend();

        return Number(localStorage.totalRewards); 
    },    
    set: function(setValue) { 
        if (typeof localStorage.timeSpentMiningValue == "undefined") {
            localStorage.totalRewards = 0;
        } else if (setValue != localStorage.totalRewards){
            localStorage.totalRewards = Number(setValue);

            if(this._dependency)
                this._dependency.changed();
        }
    },
    enumerable: true
})



// QML Timer
//runJavascript('Miner.mining = '+ eth.mining());


// in the browser
// mist.mining(); // true

// Template.bla.helpers({
//     'mining': function(){
//         return mist.mining();
//     }
// });