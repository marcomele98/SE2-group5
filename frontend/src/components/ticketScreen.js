import { useState, useEffect } from "react"
import API from "../API";
import { Button, } from "react-bootstrap";


function TicketScreen() {
  const [number, setNumber] = useState(undefined) //if set show number is true show number insthead of the buttons with services 
  const [services, setServices] = useState([])

  const initServices = async () => {
    let servs = await API.getServices();
    setServices(servs)
  }

  const newTicket = async (Service_Code) => {
    let num = undefined;
    console.log(Service_Code)
    try{
      num = await API.newTicket(Service_Code);
    }catch{
      num = "Errore del server";
    }
    setNumber(num)
  }

  useEffect(() => {
    initServices()
  }, []) //load services fetching /api/services


  useEffect(() => {
    if (number) {
      setTimeout(() => setNumber(undefined), 5000)
    }
  }, [number]) // after 5 seconds of number showing i show again buttons
  return (
    (number)
      ?
      <div className={"fs-3 mt-3 mx-3"}>
        {"Your ticket code is: "+number}
      </div>
      :
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className={"fs-3 mt-3 mx-3"}>Select your service.</div>
        {services.map(s => 
        <Button style={{width:"fit-content"}} className={"mt-3 mx-3"} onClick={()=>{newTicket(s.code)}}>
          {s.name}
        </Button>)}
      </div>
  );
}

export default TicketScreen;
