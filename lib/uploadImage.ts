import { ID, storage } from "@/appwrite";

const uploadImage = async (file: File) => {
    if(!file) return;

    const fileUploaded = await storage.createFile(
        "647148105cf9ffde4788",
        ID.unique(),
        file
    );

    return fileUploaded;
}

export default uploadImage;