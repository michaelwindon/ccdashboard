import { Card, CardContent, Typography,Box,useTheme } from "@mui/material"
import MyCustomCounter from "../components/MyCustomCounter";


function ContactServiceQueueCounter(props) {

    const theme = useTheme();

  return (
    <MyCustomCounter 
        start={props.start} 
        end={props.end} 
        title={props.title}
        duration={props.duration}

    />
  )
}

export default ContactServiceQueueCounter

