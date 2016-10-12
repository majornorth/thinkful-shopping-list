var axios = require("axios");

// axios({
//   method: 'post',
//   url: 'http://localhost:8080/users',
//   data: {
//     username: 'John',
//     password: '123456'
//   }
// }).then(function(data){
//   console.log(data);
// }).catch(function(err){
//   console.log(err);
// });

// axios({
//   method: 'post',
//   url: 'https://shopping-list-stewartmccoy.c9users.io/users',
//   data: {
//     username: 'Bobby',
//     password: '123456'
//   }
// }).then(function(data){
//   console.log(data);
// }).catch(function(err){
//   console.log(err);
// });

axios({
  method: 'get',
  url: 'https://shopping-list-stewartmccoy.c9users.io/users/'
}).then(function(data){
  console.log(data);
}).catch(function(err){
  console.log(err);
});

// axios.get('http://localhost:8080/users/?username=Jeremy')
//   .then(function(response) {
//     console.log(response.data);
//     console.log(response.status);
// }).catch(function(err){
//   console.log(err);
// });;

// axios.get('http://localhost:8080/users')
// .then(function (response) {
//   console.log(response);
// }).catch(function (error) {
//   console.log(error);
// });




// node post.js

