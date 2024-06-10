import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:"/noteweb/",
  title: "文档站点",
  //设置图标,public文件夹中
  head: [["link", { rel: "icon", href: "/noteweb/logo.svg" }]],
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: "Java", link: '/Java/Java笔记' },
      { text: "C++", link: '/C++/C++ STL' },
      { text: "MySQL", link: '/MySQL/MySQL基础' },
      { text: "Help", link: '/Help/网站部署' },
    ],

    sidebar: {
      '/Java': [
        { text: "Java笔记", link: '/Java/Java笔记' },
        { text: "Java字符串", link: '/Java/Java字符串' },
        { text: "Java常用集合和数据结构", link: '/Java/Java常用集合和数据结构' },
        { text: "Java其他内容", link: '/Java/Java其他内容' },
        { text: "多线程基础1", link: '/Java/多线程基础1' },
        { text: "多线程基础2", link: '/Java/多线程基础2' },
        { text: "JUC", link: '/Java/JUC' }
      ],
      '/C++': [
        { text: "C++ STL", link: '/C++/C++ STL' },
      ],
      '/MySQL': [
        { text: "MySQL基础", link: '/MySQL/MySQL基础' },
      ],
      '/Help': [
        { text: "网站部署", link: '/Help/网站部署' },
        { text: "Git 介绍", link: '/Help/Git 介绍.md' },
      ],
    },
    

    // 隐藏目录结构，同理可以隐藏sidebar
    // sidebar: false,
    aside: false,
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/6330A/noteweb' }
    ],

    footer: {
      copyright: "Powered by <strong>vitepress</strong> | Copyrigtht © 2024.5.21-2025 | <strong>NENU</strong> License"
    }
    
  }
})
