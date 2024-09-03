import { Button, Card } from "react-bootstrap"

export const Task = () => {
  return (
    <Card>
      <Card.Body>
        This is some text within a card body.
        <Button variant="primary">Complete</Button>
        <Button variant="danger">Delete</Button>
        <Button variant="warning">Edit</Button>
        
      </Card.Body>
    </Card>
  )
}
