import axios, {AxiosRequestHeaders} from "axios";
import { IUser, IRepository } from './GithubApiInterface'

class GithubApi {
    // region configs
    private readonly username: string
    private readonly token: string
    private readonly axiosConfig: { baseURL: string, headers: AxiosRequestHeaders, }
    // endregion

    /**
     * @description
     * @param username username
     * @param token token
     */
    constructor(username: string, token: string) {
        this.username = username
        this.token = token
        this.axiosConfig = {
            baseURL: "https://api.github.com",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/vnd.github.v3.full+json",
                "Authorization": `Bearer ${token}`
            }
        }
    }

    protected _GET(url: string): Promise<any>{
        return new Promise((resolve, reject) => {
            axios.get(url, this.axiosConfig)
                .then(({data}) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
    protected _POST(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.post(url, this.axiosConfig)
                .then(({data}) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    getUser(): Promise<IUser.User> {
        return this._GET('/user')
    }

    getRepos(): Promise<IRepository.Repo[]> {
        return this._GET(`/user/repos`)
    }
}

const api = new GithubApi('lopo12123', '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')

api.getRepos()
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })

// export {
//     GithubApi
// }