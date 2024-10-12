import { SettingsContext } from '@/context/settings/settings-context'
import { Avatar, Flex, Typography } from 'antd';
import React, { useContext } from 'react'
import Box from './Box/Box';
import dayjs from 'dayjs';

const Comment = ({ data }) => {
    
    const {
        settings: {theme},
    } = useContext(SettingsContext);
  return (
    <Box>

        {/* user Avatar */}
        <Avatar
            size={30} src={data?.author?.image_url}
        />

        {/* User Comment */}
        <Flex vertical flex={1} gap={".5rem"}>

            {/* Name and Date */}
            <Typography.Text>
                {data?.author?.first_name} {data?.author?.last_name}
            </Typography.Text>
            <Typography.Text type='secondary' className='typoCaption' strong>
                {dayjs(data?.created_at).format("DD MMM YYYY")}
            </Typography.Text>
        </Flex>
    </Box>
  )
}

export default Comment