import React, { useState, useEffect } from 'react';
import TechItem from './TechItem';


export const TechListModal = () => {
    const [techs, setTechs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getTechs();
        // Because of empty dependency
        //eslint-disable-next-line
    }, [])

    const getTechs = async () => {
        setLoading(true);

        // fetch API
        const res = await fetch('/techs');
        const data = await res.json();

        setTechs(data);
        setLoading(false);

        if(loading) {
           <h4>Loading...</h4>
        }
    }


    return (
        <div id='tech-list-modal' className='modal'>  
            <div className="modal-content">
                <h4>Technician List</h4>
                <ul className='collection'>                  
                    {/* Map through the techs */}                   
                    {
                        !loading && techs.length === 0 ? (<p className='center'>No technicians to show...</p>) : 
                        (
                            techs.map(tech => <TechItem key={tech.id} tech={tech} />)
                        )
                    }                       
                </ul>
            </div>            
        </div>
    )
}
