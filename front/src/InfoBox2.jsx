import React from "react";

const InfoBox2 = ({ privateKey2, publicKey2}) => {
  return (
    <div className='infobox'>
      <div className='keybox'>
        <h4>Public Key:</h4>
        <h5>{publicKey2}</h5>
        <h4>Private Key:</h4>
        <h5>{privateKey2}</h5>
      </div>
    </div>
  );
};

export default InfoBox2;
