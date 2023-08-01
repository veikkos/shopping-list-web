import React from 'react'
import { strings } from '../localization/localization'

export const createRows = (lists, sharedLists, selectedListId, selectList, removed) => {
  const allCollected = list => list.products && list.products.every(product => product.collected)

  const renderList = (l, shared) => l.map(list => (
    <tr className="FullWidth FlexCenter" key={list.name}>
      <td className={`ListTitle FlexGrow FlexCenter Clickable ${selectedListId === list.id ? 'SelectedListTitle' : ''}`}>
        <span
          onClick={() => selectList(list)}>{list.name}
        </span>
        <i className="bi bi-people-fill"
          hidden={shared ? '' : true}
          style={{ fontSize: '16px', marginLeft: '10px' }}>
        </i>
      </td>
      <td>
        <i className="bi bi-check"
          hidden={allCollected(list) ? '' : true}
          style={{ color: 'lightgreen' }}>
        </i>
      </td>
      <td className="PaddingHorizontal">
        <button className="btn-sm btn-danger Right"
          onClick={() => removed(list, shared)}>{strings.remove}
        </button>
      </td>
    </tr>
  ))

  return (
    <table className="FullWidth">
      <tbody className="FullWidth">
        {renderList(lists)}
        {renderList(sharedLists, true)}
      </tbody>
    </table>
  )
}