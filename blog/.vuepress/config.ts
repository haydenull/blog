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
      name: "Haydenull",
      avatar: "/img/avatar.jpg",
      description: "战斗的罪孽，由我来背负",
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
        path: "/img/home-bg/1.jpg",
        mask: "rgba(40, 57, 101, .4)"
      },
      {
        path: "/img/home-bg/2.jpg",
        mask: "rgba(196, 176, 131, .1)"
      },
      {
        path: "/img/home-bg/3.jpg",
        mask: "rgba(68, 74, 83, .1)"
      },
      {
        path: "/img/home-bg/4.jpg",
        mask: "rgba(19, 75, 50, .2)"
      },
      {
        path: "/img/home-bg/5.jpg"
      }
    ],

    // other pages
    pages: {
      tags: {
        subtitle: "Black Sheep Wall",
        bgImage: {
          path: "/img/pages/tags.jpg",
          mask: "rgba(211, 136, 37, .5)"
        }
      },
      links: {
        subtitle:
          "When you are looking at the stars, please put the brightest star shining night sky as my soul.",
        bgImage: {
          path: "/img/pages/links.jpg",
          mask: "rgba(64, 118, 190, 0.5)"
        }
      }
    },

    themePlugins: {
      // only enable git plugin in production mode
      git: isProd,
      katex: true,
      giscus: {
        repo: "This-is-an-Apple/blog-giscus-comments",
        repoId: "R_kgDOGl2SjQ",
        category: "Announcements",
        categoryId: "DIC_kwDOGl2Sjc4CAcxK",
        darkTheme: "https://blog.haydenhayden.com/styles/giscus-dark.css"
      },
      mdPlus: {
        all: true
      },
      ga: "G-HCQSX53XFG",
      ba: "75381d210789d3eaf855fa16246860cc",
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
        text: "About",
        link: "https://zxh.io",
        icon: "fa-paw"
      },
      {
        text: "Portfolio",
        link: "https://portfolio.zxh.io/",
        icon: "oi-rocket"
      }
    ],

    footer: `
      &copy; <a href="https://github.com/Haydenull" target="_blank">Haydenull</a> 2018-2022
      <br>
      Powered by <a href="https://v2.vuepress.vuejs.org" target="_blank">VuePress</a> &
      <a href="https://github.com/Haydenull/vuepress-theme-gungnir" target="_blank">Gungnir</a>
    `
  }),

  markdown: {
    headers: {
      level: [2, 3, 4, 5]
    },
    code: {
      lineNumbers: false
    }
  }
});
