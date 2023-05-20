import { Route, Routes } from "react-router-dom";
import Dashboard from "../containers/Dashboard/Dashboard"
import Contactcenter from "../containers/Contactcenter/Contactcenter"
import Prompt from "../containers/Prompt/Prompt";
import Queue from "../containers/Queue/Queue";

function AppRoutes() {
  return (
   <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/contactcenter" element={<Contactcenter />} />
        <Route path="/queue" element={<Queue />} />
        <Route path="/prompt" element={<Prompt />} />
    </Routes>
  )
}
export default AppRoutes