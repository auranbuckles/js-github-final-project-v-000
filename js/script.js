$(document).ready(function() {
  submitForm();
});

function GithubInteractor(token) {
  this.token = token;
};

function submitForm() {
	$('form').on('submit', function(event) {
		var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
	});
};

function createIssue(repoName, repoOwner, title, body, token, data) {

  var data = {
    "title": title,
    "body": body
  }

  $.ajax({
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues",
    type: "POST",
    dataType: "json",
    headers: {
      Authorization: token
    },
    data: JSON.stringify(data)
  }).done(handleResponse).fail(handleError);
};

function handleResponse(response) {
	$("#issue").append(response.title);
};

function handleError(jqXHR, textStatus, errorThrown) {
	console.log("Post error: " + errorThrown);
};



// 6589c52e4f362a03b4cab4042ed618369c50f534

// In index.html you'll find a form with four input fields, for repository name, repository owner, issue title, and issue body.
// In js/script.js you'll need to define a function that submits the form submitForm. This function should call a function createIssue.
// The createIssue function should make an Ajax POST request to the Github API create issue end point.
// This endpoint should create an issue based on the information the user entered in the form. Once the form has been submitted, you'll want to add a link to the page to enter a repo name (thus you'll want to make sure the page doesn't refresh on form submission).
// If the POST request fails, the function should print out Post error: error_nameto the console.

  // <form>
  //   Repository Name:<input type="text" id="repoName">
  //   Repository Owner:<input type="text" id="repoOwner">
  //   Issue Title:<input type="text" id="title">
  //   Issue Body:<input type="text" id="body">
  //   <input type="submit" value="submit">
  // </form>