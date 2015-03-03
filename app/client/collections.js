
// Saves blocks on minimongo for easier tracking

Blocks = new Mongo.Collection('blocks', {connection: null});
new PersistentMinimongo(Blocks);

Rewards = new Mongo.Collection('rewards', {connection: null});
new PersistentMinimongo(Rewards);

Hashrate = new Mongo.Collection('hashrate', {connection: null});
new PersistentMinimongo(Hashrate);

MiningData = new Mongo.Collection('miningdata', {connection: null});
new PersistentMinimongo(MiningData);

if(!MiningData.findOne()) {
    MiningData.insert({
        totalTimeSpent: 0,
        totalRewards: 0
    });
}
