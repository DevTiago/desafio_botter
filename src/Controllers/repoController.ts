import customEmitter from "../events/eventEmitter";
import { Repo } from "../../Models/RepoModel";
import RepoDto from "../dtos/repoDTO";  
import { Op } from "sequelize";
import { Request, Response, NextFunction } from "express";

export const getRepos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username } = req.params;

    await customEmitter.emit("getRepos", username, (err: Error | null, result: any) => {
      if (err) {
        return next(err);
      }

      if (result) {
        res.status(200).json({
          success: true,
          message: "Repos updated",
        });
      }
    });
  } catch (err) {
    next(err);
  }
};

export const searchRepos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { keywords } = req.query;

    if (!keywords) {
       res.status(400).json({
        success: false,
        message: "No keywords provided",
      });
    }

    const keywordArray: string[] = (keywords as string).split(",").map((keyword) => keyword.trim());

    const repos = await Repo.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${keywordArray.join("%")}%` } },
          { desc: { [Op.like]: `%${keywordArray.join("%")}%` } },
        ],
      },
    });

    if (repos.length === 0) {
       res.status(404).json({
        success: false,
        message: `No repos found with given keywords`
      });
    }

    const repoData = repos.map((repo: Repo) => RepoDto.fromModel(repo));


     res.status(200).json({
      success: true,
      message: `Found ${repoData.length} repos matching the keywords.`,
      data: repoData,
    });

  } catch (err) {
    next(err);
  }
};

export default {getRepos, searchRepos}
