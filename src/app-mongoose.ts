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

        //let val = await cat.validate(); validazione prima del salvataggio

        let result = await cat.save();

        console.log(result);
        return result;

    } catch (error) {
        console.log(error);
    } finally {
        await mongoose.disconnect();
    }
}

const getCategorie = async () => {
    try {
        await mongoose.connect(connectionString!, {dbName: "amazon"});

        let categorie = await Categoria.find();

        console.log(categorie);
        

    } catch (error) {
        console.log(error);
    } finally {
        await mongoose.disconnect();
    }
}

const updateCategoria = async (id: string, titolo: string, sottotitolo: string, descrizione: string, attiva: boolean) => {
    try {
        await mongoose.connect(connectionString!, {dbName: "amazon"});

        let cat = await Categoria.findById(id);
        if (cat) {
            cat.titolo = titolo;
            cat.sottotitolo = sottotitolo;
            cat.descrizione = descrizione;
            cat.attiva = attiva;

            let result = await cat.save();
            console.log(result);
            
        }
        
    } catch (error) {
        console.log(error);
    } finally {
        await mongoose.disconnect();
    }
}

const deleteCategoria = async (id: string) => {
    try {
        await mongoose.connect(connectionString!, {dbName: "amazon"});

        let result = await Categoria.deleteOne({_id: id});
        console.log(result);

        // let cat = Categoria.findById(id);
        // if (cat)  {
        //     let result = await cat.deleteOne();
        // }
        
    } catch (error) {
        console.log(error);
    } finally {
        await mongoose.disconnect();
    }
}

const getCategoriaById = async (id: string) => {
    try {
        await mongoose.connect(connectionString!, {dbName: "amazon"});

        let cat = await Categoria.findById(id);
        console.log(cat);
        
    } catch (error) {
        console.log(error);
    } finally {
        await mongoose.disconnect();
    }
}

//addCategoria("Cucina", "L'arte della Cucina", "Descrizione bella ed ampia");
//getCategorie();
//pdateCategoria("6554b42d4611c3560b87e9ae", "CUCINA", "Sottotitolo", "Descrizione bella ed ampia", false);
deleteCategoria("6554b42d4611c3560b87e9ae");