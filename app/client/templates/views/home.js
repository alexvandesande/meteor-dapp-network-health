/**
Template Controllers

@module Templates
*/

/**
The chats template

@class [template] views_home
@constructor
*/


/**
Attach scroll event to make url bar fixed

@method created
*/
Template['views_home'].created = function(){
    //localStorage.clear();

    var block = Blocks.findOne({},{sort: {number: -1}});
    // initiate the geo pattern
    var pattern = GeoPattern.generate((block) ? block.hash : "---");
    $('.latest-block-info').css('background-image', pattern.toDataUrl());

    //TempateVar.set('miningSelector', 0);


    try {

        //if you have access to the web3 object, clear the database and reload
        if(web3.eth.number != undefined) {
            currentBlock = web3.eth.number;

            Blocks.remove({number: { $lt: currentBlock - 50 } })
         

            for (i = currentBlock; i > currentBlock - 10 ; i --) {
                            
                // update balance
                Blocks.upsert('block_'+ i, {
                    _id: 'block_'+ i,
                    number: i,
                    gasUsed: web3.eth.block(i).gasUsed,
                    size: web3.eth.block(i).size,
                    time: web3.eth.block(i).time,
                    hash: web3.eth.block(i).hash,
                    miner: web3.eth.block(i).coinbase,
                    uncles: web3.eth.block(i).uncles.Length
                });  


            }
        }

    } catch(err) {
        console.log("no web3 object");
    }



};


Template['views_home'].destroyed = function(){
   
};



Template['views_home'].helpers({
    /**
    Get all current blocks

    @method (blocks)
    */
    'blocks': function(){
        var blocks =  Blocks.find({},{limit: 50, sort: {number: -1}});
        var template = Template.instance();

        Tracker.afterFlush(function(){
            if(template.view.isRendered)
                template.$('.wrapper').css('width', (blocks.count() * 562 + 500) + 'px');
        });
        return blocks.fetch();
    }, 
    /**
    Returns size in latest block

    @method (currentBlockNumber)
    */
    'currentBlockPattern': function(){
        var pattern = GeoPattern.generate(this.hash);
        return (pattern) ?  pattern.toDataUrl() : "white";
    }, 
    /**
    Returns Peercount

    @method (peerCount)
    */
    'peerCount': function(){
        try { 
            return web3.eth.peerCount;
        } catch(err) { 
            return "---"
        }
    }, 
    /**
    Returns Gas Price

    @method (gasPrice)
    */
    'gasPrice': function(){
        try { 
            return EthTools.fromWei(web3.eth.gasPrice,'finney');
        } catch(err) { 
            return "---"
        }
    }, 
    /**
    Returns Mining status handle

    @method (gasPrice)
    */
    'miningSlider': function(){
        return Miner.mining || 0 ;
    } ,     
    /**
    Returns Hashrate

    @method (gasPrice)
    */
    'hashrate': function(){
        return Miner.hashrate;
    } , 
    /**
    Returns Mining status handle

    @method (gasPrice)
    */
    'timeSpent': function(){
        var totalTimeSpent = MiningData.findOne().totalTimeSpent;

        if (totalTimeSpent) {
            if (totalTimeSpent<(3*60)) {
                
                return Math.round(totalTimeSpent*10)/10 + "<small> Seconds </small>";

            } else if (totalTimeSpent<(3*60*60)) {

                return Math.round(10*totalTimeSpent/60)/10 + "<small> Minutes </small>";

            } else if (totalTimeSpent<(60*60*24)) {

                return Math.round(10*totalTimeSpent/(60*60))/10 + "<small> Hours </small>";

            } else {

                return Math.round(10*totalTimeSpent/(24*60*60))/10 + "<small> Days </small>";

            }

            
        } else {
            return "---";
        }
    } , 
    /**
    Returns Mining status handle

    @method (gasPrice)
    */
    'totalRewards': function(){
        var totalRewards = MiningData.findOne().totalRewards;

        if (totalRewards && totalRewards>0) {

            if (totalRewards<1) {
                return Math.floor(totalRewards * 100000)/100 + "<small> Finney </small>"
            } else if (totalRewards>1000) {
                return Math.floor(totalRewards) + "<small> Ether </small>"
            } else {
                return Math.floor(totalRewards*100)/100 + "<small> Ether </small>"
            } 

        } else {
            return "---";
        }
    } , 
    /**
    Returns Mining status handle

    @method (gasPrice)
    */
    'averageRewardPerHour': function(){
        var totalRewards = MiningData.findOne().totalRewards;
        var totalTimeSpent = MiningData.findOne().totalTimeSpent;

        
        if (totalRewards && (totalTimeSpent>0) ) {

            var rewardRate =   3600 * totalRewards / totalTimeSpent;

            if (rewardRate<0.001) {
                return Math.floor(100000 * rewardRate)/100 + "<small> Finney/h </small>"
            } else if (rewardRate>1000) {
                return Math.floor(rewardRate) + "<small> Ether/h </small>"
            } else {
                return Math.floor(100 * rewardRate)/100 + "<small> Ether/h </small>"
            }

            return reward;
        } else {
            return "---";
        }
    } 
});



Template['views_home'].events({

    /**
    Change the mining slider
    @event change input.slider-vertical, input input.slider-vertical
    */
    'change input.slider-vertical, input input.slider-vertical': function(e) {   
        Miner.mining = Number(e.currentTarget.value);
    }
});

