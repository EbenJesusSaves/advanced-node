// const getPrime = (num) => {
//   if (num < 1) return console.log(false);

//   for (let i = 2; i < num; i++) {
//     if (num % i === 0) return console.log(false);
//   }

//   return console.log(true);
// };

// getPrime(3);

// function primeFactors(n) {
//   // Print the number of 2s that divide n
//   while (n % 2 == 0) {
//     console.log(2);
//     n = n / 2;
//   }
//   // n must be odd at this point. So we can skip one element

//   for (var i = 3; i * i <= n; i = i + 2) {
//     // While i divides n, print i and divide n
//     while (n % i == 0) {
//       console.log(i);
//       n = n / i;
//     }
//   }
//   // This condition is to handle the case when n is a prime number
//   // greater than 2
//   if (n > 2) {
//     console.log(n);
//   }
// }

// primeFactors(20);

const stgReversal = (input) => {
  if (typeof input !== "string") return console.log("not a string");
  let reversed = "";
  let toArray = input;
  for (let i = toArray.length - 1; i >= 0; i--) {
    reversed += toArray[i];
  }
  // reversed.split();
  console.log(reversed);
};

stgReversal("saw my name again");
