import {Formik, Form, Field,useFormikContext} from 'formik';
import JSONPretty from 'react-json-pretty';
import { TimePicker,DatePicker } from 'formik-mui-x-date-pickers';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import en from 'date-fns/locale/en-US'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {
    Box,
    Typography,
    ToggleButton,
    MenuItem,
    Button,
  } from '@mui/material';

import {ToggleButtonGroup,TextField} from 'formik-mui';

import React from 'react';
import axios from 'axios';
import { formatInTimeZone } from 'date-fns-tz';



  interface ActionBody {
        msg: string;
        type: string;
        value: string;
  }
  interface Values {
        holiday: string[];
        secondarytodclose: string[];
        secondarytodopen: string[];
        daysopen: boolean[];
        daystodopen: string[];
        daystodclose: string[];
        mainnumber: string;
        welcomeprompt: string;
        afterhours: ActionBody;
        menu0: ActionBody;
        menu1: ActionBody;
        menu2: ActionBody;
        menu3: ActionBody;
        menu4: ActionBody;
        menu5: ActionBody;
        menu6: ActionBody;
        menu7: ActionBody;
        menu8: ActionBody;
        menu9: ActionBody;
  }


function CreateContactCenterForm() {
var holidayIndex = 0;



  return (
   
    <Formik
        initialValues ={{
            "holiday": [],
            "secondarytodclose": [],
            "secondarytodopen": [],
            "daysopen": [],

            "daystodopen": [],
            "daystodclose": [],
            "mainnumber": "", 
            "welcomeprompt": "Thank you for calling Houston Methodist. If this is an emergency please hangup and dial 911.",
            "afterhours": {
                    "type":"msg",
                    "msg": "Thank you for calling Houston Methodist. Our Office is currently closed. Please call back during our normal business hours.",
                    "value": ""
            },
            "menu0": {
                "type":"",
                "msg": "",
                "value": ""
            },
            "menu1": {
                "type":"",
                "msg": "",
                "value": ""
            },
            "menu2": {
                "type":"",
                "msg": "",
                "value": ""
            },
            "menu3": {
                "type":"",
                "msg": "",
                "value": ""
            },
            "menu4": {
                "type":"",
                "msg": "",
                "value": ""
            },
            "menu5": {
                "type":"",
                "msg": "",
                "value": ""
            },
            "menu6": {
                "type":"",
                "msg": "",
                "value": ""
            },
            "menu7": {
                "type":"",
                "msg": "",
                "value": ""
            },
            "menu8": {
                "type":"",
                "msg": "",
                "value": ""
            },
            "menu9": {
                "type":"",
                "msg": "",
                "value": ""
            },
            
        }}    

        validate={(values)=>{
            const errors: Partial<Values> = {};

            if (!values.mainnumber){
                errors.mainnumber = "Required";
            }else if (!/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g.test(values.mainnumber)){
                errors.mainnumber = "Invalid Telephone Number"
            }
            return errors;
        }}
        onSubmit ={(values, {setSubmitting}) =>{
            
            console.log("Form Submitted!")
            const baseURL = "https://2mlwh3k7i0.execute-api.us-east-1.amazonaws.com/dev/cc/"
           
            console.log(values)
            formatInTimeZone(values.daystodopen[0],'America/Chicago','HH:mm' )
            console.log("🚀 ~ file: CreateContactCenterForm.tsx:144 ~ CreateContactCenterForm ~ values.daystodopen[0]:", values.daystodopen[0])
            
            axios.post(baseURL, values)
                  .then((data) => {
                    console.log(data.data)
                    toast.success("Contact Center Created!") 
                    setSubmitting(false);
                  })
                  .catch((error) => {
                    console.log(error)
                    toast.error("Contact Creation Failed!")
                    setSubmitting(false);
                
                })

        }}
    >
        
    {({values, submitForm, resetForm, isSubmitting, touched, errors}) => (
        
        
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={en}>
        <ToastContainer />
        <Form>
            <Box margin={1}>
            <Field 
                component={TextField}
                type="text"
                label="Telephone Number"
                name="mainnumber"
                helperText ="Enter Contact Center Number"
                variant="standard"
            />
            </Box>
            <Box margin={1}>
                <Typography>Open Days</Typography>
                
                <Field component={ToggleButtonGroup} name="daysopen" type="checkbox" >
                    <ToggleButton value="SUN" aria-label="Sunday" key={0}>
                    <Typography>SUN</Typography>
                    </ToggleButton>
                    <ToggleButton value="MON" aria-label="Monday" key={1}>
                    <Typography>MON</Typography>
                    </ToggleButton>
                    <ToggleButton value="TUE" aria-label="Tuesday" key={2}>
                    <Typography>TUE</Typography>
                    </ToggleButton>
                    <ToggleButton value="WED" aria-label="Wednesday" key={3}>
                    <Typography>WED</Typography>
                    </ToggleButton>
                    <ToggleButton value="THU" aria-label="Thursday" key={4}>
                    <Typography>THU</Typography>
                    </ToggleButton>
                    <ToggleButton value="FRI" aria-label="Friday" key={5}>
                    <Typography>FRI</Typography>
                    </ToggleButton>
                    <ToggleButton value="SAT" aria-label="Saturday" key={6}>
                    <Typography>SAT</Typography>
                    </ToggleButton>
                </Field>
               
            </Box>
            
            {values.daysopen.includes("SUN") && 
                    <Box margin={1} sx={{flexDirection: 'row', display: 'flex' }}>
                        <Box margin={1}>
                        <Typography>SUN Open Hours</Typography>
                            <Field 
                                component={TimePicker} 
                                name="daystodopen[0]" 
                                value={undefined || values.daystodopen[0] } 
                                label="Open Time" minutesStep={30} 
                                format={"hh:mm"} 
                            />
                        </Box>

                        <Box margin={1}>
                        <Typography>SUN Secondary Close</Typography>
                            <Field 
                                component={TimePicker} 
                                name="secondarytodclose[0]" 
                                value={undefined || values.secondarytodclose[0] } 
                                label="Open Time" minutesStep={30} 
                                format={"hh:mm"} 
                            />
                        </Box>


                        <Box margin={1}>
                        <Typography>SUN Secondary Open</Typography>
                            <Field 
                                component={TimePicker} 
                                name="secondarytodopen[0]" 
                                value={undefined || values.secondarytodopen[0] } 
                                label="Open Time" minutesStep={30} 
                                format={"hh:mm"} 
                            />
                        </Box>

                        <Box margin={1}>
                        <Typography>SUN Closed Hours</Typography>
                            <Field 
                                component={TimePicker} 
                                name="daystodclose[0]" 
                                value={undefined || values.daystodclose[0] } 
                                label="Close Time" minutesStep={30} 
                                format={"hh:mm"} 
                            />
                        </Box>
                        
                    </Box>
            }
            {values.daysopen.includes("MON") && 
            <Box margin={1} sx={{flexDirection: 'row', display: 'flex' }}>
                <Box margin={1}>
                <Typography>MON Open Hours</Typography>
                    <Field 
                        component={TimePicker} 
                        name="daystodopen[1]" 
                        value={undefined || values.daystodopen[1] } 
                        label="Open Time" minutesStep={30} 
                        format={"hh:mm"} 
                    />
                </Box>

                <Box margin={1}>
                        <Typography>MON Secondary Close</Typography>
                            <Field 
                                component={TimePicker} 
                                name="secondarytodclose[1]" 
                                value={undefined || values.secondarytodclose[1] } 
                                label="Open Time" minutesStep={30} 
                                format={"hh:mm"} 
                            />
                        </Box>

                        <Box margin={1}>
                        <Typography>MON Secondary Open</Typography>
                            <Field 
                                component={TimePicker} 
                                name="secondarytodopen[1]" 
                                value={undefined || values.secondarytodopen[1] } 
                                label="Open Time" minutesStep={30} 
                                format={"hh:mm"} 
                            />
                        </Box>

                <Box margin={1}>
                <Typography>MON Closed Hours</Typography>
                    <Field 
                        component={TimePicker} 
                        name="daystodclose[1]" 
                        value={undefined || values.daystodclose[1] } 
                        label="Close Time" minutesStep={30} 
                        format={"hh:mm"} 
                    />
                </Box>
             </Box>
            }
             {values.daysopen.includes("TUE") && 
              <Box margin={1} sx={{flexDirection: 'row', display: 'flex' }}>
              <Box margin={1}>
              <Typography>TUE Open Hours</Typography>
                  <Field 
                      component={TimePicker} 
                      name="daystodopen[2]" 
                      value={undefined || values.daystodopen[2] } 
                      label="Open Time" minutesStep={30} 
                      format={"hh:mm"} 
                  />
              </Box>

              <Box margin={1}>
                        <Typography>TUE Secondary Close</Typography>
                            <Field 
                                component={TimePicker} 
                                name="secondarytodclose[2]" 
                                value={undefined || values.secondarytodclose[2] } 
                                label="Open Time" minutesStep={30} 
                                format={"hh:mm"} 
                            />
                        </Box>

                        <Box margin={1}>
                        <Typography>TUE Secondary Open</Typography>
                            <Field 
                                component={TimePicker} 
                                name="secondarytodopen[2]" 
                                value={undefined || values.secondarytodopen[2] } 
                                label="Open Time" minutesStep={30} 
                                format={"hh:mm"} 
                            />
                        </Box>

              <Box margin={1}>
              <Typography>TUE Closed Hours</Typography>
                  <Field 
                      component={TimePicker} 
                      name="daystodclose[2]" 
                      value={undefined || values.daystodclose[2] } 
                      label="Close Time" minutesStep={30} 
                      format={"hh:mm"} 
                  />
              </Box>
           </Box>
            }
             {values.daysopen.includes("WED") && 
                 <Box margin={1} sx={{flexDirection: 'row', display: 'flex' }}>
                 <Box margin={1}>
                 <Typography>WED Open Hours</Typography>
                     <Field 
                         component={TimePicker} 
                         name="daystodopen[3]" 
                         value={undefined || values.daystodopen[3] } 
                         label="Open Time" minutesStep={30} 
                         format={"hh:mm"} 
                     />
                 </Box>

                 <Box margin={1}>
                        <Typography>WED Secondary Close</Typography>
                            <Field 
                                component={TimePicker} 
                                name="secondarytodclose[3]" 
                                value={undefined || values.secondarytodclose[3] } 
                                label="Open Time" minutesStep={30} 
                                format={"hh:mm"} 
                            />
                        </Box>

                        <Box margin={1}>
                        <Typography>WED Secondary Open</Typography>
                            <Field 
                                component={TimePicker} 
                                name="secondarytodopen[3]" 
                                value={undefined || values.secondarytodopen[3] } 
                                label="Open Time" minutesStep={30} 
                                format={"hh:mm"} 
                            />
                        </Box>
                 <Box margin={1}>
                 <Typography>WED Closed Hours</Typography>
                     <Field 
                         component={TimePicker} 
                         name="daystodclose[3]" 
                         value={undefined || values.daystodclose[3] } 
                         label="Close Time" minutesStep={30} 
                         format={"hh:mm"} 
                     />
                 </Box>
              </Box>
            }
            {values.daysopen.includes("THU") && 
             <Box margin={1} sx={{flexDirection: 'row', display: 'flex' }}>
             <Box margin={1}>
             <Typography>THU Open Hours</Typography>
                 <Field 
                     component={TimePicker} 
                     name="daystodopen[4]" 
                     value={undefined || values.daystodopen[4] } 
                     label="Open Time" minutesStep={30} 
                     format={"hh:mm"} 
                 />
             </Box>

             <Box margin={1}>
                        <Typography>THU Secondary Close</Typography>
                            <Field 
                                component={TimePicker} 
                                name="secondarytodclose[4]" 
                                value={undefined || values.secondarytodclose[4] } 
                                label="Open Time" minutesStep={30} 
                                format={"hh:mm"} 
                            />
                        </Box>

                        <Box margin={1}>
                        <Typography>THU Secondary Open</Typography>
                            <Field 
                                component={TimePicker} 
                                name="secondarytodopen[4]" 
                                value={undefined || values.secondarytodopen[4] } 
                                label="Open Time" minutesStep={30} 
                                format={"hh:mm"} 
                            />
                        </Box>

             <Box margin={1}>
             <Typography>THU Closed Hours</Typography>
                 <Field 
                     component={TimePicker} 
                     name="daystodclose[4]" 
                     value={undefined || values.daystodclose[4] } 
                     label="Close Time" minutesStep={30} 
                     format={"hh:mm"} 
                 />
             </Box>
          </Box>
            }
             {values.daysopen.includes("FRI") && 
                <Box margin={1} sx={{flexDirection: 'row', display: 'flex' }}>
                <Box margin={1}>
                <Typography>FRI Open Hours</Typography>
                    <Field 
                        component={TimePicker} 
                        name="daystodopen[5]" 
                        value={undefined || values.daystodopen[5] } 
                        label="Open Time" minutesStep={30} 
                        format={"hh:mm"} 
                    />
                </Box>

                <Box margin={1}>
                        <Typography>FRI Secondary Close</Typography>
                            <Field 
                                component={TimePicker} 
                                name="secondarytodclose[5]" 
                                value={undefined || values.secondarytodclose[5] } 
                                label="Open Time" minutesStep={30} 
                                format={"hh:mm"} 
                            />
                        </Box>


                        <Box margin={1}>
                        <Typography>FRI Secondary Open</Typography>
                            <Field 
                                component={TimePicker} 
                                name="secondarytodopen[5]" 
                                value={undefined || values.secondarytodopen[5] } 
                                label="Open Time" minutesStep={30} 
                                format={"hh:mm"} 
                            />
                        </Box>

                <Box margin={1}>
                <Typography>FRI Closed Hours</Typography>
                    <Field 
                        component={TimePicker} 
                        name="daystodclose[5]" 
                        value={undefined || values.daystodclose[5] } 
                        label="Close Time" minutesStep={30} 
                        format={"hh:mm"} 
                    />
                </Box>
             </Box>
            }
             {values.daysopen.includes("SAT") && 
             <Box margin={1} sx={{flexDirection: 'row', display: 'flex' }}>
             <Box margin={1}>
             <Typography>SAT Open Hours</Typography>
                 <Field 
                     component={TimePicker} 
                     name="daystodopen[6]" 
                     value={undefined || values.daystodopen[6] } 
                     label="Open Time" minutesStep={30} 
                     format={"hh:mm"} 
                 />
             </Box>

             <Box margin={1}>
                        <Typography>SAT Secondary Close</Typography>
                            <Field 
                                component={TimePicker} 
                                name="secondarytodclose[6]" 
                                value={undefined || values.secondarytodclose[6] } 
                                label="Open Time" minutesStep={30} 
                                format={"hh:mm"} 
                            />
                        </Box>


                        <Box margin={1}>
                        <Typography>SAT Secondary Open</Typography>
                            <Field 
                                component={TimePicker} 
                                name="secondarytodopen[6]" 
                                value={undefined || values.secondarytodopen[6] } 
                                label="Open Time" minutesStep={30} 
                                format={"hh:mm"} 
                            />
                        </Box>

             <Box margin={1}>
             <Typography>SAT Closed Hours</Typography>
                 <Field 
                     component={TimePicker} 
                     name="daystodclose[6]" 
                     value={undefined || values.daystodclose[6] } 
                     label="Close Time" minutesStep={30} 
                     format={"hh:mm"} 
                 />
             </Box>
          </Box>
        }
            <JSONPretty data={values.holiday}/>
            <Box margin={1}>
                <Typography>Holday</Typography>
                <Field 
                    component={DatePicker}
                    name={"holiday[" + holidayIndex + "]"}
                    value={values.holiday[holidayIndex]}
                />
                <Button>Add Date</Button>
                <Button>Remove Date</Button>
            </Box>

            <Box margin={1}>
            <Typography>Configure Prompts</Typography>
            <Box paddingTop={3}>
            <Field 
                component={TextField}
                type="text"
                label="Welcome Prompt"
                name="welcomeprompt"
                
                multiline
                rows={6}
                sx={{
                    width: { sm: 350, md: 750 },
                  
                }}
            />
            </Box>
            
            <Box paddingTop={3}>
                <Box paddingTop={2} paddingBottom={2}>
                <Field
                component={TextField}
                type="text"
                name="afterhours[type]"
                label="After Hour Action"
                select
                variant="standard"
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                    }}
                    >
                    <MenuItem key="msg" value="msg">
                    Play Message
                    </MenuItem>
                    <MenuItem key="forward" value="forward">
                    Forward to Telephone Number
                    </MenuItem>
                    <MenuItem key="queue" value="queue">
                    Forward to Queue
                    </MenuItem>
                </Field>
                </Box>

                <Field 
                    component={TextField}
                    type="text"
                    label="After-Hours Message"
                    name="afterhours[msg]"
                    multiline
                    rows={6}
                    helperText="Plays before after hours action"
                    sx={{
                        width: { sm: 350, md: 750 },
                    
                    }}
                />
                <Field 
                    component={TextField}
                    type="text"
                    label="After-Hours Action"
                    {...values.afterhours.type == "forward" && { label:"Action:Transfer Number" }}
                    {...values.afterhours.type == "queue" && { label:"Action:Webex CC Queue ID" }}
                    {...values.afterhours.type == "msg" && { label:"Action: Play Message" }}
                    name="afterhours[value]"
                    {...values.afterhours.type == "msg" && { multiline: true, rows: 6} }
                    {...values.afterhours.type == "msg" &&  { sx:{ width: { sm: 350, md: 750 }} }}
                
                />
            </Box>
            
            <Box paddingTop={3}>
            <Typography>Menu 0</Typography>
            <Box paddingTop={2} paddingBottom={2}>
              
           
            <Field
              component={TextField}
              type="text"
              name="menu0[type]"
              label="Menu 0"
              select
              variant="standard"
            
              margin="normal"
              InputLabelProps={{
                  shrink: true,
                }}
                >
                 <MenuItem key="disable" value="">
                     Disabled
                </MenuItem>
                <MenuItem key="msg" value="msg">
                  Play Message
                </MenuItem>
                <MenuItem key="forward" value="forward">
                  Forward to Telephone Number
                </MenuItem>
                <MenuItem key="queue" value="queue">
                  Forward to Queue
                </MenuItem>
            </Field>
            </Box>

            {values.menu0.type != "" && <>
            
            <Field 
                component={TextField}
                type="text"
                label="Menu 0 Message"
                name="menu0[msg]"
                multiline
                rows={6}
                helperText="Plays before menu 0 action"
                sx={{
                    width: { sm: 350, md: 750 },
                    
                }}
                />
            <Field 
                component={TextField}
                type="text"
                label="Menu 0 Action"
                {...values.menu0.type == "forward" && { label:"Action:Transfer Number" }}
                {...values.menu0.type == "queue" && { label:"Action: Webex CC Queue ID" }}
                {...values.menu0.type == "msg" && { label:"Action: Play Message" }}
                name="menu0[value]"
                {...values.menu0.type == "msg" && { multiline: true, rows: 6} }
                {...values.menu0.type == "msg" &&  { sx:{ width: { sm: 350, md: 750 }} }}
                
                />
            </>
            }
            </Box>
            

            <Box paddingTop={3}>
            <Typography>Menu 1</Typography>
            <Box paddingTop={2} paddingBottom={2}>
            <Field
              component={TextField}
              type="text"
              name="menu1[type]"
              label="Menu 1"
              select
              variant="standard"
            
              margin="normal"
              InputLabelProps={{
                  shrink: true,
                }}
                >
                <MenuItem key="disable" value="">
                     Disabled
                </MenuItem>
                <MenuItem key="msg" value="msg">
                  Play Message
                </MenuItem>
                <MenuItem key="forward" value="forward">
                  Forward to Telephone Number
                </MenuItem>
                <MenuItem key="queue" value="queue">
                  Forward to Queue
                </MenuItem>
            </Field>
            </Box>
            
            {values.menu1.type != "" && <>
            <Field 
                component={TextField}
                type="text"
                label="Menu 1 Message"
                name="menu1[msg]"
                multiline
                rows={6}
                helperText="Plays before menu 1 action"
                sx={{
                    width: { sm: 350, md: 750 },
                  
                }}
            />
            <Field 
                component={TextField}
                type="text"
                label="Menu 1 Action"
                {...values.menu1.type == "forward" && { label:"Action:Transfer Number" }}
                {...values.menu1.type == "queue" && { label:"Action: Webex CC Queue ID" }}
                {...values.menu1.type == "msg" && { label:"Action: Play Message" }}
                name="menu1[value]"
                {...values.menu1.type == "msg" && { multiline: true, rows: 6} }
                {...values.menu1.type == "msg" &&  { sx:{ width: { sm: 350, md: 750 }} }}
            
            />
            </>}
            </Box>

            <Box paddingTop={3}>
                <Typography> Menu 2</Typography>
            <Box paddingTop={2} paddingBottom={2}>
            <Field
              component={TextField}
              type="text"
              name="menu2[type]"
              label="Menu 2"
              select
              variant="standard"
            
              margin="normal"
              InputLabelProps={{
                  shrink: true,
                }}
                >
                <MenuItem key="disable" value="">
                     Disabled
                </MenuItem>
                <MenuItem key="msg" value="msg">
                  Play Message
                </MenuItem>
                <MenuItem key="forward" value="forward">
                  Forward to Telephone Number
                </MenuItem>
                <MenuItem key="queue" value="queue">
                  Forward to Queue
                </MenuItem>
            </Field>
            </Box>

            {values.menu2.type != "" && <>
            <Field 
                component={TextField}
                type="text"
                label="Menu 2 Message"
                name="menu2[msg]"
                multiline
                rows={6}
                helperText="Plays before menu 2 action"
                sx={{
                    width: { sm: 350, md: 750 },
                  
                }}
            />
            <Field 
                component={TextField}
                type="text"
                label="Menu 2 Action"
                {...values.menu2.type == "forward" && { label:"Action:Transfer Number" }}
                {...values.menu2.type == "queue" && { label:"Action: Webex CC Queue ID" }}
                {...values.menu2.type == "msg" && { label:"Action: Play Message" }}
                name="menu2[value]"
                {...values.menu2.type == "msg" && { multiline: true, rows: 6} }
                {...values.menu2.type == "msg" &&  { sx:{ width: { sm: 350, md: 750 }} }}
            
            />
            </>}
            </Box>

            <Box paddingTop={3}>
            <Typography> Menu 3</Typography>
            <Box paddingTop={2} paddingBottom={2}>
            <Field
              component={TextField}
              type="text"
              name="menu3[type]"
              label="Menu 3"
              select
              variant="standard"
            
              margin="normal"
              InputLabelProps={{
                  shrink: true,
                }}
                >
                <MenuItem key="disable" value="">
                     Disabled
                </MenuItem>
                <MenuItem key="msg" value="msg">
                  Play Message
                </MenuItem>
                <MenuItem key="forward" value="forward">
                  Forward to Telephone Number
                </MenuItem>
                <MenuItem key="queue" value="queue">
                  Forward to Queue
                </MenuItem>
            </Field>
            </Box>
            
            {values.menu3.type != "" && <>
            <Field 
                component={TextField}
                type="text"
                label="Menu 3 Message"
                name="menu3[msg]"
                multiline
                rows={6}
                helperText="Plays before menu 3 action"
                sx={{
                    width: { sm: 350, md: 750 },
                  
                }}
            />
            <Field 
                component={TextField}
                type="text"
                label="Menu 3 Action"
                {...values.menu3.type == "forward" && { label:"Action:Transfer Number" }}
                {...values.menu3.type == "queue" && { label:"Action: Webex CC Queue ID" }}
                {...values.menu3.type == "msg" && { label:"Action: Play Message" }}
                name="menu3[value]"
                {...values.menu3.type == "msg" && { multiline: true, rows: 6} }
                {...values.menu3.type == "msg" &&  { sx:{ width: { sm: 350, md: 750 }} }}
            
            />
            </>}
            </Box>

    
            <Box paddingTop={3}>
                <Typography>Menu 4</Typography>
            <Box paddingTop={2} paddingBottom={2}>
            <Field
              component={TextField}
              type="text"
              name="menu4[type]"
              label="Menu 4"
              select
              variant="standard"
            
              margin="normal"
              InputLabelProps={{
                  shrink: true,
                }}
                >
                <MenuItem key="disable" value="">
                     Disabled
                </MenuItem>
                <MenuItem key="msg" value="msg">
                  Play Message
                </MenuItem>
                <MenuItem key="forward" value="forward">
                  Forward to Telephone Number
                </MenuItem>
                <MenuItem key="queue" value="queue">
                  Forward to Queue
                </MenuItem>
            </Field>
            </Box>
            {values.menu4.type != "" && <>
            <Field 
                component={TextField}
                type="text"
                label="Menu 4 Message"
                name="menu4[msg]"
                multiline
                rows={6}
                helperText="Plays before menu 4 action"
                sx={{
                    width: { sm: 350, md: 750 },
                }}
            />
            <Field 
                component={TextField}
                type="text"
                label="Menu 4 Action"
                {...values.menu4.type == "forward" && { label:"Action:Transfer Number" }}
                {...values.menu4.type == "queue" && { label:"Action: Webex CC Queue ID" }}
                {...values.menu4.type == "msg" && { label:"Action: Play Message" }}
                name="menu4[value]"
                {...values.menu4.type == "msg" && { multiline: true, rows: 6} }
                {...values.menu4.type == "msg" &&  { sx:{ width: { sm: 350, md: 750 }} }}
            
            />
            </>}
            </Box>

            <Box paddingTop={3}>
                <Typography> Menu 5</Typography>
            <Box paddingTop={2} paddingBottom={2}>
            <Field
              component={TextField}
              type="text"
              name="menu5[type]"
              label="Menu 5"
              select
              variant="standard"
            
              margin="normal"
              InputLabelProps={{
                  shrink: true,
                }}
                >
                <MenuItem key="disable" value="">
                     Disabled
                </MenuItem>
                <MenuItem key="msg" value="msg">
                  Play Message
                </MenuItem>
                <MenuItem key="forward" value="forward">
                  Forward to Telephone Number
                </MenuItem>
                <MenuItem key="queue" value="queue">
                  Forward to Queue
                </MenuItem>
            </Field>
            </Box>

            {values.menu5.type != "" && <>
            <Field 
                component={TextField}
                type="text"
                label="Menu 5 Message"
                name="menu5[msg]"
                multiline
                rows={6}
                helperText="Plays before menu 5 action"
                sx={{
                    width: { sm: 350, md: 750 },
                }}
            />
            <Field 
                component={TextField}
                type="text"
                label="Menu 5 Action"
                {...values.menu5.type == "forward" && { label:"Action:Transfer Number" }}
                {...values.menu5.type == "queue" && { label:"Action: Webex CC Queue ID" }}
                {...values.menu5.type == "msg" && { label:"Action: Play Message" }}
                name="menu5[value]"
                {...values.menu5.type == "msg" && { multiline: true, rows: 6} }
                {...values.menu5.type == "msg" &&  { sx:{ width: { sm: 350, md: 750 }} }}
            
            />
            </>}
            </Box>

            <Box paddingTop={3}>
                <Typography> Menu 6</Typography>
            <Box paddingTop={2} paddingBottom={2}>
            <Field
              component={TextField}
              type="text"
              name="menu6[type]"
              label="Menu 6"
              select
              variant="standard"
            
              margin="normal"
              InputLabelProps={{
                  shrink: true,
                }}
                >
                <MenuItem key="disable" value="">
                     Disabled
                </MenuItem>
                <MenuItem key="msg" value="msg">
                  Play Message
                </MenuItem>
                <MenuItem key="forward" value="forward">
                  Forward to Telephone Number
                </MenuItem>
                <MenuItem key="queue" value="queue">
                  Forward to Queue
                </MenuItem>
            </Field>
            </Box>
            {values.menu6.type != "" && <>
            <Field 
                component={TextField}
                type="text"
                label="Menu 6 Message"
                name="menu6[msg]"
                multiline
                rows={6}
                helperText="Plays before menu 6 action"
                sx={{
                    width: { sm: 350, md: 750 },
                }}
            />
            <Field 
                component={TextField}
                type="text"
                label="Menu 6 Action"
                {...values.menu6.type == "forward" && { label:"Action:Transfer Number" }}
                {...values.menu6.type == "queue" && { label:"Action: Webex CC Queue ID" }}
                {...values.menu6.type == "msg" && { label:"Action: Play Message" }}
                name="menu6[value]"
                {...values.menu6.type == "msg" && { multiline: true, rows: 6} }
                {...values.menu6.type == "msg" &&  { sx:{ width: { sm: 350, md: 750 }} }}
            
            />
            </>}

            </Box>

            <Box paddingTop={3}>
            <Typography>Menu 7</Typography>
            <Box paddingTop={2} paddingBottom={2}>
            <Field
              component={TextField}
              type="text"
              name="menu7[type]"
              label="Menu 7"
              select
              variant="standard"
            
              margin="normal"
              InputLabelProps={{
                  shrink: true,
                }}
                >
                 <MenuItem key="disable" value="">
                     Disabled
                </MenuItem>
                <MenuItem key="msg" value="msg">
                  Play Message
                </MenuItem>
                <MenuItem key="forward" value="forward">
                  Forward to Telephone Number
                </MenuItem>
                <MenuItem key="queue" value="queue">
                  Forward to Queue
                </MenuItem>
            </Field>
            </Box>

            {values.menu7.type != "" && <>
            <Field 
                component={TextField}
                type="text"
                label="Menu 7 Message"
                name="menu7[msg]"
                multiline
                rows={6}
                helperText="Plays before menu 7 action"
                sx={{
                    width: { sm: 350, md: 750 },
                }}
            />
            <Field 
                component={TextField}
                type="text"
                label="Menu 7 Action"
                {...values.menu7.type == "forward" && { label:"Action:Transfer Number" }}
                {...values.menu7.type == "queue" && { label:"Action: Webex CC Queue ID" }}
                {...values.menu7.type == "msg" && { label:"Action: Play Message" }}
                name="menu7[value]"
                {...values.menu7.type == "msg" && { multiline: true, rows: 6} }
                {...values.menu7.type == "msg" &&  { sx:{ width: { sm: 350, md: 750 }} }}
            
            />
            </>}
            </Box>


            <Box paddingTop={3}>
                <Typography> Menu 8</Typography>
            <Box paddingTop={2} paddingBottom={2}>
            <Field
              component={TextField}
              type="text"
              name="menu8[type]"
              label="Menu 8"
              select
              variant="standard"
            
              margin="normal"
              InputLabelProps={{
                  shrink: true,
                }}
                >
                <MenuItem key="disable" value="">
                     Disabled
                </MenuItem>
                <MenuItem key="msg" value="msg">
                  Play Message
                </MenuItem>
                <MenuItem key="forward" value="forward">
                  Forward to Telephone Number
                </MenuItem>
                <MenuItem key="queue" value="queue">
                  Forward to Queue
                </MenuItem>
            </Field>
            </Box>

            {values.menu8.type != "" && <>
            <Field 
                component={TextField}
                type="text"
                label="Menu 8 Message"
                name="menu8[msg]"
                multiline
                rows={6}
                helperText="Plays before menu 8 action"
                sx={{
                    width: { sm: 350, md: 750 },
                }}
            />
            <Field 
                component={TextField}
                type="text"
                label="Menu 8 Action"
                {...values.menu8.type == "forward" && { label:"Action:Transfer Number" }}
                {...values.menu8.type == "queue" && { label:"Action: Webex CC Queue ID" }}
                {...values.menu8.type == "msg" && { label:"Action: Play Message" }}
                name="menu8[value]"
                {...values.menu8.type == "msg" && { multiline: true, rows: 6} }
                {...values.menu8.type == "msg" &&  { sx:{ width: { sm: 350, md: 750 }} }}
            
            />
            </>}

            </Box>
            
            <Box paddingTop={3}>
                <Typography>Menu 9</Typography>
            <Box paddingTop={2} paddingBottom={2}>
            <Field
              component={TextField}
              type="text"
              name="menu9[type]"
              label="Menu 9"
              select
              variant="standard"
            
              margin="normal"
              InputLabelProps={{
                  shrink: true,
                }}
                >
                <MenuItem key="disable" value="">
                     Disabled
                </MenuItem>
                <MenuItem key="msg" value="msg">
                  Play Message
                </MenuItem>
                <MenuItem key="forward" value="forward">
                  Forward to Telephone Number
                </MenuItem>
                <MenuItem key="queue" value="queue">
                  Forward to Queue
                </MenuItem>
            </Field>
            </Box>
            
            {values.menu9.type != "" && <>
            <Field 
                component={TextField}
                type="text"
                label="Menu 9 Message"
                name="menu9[msg]"
                multiline
                rows={6}
                helperText="Plays before menu 9 action"
                sx={{
                    width: { sm: 350, md: 750 },
                }}
            />
            <Field 
                component={TextField}
                type="text"
                label="Menu 9 Action"
                {...values.menu9.type == "forward" && { label:"Action:Transfer Number" }}
                {...values.menu9.type == "queue" && { label:"Action: Webex CC Queue ID" }}
                {...values.menu9.type == "msg" && { label:"Action: Play Message" }}
                name="menu9[value]"
                {...values.menu9.type == "msg" && { multiline: true, rows: 6} }
                {...values.menu9.type == "msg" &&  { sx:{ width: { sm: 350, md: 750 }} }}
            
            />
            </>}

            </Box>

    </Box>
    
    <Button 
        variant="contained"
        color="primary"
        disabled={isSubmitting}
        onClick={submitForm}
     >Create
     </Button>
    </Form> 
    </LocalizationProvider >
    )}
    
    </Formik>
    
  )
}
export default CreateContactCenterForm