import { MongoClient,ServerApiVersion  } from "mongodb";

const uri = `mongodb+srv://BalajiKumar:Qwerty1MongoDB@cluster0.nb9v9ht.mongodb.net/?retryWrites=true&w=majority`
let db;
async function connectToDB(cb) {
    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
    await client.connect();
    db = client.db('react-blog-db');
    cb();
}

export {
    db, connectToDB
}