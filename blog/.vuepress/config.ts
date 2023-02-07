import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import { gungnirTheme } from "vuepress-theme-gungnir";

const isProd = process.env.NODE_ENV === "production";

export default defineUserConfig({
  title: "Hayden Chen",
  description: "Hayden Chen (Haydenull).",

  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: `/img/logo/favicon-16x16.png`
      }
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: `/img/logo/favicon-32x32.png`
      }
    ],
    ["meta", { name: "application-name", content: "Hayden Chen" }],
    ["meta", { name: "apple-mobile-web-app-title", content: "Hayden Chen" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" }
    ],
    [
      "link",
      { rel: "apple-touch-icon", href: `/img/logo/apple-touch-icon.png` }
    ],
    ["meta", { name: "theme-color", content: "#377bb5" }],
    ["meta", { name: "msapplication-TileColor", content: "#377bb5" }]
  ],

  bundler: viteBundler(),

  theme: gungnirTheme({
    repo: "haydenull/blog",
    docsDir: "blog",
    docsBranch: "main",

    hitokoto: "https://v1.hitokoto.cn?c=i", // enable hitokoto (一言) or not?

    // personal information
    personalInfo: {
      name: "Hayden Chen",
      avatar: "/img/avatar.jpg",
      description: "银河在上",
      sns: {
        github: "Haydenull",
        twitter: "Haydenull",
        zhihu: "haydenut",
        email: "hayden.chen.b612@gmail.com",
        rss: "/rss.xml"
      }
    },

    // header images on home page
    homeHeaderImages: [
      {
        path: "https://pocket.haydenhayden.com/blog/202302021327315.jpg",
        mask: "rgba(40, 57, 101, .4)"
      },
      {
        path: "https://pocket.haydenhayden.com/blog/202302021328469.jpg",
        mask: "rgba(196, 176, 131, .1)"
      },
      {
        path: "https://pocket.haydenhayden.com/blog/202302021329272.jpg",
        mask: "rgba(68, 74, 83, .1)"
      },
      {
        path: "https://pocket.haydenhayden.com/blog/202302021329032.jpg",
        mask: "rgba(19, 75, 50, .2)"
      },
      {
        path: "https://pocket.haydenhayden.com/blog/202302021329644.jpg",
      },
      {
        path: "https://pocket.haydenhayden.com/blog/202302021335895.png",
        mask: "rgba(19, 75, 50, .3)",
      },
    ],

    // other pages
    pages: {
      tags: {
        subtitle: "Black Sheep Wall",
        bgImage: {
          path: "https://pocket.haydenhayden.com/blog/202302021331636.jpg",
          mask: "rgba(211, 136, 37, .5)"
        }
      },
      links: {
        subtitle:
          "When you are looking at the stars, please put the brightest star shining night sky as my soul.",
        bgImage: {
          path: "https://pocket.haydenhayden.com/blog/202302021330454.jpg",
          mask: "rgba(64, 118, 190, 0.5)"
        }
      },
    },

    themePlugins: {
      // only enable git plugin in production mode
      git: isProd,
      katex: true,
      giscus: {
        repo: process.env.GISCUS_REPO!,
        repoId: process.env.GISCUS_REPO_ID!,
        category: process.env.GISCUS_CATEGORY!,
        categoryId: process.env.GISCUS_CATEGORY_ID!,
        darkTheme: "https://blog.haydenhayden.com/styles/giscus-dark.css"
      },
      mdPlus: {
        all: true
      },
      ga: process.env.GOOGLE_ANALYTICS!,
      ba: process.env.BAIDU_ANALYTICS!,
      rss: {
        siteURL: "https://blog.haydenhayden.com",
        copyright: "Haydenull 2022-2023"
      }
    },

    navbar: [
      {
        text: "Home",
        link: "/",
        icon: "fa-fort-awesome"
      },
      {
        text: "Tags",
        link: "/tags/",
        icon: "fa-tag"
      },
      {
        text: "Links",
        link: "/links/",
        icon: "fa-satellite-dish"
      },
      {
        text: "Pocket",
        link: "/pocket/",
        icon: "fa-satellite-dish"
      },
      // {
      //   text: "About",
      //   link: "https://zxh.io",
      //   icon: "fa-paw"
      // },
      // {
      //   text: "Portfolio",
      //   link: "https://portfolio.zxh.io/",
      //   icon: "oi-rocket"
      // }
    ],

    footer: `
      &copy; <a href="https://github.com/Haydenull" target="_blank">Haydenull</a> 2022-2023
      <br>
      Powered by <a href="https://v2.vuepress.vuejs.org" target="_blank">VuePress</a> &
      <a href="https://github.com/Renovamen/vuepress-theme-gungnir" target="_blank">Gungnir</a>
    `
  }),

  markdown: {
    headers: {
      level: [2, 3, 4, 5]
    },
    code: {
      lineNumbers: true
    }
  }
});
