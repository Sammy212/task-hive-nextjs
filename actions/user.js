"use server"

import { db } from "@/lib/db"

// Create User
export const createUser = async (user) => {
    const { id, first_name, last_name, email_address, image_url, username } = 
    user;

    try{
        const userExits = await db.user.findUnique({
            where : {
                id
            }
        })

        if(userExits)
        {
            //update User
            updateUser(user)
            return
        }

        await db.user.create({
            data: {
                id,
                first_name,
                last_name,
                email_address,
                image_url,
                username
            }
        })

    } catch(e)
    {
        console.log(e)

        return {
            error: "failed to save in db"
        }
        
    }
}

// Update User
export const updateUser = async (user) => {
    const { id, first_name, last_name, email_address, image_url, username } = user;

    try {
        await db.user.update({
            where: {
                id,
            },
            data: {
                first_name,
                last_name,
                email_address,
                image_url,
                username,
            },
        });

        console.log("User Successfully Updated in dataBase");
        
    } catch (e) {
        console.log(e);
        return {
            error: "failed to update in database",
        };
    }
}


// Delete User
export const deleteUser = async (id) => {
    try {
        await db.user.delete({
            where:{
                id,
            },
        });

        console.log("User Deleted from dataBase");
        
    } catch (e) {
        return {
            error: "Failed to Perform delete operation in dataBase",
        };
    }
}