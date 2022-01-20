const express = require("express");
const { getCategories } = require("../controllers/category.controllers");

const apiRouter = express.Router();

apiRouter.get("/categories", getCategories);

apiRouter.get("/users", getUsers);

apiRouter.get("/reviews", getReviews);
apiRouter.get("/reviews/:review_id", getReview_Id);
apiRouter.patch("/reviews/:review_id", patchReview_Id);

apiRouter.get("/reviews/:review_id/comments", getComments);
apiRouter.post("/reviews/:review_id/comments", postComments);
apiRouter.delete("/comments/:comment_id", deleteComments);

module.exports = apiRouter;
