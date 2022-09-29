## This app works with React on the front end and NodeJs in the backend to send encrypted messages.
#How it works:
- A message is created by User A, sent to the backend server and encrypted with User B's **Public Key** 
- This message is also decrypted with User B's **Private Key**

#SetUp
1. Clone repo
2. npm install (to install dependencies)
3. move into "back" folder and start server with "node app.js" 
4. move into "front" folder and start react app with "npm start"
5. Once both are running, you can use the app
6. Type your message in the input field and click button to send
7. The other user will receive the encrypted messsage and can use "decrypt" button to view message
