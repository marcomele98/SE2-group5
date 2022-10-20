import { useState, useEffect } from "react"
// import {  }



function TicketScreen() {
  const [showNumber, setShowNumber] = useState(false) //if set show number is true show number insthead of the buttons with services 
  const [services, setServices] = useState([])
  useEffect(() => {  }, []) //load services fetching /api/services
  useEffect(() => {
    if (showNumber === true) {
      setTimeout(() => setShowNumber(false), 5000)
    }
  }, [showNumber]) // after 5 seconds of number showing i show again buttons
  return (
    <div></div>
  );
}

export default TicketScreen;
