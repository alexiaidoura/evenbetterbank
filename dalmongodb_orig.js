const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let db = null;

//connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log('Connected using dal!');

    //db name
    db = client.db('myproject');
});

//create user acct
function create(name, email, password){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    })
}

// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const collection = db //why are these using "customers"?
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// find user account (diff between this and find? this returns one match, find returns all
function findOne(email){
    return new Promise ((resolve, reject) => {
        const collection = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    })
}

// update - deposit/withdraw amount works
function update(email, amount){
    var amountnum = '';
    console.log('dal update amount' + amount + typeof(amount)); //correct
    amountnum = Number(amount); //why becoming negative number? 
    console.log('amountnum' + amountnum + typeof(amountnum));
    //TODO: check if the first instance is the last number -- initialize?
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amountnum}}, //balance is undefined
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            
                

    });    

}

// all users -- works
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


module.exports = {create, findOne, find, update, all};