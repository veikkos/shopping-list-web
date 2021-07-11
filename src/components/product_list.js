import { Fragment } from "react";

export const createProducts = (list, productNames, checkChanged, removed) => {
  const notCollected = list.products.filter(product => !product.collected);
  const collected = list.products.filter(product => product.collected);

  const renderList = l => {
    return (
      <div className="MarginHorizontal">
        <table style={{ width: "100%" }}>
          <tbody className="MarginHorizontal">
            {l.map(product => {
              return (
                <tr className={product.collected ? "Collected" : ""} key={product.id}>
                  <td className="TextAlignLeft">{product.id ? productNames[product.id] : ''}</td>
                  <td className="ProductLine TextAlignCenter">{product.amount} pcs</td>
                  <td className="TextAlignCenter">
                    <label>Collected:
                      <input className="form-check-input"
                        type="checkbox"
                        style={{ marginLeft: "10px" }}
                        checked={product.collected ? true : false}
                        onChange={event => checkChanged(event, list, product)}>
                      </input>
                    </label>
                  </td>
                  <td className="TextAlignRight">
                    <button className="btn-sm btn-danger" onClick={() => removed(list, [product])}>Remove</button>
                  </td>
                </tr >
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  const clearCollectedButton = () => (
    <div className="ViewFull">
      <button className="btn-sm btn-secondary MarginVertical"
        onClick={() => removed(list, collected)}>Clear collected
      </button>
    </div>
  )

  return (
    <Fragment>
      {renderList(notCollected)}
      {collected.length ? clearCollectedButton() : null}
      {renderList(collected)}
    </Fragment>

  );
}
