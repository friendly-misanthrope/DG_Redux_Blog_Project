import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { fetchUsers } from './features/users/usersSlice.js'
import './index.css'

store.dispatch(fetchUsers());

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <App />
    </Provider>
  
)
