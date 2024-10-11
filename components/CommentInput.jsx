import React from 'react';
import { Avatar, Button, Flex, Input } from 'antd';
import { useUser } from '@clerk/nextjs';
import { Icon } from '@iconify/react';

const CommentInput = ({postId, setExpanded, queryId}) => {

    const {user} = useUser();
    const [value, setValue] = React.useState("");
  return (
    <Flex gap={"1rem"} align='center'>
        {/* User avatar */}
        <Avatar 
            src={user?.imageUrl} 
            size={40} style={{ minWidth: "40px"}} 
        />

        {/* input form */}
        <Input.TextArea
            placeholder='Write what you think...'
            style={{resize: "none"}}
            autoSize={{ minRows: 1, maxRows: 5 }}
            value={value}
            onChange={
                (e) => calculateSizeAdjustValues(e.target.value)
            }
            // disabled
        />

        <Button
            type='primary'
        >
            <Icon icon={"iconamoon:send-fill"} width={"1.2rem"} />
        </Button>
    </Flex>
  )
}

export default CommentInput