
module.exports = {
  users: [],

  add: function(user) {
    const i = this.getIndex(user.name);

    if (i >= 0) {
      this.users[i] = user;
    } else {
      this.users.push(user);
    }
  },

  get: function(name) {
    return this.users.find((u) => u.name === name);
  },

  getIndex: function(name) {
    return this.users.findIndex((u) => u.name === name);
  },
};
