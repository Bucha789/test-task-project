
import { Button, Modal } from 'react-bootstrap'

type Props = {
  show: boolean
  handleClose: () => void
}

export const AlertModal = ({
  show,
  handleClose,
}: Props) => {
  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Oops</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      You're in the middle of a task. Please complete it before starting a new one.
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={handleClose}>
        Ok
      </Button>
    </Modal.Footer>
  </Modal>

  )
}
