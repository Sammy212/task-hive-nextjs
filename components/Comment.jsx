import { SettingsContext } from '@/context/settings/settings-context'
import { Avatar, Flex, Typography } from 'antd';
import React, { useContext } from 'react'
import Box from './Box/Box';
import dayjs from 'dayjs';
import css from "@/styles/commentSection.module.css";
import cx from "classnames";

const Comment = ({ data }) => {
    
    const {
        settings: {theme},
    } = useContext(SettingsContext);
  return (
    <Box>
        <Flex gap={".5rem"}>
            {/* user Avatar */}
            <Avatar
                size={30} src={data?.author?.image_url}
            />

            {/* User Comment */}
            <Flex vertical flex={1} gap={".5rem"} className={cx(css.comment, css[theme])} >
                {/* Name and Date */}
                <Flex align='center' justify="space-between" >
                    {/* Name */}
                    <Typography.Text>
                        {data?.author?.first_name} {data?.author?.last_name}
                    </Typography.Text>
                    {/* Date */}
                    <Typography.Text type="secondary" className='typoCaption' strong>
                        {dayjs(data?.created_at).format("DD MMM YYYY")}
                    </Typography.Text>
                </Flex>

                {/* Comment Content */}
                <Typography.Text className="typoBody2" >
                    {data?.comment}
                </Typography.Text>
            </Flex>
        </Flex>
    </Box>
  )
}

export default Comment