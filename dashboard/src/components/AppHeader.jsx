import { AppBar,Box,IconButton,Toolbar, Badge } from "@mui/material";
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout'
import { useProSidebar } from "react-pro-sidebar";

function AppHeader() {
    //get sidebar states
    const {collapseSidebar, toggleSidebar, broken} = useProSidebar();


  return (
        <AppBar position="sticky" sx={styles.appBar}>
            <Toolbar>
                <IconButton onClick={() => broken ? toggleSidebar() : collapseSidebar()} color="secondary">
                  <MenuTwoToneIcon />  
                </IconButton>
                <Box 
                    component="img"
                    sx={styles.appLogo}
                    src='src/assets/small-logo.png'
                    />
                 <Box sx={{flexGrow: 1}} />
                <IconButton title="Notiications" color='secondary'>
                <Badge badgeContent={4} color="error">
                    <NotificationsIcon />
                </Badge>
                </IconButton>
                <IconButton title="Settings" color="secondary">
                    <SettingsIcon />
                </IconButton>
                <IconButton title="Sign Out" color="secondary">
                    <LogoutIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
  )
}


/** @type {import("@mui/material").SxProps} */
const styles ={
    appBar: {
        bgcolor: 'neutral.main'
    },
    appLogo: {
        borderRadius: 1,
        width: 80,
        marginLeft: 2,
        
    }
}

export default AppHeader