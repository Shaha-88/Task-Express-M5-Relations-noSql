const { model, Sechma } = require('mongoose');

const authorSchema = new Schema({

  name: String,
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);


module.exports = model('author', authorSchema);
