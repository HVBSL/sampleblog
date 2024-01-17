import Express from "express";
import { db, connectToDB } from "./src/db.js";
import axios from "axios";
import cors from "cors"
import bodyParser from "body-parser";


const app = Express();

// app.use(Express.json());
// app.use(axios);
// app.use(cors({ origin: true, credentials: true }));
// app.use(bodyParser.json());

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
    const article = await db.collection('articles').findOne({ name });
    (article) ? res.json(article).status(200) : res.status(400).json({ "err": "404: page not found" });

})

app.put('/api/articles/:name/upvotes', async (req, res, err) => {
    const { name } = req.params;
    await db.collection('articles').updateOne({ name }, { $inc: { upvotes: 1 } })
        .then(async () => {
            const article = await db.collection('articles').findOne({ name });
            console.log(`The ${name} has ${article.upvotes} upvotes and ${article.downvotes} downvotes`);
            res.status(201).send(`The ${name} has ${article.upvotes} upvotes and ${article.downvotes} downvotes`);;
        })
        .catch(err => console.log(err));;

});

app.put('/api/articles/:name/downvotes', async (req, res) => {
    const { name } = req.params;
    await db.collection('articles').updateOne({ name }, { $inc: { downvotes: 1 } })
        .then(async () => {
            const article = await db.collection('articles').findOne({ name });
            console.log(`The ${name} has ${article.upvotes} upvotes and ${article.downvotes} downvotes`);
            res.status(201).send(`The ${name} has ${article.upvotes} upvotes and ${article.downvotes} downvotes`);

        })
        .catch(err => console.log(err));
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, comment } = req.body;
    await db.collection('articles').updateOne({ name }, { $push: { comments: { postedBy: postedBy, comment: comment } } })
        .then(async () => {
            const article = await db.collection('articles').findOne({ name })
            if (article) {

                res.send(article.comments);
            } else {
                res.status(404).send("404: page not found")

            }
        }
        )
        .catch(err => console.log(err));
});

connectToDB((err) => {
    app.listen(8000, (err) => {
        console.log("Server is running on the port 8000");
        if (err) {
            console.log(err);
        }
    });
    console.log(err ? err : "Database is connected");
});