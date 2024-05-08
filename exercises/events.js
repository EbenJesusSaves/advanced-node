const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

eventEmitter.on("try", (arg) => {
  console.log(`We're trying this ${arg} out here`);
});

eventEmitter.emit("try", "cool thing");
