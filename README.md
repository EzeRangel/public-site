### Bolt Installer for Composer

This is a custom workflow based on Bolt CMS and InuitCSS framework.

## Initial Setup

You must have Composer installed, if you don't just run `./install-composer`

Once Composer is installed just run:

`./install`

## Theme development

Go to `theme/base-2016_dev/source/` and run `npm start`

## Project reviews

To generate a public preview for reviewing use [ngrok](https://ngrok.com/) on the project root:

`ngrok http -host-header=rewrite ${PWD##*/}.dev:80`

## Production build

On `theme/base-2016_dev/source/` directory run `npm run build`

See the README file in `theme/base-2016_dev/source/` to learn more about modifying the current theme.
