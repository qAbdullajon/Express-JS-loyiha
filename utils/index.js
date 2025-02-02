export default {
  ifequal(a, b, options) {
    if (a.toString() == b) {
      return options.fn(this);
    }
    return options.inverse(this);
  },
};
