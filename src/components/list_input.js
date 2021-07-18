import React from 'react'
import { strings } from '../localization/localization'

export const createListInput = callback => (
  <form className="InputForm" onSubmit={callback}>
    <input id="product"
      className="ShortInput FlexGrow input-group-text"
      style={{ marginRight: '10px', backgroundColor: 'white' }}
      type="text"
      placeholder={strings.list_create_hint}>
    </input>
    <input className="btn-sm btn-dark InputItem"
      type="submit"
      value={strings.create} />
  </form>
)
