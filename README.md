# Storyteller UI

> You can review the auto-generated README from CRA [here](./md/CRA.md)

<!-- TOC -->
* [Storyteller UI](#storyteller-ui)
  * [Running tests](#running-tests)
  * [Setting up a review app](#setting-up-a-review-app)
    * [Deploy and setup a HTTPS link for the review app](#deploy-and-setup-a-https-link-for-the-review-app)
    * [Setting up the Google OAuth credentials](#setting-up-the-google-oauth-credentials)
  * [Additional documentation](#additional-documentation)
  * [Important Links](#important-links)
<!-- TOC -->

## Running tests

To run all specs locally and review code coverage, execute the following command:

```shell
npm test -- --watchAll --ci --coverage
```

## Setting up a review app

You need to complete the following steps to setup a review app:

1. Deploy the app and alias the deployment to the review app URL
2. Create Google OAuth credentials for the review app

### Deploy and setup a HTTPS link for the review app

To deploy a review app, run the following command:

```shell
npm run deploy:review
```

This will output the URL of the deployed app. The successful output will look like this:

```shell
Vercel CLI 32.2.5
Inspect: https://vercel.com/donnadieu/storyteller-ui/39caJpBscLQs27Zr82ousRcyPLSH [5s]
Preview: https://storyteller-gqd5qgk48-donnadieu.vercel.app [5s]
To deploy to production (storyteller-ui.vercel.app +1), run `vercel --prod`
Vercel CLI 32.2.5
> Assigning alias storyteller-gqd5qgk48-donnadieu.storysprout.app to deployment storyteller-gqd5qgk48-donnadieu.vercel.app
> Certificate for storyteller-gqd5qgk48-donnadieu.storysprout.app (cert_N3EHDLmsG1WQMfp0yg0lzsO0) created [5s]
Deployment successful! Visit https://storyteller-gqd5qgk48-donnadieu.storysprout.app to view your deployment.
```

For the help menu on the deploy command, run:

```shell
bin/thor cli help deploy
```

### Setting up the Google OAuth credentials

1. Navigate to [the production app OAuth 2.0 credentials in GCP](https://console.cloud.google.com/apis/credentials/oauthclient/379296321415-jgho4jnm22cm7p3haipuinsvd8cg84av.apps.googleusercontent.com?project=macro-pulsar-390018)
2. Add the deployment URL to the "Authorized JavaScript origins" list

## Additional documentation

- [Thor executable wiki](https://github.com/rails/thor/wiki/Making-An-Executable)
  - [Writing, using and testing Thor scripts](https://technology.doximity.com/articles/move-over-rake-thor-is-the-new-king)
  - [Option data types](https://github.com/rails/thor/wiki/Method-Options#types-for-method_options)
  - [Building a Ruby CLI with Thor](https://marsbased.com/blog/2020/04/27/building-ruby-cli-thor/)
- [Reusable workflows for GitHub actions](https://docs.github.com/en/actions/using-workflows/reusing-workflows#nesting-reusable-workflows)

## Important Links

- [`jsxBracketSameLine` option for Prettier is deprecated](https://prettier.io/blog/2021/09/09/2.4.0.html#:~:text=This%20release%20renames%20the%20jsxBracketSameLine,such%20as%20class%20static%20blocks)
