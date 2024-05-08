#!/usr/bin/env node

"use strict";

var path = require("path");
var fs = require("fs");
var zlib = require("zlib");
var getStdin = require("get-stdin");

var args = require("minimist")(process.argv.slice(2), {
  boolean: ["help", "in", "out"],
  string: ["file"],
});
const { Readable, Transform, Stream, Writable } = require("stream");
const BASEPATH = path.resolve(process.env.BASEPATH || __dirname);

const OUTFILE = path.join(BASEPATH, 'out.txt')



const streamComplete = (stream) => {
  // now this returns a promise, so I can handle the outcome for both cases 
  return new Promise((res, rej) => {
    stream.on("end", () => {
      // on a successful stream
      res()
    })

    stream.on("error", () => {
      // on a failed stream
      rej()
    })
  })
}

// how to use the promise later  
streamComplete('some random stream')
  .then(
    () => console.log("Huzzah! we're live on Kwabina Tv, the Coconut has been fall down 😂😂😂")
  )
  .catch(() => console.log("Charlie, we're not live yet, check your grammar 😎😒😒😒"))
  .finally(() => console.log("grammar doesn't matter start streaming!! 🔭🔭🔭"))



if (args.help || process.argv.length <= 2) {

  error(null, /*showHelp=*/ true);
}
else if (args._.includes("-") || args.in) {
  processFile(process.stdin);
}
else if (args.file) {
  let stream = fs.createReadStream(path.join(BASEPATH, args.file))
  processFile(stream).then((file) => {

    console.log('file')
  })
}

else {
  error("Usage incorrect.", /*showHelp=*/ true);
}

// ************************************

function printHelp() {
  console.log("ex1 usage:");
  console.log("");
  console.log("--help                      print this help");
  console.log("-, --in                     read file from stdin");
  console.log("--file={FILENAME}           read file from {FILENAME}");
  console.log("");
  console.log("");
}

function error(err, showHelp = false) {
  process.exitCode = 1;
  console.error(err);
  if (showHelp) {
    console.log("");
    printHelp();
  }
}

async function processFile(inStream) {
  let outStream


  const upperStream = new Transform({
    transform(chunk, enc, cb) {
      this.push(chunk.toString().toUpperCase())
      setTimeout(cb, 500)
    }
  })

  // Transform({
  //   transform(chunk, enc, cb) {
  //     this.push(chunk.toString().toUpperCase())
  //     cb()
  //   }
  // })


  outStream = inStream.pipe(upperStream)
  let targetStream;

  if (args.compress) {
    let gzipStream = zlib.createGzip()
    outStream.pipe(gzipStream)
    OUTFILE = `${OUTFILE}.gz`

  }
  if (args.out) {
    targetStream = process.stdout
  } else {
    targetStream = fs.createWriteStream(OUTFILE)
  }

  outStream.pipe(targetStream)
}



async function* generate() {
  yield "hello";
  yield "streams";
}

const readable = Readable.from(generate());

readable.on("data", (chunk) => {
  console.log(chunk);
});

const data = fetch()