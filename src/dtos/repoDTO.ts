import moment from 'moment';

interface Repo {
    repo_id: number;
    name: string;
    desc?: string;
    url: string;
    main_language: string;
    creation_date: string;
    user_id: number;
    user_login: string;
    user_avatar?: string;
}

class RepoDTO {
    repo_id: number;
    name: string;
    desc?: string;
    url: string;
    main_language: string;
    creation_date: string;
    user_id: number;
    user_login: string;
    user_avatar?: string;

    constructor(repo: Repo) {
        this.repo_id = repo.repo_id;
        this.name = repo.name;
        this.desc = repo.desc;
        this.url = repo.url;
        this.main_language = repo.main_language;
        this.creation_date = moment(repo.creation_date).format('YYYY-MM-DD HH:mm:ss');
        this.user_id = repo.user_id;
        this.user_login = repo.user_login;
        this.user_avatar = repo.user_avatar;
    }

    static fromModel(repo: Repo): RepoDTO {
        return new RepoDTO(repo);
    }
}

export default RepoDTO;

