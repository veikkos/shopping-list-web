import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { strings } from '../localization/localization'

const ShareModal = ({ name, show, close }) => (
  <Modal show={show}>
    <Modal.Header>
      <Modal.Title>{strings.share_title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{strings.formatString(strings.share_body, name ? name : '')}</Modal.Body>
    <Modal.Footer>
      <Button variant="dark" onClick={close}>
        {strings.close}
      </Button>
    </Modal.Footer>
  </Modal>
)

export default ShareModal