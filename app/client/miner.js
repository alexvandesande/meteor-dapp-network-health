var addProperty = function(Miner, name, defaultValue){

    if(!_.isUndefined(defaultValue))
        Miner['__tracker_'+ name + '_value__'] = defaultValue;

    // add Tracker
    Miner['__tracker_'+ name +'_dependency__'] = new Tracker.Dependency;

    Object.defineProperty(Miner, name, {
        get: function () {
            this['__tracker_'+ name +'_dependency__'].depend();

            return this['__tracker_'+ name + '_value__'];
        },
        set: function (newValue) {
            if(newValue !== this['__tracker_'+ name + '_value__']) {
                this['__tracker_'+ name + '_value__'] = newValue;
                this['__tracker_'+ name +'_dependency__'].changed();
            }
        }
    });
};


Miner = {};

addProperty(Miner, 'mining', 0);
addProperty(Miner, 'hashrate', 0);
