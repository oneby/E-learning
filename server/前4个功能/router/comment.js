const Comment = require('./../mongo/model/commentModel');

// comment
router.post('/user/comment', (req, res) => {
    const { comment } = req.body;
    const movieId = comment.movie;


})