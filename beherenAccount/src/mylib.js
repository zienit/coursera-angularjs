var mylib = {
  toMessage: function(e) {
    var contentType = e.headers("Content-type");
    var message = contentType.startsWith("application/json")
      ? "[" + e.data[0].severity + "] " + e.data[0].message
      : "[" + e.status + " - " + e.statusText + "] " + e.config.url;
    return {
      name: "ServiceException",
      message: message
    }
  }
};
