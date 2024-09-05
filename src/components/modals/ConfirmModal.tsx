import { Button, Modal } from "react-bootstrap"

type Props = {
  show: boolean
  handleClose: () => void
  text: string
  title:  string
}

export const ConfirmDeleteModal = ({ show, handleClose, text, title }: Props) => {
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
