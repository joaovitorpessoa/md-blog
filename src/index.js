const { server } = require("./server");

const SERVER_PORT = 3000;

server.listen(SERVER_PORT, () =>
  console.log(`Server is running on port ${SERVER_PORT}`)
);
