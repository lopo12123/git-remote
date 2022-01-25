import axios, {AxiosRequestHeaders} from "axios";
import {IUser, IRepository, IBranch} from "./GithubApiInterface";
import {Buffer} from "buffer";
import {readFileSync} from "fs";

// @ts-ignore
import {writeFileSync} from 'fs'
import path from "path";

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

    protected _Base64(ori: string | Buffer, type: 'encode' | 'decode') {
        if(type === 'encode') {
            return Buffer.from(ori).toString('base64')
        }
        else {
            return Buffer.from(ori as string, 'base64')
        }
    }

    public _GET(url: string): Promise<any>{
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
    public _POST(url: string): Promise<any> {
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
    public _PUT(url: string, body: any): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.put(url, body, this.axiosConfig)
                .then(({data}) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
    public _DELETE(url: string, body: any): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.delete(url, {...this.axiosConfig, data: body})
                .then(({data}) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    // region [PUT] /repos/{owner}/{repo}/contents/{path}
    /**
     * @description create/update some resource
     * @param filePath local path
     * @param repoName repo
     * @param fileFullPath remote path
     * @param msg message
     * @param file_sha if [update], this is required
     */
    contentUpdate(filePath: string, repoName: string, fileFullPath: string, msg: string = '', file_sha?: string) {
        const bitmap = readFileSync(filePath)

        const body: IRepository.RequestBody = {
            message: msg,
            content: this._Base64(bitmap, 'encode').toString()
        }
        if(!!file_sha) body.sha = file_sha
        return this._PUT(`/repos/${this.username}/${repoName}/contents/${fileFullPath}`, body)
    }
    // endregion

    // region [DELETE] /repos/{user}/{repo}/contents/{path}/{filename}
    /**
     * @description delete some resource
     * @param repoName repo
     * @param fileFullPath remote path
     * @param msg message
     * @param file_sha sha of the resource
     */
    contentDelete(repoName: string, fileFullPath: string, msg: string, file_sha: string) {
        const body: IRepository.RequestBody = {
            message: msg,
            sha: file_sha
        }
        return this._DELETE(`/repos/${this.username}/${repoName}/contents/${fileFullPath}`, body)
    }
    // endregion

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
}

// test
const api = new GithubApi('lopo12123', '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')

console.time('api')
api.getBranchDetail('test-can')
// api.contentDelete('test-can', 'deep/test1.txt', 'delete test 2', 'b6fc4c620b67d95f953a5c1c1230aaab5db5a1b0')
// api.contentUpdate(path.resolve('../test/test.txt'), 'test-can', 'deep/test1.txt', 'test create')
    .then((res) => {
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