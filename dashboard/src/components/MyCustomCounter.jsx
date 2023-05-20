import { Card,CardContent, Typography,Box } from "@mui/material"
import CountUp from 'react-countup';

function MyCustomCounter({start,end,duration,title}) {

  return (
    <Card>
    <CardContent sx={styles.cardContent}>
     <Typography variant="cardTitle">{title}</Typography>
        <Box sx={styles.countUp}>
            <CountUp
                     start={start}
                     end={end}
                     duration={duration}
            />
        </Box>
    </CardContent>
</Card>
  )
}

/** @type {import("@mui/material").SxProps} */
const styles={
    cardContent: {
        p: 5,
    },
    countUp: {
        display: 'flex',
        alignItems:'center',
        flexDirection: 'column',
        padding: 4,
        fontSize: 50,
        
        
    },

 }

export default MyCustomCounter