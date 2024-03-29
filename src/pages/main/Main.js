import '../App.css'
import React, { useState, useEffect, Fragment } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { isMobile } from 'react-device-detect'
import { createRows } from '../../components/shopping_lists'
import { ProductInput } from '../../components/product_input'
import { createProducts } from '../../components/product_list'
import { createListInput } from '../../components/list_input'
import Header from '../../components/header'
import Footer from '../../components/footer'
import LogoutButton from '../../components/logout_button'
import ShareModal from '../../components/share_modal'
import RemoveModal from '../../components/remove_modal'
import Progress from '../../components/progress'
import { Lists, List, Products, Product, Shared } from '../../util/requests'
import { arrayToObjectByKey, objectToUniqueSortedArray } from '../../util/transformers'
import { shareUrl } from '../../util/share'
import { useQuery } from '../../util/parameters'

function Main() {
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const [lists, setLists] = useState(null)
  const [shared, setShared] = useState(null)
  const [list, setList] = useState({})
  const [productNames, setProductNames] = useState({})
  const [token, setToken] = useState(null)
  const query = useQuery()
  const [showShareModal, setShowShareModal] = useState(false)
  const [confirmListRemove, setConfirmListRemove] = useState(null)
  const [shareAdded, setShareAdded] = useState(false)
  const refreshSharedLists = () => Shared.GET(token).then(res => {
    switch (res.status) {
    case 200:
      if (res.data.lists && res.data.lists.length) {
        const promises =
            res.data.lists.map(listId => List.GET(token, listId)
              .then(res => res.data)
              .catch(() => { }))

        return Promise.all(promises)
          .then(res => setShared(res.filter(s => s)))
      } else {
        setShared([])
      }
      break
    case 204:
      setShared([])
      break
    default:
      break
    }
  })

  const removeSharedList = id =>
    Shared.POST(token, shared.filter(s => s.id !== id).map(s => s.id))

  const refreshLists = () => Lists.GET(token)
    .then(res => {
      setLists(res.data)
      return res.data
    })

  const refreshSuggestions = () => Products.GET(token)
    .then(res => {
      setProductNames({
        ...productNames,
        ...arrayToObjectByKey(res.data, 'name')
      })
    })

  useEffect(() => {
    if (isAuthenticated && getAccessTokenSilently) {
      getAccessTokenSilently()
        .then(t => {
          setToken(t)
        })
    }
  }, [isAuthenticated, getAccessTokenSilently])

  useEffect(() => {
    if (token) {
      refreshLists()
      refreshSuggestions()
      refreshSharedLists()
    }
  }, [token])

  useEffect(() => {
    if (token && shared && lists) {
      const newSharedList = query.get('share')
      if (!shareAdded &&
        newSharedList &&
        !lists.find(s => s.id === newSharedList) &&
        !shared.find(s => s.id === newSharedList)) {
        setShareAdded(true)
        Shared.POST(token, shared.map(s => s.id).concat(newSharedList))
          .then(refreshSharedLists)
      }
    }
  }, [token, shared, lists])

  const isInitialLoading = () =>
    !lists || !shared || isLoading || !token

  const getProductNames = list => {
    const promises = list.products
      .filter(product => !productNames[product.id])
      .map(product => Product.GET(token, product.id).then(res => ({
        id: res.data.id,
        name: res.data.name,
      })).catch(() => { }))

    return Promise.all(promises)
      .then(products => {
        products
          .filter(product => product)
          .forEach(product => productNames[product.id] = product.name)
        setProductNames({ ...productNames })
      })
  }

  const clearCurrentListIfNeeded = id => {
    if (list.id === id) {
      setList({})
    }
  }

  const setListAndGetNames = list => {
    setList(list)
    setLists(lists.map(l => l.id === list.id ? list : l))
    setShared(shared.map(l => l.id === list.id ? list : l))
    getProductNames(list)
  }

  const updateAndRefreshList = list => List.PUT(token, list)
    .then(() => List.GET(token, list.id))
    .then(res => setListAndGetNames(res.data))

  const addProductToList = (id, name, amount, list) => List.GET(token, list.id)
    .then(res => {
      if (!res.data.products.find(product => name === productNames[product.id])) {
        return updateAndRefreshList({
          ...res.data,
          products: res.data.products.concat({ id, amount, collected: false }),
        })
      } else {
        return setListAndGetNames(res.data)
      }
    })

  const addProduct = (event, list) => {
    event.preventDefault()
    const name = event.target[0].value
    const amount = event.target[2].value

    if (name) {
      event.target.reset()

      Products.GET(token)
        .then(res => {
          const previous = res.data.find(product => product.name === name)

          if (previous) {
            addProductToList(previous.id, name, amount, list)
          } else {
            Products.POST(token, name).then(res => {
              const id = res.data
              productNames[id] = name
              setProductNames({ ...productNames })
              addProductToList(id, name, amount, list)
            })
          }
        })
    }
  }

  const amountChanged = (event, list, product) =>
    productChanged(list, product, event.target.value, null)

  const checkChanged = (event, list, product) =>
    productChanged(list, product, null, event.target.checked)

  const productChanged = (list, product, amount, collected) => {
    const updateProduct = product
    if (collected !== null) {
      updateProduct.collected = collected
    }
    if (amount !== null) {
      updateProduct.amount = amount
    }
    return List.GET(token, list.id)
      .then(res => {
        const l = res.data
        updateAndRefreshList({
          ...l,
          products: l.products.map(p => p.id !== product.id ? p : updateProduct),
        })
      })
  }

  const productRemoved = (list, products) => {
    const idsToRemove = products.map(product => product.id)
    return List.GET(token, list.id)
      .then(res => {
        const l = res.data
        updateAndRefreshList({
          ...l,
          products: l.products.filter(p => !idsToRemove.includes(p.id)),
        })
      })
  }

  const createAndActivateNewList = event => {
    event.preventDefault()
    const name = event.target[0].value
    event.target.reset()

    if (name) {
      Lists.POST(token, name)
        .then(res => refreshLists().then(l => ({ lists: l, id: res.data })))
        .then(res => {
          const newList = res.lists.find(l => l.id === res.id)
          if (newList) {
            setList(newList)
          }
        })
    }
  }

  const shareList = () => {
    const url = shareUrl(list.id)
    navigator.clipboard.writeText(url)
    setShowShareModal(true)
  }

  const selectList = list =>
    List.GET(token, list.id)
      .then(res => setListAndGetNames(res.data))

  const removeList = (list, shared) => {
    setConfirmListRemove({
      list, shared
    })
  }

  const renderLists = () => (
    <div className={`List ${isMobile ? '' : 'ListFull'}`}>
      {createListInput(createAndActivateNewList)}
      <hr className="Separator" />
      {createRows(lists, shared, list.id, selectList, removeList)}
    </div>
  )

  const renderContent = () => (
    <div className={`Content ${isMobile ? 'FlexGrow' : 'ContentFull'}`}>
      <ProductInput
        enabled={list.id}
        productNames={objectToUniqueSortedArray(productNames)}
        callback={event => addProduct(event, list)}
      />
      <hr className="Separator"></hr>
      {list.products ?
        createProducts(list, productNames, amountChanged, checkChanged, productRemoved) :
        null}
    </div>
  )

  const headerActions = () => (
    <div className="FlexCenter">
      {list.id ? <i className="bi bi-share-fill InputItem FlexCenter White Clickable"
        onClick={() => shareList()}
        style={{ marginRight: '20px' }}></i> : null}
      <LogoutButton />
    </div>
  )

  return (
    <div className="App">
      <ShareModal name={list.name}
        show={showShareModal}
        close={() => { setShowShareModal(false) }}
      />
      <RemoveModal title={confirmListRemove?.list.name}
        show={!!confirmListRemove}
        close={() => { setConfirmListRemove(null) }}
        remove={() => {
          const list = confirmListRemove.list
          if (confirmListRemove.shared) {
            removeSharedList(list.id)
              .then(clearCurrentListIfNeeded(list.id))
              .then(refreshSharedLists)
          } else {
            List.DELETE(token, list.id)
              .then(clearCurrentListIfNeeded(list.id))
              .then(refreshLists)
          }
          setConfirmListRemove(null)
        }}
      />
      <Header actions={headerActions} />
      <div className={`View ${isMobile ? '' : 'ViewFull'}`}
        style={isMobile ? { display: 'flex', flexDirection: 'column' } : {}}>
        {!isInitialLoading() ?
          <Fragment>
            {renderLists()}
            {renderContent()}
          </Fragment> :
          <div className="Center">
            <Progress />
          </div>}
      </div>
      <Footer />
    </div >
  )
}

export default Main
