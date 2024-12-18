import { defineConfig } from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/noteweb/",
  title: "文档站点",
  //设置图标,public文件夹中
  head: [["link", { rel: "icon", href: "/noteweb/logo.svg" }]],
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: '我的简历', link: './resume' },
      { text: '我的简历', link: 'documents/东北师范大学-刘章阳.pdf', target: '_blank' },
      { text: 'Home', link: '/' },
      { text: "Java", link: '/Java/Java笔记' },
      { text: "C++", link: '/C++/C++ STL' },
      { text: "Python", link: '/Python/Python容器' },
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
      '/Python': [
        { text: "Python容器", link: '/Python/Python容器' },
        { text: "Python常用及语法糖", link: '/Python/Python常用及语法糖' },
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
        { text: "技巧", link: '/LeetCode/技巧' },
        { text: "剑指Offer", link: '/LeetCode/剑指Offer' },
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
      { icon: 'github', link: 'https://github.com/6330A' },
      {
        icon:
        {
          svg: '<svg t="1734559388707" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="25692" width="256" height="256"><path d="M286.38701396 116.49259228h452.22573085a113.03111172 113.03111172 0 0 1 112.92982928 112.92983004v452.22573086h-678.59180162V229.42242232A113.13239417 113.13239417 0 0 1 286.38701396 116.49259228z" fill="#FB6321" p-id="25693"></path><path d="M158.77124189 422.87172737l339.80231304 193.9557165a27.44751915 27.44751915 0 0 0 27.85264892-1e-8l338.78948859-193.95571649a28.15649549 28.15649549 0 0 1 38.48729629 10.63464736 26.83982526 26.83982526 0 0 1 3.54488244 14.17953055v346.89207718a113.03111172 113.03111172 0 0 1-112.92982927 112.92983004H229.66889322A113.03111172 113.03111172 0 0 1 116.73906317 794.57798246V447.68590529a28.30841915 28.30841915 0 0 1 28.35906037-28.35906036 32.25843138 32.25843138 0 0 1 13.67311835 3.54488244z" fill="#FC703E" p-id="25694"></path><path d="M692.52927142 293.73672019H301.07295598a25.92828403 25.92828403 0 0 1-25.8270016-25.82700159 25.92828403 25.92828403 0 0 1 25.8270016-25.8270016h390.94990399a25.92828403 25.92828403 0 0 1 25.82700083 25.8270016 25.32058938 25.32058938 0 0 1-25.32058938 25.82700158zM542.12496877 424.89737394H301.07295598a25.92828403 25.92828403 0 0 1-25.8270016-25.82700083 25.92828403 25.92828403 0 0 1 25.8270016-25.82700158H542.12496877a25.92828403 25.92828403 0 0 1 25.82700158 25.82700159 25.6244367 25.6244367 0 0 1-25.82700158 25.82700082z" fill="#FFFFFF" p-id="25695"></path></svg>'
        }
        , link: 'documents/东北师范大学-刘章阳.pdf', target: '_blank'
      },

    ],

    footer: {
      copyright: "Powered by <strong>vitepress</strong> | Copyrigtht © 2024.5.21-2025 | <strong>NENU</strong> License"
    }

  },
  markdown: {
    math: true
  }
})
