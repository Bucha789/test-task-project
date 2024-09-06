
import { Button, Modal } from 'react-bootstrap'

type Props = {
  show: boolean
  handleClose: () => void
  title: string
  text: string
}

// This component is used to show an alert modal
// it receives the show, handleClose, title and text props
// title is the title of the modal and text is the text to be shown
// the handleClose function is used to close the modal when the user clicks the button
// the show prop is used to show the modal
// We could move the button text to a prop to make it more flexible
export const AlertModal = ({
  show,
  handleClose,
  text,
  title
}: Props) => {
  return (
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {text}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>

  )
}
