var mongoose = require('mongoose');
var CommentSchema = require('./../schema/commentSchema');
var Comment = mongoose.model('CommentData', CommentSchema);

module.exports = Comment;