const { model, Schema } = require('mongoose');

const PostSchema = new Schema({
  title: String,
  body: String,
  author: { type: Schema.Types.ObjectId, ref: "Author" },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
},
{ timestamps: true }
);




module.exports = model('Post', PostSchema);
