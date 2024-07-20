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
      { text: "LeetCode", link: '/LeetCode/哈希' },
      { text: "Help", link: '/Help/网站部署' },
    ],

    sidebar: {
      '/Java': [
        { text: "Java笔记", link: '/Java/Java笔记' },
        { text: "Java字符串", link: '/Java/Java字符串' },
        { text: "Java常用集合和数据结构", link: '/Java/Java常用集合和数据结构' },
        { text: "Java其他内容", link: '/Java/Java其他内容' },
        { text: "Java-Stream", link: '/Java/Java-Stream' },
        { text: "反射&动态代理", link: '/Java/反射&动态代理' },
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
        { text: "Linux 命令", link: '/Help/Linux 命令.md' },
        { text: "Typora基础教程", link: '/Help/Typora基础教程.md' },
      ],
      '/LeetCode': [
        { text: "哈希", link: '/LeetCode/哈希' },
        { text: "双指针", link: '/LeetCode/双指针' },
        { text: "滑动窗口", link: '/LeetCode/滑动窗口' },
        { text: "子串", link: '/LeetCode/子串' },
        { text: "普通数组", link: '/LeetCode/普通数组' },
        { text: "矩阵", link: '/LeetCode/矩阵' },
        { text: "链表", link: '/LeetCode/链表' },
        { text: "二叉树", link: '/LeetCode/二叉树' },
        { text: "图论", link: '/LeetCode/图论' },
        { text: "回溯", link: '/LeetCode/回溯' },
        { text: "二分查找", link: '/LeetCode/二分查找' },
        { text: "栈", link: '/LeetCode/栈' },
        { text: "堆", link: '/LeetCode/堆' },
        { text: "贪心", link: '/LeetCode/贪心' },
        { text: "动态规划", link: '/LeetCode/动态规划' },
        { text: "多维动态规划", link: '/LeetCode/多维动态规划' },
        { text: "技巧", link: '/LeetCode/技巧' }
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
      { icon: 'github', link: 'https://github.com/6330A' }
    ],

    footer: {
      copyright: "Powered by <strong>vitepress</strong> | Copyrigtht © 2024.5.21-2025 | <strong>NENU</strong> License"
    }
    
  },
  markdown: {
    math: true
  }
})
