"use server";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { uploadFile } from "./uploadFile";
import Posts from "@/components/Posts";

export const createPost = async (post) => {
    try {
        const {postText, media} = post;

        const user = await currentUser()

        let cld_id;
        let assetUrl
        if(media) {
            const res = await uploadFile(media, `/posts/${user?.id}`);
            const {public_id, secure_url} = res;
            cld_id = public_id
            assetUrl = secure_url
        }

        const newPost = await db.post.create({
            data : {
                postText,
                media: assetUrl,
                cld_id,
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
        console.log(e?.message);
        throw new Error("failed to create post")
        
    }
}

export const getMyFeedPosts = async (lastCursor) => {
    try {
        const posts = await db.post.findMany({
            include: {
                author:  true
            },
            take: 5, // number of post loaded at a time from db
            ...(lastCursor && {
                skip: 1,
                cursor: {
                    id: lastCursor
                }
            }),
            orderBy: {
                createdAt: 'desc'
            }
        })

        if (posts.length === 0) {
            return {
                data: [],
                metaData: {
                    lastCursor: null,
                    hasMore: false
                }
            }
        }
        return {
            data: posts
        }
    } catch(e) {
        console.log(e);
        throw new Error("Failed to fetch posts");
    }
}