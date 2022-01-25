/**
 * @description Branch
 * [doc] {@link https://docs.github.com/en/rest/reference/branches}
 */
export namespace IBranch {
    // region [GET] /repos/{owner}/{repo}/branches
    /**
     * @description item of branchList <br/>
     * @description `[GET] /repos/{owner}/{repo}/branches`
     * [doc]{@link https://docs.github.com/en/rest/reference/branches#list-branches}
     */
    export interface BranchOverview {
        "name": string
        "commit": {
            "sha": string
            "url": string
        }
        "protected": boolean
        "protection": {
            "required_status_checks": {
                "enforcement_level": string
                "contexts": string[]
            }
        }
        "protection_url": string
    }
    // endregion

    // region [GET] /repos/{owner}/{repo}/branches/{branch}
    /**
     * @description details of branch <br/>
     * @description `[GET] /repos/{owner}/{repo}/branches/{branch}`
     * [doc]{@link https://docs.github.com/en/rest/reference/branches#get-a-branch}
     */
    export interface BranchDetail {
        "name": string
        "commit": {
            "sha": string
            "node_id": string
            "commit": {
                "author": {
                    "name": string
                    "email": string
                    "date": string
                }
                "committer": {
                    "name": string
                    "email": string
                    "date": string
                }
                "message": string
                "tree": {
                    "sha": string
                    "url": string
                }
                "url": string
                "comment_count": number
                "verification": {
                    "verified": boolean
                    "reason": string
                    "signature": null
                    "payload": null
                }
            }
            "url": string
            "html_url": string
            "comments_url": string
            "author": null
            "committer": null
            "parents": {
                "sha": string
                "url": string
                "html_url": string
            }[]
        }
        "_links": {
            "self": string
            "html": string
        }
        "protected": boolean
        "protection": {
            "enabled": boolean
            "required_status_checks": {
                "enforcement_level": "on" | "off"
                "contexts": string[]
                "checks": string[]
            }
        }
        "protection_url": string
    }
    // endregion
}

/**
 * @description Repository
 * [doc] {@link https://docs.github.com/en/rest/reference/repos}
 */
export namespace IRepository {
    // region [GET] /user/repos
    /**
     * @description `[GET] /user/repos`
     * [doc]{@link https://docs.github.com/en/rest/reference/repos#list-repositories-for-the-authenticated-user}
     */
    export interface Repo {
        "id": number
        "node_id": string
        "name": string
        "full_name": string
        "owner": IUser.User
        "private": boolean
        "html_url": string
        "description": string
        "fork": boolean
        "url": string
        "archive_url": string
        "assignees_url": string
        "blobs_url": string
        "branches_url": string
        "collaborators_url": string
        "comments_url": string
        "commits_url": string
        "compare_url": string
        "contents_url": string
        "contributors_url": string
        "deployments_url": string
        "downloads_url": string
        "events_url": string
        "forks_url": string
        "git_commits_url": string
        "git_refs_url": string
        "git_tags_url": string
        "git_url": string
        "issue_comment_url": string
        "issue_events_url": string
        "issues_url": string
        "keys_url": string
        "labels_url": string
        "languages_url": string
        "merges_url": string
        "milestones_url": string
        "notifications_url": string
        "pulls_url": string
        "releases_url": string
        "ssh_url": string
        "stargazers_url": string
        "statuses_url": string
        "subscribers_url": string
        "subscription_url": string
        "tags_url": string
        "teams_url": string
        "trees_url": string
        "clone_url": string
        "mirror_url": string
        "hooks_url": string
        "svn_url": string
        "homepage": string
        "language": string
        "forks_count": number
        "stargazers_count": number
        "watchers_count": number
        "size": number
        "default_branch": string
        "open_issues_count": number
        "is_template": boolean
        "topics": string[]
        "has_issues": boolean
        "has_projects": boolean
        "has_wiki": boolean
        "has_pages": boolean
        "has_downloads": boolean
        "archived": boolean
        "disabled": boolean
        "visibility": string
        "pushed_at": string
        "created_at": string
        "updated_at": string
    }
    // endregion

    // region [GET] /repos/{username}/{repo}/git/trees/{sha}
    /**
     * @description `[GET] /repos/{username}/{repo}/git/trees/{tree_sha}` <br/>
     * @description returns a single tree using the SHA1 value for that tree
     * [doc]{@link https://docs.github.com/en/rest/reference/git#get-a-tree}
     */
    export interface Tree {

    }
    // endregion
}

/**
 * @description User
 * [doc] {@link https://docs.github.com/en/rest/reference/users}
 */
export namespace IUser {
    // region [GET] /user
    /**
     * @description `[GET] /user`
     * [doc]{@link https://docs.github.com/en/rest/reference/users#get-the-authenticated-user}
     */
    export interface User {
        "login": string
        "id": number
        "node_id": string
        "avatar_url": string
        "gravatar_id": string
        "url": string
        "html_url": string
        "followers_url": string
        "following_url": string
        "gists_url": string
        "starred_url": string
        "subscriptions_url": string
        "organizations_url": string
        "repos_url": string
        "events_url": string
        "received_events_url": string
        "type": string
        "site_admin": boolean
        "name": string
        "company": string
        "blog": string
        "location": string
        "email": string
        "hireable": boolean
        "bio": string
        "twitter_username": string
        "public_repos": number
        "public_gists": number
        "followers": number
        "following": number
        "created_at": string
        "updated_at": string
        "private_gists": number
        "total_private_repos": number
        "owned_private_repos": number
        "disk_usage": number
        "collaborators": number
        "two_factor_authentication": boolean
        "plan": {
            "name": string
            "space": number
            "private_repos": number
            "collaborators": number
        }
    }
    //endregion
}