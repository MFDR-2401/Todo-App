import React from 'react'
import Todo from './components/Todo'

const App = () => {
  return (
    <section>
        <div className='container'>
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <Todo />
            </div>
          </div>
        </div>
    </section>
  )
}

export default App
