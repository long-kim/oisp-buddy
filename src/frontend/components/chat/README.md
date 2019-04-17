## Chat Database Structure

Including two collections

** Users **

- Each user information is stored iniside a document
- Every doc has username, array of rooms

#### Ex: db.collection("users").doc("username")

** Rooms **

- Each room is stored iniside a document
- Every doc has room's name, array of participants and a collection name "messages"

** Rooms/Messages **

- Each doc is a chatlog which contains username, timestrap and content

#### Ex: db.collection("users").doc("roomID").collection("messages")
