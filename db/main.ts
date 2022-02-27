import fs from "fs";
import { readdir, stat } from "fs/promises";
import path from "path";
import { MongoClient } from "mongodb";

type CollectionTypes = "aggregated" | "top" | "map";

// Connection URI
const uri: string = "mongodb://comviz:comviz101@localhost:27017/";

// Create a new MongoClient
const client: MongoClient = new MongoClient(uri);

const DATA_DIR = "./data/pulse";
const DB_NAME = "pulse";

// loads and returns json files
const loadFiles = async (
  dirPath: string,
  nestedPaths: string[] = []
): Promise<string[]> => {
  const files = await readdir(dirPath);
  for (let f of files) {
    const obj = path.join(dirPath, f);
    const obj_stat = await stat(obj);
    if (obj_stat.isFile()) {
      nestedPaths.push(obj);
    } else {
      nestedPaths = await loadFiles(obj, nestedPaths);
    }
  }
  return nestedPaths;
};

// add extra metadata to json files
// returns collection object, ready to be inserted into mongodb
const generateCollections = async (files: string[]): Promise<object> => {
  const collections: { [key: string]: object[] } = {};
  for (let file of files) {
    const extra = {
      type: file.split("/")[2],
      category: file.split("/")[3],
      state: file.includes("state") ? file.split("/").slice(-3)[0] : "",
      year: file.split("/").slice(-2)[0],
      quarter: `Q${file.split("/").slice(-1)[0].slice(0, 1)}`,
    };

    let data = JSON.parse(fs.readFileSync(file, "utf8"));
    data = { ...extra, ...data.data };
    collections[extra.type as string] = collections[extra.type]?.length
      ? collections[extra.type].concat(data)
      : [data];
  }

  return collections;
};

// inserts array of json data to mongodb collection
const insertDocument = async ({
  client,
  dbName,
  collectionName,
  documents,
}: {
  client: MongoClient;
  dbName: string;
  collectionName: string;
  documents: { [key: string]: any }[];
}) => {
  const db = await client.db(dbName);
  console.log(
    `[${DB_NAME}][${collectionName}] Inserting ${documents.length} documents.`
  );

  try {
    await db.collection(collectionName).insertMany(documents);
    console.log(
      `Successfully inserted ${documents.length} documents to ${collectionName} collection in ${dbName} database.\n`
    );
  } catch (err) {
    throw err;
  }
};

// driver code
const main = async () => {
  // Connect the client to the server
  await client.connect();
  // Establish and verify connection
  await client.db("admin").command({ ping: 1 });
  console.log("Connected successfully to server");

  // load json files from data dir
  const files = await loadFiles(DATA_DIR);

  // generate collections for mongodb
  const collections = await generateCollections(files);

  // insert collections with documents to mongodb
  for (let collection in collections) {
    try {
      await insertDocument({
        client,
        dbName: DB_NAME,
        collectionName: collection,
        documents: collections[collection],
      });
    } catch (err) {
      console.log(`[${DB_NAME}][${collection}] ERROR: ${err}`);
    }
  }
};

main()
  .then(console.log)
  .catch((err) => console.error("[CATCH]", err))
  .finally(() => {
    console.log("Closing...");
    client.close();
  });
