import axios from "axios";
import { Repo } from "../../Models/RepoModel";
import { EventEmitter } from "events";

const customEmitter = new EventEmitter();

customEmitter.on("getRepos", async (username: string, callback: (error: Error | null, result: boolean) => void) => {
  try {
    const res = await axios.get(`https://api.github.com/users/${username}/repos`);

    const resPromise = res.data.map(async (element: any) => {
      try {
        const languageRes = await axios.get(`https://api.github.com/repos/${username}/${element["name"]}/languages`);
        const mainLanguage = findMainLanguage(languageRes.data);

        await Repo.upsert({
        
          repo_id: element["id"],
          name: element["name"],
          desc: element["description"],
          url: element["html_url"],
          main_language: mainLanguage,
          creation_date: element["created_at"],
          user_id: element["owner"]["id"],
          user_login: element["owner"]["login"],
          user_avatar: element["owner"]["avatar_url"],
        });
      } catch (languageError: unknown) {
        console.error(`Error fetching language for repo ${element["name"]}:`, languageError);
        throw new Error(`Error fetching language for repo ${element["name"]}: ${languageError}`);
      }
    });
    await Promise.all(resPromise);
    callback(null, true);
  } catch (err) {
    console.error(`Error fetching repositories for user ${username}:`, err);
    callback(err as Error, false);
  }
});

function findMainLanguage(obj: Record<string, number>): string {
  let mainLanguage: [string, number] = Object.entries(obj)[0];

  Object.entries(obj).forEach((element) => {
    if (element[1] > mainLanguage[1]) {
      mainLanguage = element;
    }
  });

  return mainLanguage[0];
}

export default customEmitter;

