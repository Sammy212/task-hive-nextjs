import React from 'react';
import css from "@/styles/post.module.css";
import Box from './Box/Box';
import { Avatar, Flex, Image, Typography } from 'antd';
import dayjs from 'dayjs';
import { getFileTypeFromUrl } from '@/utils';
import LikeButton from './LikeButton';

const Post = ({ data, queryId }) => {
    
    
  return (
    <div className={css.wrapper}>
        <Box>
            <div className={css.container}>
                {/* Profile Info */}
                <Flex align="center" justify="space-between" >
                    {/* Left side for profile info */}
                    <Flex gap={".5rem"} align="center">
                        <Avatar
                            size={40}
                            src={data?.author?.image_url}
                        />

                        {/* name and post date */}
                        <Flex vertical>
                            <Typography className="typoSubtitle2">
                                {data?.author?.first_name} {data?.author?.last_name}
                            </Typography>
                            
                            <Typography.Text 
                                className="typoCaption"
                                type="secondary"
                                strong
                            >
                                {dayjs(data?.created_at).format("DD MMM YYYY")}
                            </Typography.Text>
                        </Flex>
                    </Flex>
                </Flex>

                {/* Post Caption */}
                <Typography.Text>
                    <div
                        dangerouslySetInnerHTML={{
                            __html:data?.postText?.replace(/\n/g, "<br />"),
                        }}
                    />
                </Typography.Text>

                {/* Post Media File */}
                {
                    getFileTypeFromUrl(data?.media) === "image" && (
                        <div className={css.media}>
                            <Image
                                src={data?.media}
                                alt="post media"
                                style={{objectFit: "cover"}}
                                fill
                            />
                        </div>
                    )
                }
                {
                    getFileTypeFromUrl(data?.media) === "video" && (
                        <div className={css.media}>
                            <video
                                src={data?.media}
                                controls
                                style={{ width: "100%", height: "100%"}}
                            />
                        </div>
                    )
                }

                {/* Like and Comment Actions */}
                <Flex>
                    <LikeButton
                        postId={data?.id}
                        likes={data?.likes}
                        queryId={queryId}
                    />
                    {/* <span>Comments</span> */}
                </Flex>
            </div>
        </Box>
    </div>
  )
}

export default Post