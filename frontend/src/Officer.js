import { Row, Col, Container, Button } from "react-bootstrap";

function Officer() {

    return(
      <>
      <Container className={"mt-3"}>
      <h1>Welcome officer, you are now serving the client with ticket 01</h1>
      <Button>Next client</Button>
      </Container>
      </>
    )
  
}

export {Officer};