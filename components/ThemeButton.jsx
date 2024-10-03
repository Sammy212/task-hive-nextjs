import React from 'react'
import { useSettingsContext } from '@/context/settings/settings-context'
import { Button } from 'antd'
import { Icon } from '@iconify/react'

const ThemeButton = () => {
    const {setSettings} = useSettingsContext();
  return (
    <Button
        style={{padding: 0, border: "none", backgroundColor: "transparent"}}
        // type='text'
        onClick={() => {
            setSettings((prev) => ({
                ...prev,
                theme: prev.theme === "dark" ? "light" : "dark",
            })); 
        }}

        icon = {
            <Icon icon={"icon-park-solid:dark-mode"} width={"35px"} />
        }
    />
  )
}

export default ThemeButton;