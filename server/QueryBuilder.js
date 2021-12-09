module.exports = class QueryBuilder {
  constructor(query) {
    this.query = query;
  }
  paginate(number, limit) {
    number = parseInt(number);
    limit = parseInt(limit);

    return this.query.skip(number * limit).limit(limit);
  }
};
