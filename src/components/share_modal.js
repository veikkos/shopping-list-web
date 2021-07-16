import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const ShareModal = ({ name, show, close }) => (
  <Modal show={show}>
    <Modal.Header>
      <Modal.Title>Share link copied!</Modal.Title>
    </Modal.Header>
    <Modal.Body>{`Share link for list "${name}" copied to clipboard`}</Modal.Body>
    <Modal.Footer>
      <Button variant="dark" onClick={close}>
          Close
      </Button>
    </Modal.Footer>
  </Modal>
)

export default ShareModal