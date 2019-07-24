module.exports = {
  siteMetadata: {
    title: `Feeling`,
    description: `❤️ Smart mood tracking app for Android`,
    author: `@pavsidhu`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `feeling`,
        short_name: `feeling`,
        start_url: `/`,
        background_color: `#caeaf8`,
        theme_color: `#1b1b1b`,
        display: `browser`,
        icon: `src/images/favicon.png`
      }
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-typescript`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
