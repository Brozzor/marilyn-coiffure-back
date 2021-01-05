module.exports = class User {
  constructor(mail, firstname, lastname, password, ip) {
    this.mail = mail;
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
    this.createDate = Math.round(+new Date() / 1000);
    this.tokenSession = null;
    this.createIp = ip;
    this.rank = 0;
    this.resetPassword = {
      date: null,
      token: null,
    };
    this.address = {
      address: null,
      city: null,
      zip: null,
    };
  }
};
