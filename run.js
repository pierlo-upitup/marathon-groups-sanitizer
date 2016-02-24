var Loader = require('node-file-loader');
var fs = require('fs');
var filepath = process.argv[2];

if (filepath == null) {
  throw new Error("Please specify the path to the JSON file");
}

var blacklist = [
  "version", "versionInfo", "uris"
];

var removeBlacklistedFields = function(group) {
  delete group.version;

  if (group.apps.length > 0) {

    group.apps.forEach(function(app, i) {
      blacklist.forEach(function(prop) {
        delete app[prop];
        console.log("deleted " + app.id + "." + prop);
      });
    });
  }

  if (group.groups != null) {
    group.groups.forEach(function(g) {
      removeBlacklistedFields(g);
    });
  }
}

Loader.load(filepath)
.then(function (file) {
  var data = JSON.parse(file);
  removeBlacklistedFields(data);

  fs.writeFile(__dirname + "/out.json", JSON.stringify(data), function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("Sanitized data saved to out.json");
  });

}).catch(function (err) {
  // handle error
  console.log("Error saving out.json");
});
