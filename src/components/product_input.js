import React, { useRef } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import { strings } from '../localization/localization'

export const ProductInput = ({ enabled, productNames, callback }) => {
  const typeaheadRef = useRef(null)

  return (
    <fieldset disabled={enabled ? '' : 'disabled'}>
      <form className="InputFormWrapped" onSubmit={event => {
        callback(event)
        typeaheadRef.current.clear()
      }} >
        <label className="Flex FlexGrow">{strings.product}:
          <Typeahead
            className="FlexGrow"
            style={{ display: 'inline-block', paddingLeft: '10px', marginRight: '10px' }}
            id="product"
            placeholder={strings.product_hint}
            options={productNames}
            ref={typeaheadRef}
          />
        </label>
        <label>
          {strings.amount}:
          <input id="amount"
            className="InputItem AmountInput input-group-text"
            type="number"
            defaultValue="1"
            min="1"
            max="100">
          </input>
        </label>
        <input className="InputItem btn-sm btn-dark"
          type="submit"
          value={strings.add}
        />
      </form>
    </fieldset>
  )
}
