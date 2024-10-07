"use client"
import React, { useState } from 'react';
import css from "@/styles/postGenerator.module.css";
import Box from './Box/Box';
import { Avatar, Button, Flex, Input, Typography } from 'antd';
import { useUser } from '@clerk/nextjs';
import { Icon } from '@iconify/react';

const PostGenerator = () => {

    const {user} = useUser();
    const [postText, setPostText] = useState("");
  return (
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

                {/* Post Bottom */}
                <Flex
                    className={css.bottom}
                    align="center"
                    justify="space-between"
                >
                    {/* image upload button */}
                    <Button
                        type="text" style={{ background: "borderColor" }}
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
                        type="text" style={{ background: "borderColor" }}
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
  )
}

export default PostGenerator;