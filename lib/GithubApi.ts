import axios, {AxiosRequestHeaders} from "axios";
import {IUser, IRepository, IBranch} from './GithubApiInterface'

// @ts-ignore
import {writeFileSync} from 'fs'

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

    // region [GET] /repos/{username}/{repo}/branches
    getBranchList(repoName: string): Promise<IBranch.BranchOverview[]> {
        return this._GET(`/repos/${this.username}/${repoName}/branches`)
    }
    // endregion

    // region /repos/lopo12123/lopo-lib/branches/master
    // undone
    getBranchDetail() {

    }
    // endregion

    // region [GET] /user/repos
    getRepos(): Promise<IRepository.Repo[]> {
        return this._GET(`/user/repos`)
    }
    // endregion

    // region [GET] /repos/{username}/{repo}/git/trees/{sha}
    getTrees(repoName: string, shaSum: string) {
        return this._GET(`repos/${this.username}/${repoName}/git/trees/${shaSum}`)
    }
    // endregion

    // region [GET] /user
    getUser(): Promise<IUser.User> {
        return this._GET('/user')
    }
    // endregion
}

const api = new GithubApi('lopo12123', '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')

console.time('api')
api.getRepos()
    .then((res) => {
        // console.log(JSON.stringify(res))
        writeFileSync('../test/res.json', JSON.stringify(res), { encoding: 'utf-8' })
        console.log('done')
        console.timeEnd('api')
    })
    .catch((err) => {
        console.log(err)
        console.timeEnd('api')
    })

// export {
//     GithubApi
// }