import React from 'react'

export const createListInput = (callback) => {
  return (
    <form className="InputForm" onSubmit={callback}>
      <input id="product"
        className="ShortInput FlexGrow input-group-text"
        style={{ marginRight: '10px', backgroundColor: 'white' }}
        type="text"
        placeholder="e.g. Grocery list">
      </input>
      <input className="btn-sm btn-dark InputItem"
        type="submit"
        value="Create" />
    </form>
  )
}
