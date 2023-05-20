import { Typography, Box } from "@mui/material"
import ContactServiceQueueCounter from "../../components/ContactServiceQueueCounter"
import { useTheme } from "@mui/material";



function Dashboard() {
  const theme = useTheme();

  return (
    <Box>
      <Typography sx={StyleSheet.pageTitle} variant="h5">Dashboard</Typography>
      <Box sx={styles.columnsContainer}>
        <ContactServiceQueueCounter title="Contact Center Service Queues" start={0} end={37} duration={Math.floor(Math.random() * 3) + 1} />
        <ContactServiceQueueCounter title="User Accounts" start={0} end={750} duration={Math.floor(Math.random() * 3) + 1} />
        <ContactServiceQueueCounter title="Prompts" start={0} end={52} duration={Math.floor(Math.random() * 3) + 1} />
      </Box>
    </Box>
  )
}

/** @type {import("@mui/material").SxProps} */
const styles={

  pageTitle: {
      marginBottom: 2
  },
  columnsContainer:{
    columns: '200px 3',
    maxWidth: '1400'
  }
   
  }

export default Dashboard