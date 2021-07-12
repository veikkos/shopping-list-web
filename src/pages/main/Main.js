import '../App.css'
import React, { useState, useEffect, Fragment } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import { isMobile } from 'react-device-detect'
import { createRows } from '../../components/shopping_lists'
import { createInput } from '../../components/product_input'
import { createProducts } from '../../components/product_list'
import { createListInput } from '../../components/list_input'
import Header from '../../components/header'
import LogoutButton from '../../components/logout_button'
import ShareModal from '../../components/share_modal'

const url = process.env.REACT_APP_BACKEND_URL

const headers = token => ({
  Authorization: `Bearer ${token}`
})

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

function Main() {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const [lists, setLists] = useState([])
  const [shared, setShared] = useState([])
  const [list, setList] = useState({})
  const [productNames, setProductNames] = useState({})
  const history = useHistory()
  const [token, setToken] = useState(null)
  const query = useQuery()
  const [showShareModal, setShowShareModal] = useState(false)
  const [shareAdded, setShareAdded] = useState(false)

  const addUpdateSharedList = listId => {
    return getList(listId)
      .then(res => res.data)
      .catch(() => { })
  }

  const refreshSharedLists = () => {
    return axios.get(`${url}/shared`, {
      headers: headers(token)
    }).then(res => {
      if (res.status === 200) {
        if (res.data.lists && res.data.lists.length) {
          const promises = res.data.lists.map(listId => addUpdateSharedList(listId))

          return Promise.all(promises)
            .then(res => setShared(res.filter(id => id)))
        } else {
          setShared([])
        }
      }
    })
  }

  const postSharedLists = newLists => {
    return axios.post(`${url}/shared`, {
      lists: newLists
    }, {
      headers: headers(token)
    })
  }

  const removeSharedList = id => {
    return postSharedLists(shared.filter(s => s.id !== id).map(s => s.id))
  }

  const refreshLists = () => {
    return axios.get(`${url}/lists`, {
      headers: headers(token)
    }).then(res => {
      setLists(res.data)
    })
  }

  const getProducts = () => {
    return axios.get(`${url}/products`, {
      headers: headers(token)
    })
  }

  const refreshSuggestions = () => {
    return getProducts()
      .then(res => {
        setProductNames({
          ...productNames,
          ...res.data.reduce((acc, item) => {
            acc[item.id] = item.name
            return acc
          }, {})
        })
      })
  }

  useEffect(() => {
    if (user) {
      getAccessTokenSilently()
        .then(t => {
          setToken(t)
        })
    }
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (token) {
      refreshLists()
      refreshSuggestions()
      refreshSharedLists()
    }
  }, [token]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (token && shared) {
      const newSharedList = query.get('share')
      if (!shareAdded &&
        newSharedList &&
        !lists.find(s => s.id === newSharedList) &&
        !shared.find(s => s.id === newSharedList)) {
        setShareAdded(true)
        postSharedLists(shared.map(s => s.id).concat(newSharedList))
          .then(refreshSharedLists())
      }
    }
  }, [token, shared]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      history.push('/')
    }
  }, [isLoading, isAuthenticated]) // eslint-disable-line react-hooks/exhaustive-deps

  const getProductNames = (list) => {
    list.products.forEach(product => {
      axios.get(`${url}/products?id=${product.id}`, {
        headers: headers(token)
      }).then(res => {
        productNames[product.id] = res.data.name
        setProductNames({ ...productNames })
      })
    })
  }

  const getList = (id) => {
    return axios.get(`${url}/lists?id=${id}`, {
      headers: headers(token)
    })
  }

  const updateList = (list) => {
    return axios.put(`${url}/lists?id=${list.id}`, list, {
      headers: headers(token)
    })
  }

  const clearCurrentListIfNeeded = id => {
    if (list.id === id) {
      setList({})
    }
  }

  const deleteList = (l) => {
    return axios.delete(`${url}/lists?id=${l.id}`, {
      headers: headers(token)
    }).then(clearCurrentListIfNeeded(l.id))
  }

  const updateAndRefreshList = (list) => {
    return updateList(list)
      .then(() => getList(list.id))
      .then(res => {
        setList(res.data)
        setLists(lists.map(l => l.id === list.id ? res.data : l))
        refreshSharedLists()
      })
  }

  const addProductToList = (id, amount, list) => {
    list.products.push({ id, amount, collected: false })
    return updateAndRefreshList({
      ...list,
    })
  }

  const addProduct = (event, list) => {
    event.preventDefault()
    const name = event.target[0].value
    const amount = event.target[2].value

    getProducts()
      .then(res => {
        const previous = res.data.find(product => product.name === name)

        if (previous) {
          addProductToList(previous.id, amount, list)
        } else {
          axios.post(`${url}/products`, {
            name,
          }, {
            headers: headers(token)
          }).then(res => {
            const id = res.data
            productNames[id] = name
            setProductNames({ ...productNames })
            addProductToList(id, amount, list)
          })
        }
      })
  }

  const checkChanged = (event, list, product) => {
    const updateProduct = product
    updateProduct.collected = event.target.checked
    updateAndRefreshList({
      ...list,
      products: list.products.map(p => p.id !== product.id ? p : updateProduct),
    })
  }

  const productRemoved = (list, products) => {
    const idsToRemove = products.map(product => product.id)
    updateAndRefreshList({
      ...list,
      products: list.products.filter(p => !idsToRemove.includes(p.id)),
    })
  }

  const createNewList = event => {
    event.preventDefault()

    axios.post(`${url}/lists`, {
      name: event.target[0].value,
      products: []
    }, {
      headers: headers(token)
    }).then(() => {
      refreshLists()
    })
  }

  const getShareUrl = () => `${window.location.origin}/app?share=${list.id}`

  const shareList = () => {
    const shareUrl = getShareUrl()
    navigator.clipboard.writeText(shareUrl)
    setShowShareModal(true)
  }

  const renderLists = () => {
    return (
      <div className={`List ${isMobile ? '' : 'ListFull'}`}>
        {createListInput(event => createNewList(event))}
        <hr className="Separator"></hr>

        {createRows(lists, shared, list.id, (list) => {
          setList(list)
          getProductNames(list)
        }, (list, shared) => {
          if (shared) {
            removeSharedList(list.id)
              .then(clearCurrentListIfNeeded(list.id))
              .then(refreshSharedLists)
          } else {
            deleteList(list)
              .then(refreshLists)
          }
        })}
      </div>
    )
  }

  const getSuggestions = () => {
    return Object.keys(productNames).map(key => productNames[key])
      .filter((elem, index, self) => {
        return index === self.indexOf(elem)
      })
      .sort()
  }

  const renderContent = () => {
    return (
      <div className={`Content ${isMobile ? 'FlexGrow' : 'ContentFull'}`}>
        {createInput(list.id,
          getSuggestions(),
          (event) => addProduct(event, list))
        }
        <hr className="Separator"></hr>
        {list.products ?
          createProducts(list, productNames, checkChanged, productRemoved) :
          null}
      </div>
    )
  }

  const headerActions = () => {
    return (
      <div className="Flex">
        {list.id ? <i className="bi bi-share-fill InputItem Flex Title"
          onClick={() => shareList()}
          style={{ marginRight: '20px' }}></i> : null}
        <LogoutButton />
      </div>
    )
  }

  return (
    <div className="App">
      <ShareModal name={list.name}
        show={showShareModal}
        close={() => { setShowShareModal(false) }}
      />
      <Header actions={headerActions} />
      <div className={`View ${isMobile ? '' : 'ViewFull'}`}
        style={isMobile ? { display: 'flex', flexDirection: 'column' } : {}}>
        {!isLoading ?
          <Fragment>
            {renderLists()}
            {renderContent()}
          </Fragment> :
          null}
      </div>
    </div>
  )
}

export default Main
