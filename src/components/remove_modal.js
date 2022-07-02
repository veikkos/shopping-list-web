import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { strings } from '../localization/localization'

const RemoveModal = ({ title, show, close, remove }) => (
  <Modal show={show}>
    <Modal.Header>
      <Modal.Title>{strings.remove_title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{strings.formatString(strings.remove_body, title ? title : '')}</Modal.Body>
    <Modal.Footer>
      <Button variant="danger" onClick={remove}>
        {strings.remove}
      </Button>
      <Button variant="dark" onClick={close}>
        {strings.close}
      </Button>
    </Modal.Footer>
  </Modal>
)

export default RemoveModal
