import cloudinary from "cloudinary";

cloudinary.v2.config({

    cloud_name: "drcuy7tsc",
    api_key: "936932595851363",
    api_secret: "4-brgbVDsKGtUA7byV3bYpmPS0w"
})

export const cld = globalThis.cloudinary || cloudinary

if (process.env.NODE_ENV !== "production") globalThis.cloudinary = cld;