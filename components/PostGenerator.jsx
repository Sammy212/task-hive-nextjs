"use client"
import React, { useRef, useState } from 'react';
import css from "@/styles/postGenerator.module.css";
import Box from './Box/Box';
import { Avatar, Button, Flex, Image, Input, Spin, Typography } from 'antd';
import { useUser } from '@clerk/nextjs';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '@/actions/post';

const PostGenerator = () => {

    const {user} = useUser();
    const [postText, setPostText] = useState("");
    const imgInputRef = React.useRef(null);
    const vidInputRef = React.useRef(null);
    const [fileType, setFileType] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const queryClient = useQueryClient()
    const {mutate: execute , isPending} = useMutation({
        mutationFn: (data) => createPost(data),
        onSuccess: () => {
            handleSuccess();
            queryClient.invalidateQueries("posts")
        },
        onError: () => showError("Something went wrong. Try Again?")
    })

    const handleSuccess = () => {
        setSelectedFile(null)
        setFileType(null)
        setPostText("")
        toast.success("Post created successfully")
    }
    

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // maximum file size of 5mb
        if(file && file.size > 5 * 1024 *1024) {
            alert("Image size should be less than 5mb")
            retun
        }
        
        if (file && (file.type.startsWith("image/")) || file.type.startsWith("video/")) {
            setFileType(file.type.split('/')[0]);

            const reader = new FileReader();

            reader.readAsDataURL(file)

            reader.onload = () => {
                setSelectedFile(reader.result);
            };
        }
    };

    // Handle remove Post file
    const handleRemoveFile = () => {
        setSelectedFile(null);
        setFileType(null);
    }


    // Show error | Empty Post Event
    const showError = (msg = "Something went wrong try again.") => {
        toast.error(msg)
    }
    
    // Handle Post Event
    const submitPost = () => {
        // first check post and post file
        if ((postText === "" || !postText) && !selectedFile) {
            showError("Can't make an empty post, Share what you are thinking today")
            return;
        }

        execute({postText, media: selectedFile})
    }

  return (
    <>
        <Spin
            spinning={isPending}
            tip={
                <Typography className="typoBody1" style={{ marginTop: "1rem" }}>
                    Uploading Post...
                </Typography>
            }
        >
            <div className={css.postGenWrapper}>
                <Box className={css.container}>
                    <Flex vertical gap={"1rem"} align="flex-start">
                        {/* Post Top */}
                        <Flex style={{width: '100%'}} gap={'1rem'}>
                            <Avatar
                                src={user?.imageUrl}
                                style={{
                                    width: "2.6rem",
                                    height: "2.6rem",
                                    boxShadow: "var(--avatar-shadow)"
                                }}
                            />

                            <Input.TextArea
                                placeholder="Share what you are thinking..."
                                style={{ height: 80, resize: "none", flex: 1 }}
                                value={postText}
                                onChange = {(e) => setPostText(e.target.value)}
                            />
                        </Flex>

                        {/* Post Preview */}
                        {
                            fileType && (
                                <div className={css.previewContainer}>
                                    {/* Remove Post File Button */}
                                    <Button
                                        type="default"
                                        className={css.remove}
                                        style={{ position: "absolute" }}
                                    >
                                        <Typography
                                            className="typoCaption"
                                            onClick={handleRemoveFile}
                                        >
                                            Remove
                                        </Typography>
                                    </Button>

                                    {
                                        fileType === "image" && (
                                            <Image 
                                                src={selectedFile} 
                                                className={css.preview} 
                                                alt="Post Image Preview"
                                                width={"100%"}
                                                height={"350px"}
                                                objectFit="cover"
                                            />
                                        )
                                    }
                                    {
                                        fileType === "video" && (
                                            <video 
                                                src={selectedFile} 
                                                className={css.preview}
                                                controls
                                                width={"100%"}
                                            />
                                        )
                                    }
                                </div>
                            )
                        }

                        {/* Post Bottom */}
                        <Flex
                            className={css.bottom}
                            align="center"
                            justify="space-between"
                        >
                            {/* image upload button */}
                            <Button
                                type="text" 
                                style={{ background: "borderColor" }}
                                onClick={() => imgInputRef.current.click()}
                            >
                                <Flex
                                    align="center"
                                    gap={"0.5rem"}
                                >
                                    <Icon icon={"solar:camera-linear"}
                                        width={"1.2rem"}
                                        color="var(--primary)"
                                    />
                                    <Typography className="typoSubtitle2">Image</Typography>
                                </Flex>
                            </Button>

                            {/* Video upload button */}
                            <Button
                                type="text" 
                                style={{ background: "borderColor" }}
                                onClick={() => vidInputRef.current.click()}
                            >
                                <Flex
                                    align="center"
                                    gap={"0.5rem"}
                                >
                                    <Icon icon={"gridicons:video"}
                                        width={"1.2rem"}
                                        color="#5856d6"
                                    />
                                    <Typography className="typoSubtitle2">Video</Typography>
                                </Flex>
                            </Button>

                            {/* Post button */}
                            <Button
                                type="primary" 
                                style={{ marginLeft: "auto" }}
                                onClick={submitPost}
                            >
                                <Flex
                                    align="center"
                                    gap={"0.5rem"}
                                >
                                    <Icon icon="iconamoon:send-fill"
                                        width={"1.2rem"}
                                        color="#ffffff"
                                    />
                                    <Typography className="typoSubtitle2" style={{ color: "white" }}>Post</Typography>
                                </Flex>
                            </Button>
                        </Flex>
                    </Flex>
                </Box>
            </div>
        </Spin>

        {/* Hidden buttons */}
        {/* Image files button */}
        <input type="file" 
            accept="image/*"
            multiple={false}
            style={{ display: "none" }}
            ref={imgInputRef}
            onChange={(e) => handleFileChange(e)}
        />

        {/* Video files button */}
        <input type="file" 
            accept="video/*"
            multiple={false}
            style={{ display: "none" }}
            ref={vidInputRef}
            onChange={(e) => handleFileChange(e)}
        />
    </>
  )
}

export default PostGenerator;