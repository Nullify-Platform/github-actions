import { Octokit, App } from 'octokit'
import script from './release-version.js'

const octokit = new Octokit({
    auth: '<insert-pat-here>'
});

script(octokit, {
    repo: {
        owner: 'Nullify-Platform',
        repo: 'The-Force',
    },
});
