var watcher = web3.eth.watch('chain');
watcher.changed(function(result) {

    result.number = web3.eth.number;

    // update balance
    Blocks.upsert('block_'+ result.number, {
        _id: 'block_'+ result.number,
        number: result.number,
        gasUsed: web3.eth.block(result.number).gasUsed,
        size: web3.eth.block(result.number).size,
        time: web3.eth.block(result.number).time,
        hash: web3.eth.block(result.number).hash,
        miner: web3.eth.block(result.number).coinbase,
        uncles: web3.eth.block(result.number).uncles.Length
    });

    if (web3.eth.coinbase == web3.eth.block(result.number).coinbase ) {
        
        var miningData = MiningData.findOne();

        WeiToFin = 1000000000000000;

        lastBalance = miningData.lastCoinbaseBalance || Number(web3.toDecimal(web3.eth.balanceAt(web3.eth.coinbase)))/WeiToFin;
        
        // This will include any other money sent to this address in this block on the calculation

        currentBalance = Number(web3.toDecimal(web3.eth.balanceAt(web3.eth.coinbase)))/WeiToFin;
        blockReward  = currentBalance - lastBalance;
        
        console.log("New Block! last balance: " + miningData.lastCoinbaseBalance + " Reward: " + blockReward );

        MiningData.update(miningData._id, {$inc: {totalRewards: blockReward}});
        MiningData.update(miningData._id, {$set: {lastCoinbaseBalance: currentBalance}});

        //localStorage.clear();

    } else {

        WeiToFin = 1000000000000000;
        currentBalance = Number(web3.toDecimal(web3.eth.balanceAt(web3.eth.coinbase)))/WeiToFin;
        
        var miningData = MiningData.findOne();        
        MiningData.update(miningData._id, {lastCoinbaseBalance: currentBalance});

        console.log("New Block! last balance: " + miningData.lastCoinbaseBalance );

    }

});