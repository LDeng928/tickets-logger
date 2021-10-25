import React, { useEffect } from 'react';
// connect is used for the reducer
import { connect } from 'react-redux';
import LogItem from './LogItem';
import { PreLoader } from '../layout/PreLoader';
import PropTypes from 'prop-types'
import { getLogs } from '../../actions/logActions';


const Logs = ({ log: { logs, loading }, getLogs }) => {    
    useEffect(() => {
        getLogs();
        //eslint-disable-next-line
    }, [])

    if(loading || logs === null) {
        return <PreLoader />
    }

    return (
        <ul className='collection with-header'>  
            <li className='collection-header'>
                <h4 className="center">System Logs</h4>
            </li>
            {/* Map through the logs */}
            { !loading && logs.length === 0 ? (<p className='center'>No logs to show...</p>) : (
                logs.map(log => <LogItem key={log.id} log={log} />)
            )}
        </ul>
    )
}

Logs.propTypes = {
    log: PropTypes.object.isRequired,
    getLogs: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    log: state.log
  });

// connect takes in 2 parameters
export default connect(
    mapStateToProps,
    { getLogs }
  )(Logs);
