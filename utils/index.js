import moment from "moment";

export default {
  ifequal(a, b, options) {
    if (a.toString() == b) {
      return options.fn(this);
    }
    return options.inverse(this);
  },

  getFullName(firstName, lastName) {
    return firstName[0] + lastName[0]
  },

  formatData(data) {
    return moment(data).format('DD MMM, YYYY')
  }
};
