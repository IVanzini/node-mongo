import { MongoClient, ObjectId } from "mongodb";
import { config } from "dotenv";
import fs from "node:fs";
import path from "node:path";

config();

const connectionString = process.env.MONGO_DB_CONNECTION_STRING;

const esegui = async () => {
    if (!connectionString) {
        console.error("Connection string non trovata");
        return;
    }

    // instanziamo il client (collegamento alla engine/server di mongodb)
    const client = new MongoClient(connectionString);

    try {
        // connessione esplicita
        // client.connect();

        // specifichiamo il db da utilizzare
        const db = client.db("amazon");
        // rifer alla collection
        const prodotti = db.collection("prodotti");

        //const dati = prodotti.find({name: "bicicletta"}).project({name: 1, _id: 0});// solo il campo nome uguale a bicicletta
        const dati = prodotti.find();

        let datiProdotti = await dati.toArray();

        console.log(datiProdotti);

        // tutto in una riga sola
        //console.log(await client.db("amazon").collection("prodotti").find().toArray());
        
    } catch (error) {
        console.error(error);
    }
    finally {
        client.close();
    }
}

const addProdotto = async (nome: string, prezzo: number) => {
    if (!connectionString) {
        console.error("Connection string non trovata");
        return;
    }

    // instanziamo il client (collegamento alla engine/server di mongodb)
    const client = new MongoClient(connectionString);

    try {
        // specifichiamo il db da utilizzare
        const db = client.db("amazon");
        // rifer alla collection
        const prodotti = db.collection("prodotti");

        const result = await prodotti.insertOne({
            nome,// vengono create proprietà nome che vale nome e prezzo che vale prezzo
            prezzo
        });

        console.log(result);
        
    } catch (error) {
        console.error(error);
    }
    finally {
        client.close();
    }
}

const getProdottoById = async (id: string) => {
    if (!connectionString) {
        console.error("Connection string non trovata");
        return;
    }

    // instanziamo il client (collegamento alla engine/server di mongodb)
    const client = new MongoClient(connectionString);

    try {
        // specifichiamo il db da utilizzare
        const db = client.db("amazon");
        // rifer alla collection
        const prodotti = db.collection("prodotti");

        const result = await prodotti.findOne({_id: new ObjectId(id)});

        console.log(result);
        
    } catch (error) {
        console.error(error);
    }
    finally {
        client.close();
    }
}

const aggiornaPrezzo = async (id: string, prezzo: number) => {
    if (!connectionString) {
        console.error("Connection string non trovata");
        return;
    }

    // instanziamo il client (collegamento alla engine/server di mongodb)
    const client = new MongoClient(connectionString);

    try {
        // specifichiamo il db da utilizzare
        const db = client.db("amazon");
        // rifer alla collection
        const prodotti = db.collection("prodotti");

        const result = await prodotti.updateOne({_id: new ObjectId(id)}, {$set: {"prezzo": prezzo}});

        console.log(result);
        
    } catch (error) {
        console.error(error);
    }
    finally {
        client.close();
    }
}

const cancellaProdotto = async (id: string) => {
    if (!connectionString) {
        console.error("Connection string non trovata");
        return;
    }

    // instanziamo il client (collegamento alla engine/server di mongodb)
    const client = new MongoClient(connectionString);

    try {
        // specifichiamo il db da utilizzare
        const db = client.db("amazon");
        // rifer alla collection
        const prodotti = db.collection("prodotti");

        const result = await prodotti.deleteOne({_id: new ObjectId(id)});

        console.log(result);
        
    } catch (error) {
        console.error(error);
    }
    finally {
        client.close();
    }
}

const leggiDaFileEScriviSuDb = async (nomeFile: string) => {
    let testo = "";
    try {
        testo = fs.readFileSync(path.join(process.cwd(), nomeFile), "utf-8");
        
        console.log(JSON.parse(testo));
    } catch (err) {
        console.error("errore nella lettura del file: ", err);
    } 

    const client = new MongoClient(connectionString!);

    try {
        const db = client.db("amazon");
        
        const users = db.collection("users");

        const result = await users.insertMany(JSON.parse(testo));

        console.log(result);
        
    } catch (error) {
        console.error(error);
    }
    finally {
        client.close();
    }
}

//addProdotto("chitarra elettrica", 1900).then(() => esegui());
//aggiornaPrezzo("65520a2d3b44bcf1bd1fe920", 999).then(() => getProdottoById("65520a2d3b44bcf1bd1fe920"));
//cancellaProdotto("65520a2d3b44bcf1bd1fe920").then(() => esegui());
leggiDaFileEScriviSuDb("users.json");
