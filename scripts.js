window.onload(newAffirmation());
function newAffirmation() {
  var serialize = JSON.stringify({ x: 5, y: 6 });
  console.log(serialize);
  const myRequest = new Request('affirmations_get.php?c=' + serialize, {
    method: 'GET',
  });
  fetch(myRequest)
    .then((response) => response.json())
    .then((json) => {
      document.querySelector('#affirmation').innerHTML = '"' + json.affirmation + '."';
    });

  var picNumber = Math.floor(Math.random() * 6) + 1;
  var tucciImg = document.querySelector('#tucci');
  tucciImg.src = `images/tucci${picNumber}.jpg`;
}

// $(document).ready(function () {
//   $.ajax({
//   url: 'https://www.affirmations.dev',
//   type: 'GET',
//   contentType: 'application/json',
//   headers: { 'Access-Control-Allow-Origin': 'null' }, //add this line
//   dataType: 'json',
//   success: function (result) {
//     console.log(result);
//   },
//   error:  (error) => {
//     console.log(error);
//   },
//   });
//   $.get('https://www.affirmations.dev', function (data, status) {
//     console.log(data);
//   });
// });

// const getUserGitHubAPI = async () => {

//   const APIResponse = await fetch('https://www.affirmations.dev');

//   const gitHubUser = await APIResponse.json();

//   console.log(gitHubUser);

// };

// getUserGitHubAPI();

// axios

//   .get('https://www.affirmations.dev')

//   .then((response) => {

//     console.log(response.data);

//   })

//   .catch((error) => console.error(error));
