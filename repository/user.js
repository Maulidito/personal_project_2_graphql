module.exports = class NewsRepository {
  constructor(db) {
    this.db = db;
  }

  async Add(data) {
    let res = null;

    res = await this.db.create({ ...data, raw: true });

    return res;
  }

  async GetOnebyEmail(email) {
    let res = await this.db.findOne({
      where: { email, DeleteAt: null },
      raw: true,
    });
    return res;
  }
  async GetOnebyId(id) {
    let { email, createdAt } = await this.db.findOne({
      where: { id, DeleteAt: null },
      raw: true,
    });
    return { email, id, createdAt };
  }
};
