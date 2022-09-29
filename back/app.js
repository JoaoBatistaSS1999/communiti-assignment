const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();
const NodeRSA = require("node-rsa");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const key1 = new NodeRSA({ b: 1024 });
const key2 = new NodeRSA({ b: 1024 });
const privateKey1 = key1.exportKey("private").slice(32,500);
const privateKey2 = key2.exportKey("private").slice(32,500);
const publicKey1 = key1.exportKey("public").slice(27,247);
const publicKey2 = key2.exportKey("public").slice(27,247);
console.log(publicKey1)

//const envryptedString = key.encrypt(secret, "base64");
//console.log("Encrypted:", envryptedString);
//const decrypt = key.decrypt(envryptedString, "utf-8");
//console.log("Decrypted:", decrypt);

app.post("/sendmessage", function (req, res) {
  const message = req.body.message;
  if (req.body.user == 1) {
    const encryptedMessage = key2.encrypt(message, "base64");
    const decryptedMessage = key2.decrypt(encryptedMessage, "utf8");
    res.send({
      encryptedMessage: JSON.stringify(encryptedMessage),
      decryptedMessage: JSON.stringify(decryptedMessage),
    });
  } else {
    const encryptedMessage = key1.encrypt(message, "base64");
    const decryptedMessage = key1.decrypt(encryptedMessage, "utf8");
    res.send({
      encryptedMessage: JSON.stringify(encryptedMessage),
      decryptedMessage: JSON.stringify(decryptedMessage),
    });
  }
});

app.get("/getkeys", function(req, res){
  res.send({privateKey1, privateKey2, publicKey1, publicKey2})
})

//start your server on port 3001
app.listen(3001, () => {
  console.log("Server Listening on port 3001");
});
