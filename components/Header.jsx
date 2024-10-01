import React from 'react'
import css from "@/styles/header.module.css"
import Box from './Box/Box'
import Image from 'next/image'
import { Flex } from 'antd'

const Header = () => {
  return (
    <div className={css.wrapper}>
        <Box style={{ height: "100%" }}>
            <div className={css.container}>

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

                    {/* User Button */}
                </Flex>
            </div>
        </Box>
    </div>
  )
}

export default Header