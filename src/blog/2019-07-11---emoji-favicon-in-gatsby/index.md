---
path: "/blog"
date: "2019-07-11"
title: "Emoji Favicon in Gatsby"
lang: "en"
tags: ["gatsby", "favicon", "tips", "beginner"]
---

There are two reasons why I want to use an emoji as a favicon. First, I don't have the skills to make an icon that looks good. Second, I love emojis. I use them on daily basis so why not use them as favicons. I am sure there are others like me.

### Getting the emoji

To get the emoji, I go to [Emojipedia](https://emojipedia.org) and find the one I like. You can also see how an emoji looks different across platforms. ~~For me, ✌️iOS 12.2 version looks perfect.~~ Octopuses are my favorite animals now. So I am changing my favicon to an [octopus!](https://emojipedia.org/apple/ios-13.3/octopus/).

Next, I download the emoji image and put it in my project folder, e.g. `src/images/favicon.png`.

### Setting up favicon

Since I am using [Gatsby](https://www.gatsbyjs.org) to run my site, it is very easy to set up favicon. I just need to install a plugin called [gatsby-plugin-manifest](https://www.npmjs.com/package/gatsby-plugin-manifest) and configure like below in `gatsby-config.js` file.
```shell
npm install --save gatsby-plugin-manifest
```

```javascript
// gatsby-config.js
module.exports = {
  siteMetadata: {
    title: 'Spencer Aung'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'spencer-aung-blog',
        short_name: 'spencer',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png' // This path is relative to the root of the site.
      }
    }
    /* other plugins */
  ]
}
```

### Build the project again

And.... we are done! This is how I setup the favicon for my blog. ✌️🐙
