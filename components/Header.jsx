import React from 'react';
import css from "@/styles/header.module.css";
import Box from './Box/Box';
import Image from 'next/image';
import { Flex } from 'antd';
import ThemeButton from './ThemeButton';
import { UserButton } from '@clerk/nextjs';
import SidebarButton from './SidebarButton';

const Header = () => {
  return (
    <div className={css.wrapper}>
        <Box style={{ height: "100%" }}>
            <div className={css.container}>

                {/* Mobile view side bar button */}
                <div className={css.sidebarButton}>
                    <SidebarButton />
                </div>

                {/* Header left side */}
                <Image src={"/images/logo.png"}
                    width={150}
                    height={40}
                    alt='logo'
                    className={css.logo}
                    />
                
                {/* Header right side */}
                <Flex gap={25} align='center'>
                    {/* Theme button */}
                    <ThemeButton/>
                    
                    {/* User Button */}
                    <UserButton afterSignOutUrl='/sign-in' />
                </Flex>
            </div>
        </Box>
    </div>
  )
}

export default Header