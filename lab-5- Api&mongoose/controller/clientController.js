const client = require("../models/clients");
const operations = {
  index(req, res, next) {
    count = req.query.limit || "";
    client
      .find({})
      .limit(count)
      .then((all) => res.status(200).send(all))
      .catch(next);
  },
  show(req, res, next) {
    client
      .findById(req.params.id)
      .then((found) => {
        if (!found) throw new Error("id doesn't exist");
        res.status(200).send(found);
      })
      .catch(next);
  },
  add(req, res, next) {
    let clientToAdd = req.body;
    client
      .create(clientToAdd)
      .then((cl) => res.status(201).send(cl))
      .catch(next);
  },
  update(req, res, next) {
    client
      .findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
      .then(() => client.findById(req.params.id))
      .then((cl) => res.status(202).send(cl))
      .catch(next);
  },
  delete(req, res, next)  {
    client
      .findOneAndDelete(req.params.id)
      .then((cl) => res.status(202).send(cl))
      .catch(next);
  }
};

module.exports = operations;
