import express from "express";
import {getRepos, searchRepos } from '../Controllers/repoController';
import { getUserRepos } from '../Controllers/userController';

const router = express.Router();

router.get("/repos/search", searchRepos);
router.post("/repos/:username", getRepos);
router.get("/user/:username/repos", getUserRepos);

export default router;