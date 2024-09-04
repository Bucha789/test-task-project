import { Button, Card } from "react-bootstrap"


type Props = {
  description: string
}

export const Task = ({ description }: Props) => {
  return (
    <Card>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary">Complete</Button>
        <Button variant="danger">Delete</Button>
        <Button variant="warning">Edit</Button>
      </Card.Body>
    </Card>
  )
}
