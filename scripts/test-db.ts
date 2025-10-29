import { connectToDatabase} from "@/database/mongoose";

async function main(){
    try{
        await connectToDatabase();

        console.log("OK: Database connection succeeded");
        process.exit(0);
    }catch(e){
        console.error("ERROR: Database connection failed");
        console.error(e);
        process.exit(1);
    }
}

main();