"use server";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

export const createPost = async (post) => {
    try {
        const {postText, media} = post;

        const user = await currentUser()

        const newPost = await db.post.create({
            data : {
                postText,
                author: {
                    connect :{
                        id: user?.id
                    }
                }
            }
        })

        console.log(newPost);

        return {
            data: newPost
        }
        
    } catch (e) {
        console.log(e);
        throw new Error("failed to create post")
        
    }
}