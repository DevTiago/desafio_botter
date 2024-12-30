import { Request, Response } from 'express';
import { Repo } from "../../Models/RepoModel";
import RepoDto from '../dtos/repoDTO';

export const getUserRepos = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.params;

  try {
    const repos: Repo[] = await Repo.findAll({
      where: { user_login: username },
    });

    if (repos.length === 0) {
       res.status(404).json({
        success: false,
        message: `No repos found for the user ${username}.`,
      }); 
    }

    const repoData = repos.map((repo: Repo) => RepoDto.fromModel(repo));

     res.status(200).json({
      success: true,
      message: `Found ${repoData.length} repos for user ${username}`,
      data: repoData,
    });

  } catch (err: unknown) {
     res.status(500).json({
      success: false,
      message: (err as Error).message,
    });
  }
};

export default { getUserRepos};

