module.exports = async (github, context) => {
    let newVersion = "0.0.0";

    // get current version from latest release tag
    const latestRelease = await github.rest.repos.getLatestRelease({
        owner: context.repo.owner,
        repo: context.repo.repo,
    }).catch(e => {
        // only catch 404 - no releases - scenario and return undefined
        if (e?.status != 404) {
            throw e
        }
        console.log('no releases found');
    });
    const tagName = latestRelease?.data?.tag_name;
    if (!tagName) {
        console.log(`next version: ${newVersion}`);
        return newVersion;
    }

    console.log('latestPublishedTime', latestRelease.data.published_at)
    const latestPublishedTime = new Date(latestRelease.data.published_at);

    // extract major, minor and patch numbers from the latest release tag
    const [major, minor, patch] = tagName.replace(/^v/, "").split(".").map((x) => parseInt(x));

    console.log('latestTag', tagName)

    // get all pull requests merged since the latest tag was created
    const { data: prs } = await github.rest.pulls.list({
        owner: context.repo.owner,
        repo: context.repo.repo,
        state: 'closed',
        base: 'main',
    });
    const pullRequestsSinceLatestRelease = prs.filter(pr => new Date(pr.closed_at) > latestPublishedTime);

    console.log('pullRequestsSinceLatestRelease', pullRequestsSinceLatestRelease.map(pr => ({
        title: pr.title,
        number: pr.number,
        state: pr.state,
        closed_at: pr.closed_at,
        labels: pr.labels.map(label => label.name),
    })))

    // compute the new version based on labels of the current pull request
    const labels = pullRequestsSinceLatestRelease.flatMap(pr => pr.labels.map(label => label.name));

    newVersion = labels.includes('major')
        ? `${major + 1}.0.0`
        : labels.includes('minor')
            ? `${major}.${minor + 1}.0`
            : labels.includes('patch')
                ? `${major}.${minor}.${patch + 1}`
                : undefined;

    if (newVersion) {
        console.log(`next version: ${newVersion}`);
    } else {
        console.log('no new version required');
    }

    return newVersion;
};
