import React, { useEffect } from 'react';
import TechItem from './TechItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { getTechs } from '../../actions/techActions';

const TechListModal = ({ getTechs, tech: { techs, loading } }) => {
    // const [techs, setTechs] = useState([]);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        getTechs();
        // Because of empty dependency
        //eslint-disable-next-line
    }, [])

    // const getTechs = async () => {
    //     setLoading(true);

    //     // fetch API
    //     const res = await fetch('/techs');
    //     const data = await res.json();

    //     setTechs(data);
    //     setLoading(false);

    //     if(loading) {
    //        <h4>Loading...</h4>
    //     }
    // }


    return (
        <div id='tech-list-modal' className='modal'>  
            <div className="modal-content">
                <h4>Technician List</h4>
                <ul className='collection'>                  
                    {/* Map through the techs */}                   
                    {
                        !loading && techs !== null && techs.map(tech => <TechItem key={tech.id} tech={tech} />)                        
                    }                       
                </ul>
            </div>            
        </div>
    )
}

TechListModal.propTypes = {
    getTechs: PropTypes.func.isRequired,
    tech: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    tech: state.tech
})

export default connect(mapStateToProps, {getTechs})(TechListModal)
