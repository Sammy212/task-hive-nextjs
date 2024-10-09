"use server";
import { cld } from "@/lib/cloudinary";

export const uploadFile = async (file, folder) => {
    try {
        const res = cld.v2.uploader.upload(file, {
                folder: `task-hive/${folder}`,
                resource_type: "auto"
            },
            (error, result) => {
                if(error) {
                    console.log("Error while uploading Image Post");
                } else {
                    console.log("File Uploaded");
                    return result;
                }
            }
        );

        return res
    } catch (e) {
        console.log(e);
        return {
            error: "Failed to upload"
        }
    }
}