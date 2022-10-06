module.exports = class CommentRepository {
  constructor(db) {
    this.db = db;
  }

  async getAll() {
    let res = await this.db.findAll({
      where: { DeleteAt: null },
    });

    return res;
  }

  async getAllSpecificNews(newsId) {
    let res = await this.db.findAll({
      where: { news_fk: newsId, DeleteAt: null },
      raw: true,
    });

    return res;
  }

  async getAllTopSpecificNews(newsId) {
    let res = await this.db.findAll({
      where: {
        news_fk: newsId,
        comment_tree_fk: null,
        DeleteAt: null,
      },
      raw: true,
    });

    return res;
  }

  async getAllNestedComment(newsId, comment_tree_fk) {
    let res = await this.db.findAll({
      where: {
        news_fk: newsId,
        comment_tree_fk,
        DeleteAt: null,
      },
      raw: true,
    });

    return res;
  }

  async Add(data) {
    let res = await this.db.create({ ...data, raw: true });

    return res;
  }

  async Delete(id) {
    let currentTime = new Date(Date.now()).toUTCString();
    let res = await this.db.update(
      { DeleteAt: currentTime },
      { where: { id } }
    );

    return res;
  }

  async Update(data) {
    let res = await this.db.update(
      { ...data },
      { where: { id: data.id, DeleteAt: null } }
    );

    return res;
  }
};
