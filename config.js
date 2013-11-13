module.exports = function(){
  var version = "v1";

  var settings = {
    production : {
      endpoint: "https://appsapi.edmodo.com/" + version
    },
    sandbox : {
      endpoint: "https://appsapi.edmodobox.com:443/" + version
    }
  };

  return settings;
}