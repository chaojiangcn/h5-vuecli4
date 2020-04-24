import apis from '@apis/index'

// initial state
const state = {
  userInfo: {
    name: '我是初始名字',
    token: '',
    age: 22
  },
  items: [],
  checkoutStatus: 'null'
}

// getters
const getters = {
  getUserInfo: (state) => state.userInfo,
  cartProducts: (state, getters, rootState) => {
    return state.items.map(({ id, quantity }) => {
      const product = rootState.products.all.find((product) => product.id === id)
      return {
        title: product.title,
        price: product.price,
        quantity
      }
    })
  }
}

// actions
const actions = {
  updateUserInfo({ commit, state }, userInfo) {
    console.log(userInfo)
    commit('updateUser', userInfo)
  },
  updateUserToken({ commit, state }, token) {
    commit('updateUserToken', token)
  },
  checkout({ commit, state }, products) {
    const savedCartItems = [...state.items]
    commit('setCheckoutStatus', null)
    // empty cart
    commit('setCartItems', { items: [] })
    apis.buyProducts(
      products,
      () => commit('setCheckoutStatus', 'successful'),
      () => {
        commit('setCheckoutStatus', 'failed')
        // rollback to the cart saved before sending the request
        commit('setCartItems', { items: savedCartItems })
      }
    )
  },

  addProductToCart({ state, commit }, product) {
    commit('setCheckoutStatus', null)
    if (product.inventory > 0) {
      const cartItem = state.items.find(item => item.id === product.id)
      if (!cartItem) {
        commit('pushProductToCart', { id: product.id })
      } else {
        commit('incrementItemQuantity', cartItem)
      }
      // remove 1 item from stock
      commit('products/decrementProductInventory', { id: product.id }, { root: true })
    }
  }
}

// mutations
const mutations = {
  updateUser(state, userInfo) {
    state.userInfo = userInfo
  },
  updateUserToken(state, token) {
    state.userInfo.token = token
  },
  pushProductToCart(state, { id }) {
    state.items.push({
      id,
      quantity: 1
    })
  },

  incrementItemQuantity(state, { id }) {
    const cartItem = state.items.find(item => item.id === id)
    cartItem.quantity++
  },

  setCartItems(state, { items }) {
    state.items = items
  },

  setCheckoutStatus(state, status) {
    state.checkoutStatus = status
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
