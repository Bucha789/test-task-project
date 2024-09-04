import { Button, Card } from "react-bootstrap"


type Props = {
  description: string
  duration: number
}

export const Task = ({ description, duration }: Props) => {
  return (
    <Card>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{duration}</Card.Text>
        <Button variant="primary">Complete</Button>
        <Button variant="danger">Delete</Button>
        <Button variant="warning">Edit</Button>
      </Card.Body>
    </Card>
  )
}
