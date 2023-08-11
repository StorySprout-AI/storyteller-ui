# Storyteller UI

> You can review the auto-generated README from CRA [here](./md/CRA.md)

## Running tests

To run all specs locally and review code coverage, execute the following command:

```shell
npm test -- --watchAll --ci --coverage
```

## Authentication in development 

### Login with Apple

The `REACT_APP_APPLE_REDIRECT_URI` environment variable will need to be set to the proxy URL for your `:3006` frontend. This could be the HTTPS URL for your frontend app tunneled via NGROK, for example. 

When you set this environment variable, you will need to ensure that the redirect URL 

- Tunnels to your app running on `localhost:3006`
- Is added to the list of website URLs for your App Service. You can edit the app service [here](https://developer.apple.com/account/resources/identifiers/serviceId/edit/H5993XZFJ4)

## Additional documentation

- Reusable workflows for GitHub actions: <https://docs.github.com/en/actions/using-workflows/reusing-workflows#nesting-reusable-workflows>

## Important Links

- `jsxBracketSameLine` option for Prettier [is deprecated](https://prettier.io/blog/2021/09/09/2.4.0.html#:~:text=This%20release%20renames%20the%20jsxBracketSameLine,such%20as%20class%20static%20blocks)