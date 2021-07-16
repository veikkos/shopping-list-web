import React from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'

export const createInput = (enabled, productNames, callback) => (
  <fieldset disabled={enabled ? '' : 'disabled'}>
    <form className="InputFormWrapped" onSubmit={callback} >
      <label className="Flex FlexGrow">Product:
        <Typeahead
          className="FlexGrow"
          style={{ display: 'inline-block', paddingLeft: '10px', marginRight: '10px' }}
          id="product"
          placeholder="Milk, Butter..."
          options={productNames}
        />
      </label>
      <label>
          Amount:
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
        value="Add"
      />
    </form>
  </fieldset>
)
