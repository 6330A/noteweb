import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "文档站点",
  //设置图标,public文件夹中
  head: [["link", { rel: "icon", href: "/logo.svg" }]],
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: "Java", link: '/Java/Java笔记' },
      { text: "C++", link: '/C++/常用 C++ STL 用法' },
    ],

    sidebar: {
      '/Java': [
        { text: "Java笔记", link: '/Java/Java笔记' },
        { text: "Java常用STL", link: '/Java/Java常用STL' },
      ],
      '/C++': [
        { text: "常用 C++ STL 用法", link: '/C++/常用 C++ STL 用法' },
      ],
    },

    // 隐藏目录结构，同理可以隐藏sidebar
    // sidebar: false,
    aside: false,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
