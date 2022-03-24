var output = document.getElementById("console");
var compileBtn = document.getElementById("btn");
var clearBtn = document.getElementById("clearbtn");

clearBtn.addEventListener("click",function(){
  output.innerHTML = "";
})

compileBtn.addEventListener("click", function () {

  var textCode = document.getElementById("textEditor").value;
  var languageId = document.getElementById("language").value;
  if (languageId == "null"){
    alert("Please select a language")
  }
  else{
  var codeId;
  output.innerHTML = "Compiling ...";
  var request = new XMLHttpRequest();
  request.open("POST", "https://codequotient.com/api/executeCode");
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify({ code: textCode, langId: `${languageId}` }));
  request.addEventListener("load", function (event) {
    codeId = JSON.parse(event.target.responseText)["codeId"];
  })

  setTimeout(function () {
    var fetchRequest = new XMLHttpRequest();
    fetchRequest.open("GET", `https://codequotient.com/api/codeResult/${codeId}`);
    fetchRequest.send();
    fetchRequest.addEventListener("load", function (event) {
      var data = JSON.parse(JSON.parse(event.target.responseText)["data"]);
      var op = data["output"]
      var err = data["errors"]
      if (op !== ''){
        output.innerHTML = op;
      }
      else{
        output.innerHTML = err;
      }
    })
  }, 5000);
  }

})