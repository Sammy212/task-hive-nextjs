import { SettingsContextProvider } from '@/context/settings/settings-provider'
import React from 'react'

const HomeLayout = ({children}) => {
  return (
    <SettingsContextProvider>
        <ThemeProvider>
            <div>{children}</div>
        </ThemeProvider>
    </SettingsContextProvider>
  )
}

export default HomeLayout