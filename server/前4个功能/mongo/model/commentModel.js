const mongoose = require('mongoose');
const CommentSchema = require('./../schema/commentSchema');
const Comment = mongoose.model('CommentData', CommentSchema);

module.exports = Comment;