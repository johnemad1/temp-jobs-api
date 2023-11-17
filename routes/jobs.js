const express = require("express");
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getSingleJobs,
  updateJob,
  deleteJobs,
} = require("../controllers/jobs");

router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").get(getSingleJobs).patch(updateJob).delete(deleteJobs);

module.exports = router;
