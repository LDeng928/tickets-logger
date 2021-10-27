import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import M from 'materialize-css/dist/js/materialize.min.js';

import { updateLog } from '../../actions/logActions';

const EditLogModal = ({ current, updateLog }) => {
    const [message, setMessage] = useState('');
    const [attention, setAttention] = useState(false);
    const [tech, setTech] = useState('');

    useEffect(() => {
        // check if there is a current log object
        if(current) {
            setMessage(current.message);
            setAttention(current.attention);
            setTech(current.tech);
        }
    },[current]) // pass in current as the dependency

    const onSubmit =() => {
        if(message === '' || tech === "") {
            M.toast({
                html: 'Please enter a message and tech'
            })
        } else {
            // update log - new object
            const newLog = {
                id: current.id,
                message,
                attention,
                tech,
                date: new Date()
            }

            updateLog(newLog); // pass in the updated log object into the updateLog function
            M.toast({ html: `Log updated by ${tech}`})
            // Clear fields
            setMessage(' ');
            setTech(' ');
            setAttention(' ');
            
        }
        
    }

    return (
        // The 'id' needs to be the same in AddBtn.js file
        <div id='edit-log-modal' className='modal' style={{modalStyle}}>
            <div className="modal-content">
                <h4>Enter System Log</h4>
                <div className="row">
                    <div className="input-field">
                        <input type="text" name="message" value={message} onChange={e => setMessage(e.target.value)} />
                       
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <select name="tech" value={tech} className='browser-default' onChange={e => setTech(e.target.value)}>
                            <option value="" disabled>Select technician</option>
                            <option value="John Doe">John Doe</option>
                            <option value="Sam Smith">Sam Smith</option>
                            <option value="Mary Williams">Mary Williams</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <p>
                            <label>
                                <input type="checkbox" className='filled-in' checked={attention} value={attention} onChange={e => setAttention(!attention)} />
                                <span>Needs attention</span>
                            </label>
                        </p>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <a href="#!" onClick={onSubmit} className='modal-close waves-effect blue btn'>Enter</a>
            </div>
        </div>
    )
}

const modalStyle = {
    width: '75%',
    height: '75%'
}

EditLogModal.propTypes = {
    current: PropTypes.object,
    updateLog: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    current: state.log.current
})


export default connect(mapStateToProps, {updateLog})(EditLogModal)
