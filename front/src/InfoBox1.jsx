import React from 'react'


const InfoBox = ({ privateKey1, publicKey1})=>{

    return <div className='infobox'>
        <div className='keybox'>
            <h4>Public Key:</h4>
            <h5>{publicKey1}</h5>
            <h4>Private Key:</h4>
            <h5>{privateKey1}</h5>
            
        </div>
        
    </div>
}

export default InfoBox