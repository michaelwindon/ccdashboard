import { Avatar, Box, Typography, useTheme } from "@mui/material";
import {Menu, MenuItem, Sidebar,useProSidebar} from "react-pro-sidebar"
import { Link, useLocation } from "react-router-dom";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined"
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';


function SideNav() {
    const theme = useTheme();
    const {collapsed } = useProSidebar();
    const location = useLocation();
  


  return (
    <Sidebar styles={{
        height: '100%',
        top: 'auto'
    }}
    breakPoint="md"
    backgroundColor={theme.palette.neutral.light}
    >
        <Box sx={styles.avatarContainer}>
            <Avatar sx={styles.avatar} alt='Logged In Admin' src=""/>
           {!collapsed ? <Typography variant="body2" sx={styles.yourContactcenter}>Your Contact Center</Typography> : null}
           {!collapsed ? <Typography variant="overline">Your Contact Center</Typography> : null}
        </Box>
        <Menu menuItemStyles={{
            button: ({active}) => {
              return {
                backgroundColor: active? theme.palette.neutral.medium : undefined
              }
            } 
          }}>
            <MenuItem active={location.pathname ==='/'} component={<Link to="/" />} icon={<DashboardOutlinedIcon/>} >
                <Typography variant="body2">Dashboard</Typography>
            </MenuItem>
            <MenuItem active={location.pathname ==='/contactcenter'}  component={<Link to="/contactcenter" />} icon={<SupportAgentIcon/>} >
                <Typography variant="body2">Contact Center</Typography>
            </MenuItem>
            <MenuItem  active={location.pathname ==='/queue'} component={<Link to="/queue" />} icon={<ChangeCircleIcon/>} >
                <Typography variant="body2">Queues</Typography>
            </MenuItem>
            <MenuItem  active={location.pathname ==='/prompt'} component={<Link to="/prompt" />} icon={<VolumeUpIcon/>} >
                <Typography variant="body2">Prompt Management</Typography>
            </MenuItem>

        </Menu>
       
    </Sidebar>
  )
}


/** @type {import("@mui/material").SxProps} */
const styles={

avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 5
},
  avatar: {
    width: '40%',
    height: 'auto'
  },
  yourContactcenter: {
    marginTop: 1

  }
}

export default SideNav