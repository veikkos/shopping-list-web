import React from 'react'
import { strings } from '../localization/localization'

export const createProducts = (list, productNames, amountChanged, checkChanged, removed) => {
  const notCollected = list.products.filter(product => !product.collected)
  const collected = list.products.filter(product => product.collected)

  const renderList = l => (
    l.map(product => (
      <tr className={product.collected ? 'Collected' : ''} key={product.id}>
        <td className="TextAlignLeft">{product.id ? productNames[product.id] : ''}</td>
        <td>
          <div className="input-group">
            <input id="product-amount"
              className="AmountInput input-group-text"
              type="number"
              value={product.amount}
              min="1"
              max="100"
              onChange={event => amountChanged(event, list, product)}>
            </input>
          </div>
        </td>
        <td className="TextAlignCenter">
          <label>{strings.collected}:
            <input className="form-check-input"
              type="checkbox"
              style={{ marginLeft: '5px' }}
              checked={product.collected ? true : false}
              onChange={event => checkChanged(event, list, product)}>
            </input>
          </label>
        </td>
        <td className="TextAlignRight">
          <button className="btn-sm btn-danger"
            onClick={() => removed(list, [product])}>{strings.remove}
          </button>
        </td>
      </tr >
    ))
  )

  const clearCollectedButton = () => (
    <tr>
      <td colSpan="4">
        <div className="TextAlignCenter">
          <button className="btn-sm btn-secondary MarginVertical"
            onClick={() => removed(list, collected)}>{strings.clear_collected}
          </button>
        </div>
      </td>
    </tr>
  )

  return (
    <div className="MarginHorizontal">
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 5px' }}>
        <tbody className="MarginHorizontal">
          {renderList(notCollected)}
          {collected.length ? clearCollectedButton() : null}
          {renderList(collected)}
        </tbody>
      </table>
    </div>
  )
}
