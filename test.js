let my_name = 'fred';

const greet = (name) => {
  // parameter name is a string
  console.log(`hello ${name}`);
  return;
};

greet(my_name); // argument name is a string

const axios = require('axios');
(() => {
  axios('https://jsonplaceholder.typicode.com/users')
    .then((result) => {
      console.log(result.data);
    })
    .catch((err) => err);
})();
