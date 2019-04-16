1. Relatational Database: MySQL
  Thread
  User
  Post
  ===
  Lots of transactions!!

2. NoSQL: Firebase
  [*] Chat Log
  Example
  
  user:{
    username,
    [] roomsID
  }

  rooms:{
    roomsID,
    messages: {
      message,
      time,
      username
    }
  }

  [*] Friendships
  Example
  {
    from
    to
    status [PENDING=1, FRIEND=2, BLOCKED=3]
  }