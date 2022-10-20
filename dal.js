const MongoClient = require('mongodb').MongoClient;
//const mongoose = require('mongoose');

const uri = "mongodb+srv://dba:GpRGLNytuHsvuFs9@cluster0.izkzknw.mongodb.net/?retryWrites=true&w=majority";
//const url = 'mongodb://localhost:27017';
const client = new MongoClient(uri, {useUnifiedTopology: true}, function(err, client) {
    console.log('Connected!');
    
    //const dbName = 'evenbetterbank';
    const db = client.db('evenbetterbank');
});
const db = client.db('evenbetterbank');

//connect to mongo
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }) //{
//     .then(() => {
//         console.log('Connected using mongoose/dal!')
//     }) 
//     .catch(err => console.log(err))

    //db name
    //db = client.db('myproject');


//create user acct
function create(name, email, password){
    const db = client.db('evenbetterbank');
    console.log('dal ' + name, email, password);
    return new Promise((resolve, reject) => {
        var collection = db.collection('Users');
        var doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            console.log('added user');
            //err ? reject(err) : resolve(doc);
        });
    })
}

// find user account
function find(email){
    const db = client.db('evenbetterbank');

    return new Promise((resolve, reject) => {    
        const collection = db //why are these using "customers"?
            .collection('Users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// find user account (diff between this and find? this returns one match, find returns all
function findOne(email){
    const db = client.db('evenbetterbank');

    return new Promise ((resolve, reject) => {
        const collection = db
            .collection('Users')
            .findOne(
                {email: email},
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );
            // .then((doc) => resolve(doc))
            // .catch((err) => reject(err));
    })
}

// update - deposit/withdraw amount works
function update(email, amount){
    const db = client.db('evenbetterbank');

    var amountnum = '';
    console.log('dal update amount' + amount + typeof(amount)); //correct
    amountnum = Number(amount); //why becoming negative number? 
    console.log('amountnum' + amountnum + typeof(amountnum));
    //TODO: check if the first instance is the last number -- initialize?
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('Users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amountnum}}, //balance is undefined
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            
                

    })  

}

// all users -- works
function all(){
    const db = client.db('evenbetterbank');

    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('Users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


module.exports = {create, findOne, find, update, all};