import Express from "express";
import { db, connectToDB } from "./db.js";
import axios from "axios";
import cors from "cors"
import bodyParser from "body-parser";
import fs from "fs";
import admin from "firebase-admin";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
)

admin.initializeApp({
    credential: admin.credential.cert(credentials)
})

const app = Express();

// app.use(Express.json());
// app.use(axios);
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(Express.static(path.join(__dirname, '../build')));

app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
})

app.use(async (req, res, next) => {
    const { authToken } = req.headers;

    if (authToken) {
        try {
            req.user = await admin.auth().verifyIdToken(authToken);
        }
        catch {
            return res.sendStatus(400);
        }
    }
    req.user = req.user || {}
    next();
});

process.on('uncaughtException', function (err) {
    console.error(err);
    console.log('Uncaught Exception... Shutting down');
    process.exit(1);
});


app.get("/", (req, res) => {
    console.log("Hello Guys");
    res.send("Hello guys, thanks for your work")
});

app.get('/api/articles/:name/', async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user;
    console.log(req.user);

    const article = await db.collection('articles').findOne({ name });
    if (article) {
        const upvoteIds = article.upvotes || [];
        article.canUpvote = uid && !upvoteIds.include(uid);
        res.json(article).status(200)

    }
    else {
        res.sendStatus(404);
    }

});

app.use((req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
})

app.put('/api/articles/:name/upvotes', async (req, res, err) => {
    const { name } = req.params;
    const { uid } = req.user;

    //change later
    const article = await db.collection('articles').findOne({ name });

    if (article) {

        const upvoteIds = article.upvotes || [];
        const canUpvote = uid && !upvoteIds.includes(uid);

        if (canUpvote) {
            await db.collection('articles').updateOne({ name }, {
                $inc: { upvotes: 1 },
                $push: { upvoteIds: uid }
            })
                .then(async () => {
                    const updatedArticle = await db.collection('articles').findOne({ name });
                    console.log(`The ${name} has ${article.upvotes} upvotes`);
                    res.status(201).json(updatedArticle.data);
                })
                .catch(err => console.log(err));;
        }
    } else {
        res.send('The Article does not exists');
    }



});

app.put('/api/articles/:name/downvotes', async (req, res) => {
    const { name } = req.params;
    await db.collection('articles').updateOne({ name }, { $inc: { downvotes: 1 } })
        .then(async () => {
            const article = await db.collection('articles').findOne({ name });
            console.log(`The ${name} has ${article.upvotes} upvotes`);
            res.status(201).json(article);

        })
        .catch(err => console.log(err));
});

app.post('/api/articles/:name/comments/', async (req, res) => {
    const { name } = req.params;
    const { postedBy, comment } = req.body;
    // const { email } =req.user;

    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy, comment } },
    });
    const article = await db.collection('articles').findOne({ name });

    if (article) {
        console.log(req.body);
        res.json(article);
    } else {
        res.send('That article doesn\'t exist!');
    }
});

connectToDB((err) => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, (err) => {
        console.log("Server is running on the port 8000");
        if (err) {
            console.log(err);
        }
    });
    console.log(err ? err : "Database is connected");
});