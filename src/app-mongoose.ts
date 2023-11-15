import { config } from "dotenv";
import mongoose from "mongoose";
import { Categoria } from "./models/categoria";

config();

const connectionString = process.env.MONGO_DB_CONNECTION_STRING;

const addCategoria = async (titolo: string, sottotitolo: string, descrizione: string) => {
    try {
        await mongoose.connect(connectionString!, {dbName: "amazon"});

        let cat = new Categoria();
        cat.titolo = titolo.toUpperCase();
        cat.sottotitolo = sottotitolo;
        cat.descrizione = descrizione;

        let result = await cat.save();

        console.log(result);
        return result;

    } catch (error) {
        console.log(error);
    } finally {
        await mongoose.disconnect();
    }
}

addCategoria("Cucina", "L'arte della Cucina", "Descrizione bella ed ampia");