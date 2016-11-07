var mylib = {

  hash64: function (salt64,cleartext) {

    var wachtwoordBits = sjcl.codec.utf8String.toBits(cleartext);
    var saltBits = sjcl.codec.base64.toBits(salt64);
    return sjcl.codec.base64.fromBits(
      sjcl.hash.sha256.hash(
        sjcl.bitArray.concat(saltBits,wachtwoordBits)
      )
    )
  },

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
