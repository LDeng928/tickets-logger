import React, { useRef } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { searchLogs, getLogs } from '../../actions/logActions'

const SearchBar = ({ searchLogs, getLogs }) => {
  // Use the 'useRef' hook to get the value from the form
  let text = useRef('');

  // Call the searchLogs() method and pass in the text.current.value
  const onChange = e => {
    searchLogs(text.current.value)
  }

  // Clear the search bar text and run the getLogs() method
  const onClick = e => {
    text.current.value = '';
    getLogs();
  }
 
  return (
      <nav style={{ marginBottom: '30px' }} className='blue'>
      <div className="nav-wrapper">
        <form>
          <div className="input-field">
            <input id="search" type="search" placeholder='Search logs...' ref={text} onChange={onChange} required />
            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
            <i className="material-icons" role='button' onClick={onClick}>close</i>
          </div>
        </form>
      </div>
    </nav>
  )
}

SearchBar.propTypes = {
  searchLogs: PropTypes.func.isRequired,
}

export default connect(null, {searchLogs, getLogs})(SearchBar)
