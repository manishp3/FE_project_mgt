import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

import App from './App'
import store from './store'
import { CSpinner } from '@coreui/react'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Suspense fallback={() => {
      return (
        <div className='text-center mt-5'>
          <CSpinner color="primary" />
        </div>
      )
    }}>
      <App />
    </Suspense>
  </Provider>,
)
