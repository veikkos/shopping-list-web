export const createListInput = (callback) => {
  return (
    <form className="InputForm" onSubmit={callback}>
      <input id="product"
        className="ShortInput FlexGrow input-group-text"
        style={{ marginRight: "10px" }}
        type="text"
        placeholder="e.g. Grocery list">
      </input>
      <input className="btn-sm btn-dark InputItem"
        type="submit"
        value="Create" />
    </form>
  )
}
