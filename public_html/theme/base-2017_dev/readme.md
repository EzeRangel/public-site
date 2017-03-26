Base-2017 Theme
====================

This is a blank theme for Bolt, built on top of
[InuitCSS](https://github.com/inuitcss/inuitcss). I hardly recommend
checking [Harry Robert's CSS Guidelines](http://cssguidelin.es/)

Features included with Base-2017
--------------------------------

Base-2017 is a simple bare theme with a basic component oriented structure.
The goal is provide to the developer a very quick way to start a Bolt project.
The theme includes:

 - Sass(scss) or CSS Versions
 - InuitCSS framework
 - Optional Bower and Gulp Support
 - Some basic but useful JS scripts (js testing included)
 - ... and much more :)

Requirements
--------------------------

As an opinionated workflow it has an predifined way to use the base
components, but if for any reason you don't like some parts of it
you can remove it or adapt it as you like.

You can use use Gulp, Codekit or any other tool you want
for building your theme.

This theme does include Bower and Gulp files, and is optimized for a
Gulp-based workflow. Gulp is highly recommended.

File Structure
--------------

These are the most important files, included in this theme.

```
.
├── css/
│   └── main.css             - Theme-specific (... and compiled) CSS
├── images/                  - Image files for this theme are put here
│   └── favicons/            - Folder used for generated favicons
├── js/
│   ├── app.min.js           - Theme-specific Javascript
│   ├── tests.js             - Compiled Mocha/Chai testing libraries
│   └── jquery.min.js        - The jQuery javascript library
├── partials/
│   ├── _aside.twig          - Partial for the sidebar. With fixed content, or widgets
│   ├── _footer.twig         - Partial for the footer below every page
│   ├── _header.twig         - Partial for the header banner with the site title.
│   ├── _master.twig         - Twig template, that is uses to 'extend' all pages (See 'template inheritance')
│   ├── _recordfooter.twig   - Partial with meta-information below a page or entry
│   ├── _sub_menu.twig       - Partial with macro for rendering the drop-down menu
│   └── _topbar.twig         - Partial containing the top menu bar
├── source/
│   ├── scss/
│   │   ├── main.scss        - SCSS source file for the theme. It uses inuitcss and is compiled to `css/main.css`.
│   │                            It has its own documentation.
│   ├── js/
│   │   ├── util.js          - Script for globally and useful scoped functions.
│   │   ├── app.js           - Main JS theme and also scoped scripts.
│   │   ├── test/
│   │   │   ├── app.js       - JS testing demo file.
│   ├── .babelrc             - Helper file for gulp / npm
│   ├── bower.json           - Configuration for used Bower packages.
│   ├── gulpfile.js          - Build task script for Gulp.
│   └── package.json         - Configuration for used Node / Gulp packages.
├── CHANGELOG.md             - List of versions, and their respective changes.
├── index.twig               - Template used for 'home'
├── listing.twig             - Template used for 'listings', like `/pages` or `/category/movies`
├── notfound.twig            - Template used for the '404 not found' pages
├── page.twig                - Template used for single record pages, like `/page/lorem-ipsum`
├── readme.md                - This file. :-)
├── record.twig              - Generic template used for single record pages, that don't have a specific template set.
├── search.twig              - Template used for listing search results.
└── theme.yml                - Theme-specific configuration.
```

Installation
------------

No need to install anything. This theme comes with Bolt. Don't forget to set
`theme: base-2017_dev` in your `config.yml` file, if it doesn't show up already.

Modifying the HTML of the theme
-------------------------------

All HTML parts of the theme are made in Twig. If you're not familiar with Twig
yet, be sure to read the Bolt documentation on Twig, as well as the official
Twig documentation.

This theme uses a concept called 'template inheritance'. From other themes or
CMS'es, you might be familiar with seeing each page 'include' a header and a
'footer'. Instead, we have one 'master' template, which are extended by each of
the different templates. You can read more about this concept on the
[Twig site - Template Inheritance](http://twig.sensiolabs.org/doc/tags/extends.html)
or here: [Dealing With Themes And Layouts With Twig](http://hugogiraudel.com/2013/11/12/themes-layouts-twig/)

For example, take a look at one of the simpler templates, `record.twig`:

```twig
{% extends 'partials/_master.twig' %}

{% block main %}

        <h1>{{ record.title }}</h1>

        {{ fields() }}

        {{ include('partials/_recordfooter.twig', { 'record': record }) }}

{% endblock main %}
```

You'll notice the first line that states that the template 'extends' the
`_master.twig` partial. The rest of the template is the `{% block %}`, which
overrides the 'main' block in the master template. Inside the block is just an
`<h1>`-tag with the record's title, a `{{ fields() }}` tag that will output the
fields that are defined for this contenttype, and it closes with an include of
`_recordfooter.twig` to display some meta data, like the author, date and
permalink.

As you can see, we can still use 'include' for small blocks of HTML, even though
we're using template inheritance. This way we can keep our themes very
structured and organized.

In the diagram below, you'll see the wat most pages are structured. In this case,
`index.twig`. In the HTML, you will see it extends `_master.twig`, which can be found in
the `partials/` folder. Inside this file, the global structure of all pages is laid out:
The basic HTML structure, and a handful of other included partials.

```
 index.twig structure                     _topbar.twig

                                               │
                     ├─────────────────────────┴────────────────────────────────┤

                    ┌────────────────────────────────────────────┬───────────────┐
 _sub_menu.twig ──▶ │  Home link1 link2 link3                    │______ [Search]│ ◀── _search.twig
                    ├────────────────────────────────────────────┴───────────────┤
                    │••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••│
                    │•••••••••••••••••••••••(header image)•••••••••••••••••••••••│ ◀── _header.twig
                    │•••••••••••••••••••••••(name of site)•••••••••••••••••••••••│
                    │••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••│
                    │ ┌──────────────────(main content)─┐ ┌────────────(aside)─┐ │
                    │ │Lorem ipsum dolor sit amet       │ │Lorem ipsum dolor   │ │
                    │ │                                 │ │sit amet. Consec-   │ │
                    │ │Consectetur adipiscing elit. Nunc│ │tetur adipiscing.   │ │
                    │ │omni virtuti vitium contrario    │ │                    │ │
                    │ │nominehgpponitur. Non enim, si   │ │Latest X            │ │
                    │ │malum est dolor, carere eo malo  │ │ - intellegetur     │ │
                    │ │satis est ad bene vivendum. Duo  │ │ - Expectoque       │ │
                    │ │Reges: constructio interrete.    │ │ - videantur        │ │ ◀── _aside.twig
                    │ │                                 │ │                    │ │
                    │ └─────────────────────────────────┘ │Latest Y            │ │
                    │ ┌─────────────────────────────────┐ │ - intellegetur     │ │
                    │ │Lorem ipsum dolor sit amet       │ │ - Expectoque       │ │
                    │ │                                 │ │ - videantur        │ │
                    │ │Consectetur adipiscing elit. Nunc│ │                    │ │
                    │ │omni virtuti vitium contrario    │ │                    │ │
                 ┬  ├─┴─────────────────────────────────┴─┴────────────────────┴─┤
  _footer.twig ──┤  │ (C) 2016                          Home link1 link2 link3   │ ◀── _sub_menu.twig
                 ┴  └────────────────────────────────────────────────────────────┘

                   ├────────────────────────────┬─────────────────────────────────┤
                                                │

                                           _master.twig
```

Working with the `.twig` files
------------------------------

You are free to do what you want, when it comes to the .twig files. Out-of-the-
box, this theme comes with a handful of templates, that correspond to
the default contenttypes when you have a fresh install of Bolt.

Most of the templates will be pretty straightforward, especially if you're
familiar with the concept of Template Inheritance. The main templates are:

 - `index.twig`: Used as the frontpage or homepage of the site.
 - `listing.twig`: This template is used for listing overviews of all kind, like
   `/pages` for all records in the 'pages contenttype' or `category/movies` for
   all records that have the 'movies' category assigned to them. Note that
   'search' uses its own template, though.
 - `notfound.twig`: This template is used as the template that's shown when the
   visitor hits a non-existing page on the website.
 - `page.twig`: The detail page for a single record of the 'pages' contenttype.
   Automatically picked up by Bolt, if the name matches.
 - `record.twig`: The "generic" detail page for a single record page. This is
   used as the fallback, if there's no specific template set for a single record
   page.
 - `search.twig`: This page displays the search results and a search box, to
   search again.
 - `styleguide.twig`: A sample page, showing most of the common typograhy
   options, form elements, as well as other components supplied by Foundation 6.
   Use your browser to go to `/styleguide` to view this page.


Working with the `.scss` files
------------------------------

This theme uses Node and NPM to run the tasks to compile and minify the Sass
files. If you don't have Node and NPM yet, install them from [Nodejs.org](https://nodejs.org).

To install the themes dependencies, run the following in the source directory:

```
npm install
```

Now you can simply run `npm start` to compile the javascript and sass files.
This will build the files, and it will continue to monitor changes to the
`.scss` files. If you make a change, the compiled files will be updated
immediately. When you're ready to deploy, and put the site in production, be
sure to build the files and minify them:

```
npm run build
```

This will build the files that you can deploy, or put into your versioning
system.

The build process has been tested on NPM 3.7.3 and Node v5.8.0. If you do not
have the correct versions you can use [n](https://www.npmjs.com/package/n) to
manage your Node and NPM versions:

```
sudo npm install -g n;
sudo n stable
```

And then go through the above steps again.

If you're interested to learn more about the process these two tutorials on
Gulp (which is what we use under the hood) might be of interest to you:

 - https://markgoodyear.com/2014/01/getting-started-with-gulp/
 - https://travismaynard.com/writing/getting-started-with-gulp
