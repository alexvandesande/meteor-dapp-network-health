
// Saves blocks on minimongo for easier tracking

Blocks = new Mongo.Collection('blocks', {connection: null});
new PersistentMinimongo(Blocks);

MiningData = new Mongo.Collection('miningdata', {connection: null});
new PersistentMinimongo(MiningData);

if(!MiningData.findOne()) {
    MiningData.insert({
        totalTimeSpent: 0,
        totalRewards: 0
    });
}
