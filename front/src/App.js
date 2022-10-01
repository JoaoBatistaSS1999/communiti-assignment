import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import send from "../src/assets/send.png";
import Button from "./components/button/button";

const App = () => {
  const [phraseUser1, setPhraseUser1] = useState({});
  const [phraseUser2, setPhraseUser2] = useState({});
  const [encryptedUser1, setEncryptedUser1] = useState();
  const [encryptedUser2, setEncryptedUser2] = useState();
  const [decryptedUser1, setDecryptedUser1] = useState();
  const [decryptedUser2, setDecryptedUser2] = useState();
  const [viewMessage1, setViewMessage1] = useState(false);
  const [viewMessage2, setViewMessage2] = useState(false);
  const [privateKey1, setPrivateKey1] = useState();
  const [privateKey2, setPrivateKey2] = useState();
  const [publicKey1, setPublicKey1] = useState();
  const [publicKey2, setPublicKey2] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCaller, setModalCaller] = useState("A");
  const [modalInputText, setModalInputText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const modalInputHandler = (e) => {
    console.log(e.target.value);
    setModalInputText(e.target.value);
  };

  // Sends message to backend to be encrypted / decrypted
  const sendTextUser1 = async (value) => {
    const data = await axios.post(
      "http://localhost:3001/sendmessage",
      phraseUser1
    );

    setEncryptedUser1(data.data.encryptedMessage);
    setDecryptedUser1(data.data.decryptedMessage);
    setViewMessage1(false);

    setPhraseUser1({ user: 1, message: "" });
  };

  const sendTextUser2 = async () => {
    const data = await axios.post(
      "http://localhost:3001/sendmessage",
      phraseUser2
    );
    setEncryptedUser2(data.data.encryptedMessage);
    setDecryptedUser2(data.data.decryptedMessage);
    setViewMessage2(false);

    setPhraseUser2({ user: 2, message: "" });
  };

  const decrypt1 = () => {
    setViewMessage1(true);
  };
  const decrypt2 = () => {
    setViewMessage2(true);
  };

  const handleModalConfirm = () => {
    if (modalCaller === "A") {
      if (modalInputText !== "deviceA45") return window.alert("wrong password");

      sendTextUser1();
      setIsModalOpen(false);
      return console.log("this is A");
    }
    if (modalInputText !== "deviceB90") return window.alert("wrong password");
    sendTextUser2();
    setIsModalOpen(false);
    console.log("this is B");
  };

  // Upon mounting, fetches Keys to render on info box
  useEffect(() => {
    const getKeys = async () => {
      const data = await axios.get("http://localhost:3001/getkeys");
      setPrivateKey1(data.data.privateKey1);
      setPrivateKey2(data.data.privateKey2);
      setPublicKey1(data.data.publicKey1);
      setPublicKey2(data.data.publicKey2);
    };
    getKeys();
  }, []);

  return (
    <div className="w-full flex justify-center text-white">
      {isModalOpen && (
        <div className="absolute top-0 w-full bottom-0 flex justify-center items-center">
          <div
            onClick={() => setIsModalOpen(false)}
            className="bg-[#0000007b] absolute top-0 bottom-0 w-full z-10"
          ></div>
          <div className="bg-[#ffffff] p-5 text-black absolute z-20 gap-6 w-96 h-96 rounded-2xl flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold">Client {modalCaller}</h2>

            <div className="flex flex-col items-center">
              <label htmlFor="privateKey">Device password</label>
              <input
                onChange={modalInputHandler}
                id="privateKey"
                type="password"
                className="bg-[#81818176] focus:outline-none p-2 rounded-md"
              />
            </div>

            <button
              disabled={!(modalInputText.trim() !== "")}
              onClick={handleModalConfirm}
              className="bg-teal-600 disabled:bg-slate-400 disabled:cursor-not-allowed p-2 rounded-md"
            >
              Confirm
            </button>
            <p className="text-red-400 text-center w-[90%]">
              This is for demonstration only, you should never manualy share you
              private key!
            </p>
          </div>
        </div>
      )}

      <div className="max-w-screen-xl gap-10 p-2 w-full bg-white h-screen flex justify-around items-start mt-20 sm:mt-40 flex-wrap">
        {/* left field */}
        <div className="bg-[#7485a7] p-3 py-5 rounded-md max-w-xl w-full flex flex-col gap-4 px-5 items-center">
          <h2 className="bg-[#953e23] p-3 rounded-md text-4xl font-bold flex justify-center items-center font-serif mb-5">
            Client A
          </h2>
          <p>Local password: deviceA45</p>

          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex justify-between items-center focus:border-none max-w-lg sm:w-full "
          >
            <input
              value={phraseUser1.message}
              type="text"
              className="text-black focus:outline-none p-3 h-full rounded-md rounded-tr-none rounded-br-none flex-grow"
              onChange={(e) =>
                setPhraseUser1({ user: 1, message: e.target.value })
              }
            />
            <button
              onClick={() => {
                setModalCaller("A"), setIsModalOpen(true);
              }}
              // onClick={sendTextUser1}
              className="bg-slate-700 h-full p-2 rounded-md rounded-bl-none rounded-tl-none flex items-center gap-2"
            >
              Send{" "}
              <img
                src={send}
                alt="letter"
                className="h-7 w-auto hidden sm:flex"
              />
            </button>
          </form>

          <div className="w-full flex flex-col gap-2">
            <section className="text-blue-300 bg-[#19294d] text-center w-full break-words p-5 rounded-md">
              {encryptedUser2 ? (
                <div>
                  <h5 className="mb-4">Encrypted Message</h5>
                  <p>{encryptedUser2}</p>
                </div>
              ) : (
                "Waiting for messages"
              )}
            </section>
            {viewMessage2 && (
              <div className="bg-white text-black flex flex-col items-center gap-2 p-5 rounded-md w-full break-words">
                <h4 className="font-bold text-lg">Decrypted Message</h4>
                <p className="break-words w-full text-center">
                  {decryptedUser2}
                </p>
              </div>
            )}
          </div>
          {decryptedUser2 && (
            <Button onClick={decrypt2}>Decrypted Message</Button>
          )}
        </div>

        {/* right field */}
        <div className="bg-[#7485a7] p-3 py-5 rounded-md mb-20 max-w-xl w-full flex flex-col gap-4 px-5 items-center">
          <h2 className="bg-[#239562] p-3 justify-center items-center font-serif rounded-md text-4xl font-bold flex mb-5">
            Client B
          </h2>
          <p>Local password: deviceB90</p>

          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex justify-between items-center focus:border-none max-w-lg sm:w-full "
          >
            <input
              value={phraseUser2.message}
              type="text"
              className="text-black focus:outline-none p-3 h-full rounded-md rounded-tr-none rounded-br-none flex-grow"
              onChange={(e) =>
                setPhraseUser2({ user: 2, message: e.target.value })
              }
            />
            <button
              onClick={() => {
                setModalCaller("B"), setIsModalOpen(true);
              }}
              // onClick={sendTextUser2}
              className="bg-slate-700 h-full p-2 rounded-md rounded-bl-none rounded-tl-none flex items-center gap-2"
            >
              Send{" "}
              <img
                src={send}
                alt="letter"
                className="h-7 w-auto hidden sm:flex"
              />
            </button>
          </form>

          <div className="w-full flex flex-col gap-2">
            <section className="text-blue-300 bg-[#19294d] text-center w-full break-words p-5 rounded-md">
              {encryptedUser1 ? (
                <div>
                  <h5 className="mb-4">Encrypted Message</h5>
                  <p>{encryptedUser1}</p>
                </div>
              ) : (
                "Waiting for messages"
              )}
            </section>
            {viewMessage1 && (
              <div className="bg-white text-black flex flex-col items-center gap-2 p-5 rounded-md w-full break-words">
                <h4 className="font-bold text-lg">Decrypted Message</h4>
                <p className="break-words w-full text-center">
                  {decryptedUser1}
                </p>
              </div>
            )}
          </div>
          {decryptedUser1 && (
            <Button onClick={decrypt1}>Decrypted Message</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
