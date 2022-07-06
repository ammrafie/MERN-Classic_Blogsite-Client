import express from 'express';
import bodyParser from 'body-parser';
import {MongoClient} from 'mongodb';
import path from 'path';

console.log("############################");
console.log("Done with import statements!");
console.log("############################");

// For production use script: "start": "npx nodemon --exec npx babel-node src/server.js",

const port= process.env.PORT || 5000;
const uri = process.env.MONGO_URI || "mongodb+srv://mongouser00:pBe1V6KG1BTiSNZ7@cluster0.hxm08.mongodb.net/?retryWrites=true&w=majority"; // Use for production only:   const uri= 'mongodb://localhost:27017';
const dbName = 'my-blog';
const dbcollectionName = 'articles';

console.log("############################");
console.log("Done with setting up constants!");
console.log("############################");

const app = express();

// After merging front-end, we have to tell where our static files are located.
app.use(express.static("public"));   // Old version: path.join(__dirname, '/build')

console.log("############################");
console.log("Done with telling where the static files are!");
console.log("############################");

// Parses json obj which is send with a request &
// Adds a body property to the request parameter.
app.use(bodyParser.json());

// Inside get method define a Callback function when endpoint '/hi' gets hit with a get request
// app.get('/hi', (req,res) => res.send('Hello!'));
// app.get('/hi/:name', (req,res) => res.send(`Hello! ${req.params.name}`))
// app.post('/hi', (req,res) => res.send(`Hello2! ${req.body.name}`));

const withDB = async (operations, res) => {
    try {
        const client = new MongoClient(uri, {useUnifiedTopology: true, useNewUrlParser: true});
        const db = client.db(dbName);
        await client.connect();
        await operations(db);
        await client.close();
    } catch (error) {
        // 500 is the code for internal server error
        res.status(500).json({message:'Error connecting to db', error});
    }
    
}


app.get('/api/articles/:name', (req,res) => {
    withDB(async (db) => {
        const articleName = req.params.name;
        const articleInfo = await db.collection(dbcollectionName).findOne({name:articleName});
        res.status(200).json(articleInfo);
    }, res);
});

app.post('/api/articles/:name/upvote', async (req,res) => {
    withDB(async (db) => {
        const articleName = req.params.name;
        const articleInfo = await db.collection(dbcollectionName).findOne({name:articleName});
        await db.collection('articles').updateOne({name:articleName}, {
            '$set': {
                upvotes : articleInfo.upvotes + 1,
            },
        });
        const updatedArticleInfo = await db.collection(dbcollectionName).findOne({name:articleName});
        res.status(200).json(updatedArticleInfo);
    }, res);
});

app.post('/api/articles/:name/add-comment', (req,res) => {
    const { username, text } = req.body;
    const articleName = req.params.name;
    
    withDB(async (db) => {
        const articleInfo = await db.collection(dbcollectionName).findOne({name: articleName});
        await db.collection('articles').updateOne({name: articleName}, {
            '$set': {
                comments: articleInfo.comments.concat({username, text}),
            }
        });
        const updatedArticleInfo = await db.collection(dbcollectionName).findOne({name: articleName});
        res.status(200).json(updatedArticleInfo);
    }, res);
});

// All requests that aren't caught by any other api routes should be passed onto our app
// This will allow our client-side app to navigate between pages and process URLs correctly
app.get('*', (req, res) => {
    res.sendFile("public/index.html");  // Old version:  path.join(__dirname, '/build/index.html')
})

// Actually Start the server
app.listen(port, () => console.log('Listening on port ... '));




