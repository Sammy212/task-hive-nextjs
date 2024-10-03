import useWindowDimensions from '@/hooks/useWindowsDimensions'
import { Drawer } from 'antd'
import React from 'react'

const SidebarContainer = ({
    isDrawerOpen,
    setIsDrawerOpen,
    children,
    ...other
}) => {
    const {width} = useWindowDimensions()
    if(width <= 1268)
    {
        return (
            <Drawer
                open = {isDrawerOpen}
                placement='left'
                onClose={() => setIsDrawerOpen(false)}
                {...other}
                height={"100%"}
            >
                <div>{children}</div>
            </Drawer>
        )
    }
}

export default SidebarContainer