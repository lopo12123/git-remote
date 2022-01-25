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
    /**
     * @description item of branchList <br/>
     * @description `[GET] /repos/{owner}/{repo}/branches`
     * [doc]{@link https://docs.github.com/en/rest/reference/branches#list-branches}
     */
    getBranchList(repoName: string): Promise<IBranch.BranchOverview[]> {
        return this._GET(`/repos/${this.username}/${repoName}/branches`)
    }
    // endregion

    // region [GET] /repos/{username}/{repo}/branches/{branch}
    /**
     * @description details of branch <br/>
     * @description `[GET] /repos/{owner}/{repo}/branches/{branch}`
     * [doc]{@link https://docs.github.com/en/rest/reference/branches#get-a-branch}
     */
    getBranchDetail(repoName: string, branchNameOrSha: string = 'master') {
        return this._GET(`/repos/${this.username}/${repoName}/branches/${branchNameOrSha}`)
    }
    // endregion

    // region [GET] /repos/{username}/{repo}/git/trees/{tree_sha}
    /**
     * @description `[GET] /repos/{username}/{repo}/git/trees/{tree_sha}` <br/>
     * @description returns a single tree using the SHA1 value for that tree
     * [doc]{@link https://docs.github.com/en/rest/reference/git#get-a-tree}
     */
    getTrees(repoName: string, tree_sha: string, deep: boolean = false) {
        return deep ?
            this._GET(`repos/${this.username}/${repoName}/git/trees/${tree_sha}?recursive=1`) :
            this._GET(`repos/${this.username}/${repoName}/git/trees/${tree_sha}`)
    }
    // endregion

    // region [GET] /user/repos
    /**
     * @description `[GET] /user/repos`
     * [doc]{@link https://docs.github.com/en/rest/reference/repos#list-repositories-for-the-authenticated-user}
     */
    getRepos(): Promise<IRepository.Repo[]> {
        return this._GET(`/user/repos`)
    }
    // endregion

    // region [GET] /user
    /**
     * @description `[GET] /user`
     * [doc]{@link https://docs.github.com/en/rest/reference/users#get-the-authenticated-user}
     */
    getUser(): Promise<IUser.User> {
        return this._GET('/user')
    }
    // endregion

    // region
    sendCommit() {

    }
    // endregion
}

// test
const api = new GithubApi('lopo12123', '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')

// console.time('api')
// api.getBranchDetail('lopo-lib', 'master')
//     .then((res) => {
//         // console.log(JSON.stringify(res))
//         writeFileSync('../test/res.json', JSON.stringify(res), { encoding: 'utf-8' })
//         console.log('done')
//         console.timeEnd('api')
//     })
//     .catch((err) => {
//         console.log(err)
//         console.timeEnd('api')
//     })

// export {
//     GithubApi
// }