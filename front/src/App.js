import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { FcInfo } from "react-icons/fc";
import InfoBox1 from "./InfoBox1";
import InfoBox2 from "./InfoBox2";

const App = () => {
  const [phraseUser1, setPhraseUser1] = useState({});
  const [phraseUser2, setPhraseUser2] = useState({});
  const [encryptedUser1, setEncryptedUser1] = useState();
  const [encryptedUser2, setEncryptedUser2] = useState();
  const [decryptedUser1, setDecryptedUser1] = useState();
  const [decryptedUser2, setDecryptedUser2] = useState();
  const [viewMessage1, setViewMessage1] = useState(false);
  const [viewMessage2, setViewMessage2] = useState(false);
  const [openInfoBox1, setOpenInfoBox1] = useState(false);
  const [openInfoBox2, setOpenInfoBox2] = useState(false);
  const [privateKey1, setPrivateKey1] = useState()
  const [privateKey2, setPrivateKey2] = useState()
  const [publicKey1, setPublicKey1] = useState()
  const [publicKey2, setPublicKey2] = useState()

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const sendTextUser1 = async (value) => {
    const data = await axios.post(
      "http://localhost:3001/sendmessage",
      phraseUser1
    );

    setEncryptedUser1(data.data.encryptedMessage);
    setDecryptedUser1(data.data.decryptedMessage);
    setViewMessage1(false);
  };

  const sendTextUser2 = async () => {
    const data = await axios.post(
      "http://localhost:3001/sendmessage",
      phraseUser2
    );
    setEncryptedUser2(data.data.encryptedMessage);
    setDecryptedUser2(data.data.decryptedMessage);
  };

  const decrypt1 = () => {
    setViewMessage1(true);
  };
  const decrypt2 = () => {
    setViewMessage2(true);
  };

  useEffect(() => {
    const getKeys = async () => {
      const data = await axios.get("http://localhost:3001/getkeys");
      setPrivateKey1(data.data.privateKey1)
      setPrivateKey2(data.data.privateKey2)
      setPublicKey1(data.data.publicKey1)
      setPublicKey2(data.data.publicKey2)
    };
    getKeys();
  }, []);

  return (
    <div className='App'>
      <div className='left-container'>
        <h1>
          User A
          <FcInfo
            className='info-btn'
            onMouseEnter={() => setOpenInfoBox1(true)}
            onMouseLeave={() => setOpenInfoBox1(false)}
          />
        </h1>

        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className='text-input'
            onChange={(e) =>
              setPhraseUser1({ user: 1, message: e.target.value })
            }
          />
          <button onClick={sendTextUser1} className='encrypt-btn'>
            Encrypt and Send
          </button>
          <div className='text-field'>
            <h5>Encrypted Message: {encryptedUser2}</h5>
            {viewMessage2 ? <h2>Decrypted Message: {decryptedUser2}</h2> : ""}
          </div>
        </form>
        {decryptedUser2 ? (
          <div>
            <button className='decrypt-btn' onClick={decrypt2}>
              View Decrypted Message
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className='right-container'>
        <h1>
          User B
          <FcInfo
            className='info-btn'
            onMouseEnter={() => setOpenInfoBox2(true)}
            onMouseLeave={() => setOpenInfoBox2(false)}
          />
        </h1>

        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className='text-input'
            onChange={(e) =>
              setPhraseUser2({ user: 2, message: e.target.value })
            }
          />
          <button onClick={sendTextUser2} className='encrypt-btn'>
            Encrypt and Send
          </button>
          <div className='text-field'>
            <h5>Encrypted Message: {encryptedUser1}</h5>
            {viewMessage1 ? <h2>Decrypted Message: {decryptedUser1}</h2> : ""}
          </div>
        </form>
        {decryptedUser1 ? (
          <div>
            <button className='decrypt-btn' onClick={decrypt1}>
              View Decrypted Message
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      {openInfoBox1 ? (
        <InfoBox1 user={1} privateKey1={privateKey1} publicKey1={publicKey1} />
      ) : (
        ""
      )}
      {openInfoBox2 ? (
        <InfoBox2 user={2} privateKey2={privateKey2} publicKey2={publicKey2} />
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
