### Bolt Installer for Composer

This is a custom workflow based on Bolt CMS and InuitCSS framework.

## Initial Setup

You must have Composer installed, if you don't just run `./install-composer`

Once Composer is installed just run:

`./install`

## Theme development

Go to `public_html/theme/base-2017_dev/source/` and run `npm start`

## Project reviews

To generate a public preview for reviewing use [ngrok](https://ngrok.com/) on the project root:

`ngrok http -host-header=rewrite ${PWD##*/}.dev:80`

## Production build

On `public_html/theme/base-2017_dev/source/` directory run `npm run build`

See the README file in `public_html/theme/base-2017_dev/source/` to learn more about modifying the current theme.
