<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="referrer" content="always" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>博客园 - 开发者的网上家园</title>
        <meta name="keywords" content="开发者,程序员,博客园,程序猿,程序媛,极客,码农,编程,代码,软件开发,开源,IT网站,技术社区,Developer,Programmer,Coder,Geek,Coding,Code" />
        <meta name="description" content="博客园是一个面向开发者的知识分享社区。自创建以来，博客园一直致力并专注于为开发者打造一个纯净的技术交流社区，推动并帮助开发者通过互联网分享知识，从而让更多开发者从中受益。博客园的使命是帮助开发者用代码改变世界。" />
    <link rel="shortcut icon" href="//common.cnblogs.com/favicon.ico?v=20200522" type="image/x-icon" />
    <link rel="Stylesheet" type="text/css" href="/css/aggsite-new.min.css?v=od-uCO1JDPS0DrCRWGfzoNY7jVN0uPKcwZySOf0ezHA" />
    <link rel="Stylesheet" type="text/css" href="/css/aggsite-mobile-new.min.css?v=r6EFLx4GwoOb7W2KN2mZRX9pyrUBVKma1ilCSpxvJdQ" media="only screen and (max-width: 767px)" />
        <link id="RSSLink" title="RSS" type="application/rss+xml" rel="alternate" href="http://feed.cnblogs.com/blog/sitehome/rss" />
    <script src="//common.cnblogs.com/script/jquery.js" type="text/javascript"></script>
    <script src="/js/aggsite-new.min.js?v=kgoQ400zXawTva_HptcoRuqiqRfpzgSqT-7PfqxMJ4s"></script>
    <script async='async' src='https://www.googletagservices.com/tag/js/gpt.js'></script>
    <script>
        var googletag = googletag || {};
        googletag.cmd = googletag.cmd || [];
    </script>
    <script>
        googletag.cmd.push(function () {
            googletag.defineSlot('/1090369/A1', [300, 60], 'div-gpt-ad-1547816814884-0').addService(googletag.pubads());
            googletag.defineSlot('/1090369/B1', [300, 250], 'div-gpt-ad-1546331539224-0').addService(googletag.pubads());
            googletag.defineSlot('/1090369/B2', [300, 250], 'div-gpt-ad-1539007469525-0').addService(googletag.pubads());
            googletag.defineSlot('/1090369/B3', [300, 250], 'div-gpt-ad-1546331252242-0').addService(googletag.pubads());
            googletag.defineSlot('/1090369/B4', [300, 250], 'div-gpt-ad-1546331385104-0').addService(googletag.pubads());
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
        });
    </script>
</head>
<body>
    <div id="wrapper" class="flow">
        <div id="top_nav" class="navbar">
            <nav id="nav_main" class="navbar-main">
                <ul id="nav_left" class="navbar-list navbar-left">
                    <li class="navbar-branding">
                        <a href="https://www.cnblogs.com/" title="开发者的网上家园"><img src="/images/logo.svg?v=R9M0WmLAIPVydmdzE2keuvnjl-bPR7_35oHqtiBzGsM" alt="博客园Logo" /></a>
                    </li>
                    <li><a href="/">首页</a></li>
                    <li><a href="https://news.cnblogs.com/">新闻</a></li>
                    <li><a href="https://q.cnblogs.com/">博问</a></li>
                    <li><a id="nav_brandzone" href="https://brands.cnblogs.com/">专区</a></li>
                    <li><a href="https://ing.cnblogs.com/">闪存</a></li>
                    <li><a href="https://edu.cnblogs.com/">班级</a></li>
                    <li><a id="nav_legacy" href="/legacy">怀旧</a></li>
                    <li class="dropdown">
                        <div class="dropdown-button">
                            <a href="javascript:void(0)">发现</a>
                            <img src="/images/aggsite/pulldown-light.svg" />
                        </div>
                        <div class="dropdown-menu">
                            <a href="https://home.cnblogs.com/">园子</a>
                            <a href="https://group.cnblogs.com/">小组</a>
                            <a href="https://wz.cnblogs.com/">收藏</a>
                            <a href="https://job.cnblogs.com/">招聘</a>
                            <a href="https://zzk.cnblogs.com/">找找看</a>
                        </div>
                    </li>
                </ul>
                <ul id="nav_right" class="navbar-list navbar-right">
                    <li>
                        <form id="zzk_search" class="navbar-search" action="https://zzk.cnblogs.com/s" method="get">
                            <input name="w" id="zzk_search_input" placeholder="代码改变世界" type="text" tabindex="3" />
                            <button type="submit" id="zzk_search_button">
                                <img src="/images/aggsite/search.svg" alt="搜索" />
                            </button>
                        </form>
                    </li>
                    <li id="navbar_login_status" class="navbar-list">
                        <a id="navblog-myblog-icon" class="navbar-user-info navbar-blog" href="https://passport.cnblogs.com/GetBlogApplyStatus.aspx" alt="我的博客" title="我的博客">
                            <img id="myblog_icon" class="navbar-icon" src="/images/aggsite/myblog.svg" alt="我的博客" />
                        </a>
                        <a class="navbar-user-info navbar-message navbar-icon-wrapper" href="https://msg.cnblogs.com/" alt="短消息" title="短消息">
                            <img id="msg_icon" class="navbar-icon" src="/images/aggsite/message.svg?v=oS4PkibyMjZ9rGD5XAcLt99uW_s76Javy2up4dbnZNY" alt="短消息" />
                            <span id="msg_count" style="display: none"></span>
                        </a>
                        <div id="user_info" class="navbar-user-info dropdown">
                            <a class="dropdown-button" href="https://home.cnblogs.com/">
                                <img id="user_icon" class="navbar-avatar" src="/images/aggsite/avatar-default.svg" alt="用户头像" />
                            </a>
                            <div class="dropdown-menu">
                                <a id="navblog-myblog-text" href="https://passport.cnblogs.com/GetBlogApplyStatus.aspx">我的博客</a>
                                <a href="https://home.cnblogs.com/">我的园子</a>
                                <a href="https://account.cnblogs.com/settings/account">账号设置</a>
                                <a href="javascript:void(0)" onclick="logout();">退出登录</a>
                            </div>
                        </div>
                        <a class="navbar-anonymous" href="https://account.cnblogs.com/signup/">注册</a>
                        <a class="navbar-anonymous" href="https://account.cnblogs.com/signin/?returnUrl=https://www.cnblogs.com/">登录</a>
                    </li>
                </ul>
            </nav>
            <nav id="nav_mobile" class="navbar-mobile">
                <ul class="navbar-list">
                    <li class="navbar-branding">
                        <a href="https://www.cnblogs.com/" title="开发者的网上家园"><img src="/images/logo.svg?v=R9M0WmLAIPVydmdzE2keuvnjl-bPR7_35oHqtiBzGsM" alt="博客园Logo" /></a>
                    </li>
                    <li class="dropdown">
                        <div class="dropdown-button" onclick="toggleDropdownMenu()">
                            <a href="javascript:void(0)">发现</a>
                            <img src="/images/aggsite/pulldown-bold.svg" height="5" />
                        </div>
                        <div id="nav_dropdown_menu" class="dropdown-menu">
                            <a href="https://news.cnblogs.com/">新闻</a>
                            <a href="https://q.cnblogs.com/">博问</a>
                            <a href="https://brands.cnblogs.com/">专区</a>
                            <a href="https://ing.cnblogs.com/">闪存</a>
                            <a href="https://edu.cnblogs.com/">班级</a>
                            <a href="/legacy">怀旧</a>
                            <a href="https://home.cnblogs.com/">园子</a>
                            <a href="https://wz.cnblogs.com/">收藏</a>
                            <a href="https://job.cnblogs.com/">招聘</a>
                            <a href="https://zzk.cnblogs.com/">找找看</a>
                        </div>
                    </li>
                </ul>
                <ul class="navbar-list">
                    <li>
                        <form id="zzk_search_mobile" class="navbar-search" action="https://zzk.cnblogs.com/s" method="get">
                            <input name="w" id="zzk_search_input_mobile" placeholder="搜索" type="text" tabindex="3" />
                            <button type="submit" id="zzk_search_button_mobile">
                                <img src="/images/aggsite/search.svg" alt="搜索" />
                            </button>
                        </form>
                    </li>
                    <li id="user_info_mobile" class="navbar-user-info dropdown">
                        <a class="dropdown-button" href="https://home.cnblogs.com/">
                            <img id="user_icon_mobile" class="navbar-icon avatar" />
                        </a>
                        <div class="dropdown-menu">
                            <a href="https://account.cnblogs.com/settings/account">设置</a>
                            <a href="javascript:void(0)" onclick="logout();">退出</a>
                        </div>
                    </li>
                    <li class="navbar-anonymous" id="login_area_mobile">
                        <a href="https://account.cnblogs.com/signup/">注册</a>
                    </li>
                    <li class="navbar-anonymous">
                        <a href="https://account.cnblogs.com/signin/?returnUrl=https://www.cnblogs.com/">登录</a>
                    </li>
                </ul>
            </nav>
        </div>
        <div id="main_content" class="hero">
            <div id="main" class="main">
                <div id="side_nav" class="side-left tab-bar">
                    
<ul class="sidenav">
            <li id="sidenav_pick" class="sidenav-item ">
                <a href="/pick/" title="精华区博文">
                    <img src="/images/aggsite/picked.svg" />
                    <span>精华</span>
                </a>
            </li>
            <li id="sidenav_candidate" class="sidenav-item ">
                <a href="/candidate/" title="候选区博文">
                    <img src="/images/aggsite/candidate.svg" />
                    <span>候选</span>
                </a>
            </li>
            <li class="sidenav-splitter"></li>
            <li id="sidenav_subscription" class="sidenav-item ">
                <a href="/subscription" title="我订阅的博客">
                    <img src="/images/aggsite/subscription.svg" />
                    <span>订阅</span>
                </a>
            </li>
            <li id="sidenav_following" class="sidenav-item ">
                <a href="/following" title="我关注的园友">
                    <img src="/images/aggsite/following.svg" />
                    <span>关注</span>
                </a>
            </li>
            <li id="sidenav_commented" class="sidenav-item ">
                <a href="/aggsite/mycommented" title="我评论过的博文">
                    <img src="/images/aggsite/commented.svg" />
                    <span>我评</span>
                </a>
            </li>
            <li id="sidenav_digged" class="sidenav-item ">
                <a href="/aggsite/mydigged" title="我推荐过的博文">
                    <img src="/images/aggsite/digged.svg" />
                    <span>我赞</span>
                </a>
            </li>
    <li id="sidenav_more" class="dropdown sidenav-item ">
        <div class="dropdown-button">
            <a href="javascript:void(0)">
                <img src="/images/aggsite/more.svg">
                <span>更多</span>
            </a>
        </div>
        <div class="dropdown-menu">
            <a href="/cate/all">所有随笔</a>
            <a href="/comment/">最新评论</a>
            <a href="/cmt/">官方博客</a>
            <a href="/skins.aspx">博客皮肤</a>
        </div>
    </li>
    <li class="sidenav-splitter"></li>
    <li class="sidenav-item feedback">
        <a href="https://group.cnblogs.com/forum/public/" class="feedback">
            <img src="/images/aggsite/feedback.svg" />
            <span>反馈</span>
        </a>
    </li>
    <li id="dark_switch">
        <a href="javascript:void(0)"><img src="/images/aggsite/dark.svg" /></a>
    </li>
</ul>
                </div>

                <div id="main_flow" class="main-flow">
                    <div class="card">

                        <div class="card headline">
    <ul>
            <li>
                    <a href="https://www.cnblogs.com/huangxincheng/p/13625238.html" id="editor_pick_lnk" target="_blank">
                        <span class="headline-label">【编辑推荐】</span>Linq 下的扩展方法太少了，您期待的 MoreLinq 来啦<span id="editor_pick_count"></span>
                    </a>
                    <a href="/aggsite/headline" title="查看更多编辑推荐" class="right_more">»</a>
            </li>
            <li>
                    <a href="https://www.cnblogs.com/AllenMaster/p/13629556.html" target="_blank" title="阅读456, 评论13, 推荐13">
                        <span class="headline-label">【最多推荐】</span>Azure Storage 系列（四）在.Net 上使用Table Storage (13/456)
                    </a>
                    <a href="/aggsite/topdigged24h" title="查看24小时推荐排行" class="right_more">»</a>
            </li>
            <li>
                    <a href="https://www.cnblogs.com/wuhuacong/p/13639263.html" target="_blank" title="阅读1698, 评论12, 推荐13">
                        <span class="headline-label">【最多评论】</span>使用代码生成工具快速生成基于ABP框架的Vue&#x2B;Element的前端界面(12/1698)
                    </a>
                    <a href="/aggsite/topcommented24h" title="查看24小时推荐排行" class="right_more">»</a>
            </li>
            <li>
                    <a href="https://news.cnblogs.com/n/672534/" target="_blank" title="阅读1763, 评论20, 推荐4">
                        <span class="headline-label">【新闻头条】</span>没有外卖骑手看过那篇刷屏爆文(20/1763)
                    </a>
                    <a href="https://news.cnblogs.com/" title="查看更多新闻" class="right_more">»</a>
            </li>
            <li>
                    <a href="https://news.cnblogs.com/n/672546/" target="_blank" title="阅读271, 评论2, 推荐0">
                        <span class="headline-label">【推荐新闻】</span>什么样的垄断者不应该拆分？(2/271)
                    </a>
                    <a href="https://news.cnblogs.com/n/recommend" title="查看更多推荐新闻" class="right_more">»</a>
            </li>
    </ul>
</div>

                        <div id="pager_top" style="display: none"></div>
                        <div id="post_list_tips" class="hide"></div>
                        
                        <div id="post_list" class="post-list">
                            
<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="display: none">
    <defs>
        <g id="icon_digg" stroke-linejoin="round" fill="none"><path d="M12.197 7.005H9C10.239 3.195 8.146 3 8.146 3c-.886 0-.703.584-.77.681C7.376 5.545 5 7.005 5 7.005v5.285c0 .522.853.71 1.188.71h4.804c.452 0 .82-.987.82-.987C13 8.647 13 7.645 13 7.645c0-.695-.803-.64-.803-.64z" /><path d="M4.48 7H2.43c-.423 0-.43.324-.43.324l.423 5.336c0 .34.437.34.437.34h1.774c.37 0 .366-.225.366-.225v-5.37C5 6.995 4.48 7 4.48 7z" /></g>
        <g id="icon_comment"><path fill="none" d="M4.25 3.5C3.56 3.5 3 4.054 3 4.738v4.957c0 .684.56 1.238 1.25 1.238h2.454L8 12.5l1.293-1.567h2.457c.69 0 1.25-.554 1.25-1.238V4.738A1.242 1.242 0 0011.751 3.5H4.25z" /><path stroke="none" d="M10.5 7.5a.5.5 0 110-1 .5.5 0 010 1zM8 7.5a.5.5 0 11.001-1.001A.5.5 0 018 7.5zm-2.5 0a.5.5 0 110-1 .5.5 0 010 1z" /></g>
        <path id="icon_views" stroke="none" d="M7.5 5.406c-1.23 0-2.231.94-2.231 2.094 0 1.156 1 2.097 2.23 2.097S9.73 8.657 9.73 7.5c0-1.155-1-2.094-2.23-2.094zm0 3.203c-.653 0-1.184-.497-1.184-1.11 0-.611.53-1.109 1.184-1.109.653 0 1.184.498 1.184 1.11 0 .612-.531 1.11-1.184 1.11zm6.482-1.265a1.069 1.069 0 00-.03-.148.27.27 0 00-.008-.018l-.003-.007a1.072 1.072 0 00-.024-.065C12.715 4.65 10.136 3 7.5 3 4.86 3 2.285 4.645 1.094 7.09a.518.518 0 00-.034.082l-.012.023a.355.355 0 00-.026.126c-.01.052-.018.127-.019.13a.374.374 0 000 .099l.013.094a.566.566 0 00.016.1c.007.027.015.058.032.091a.92.92 0 00.022.056C2.284 10.349 4.86 12 7.5 12c2.64 0 5.211-1.64 6.399-4.078a.562.562 0 00.042-.097l.005-.012.005-.011a.519.519 0 00.028-.122l.003-.017a.672.672 0 000-.32zM7.5 11.015c-2.211 0-4.399-1.404-5.447-3.497L2.05 7.51a.136.136 0 00-.003-.015V7.49a.064.064 0 00.002-.007c1.035-2.093 3.225-3.5 5.45-3.5 2.223 0 4.41 1.404 5.442 3.493l.002.004.002.007v.007l.001.002-.004.004v.02c-1.036 2.09-3.222 3.494-5.443 3.494z" fill-rule="nonzero"></path>
    </defs>
</svg>

    <article class="post-item">
        <section class="post-item-body">
            <div class="post-item-text">
                <a class="post-item-title" href="https://www.cnblogs.com/love19791125/p/13646461.html" target="_blank">centos7图形化安装oracle11g</a>
                <p class="post-item-summary">
                    #设置主机名 hostnamectl set-hostname oracle #yum安装 yum -y install unzip vim* bash-completion bash-completion-extras nmap tree dos2unix nc wget lsof tcpdump ...
                </p>
            </div>
            <footer class="post-item-foot">
                <a href="https://www.cnblogs.com/love19791125/" class="post-item-author"><span>love19791125</span></a>
                <span class="post-meta-item">
                    <span>2020-09-10 16:49</span>
                </span>
                <a class="post-meta-item btn " href="javascript:void(0)" onclick="DiggPost('love19791125', 13646461, 261836, 1);return false;">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_digg"></use>
                    </svg>
                    <span id="digg_count_13646461">0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/love19791125/p/13646461.html#commentform">
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_comment"></use>
                    </svg>
                    <span>0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/love19791125/p/13646461.html">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_views"></use>
                    </svg>
                    <span>0</span>
                </a>
                <span id="digg_tip_13646461" class="digg-tip" style="color: red"></span>
            </footer>
        </section>
        <figure>
        </figure>
    </article>
    <article class="post-item">
        <section class="post-item-body">
            <div class="post-item-text">
                <a class="post-item-title" href="https://www.cnblogs.com/tencent-cloud-native/p/13646575.html" target="_blank">Kubernetes 服务部署最佳实践(二) ——如何提高服务可用性</a>
                <p class="post-item-summary">
                        <img src="https://pic.cnblogs.com/face/2041406/20200520165001.png" class="avatar" />
                    引言 上一篇文章我们围绕如何合理利用资源的主题做了一些最佳实践的分享，这一次我们就如何提高服务可用性的主题来展开探讨。 怎样提高我们部署服务的可用性呢？K8S 设计本身就考虑到了各种故障的可能性，并提供了一些自愈机制以提高系统的容错性，但有些情况还是可能导致较长时间不可用，拉低服务可用性的指标。本文 ...
                </p>
            </div>
            <footer class="post-item-foot">
                <a href="https://www.cnblogs.com/tencent-cloud-native/" class="post-item-author"><span>腾讯云原生</span></a>
                <span class="post-meta-item">
                    <span>2020-09-10 16:33</span>
                </span>
                <a class="post-meta-item btn " href="javascript:void(0)" onclick="DiggPost('tencent-cloud-native', 13646575, 625070, 1);return false;">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_digg"></use>
                    </svg>
                    <span id="digg_count_13646575">0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/tencent-cloud-native/p/13646575.html#commentform">
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_comment"></use>
                    </svg>
                    <span>0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/tencent-cloud-native/p/13646575.html">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_views"></use>
                    </svg>
                    <span>22</span>
                </a>
                <span id="digg_tip_13646575" class="digg-tip" style="color: red"></span>
            </footer>
        </section>
        <figure>
        </figure>
    </article>
    <article class="post-item">
        <section class="post-item-body">
            <div class="post-item-text">
                <a class="post-item-title" href="https://www.cnblogs.com/kklldog/p/azure-devops-pipeline-cd.html" target="_blank">使用Azure DevOps Pipeline实现.Net Core程序的CD</a>
                <p class="post-item-summary">
                        <img src="https://pic.cnblogs.com/face/u36200.jpg?id=15210537" class="avatar" />
                    上一次我们讲了使用Azure DevOps Pipeline实现.Net Core程序的CI。这次我们来演示下如何使用Azure DevOps实现.Net Core程序的CD。 实现本次目标我们除了Azure DevOps外还需要： 一台安装了Docker的主机 一个 Docker Hub 账号 上 ...
                </p>
            </div>
            <footer class="post-item-foot">
                <a href="https://www.cnblogs.com/kklldog/" class="post-item-author"><span>Agile.Zhou</span></a>
                <span class="post-meta-item">
                    <span>2020-09-10 16:32</span>
                </span>
                <a class="post-meta-item btn " href="javascript:void(0)" onclick="DiggPost('kklldog', 13645101, 39765, 1);return false;">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_digg"></use>
                    </svg>
                    <span id="digg_count_13645101">3</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/kklldog/p/azure-devops-pipeline-cd.html#commentform">
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_comment"></use>
                    </svg>
                    <span>2</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/kklldog/p/azure-devops-pipeline-cd.html">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_views"></use>
                    </svg>
                    <span>25</span>
                </a>
                <span id="digg_tip_13645101" class="digg-tip" style="color: red"></span>
            </footer>
        </section>
        <figure>
        </figure>
    </article>
    <article class="post-item">
        <section class="post-item-body">
            <div class="post-item-text">
                <a class="post-item-title" href="https://www.cnblogs.com/fengyumeng/p/13646341.html" target="_blank">Windows安装tensorflow教程 GPU版</a>
                <p class="post-item-summary">
                        <img src="https://pic.cnblogs.com/face/1181622/20181130105630.png" class="avatar" />
                    PS：这是GPU版本，CPU版会用笔记本环境另写一篇博客。 前置准备 查看GPU型号 电脑桌面-&gt;右键我的电脑-&gt;选择管理-&gt;点击设备管理器 如下图： 如果不是英伟达显卡，那么不用往下看了，GAMEOVER！ 查看CUDA算力 gpu版本要求电脑的GPU硬件必须有CUDA支持，并且计算能力最低为3. ...
                </p>
            </div>
            <footer class="post-item-foot">
                <a href="https://www.cnblogs.com/fengyumeng/" class="post-item-author"><span>不该相遇在秋天</span></a>
                <span class="post-meta-item">
                    <span>2020-09-10 16:09</span>
                </span>
                <a class="post-meta-item btn " href="javascript:void(0)" onclick="DiggPost('fengyumeng', 13646341, 360874, 1);return false;">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_digg"></use>
                    </svg>
                    <span id="digg_count_13646341">0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/fengyumeng/p/13646341.html#commentform">
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_comment"></use>
                    </svg>
                    <span>0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/fengyumeng/p/13646341.html">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_views"></use>
                    </svg>
                    <span>46</span>
                </a>
                <span id="digg_tip_13646341" class="digg-tip" style="color: red"></span>
            </footer>
        </section>
        <figure>
        </figure>
    </article>
    <article class="post-item">
        <section class="post-item-body">
            <div class="post-item-text">
                <a class="post-item-title" href="https://www.cnblogs.com/k3s2019/p/13646252.html" target="_blank">从架构到部署，全面了解K3s</a>
                <p class="post-item-summary">
                        <img src="https://pic.cnblogs.com/face/1909777/20191227173308.png" class="avatar" />
                    Kubernetes无处不在——开发者的笔记本、树莓派、云、数据中心、混合云甚至多云上都有Kubernetes。它已然成为现代基础设施的基础，抽象了底层的计算、存储和网络服务。Kubernetes隐藏了各种基础设施环境之间的差异，它将多云变成了现实。 Kubernetes也成为了编排的通用控制平面， ...
                </p>
            </div>
            <footer class="post-item-foot">
                <a href="https://www.cnblogs.com/k3s2019/" class="post-item-author"><span>k3s中文社区</span></a>
                <span class="post-meta-item">
                    <span>2020-09-10 16:00</span>
                </span>
                <a class="post-meta-item btn " href="javascript:void(0)" onclick="DiggPost('k3s2019', 13646252, 570850, 1);return false;">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_digg"></use>
                    </svg>
                    <span id="digg_count_13646252">0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/k3s2019/p/13646252.html#commentform">
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_comment"></use>
                    </svg>
                    <span>0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/k3s2019/p/13646252.html">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_views"></use>
                    </svg>
                    <span>86</span>
                </a>
                <span id="digg_tip_13646252" class="digg-tip" style="color: red"></span>
            </footer>
        </section>
        <figure>
        </figure>
    </article>
    <article class="post-item">
        <section class="post-item-body">
            <div class="post-item-text">
                <a class="post-item-title" href="https://www.cnblogs.com/mroldx/p/13646042.html" target="_blank">事务的隔离级别与所带来的问题</a>
                <p class="post-item-summary">
                        <img src="https://pic.cnblogs.com/face/2131158/20200910161903.png" class="avatar" />
                    一、事务的基本要素（ACID） 1、原子性（Atomicity）：事务开始后所有操作，要么全部做完，要么全部不做，不可能停滞在中间环节。事务执行过程中出错，会回滚到事务开始前的状态，所有的操作就像没有发生一样。也就是说事务是一个不可分割的整体，就像化学中学过的原子，是物质构成的基本单位。 2、一致性 ...
                </p>
            </div>
            <footer class="post-item-foot">
                <a href="https://www.cnblogs.com/mroldx/" class="post-item-author"><span>MrOldx</span></a>
                <span class="post-meta-item">
                    <span>2020-09-10 15:36</span>
                </span>
                <a class="post-meta-item btn " href="javascript:void(0)" onclick="DiggPost('mroldx', 13646042, 625113, 1);return false;">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_digg"></use>
                    </svg>
                    <span id="digg_count_13646042">0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/mroldx/p/13646042.html#commentform">
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_comment"></use>
                    </svg>
                    <span>0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/mroldx/p/13646042.html">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_views"></use>
                    </svg>
                    <span>76</span>
                </a>
                <span id="digg_tip_13646042" class="digg-tip" style="color: red"></span>
            </footer>
        </section>
        <figure>
        </figure>
    </article>
    <article class="post-item">
        <section class="post-item-body">
            <div class="post-item-text">
                <a class="post-item-title" href="https://www.cnblogs.com/lookroot/p/13645736.html" target="_blank">浏览器调试的必知必会，零基础足够详细-第一节console面板、移动端调试</a>
                <p class="post-item-summary">
                        <img src="https://pic.cnblogs.com/face/1821466/20190929192634.png" class="avatar" />
                    前言 本文已经发布视频点击查看 开发过程中，浏览器的调试非常重要，可以说是必备的技巧，本文我就会分享一些自己掌握的技巧，欢迎补充 我们默认使用Chrome浏览器，但是你使用新edge浏览器也是可以的 在开发者界面中，你可以使用ctrl + shift +P打开快捷输入运行常用命令，这和mac上的非常 ...
                </p>
            </div>
            <footer class="post-item-foot">
                <a href="https://www.cnblogs.com/lookroot/" class="post-item-author"><span>lookroot</span></a>
                <span class="post-meta-item">
                    <span>2020-09-10 15:01</span>
                </span>
                <a class="post-meta-item btn " href="javascript:void(0)" onclick="DiggPost('lookroot', 13645736, 548645, 1);return false;">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_digg"></use>
                    </svg>
                    <span id="digg_count_13645736">1</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/lookroot/p/13645736.html#commentform">
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_comment"></use>
                    </svg>
                    <span>0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/lookroot/p/13645736.html">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_views"></use>
                    </svg>
                    <span>158</span>
                </a>
                <span id="digg_tip_13645736" class="digg-tip" style="color: red"></span>
            </footer>
        </section>
        <figure>
        </figure>
    </article>
    <article class="post-item">
        <section class="post-item-body">
            <div class="post-item-text">
                <a class="post-item-title" href="https://www.cnblogs.com/yingheshaonv/p/13645707.html" target="_blank">用Python写一个向数据库填充数据的小工具</a>
                <p class="post-item-summary">
                    一. 背景 公司又要做一个新项目，是一个合作型项目，我们公司出web展示服务，合作伙伴线下提供展示数据。 而且本次项目是数据统计展示为主要功能，并没有研发对应的数据接入接口，所有展示数据源均来自数据库查询， 所以验证数据没有别的入口，只能通过在数据库写入数据来进行验证。 二. 工具 Python+m ...
                </p>
            </div>
            <footer class="post-item-foot">
                <a href="https://www.cnblogs.com/yingheshaonv/" class="post-item-author"><span>硬核少女</span></a>
                <span class="post-meta-item">
                    <span>2020-09-10 14:55</span>
                </span>
                <a class="post-meta-item btn " href="javascript:void(0)" onclick="DiggPost('yingheshaonv', 13645707, 559754, 1);return false;">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_digg"></use>
                    </svg>
                    <span id="digg_count_13645707">1</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/yingheshaonv/p/13645707.html#commentform">
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_comment"></use>
                    </svg>
                    <span>0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/yingheshaonv/p/13645707.html">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_views"></use>
                    </svg>
                    <span>197</span>
                </a>
                <span id="digg_tip_13645707" class="digg-tip" style="color: red"></span>
            </footer>
        </section>
        <figure>
        </figure>
    </article>
    <article class="post-item">
        <section class="post-item-body">
            <div class="post-item-text">
                <a class="post-item-title" href="https://www.cnblogs.com/cmt/p/13645639.html" target="_blank">AI研讨会直播：《人工智能开发前沿》实战系列公开课第1期</a>
                <p class="post-item-summary">
                        <img src="https://pic.cnblogs.com/face/35695/20140318223943.png" class="avatar" />
                    业务需求、数据、算法、算力等因素，决定人工智能技术走向产业落地面临各种挑战。博客园联合示说网以及产业内人工智能技术领域的工程师讲师，结合实践案例，推出《人工智能开发前沿》实战系列公开课，将涵盖边缘到云端、训练到推理、算法模型到工程实践等一系列人工智能实践学习课程。课程内容详实丰富，既包括前沿技术介绍... ...
                </p>
            </div>
            <footer class="post-item-foot">
                <a href="https://www.cnblogs.com/cmt/" class="post-item-author"><span>博客园团队</span></a>
                <span class="post-meta-item">
                    <span>2020-09-10 14:52</span>
                </span>
                <a class="post-meta-item btn " href="javascript:void(0)" onclick="DiggPost('cmt', 13645639, 39258, 1);return false;">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_digg"></use>
                    </svg>
                    <span id="digg_count_13645639">0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/cmt/p/13645639.html#commentform">
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_comment"></use>
                    </svg>
                    <span>0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/cmt/p/13645639.html">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_views"></use>
                    </svg>
                    <span>107</span>
                </a>
                <span id="digg_tip_13645639" class="digg-tip" style="color: red"></span>
            </footer>
        </section>
        <figure>
        </figure>
    </article>
    <article class="post-item">
        <section class="post-item-body">
            <div class="post-item-text">
                <a class="post-item-title" href="https://www.cnblogs.com/qiuhom-1874/p/13645163.html" target="_blank">高可用服务之Keepalived邮件通知配置</a>
                <p class="post-item-summary">
                        <img src="https://pic.cnblogs.com/face/1503305/20181003204442.png" class="avatar" />
                    
一个高可用服务，应该具备当服务发生故障，能够第一时间做故障转移，从而保证服务的可用性，同时还应该第一时间通知管理员，以便管理员能够知道服务发生了转移，这样一来管理员也能第一时间去排查故障，让故障的节点在很短的时间重新上线，避免下次故障导致服务不可用；keepalived的故障通知邮件机制，是通过判... ...
                </p>
            </div>
            <footer class="post-item-foot">
                <a href="https://www.cnblogs.com/qiuhom-1874/" class="post-item-author"><span>Linux-1874</span></a>
                <span class="post-meta-item">
                    <span>2020-09-10 14:15</span>
                </span>
                <a class="post-meta-item btn " href="javascript:void(0)" onclick="DiggPost('qiuhom-1874', 13645163, 465299, 1);return false;">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_digg"></use>
                    </svg>
                    <span id="digg_count_13645163">1</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/qiuhom-1874/p/13645163.html#commentform">
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_comment"></use>
                    </svg>
                    <span>0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/qiuhom-1874/p/13645163.html">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_views"></use>
                    </svg>
                    <span>117</span>
                </a>
                <span id="digg_tip_13645163" class="digg-tip" style="color: red"></span>
            </footer>
        </section>
        <figure>
        </figure>
    </article>
    <article class="post-item">
        <section class="post-item-body">
            <div class="post-item-text">
                <a class="post-item-title" href="https://www.cnblogs.com/lm970585581/p/13645406.html" target="_blank">RocketMQ生产部署架构如何设计</a>
                <p class="post-item-summary">
                        <img src="https://pic.cnblogs.com/face/1140467/20200831173053.png" class="avatar" />
                    前言 看了我们之前的文章，相信小伙伴们对RocketMQ已经有了一个初步的了解，那么今天我们就来聊一聊具体如何来设计一套高可用的生产部署架构。 在聊如何设计这套架构的同时，我们再补充一些之前没提到的知识。好了，那我们现在开始吧。 NameServer的部署 关于NameServer，我们之前的文章已 ...
                </p>
            </div>
            <footer class="post-item-foot">
                <a href="https://www.cnblogs.com/lm970585581/" class="post-item-author"><span>H.U.C-王子</span></a>
                <span class="post-meta-item">
                    <span>2020-09-10 14:13</span>
                </span>
                <a class="post-meta-item btn " href="javascript:void(0)" onclick="DiggPost('lm970585581', 13645406, 346152, 1);return false;">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_digg"></use>
                    </svg>
                    <span id="digg_count_13645406">0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/lm970585581/p/13645406.html#commentform">
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_comment"></use>
                    </svg>
                    <span>0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/lm970585581/p/13645406.html">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_views"></use>
                    </svg>
                    <span>147</span>
                </a>
                <span id="digg_tip_13645406" class="digg-tip" style="color: red"></span>
            </footer>
        </section>
        <figure>
        </figure>
    </article>
    <article class="post-item">
        <section class="post-item-body">
            <div class="post-item-text">
                <a class="post-item-title" href="https://www.cnblogs.com/alchemystar/p/13645324.html" target="_blank">分享一次批量文档翻译的开发过程</a>
                <p class="post-item-summary">
                        <img src="https://pic.cnblogs.com/face/1411116/20200524105009.png" class="avatar" />
                    分享一次批量文档翻译的开发过程 最近工作过程中，需要对一批文件进行汉译英的翻译，对单个文档手工复制、粘贴的翻译方式过于繁琐，考虑到工作的重复性和本人追求提高效率、少动手（懒），想通过调用已有的接口的方法，自己实现一个批量翻译工具，一劳永逸。在网上找了几款翻译api，通过对比翻译的结果和学习成本，选择 ...
                </p>
            </div>
            <footer class="post-item-foot">
                <a href="https://www.cnblogs.com/alchemystar/" class="post-item-author"><span>无毁的湖光-Al</span></a>
                <span class="post-meta-item">
                    <span>2020-09-10 14:04</span>
                </span>
                <a class="post-meta-item btn " href="javascript:void(0)" onclick="DiggPost('alchemystar', 13645324, 605890, 1);return false;">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_digg"></use>
                    </svg>
                    <span id="digg_count_13645324">0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/alchemystar/p/13645324.html#commentform">
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_comment"></use>
                    </svg>
                    <span>3</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/alchemystar/p/13645324.html">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_views"></use>
                    </svg>
                    <span>152</span>
                </a>
                <span id="digg_tip_13645324" class="digg-tip" style="color: red"></span>
            </footer>
        </section>
        <figure>
        </figure>
    </article>
    <article class="post-item">
        <section class="post-item-body">
            <div class="post-item-text">
                <a class="post-item-title" href="https://www.cnblogs.com/tnnyang/p/13645327.html" target="_blank">封装React AntD的dialog弹窗组件</a>
                <p class="post-item-summary">
                        <img src="https://pic.cnblogs.com/face/688074/20160422153429.png" class="avatar" />
                    前一段时间分享了基于vue和element所封装的弹窗组件封装Vue Element的dialog弹窗组件，今天就来分享一个基于react和AntD所封装的弹窗组件，反正所使用的技术还是那个技术，情况还是那个情况。只是基于vue所封装的弹窗组件和基于react所封装的弹窗组件还是有很大差别的。一样的... ...
                </p>
            </div>
            <footer class="post-item-foot">
                <a href="https://www.cnblogs.com/tnnyang/" class="post-item-author"><span>小坏先生</span></a>
                <span class="post-meta-item">
                    <span>2020-09-10 14:04</span>
                </span>
                <a class="post-meta-item btn " href="javascript:void(0)" onclick="DiggPost('tnnyang', 13645327, 203353, 1);return false;">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_digg"></use>
                    </svg>
                    <span id="digg_count_13645327">0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/tnnyang/p/13645327.html#commentform">
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_comment"></use>
                    </svg>
                    <span>0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/tnnyang/p/13645327.html">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_views"></use>
                    </svg>
                    <span>90</span>
                </a>
                <span id="digg_tip_13645327" class="digg-tip" style="color: red"></span>
            </footer>
        </section>
        <figure>
        </figure>
    </article>
    <article class="post-item">
        <section class="post-item-body">
            <div class="post-item-text">
                <a class="post-item-title" href="https://www.cnblogs.com/shanyou/p/13645172.html" target="_blank">腾讯云 云开发 部署 Blazor网站</a>
                <p class="post-item-summary">
                        <img src="https://pic.cnblogs.com/face/510/20200828135901.png" class="avatar" />
                    Blazor 应用程序除了在 Github Pages/Gitee Pages等静态资源部署以外，现在你有了一个新的选择，那就是使用云开发静态网站功能来部署啦！系统依赖在进行后续的内容前，请先确保你的电脑中安装了.NET Core 3.1/5.0运行环境。如果没有安装，可以访问http://dot.... ...
                </p>
            </div>
            <footer class="post-item-foot">
                <a href="https://www.cnblogs.com/shanyou/" class="post-item-author"><span>张善友</span></a>
                <span class="post-meta-item">
                    <span>2020-09-10 13:37</span>
                </span>
                <a class="post-meta-item btn " href="javascript:void(0)" onclick="DiggPost('shanyou', 13645172, 782, 1);return false;">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_digg"></use>
                    </svg>
                    <span id="digg_count_13645172">5</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/shanyou/p/13645172.html#commentform">
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_comment"></use>
                    </svg>
                    <span>0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/shanyou/p/13645172.html">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_views"></use>
                    </svg>
                    <span>382</span>
                </a>
                <span id="digg_tip_13645172" class="digg-tip" style="color: red"></span>
            </footer>
        </section>
        <figure>
        </figure>
    </article>
    <article class="post-item">
        <section class="post-item-body">
            <div class="post-item-text">
                <a class="post-item-title" href="https://www.cnblogs.com/codhome/p/13645087.html" target="_blank">springboot2.x基础教程：自动装配原理与条件注解</a>
                <p class="post-item-summary">
                        <img src="https://pic.cnblogs.com/face/2138324/20200827064436.png" class="avatar" />
                    spring Boot采用约定优于配置的方式，大量的减少了配置文件的使用。该框架使用了特定的方式来进行配置，从而使开发人员不再需要定义样板化的配置。 当springboot启动的时候，默认在容器中注入许多AutoCongfigution类。在我们加入spring-boot-stareter-xx时， ...
                </p>
            </div>
            <footer class="post-item-foot">
                <a href="https://www.cnblogs.com/codhome/" class="post-item-author"><span>程序员众推</span></a>
                <span class="post-meta-item">
                    <span>2020-09-10 13:14</span>
                </span>
                <a class="post-meta-item btn " href="javascript:void(0)" onclick="DiggPost('codhome', 13645087, 626576, 1);return false;">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_digg"></use>
                    </svg>
                    <span id="digg_count_13645087">0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/codhome/p/13645087.html#commentform">
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_comment"></use>
                    </svg>
                    <span>0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/codhome/p/13645087.html">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_views"></use>
                    </svg>
                    <span>141</span>
                </a>
                <span id="digg_tip_13645087" class="digg-tip" style="color: red"></span>
            </footer>
        </section>
        <figure>
        </figure>
    </article>
    <article class="post-item">
        <section class="post-item-body">
            <div class="post-item-text">
                <a class="post-item-title" href="https://www.cnblogs.com/passzhang/p/13645000.html" target="_blank">ES ElasticSearch 7.x 下动态扩大索引的shard数量</a>
                <p class="post-item-summary">
                        <img src="https://pic.cnblogs.com/face/1293986/20180201204642.png" class="avatar" />
                    ES ElasticSearch 7.x 下动态扩大索引的shard数量 背景 在老版本的ES（例如2.3版本）中， index的shard数量定好后，就不能再修改，除非重建数据才能实现。 从ES6.1开始，ES 支持可以在线操作扩大shard的数量（注意：操作期间也需要对index锁写） 从ES7 ...
                </p>
            </div>
            <footer class="post-item-foot">
                <a href="https://www.cnblogs.com/passzhang/" class="post-item-author"><span>PassZhang</span></a>
                <span class="post-meta-item">
                    <span>2020-09-10 12:43</span>
                </span>
                <a class="post-meta-item btn " href="javascript:void(0)" onclick="DiggPost('passzhang', 13645000, 399892, 1);return false;">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_digg"></use>
                    </svg>
                    <span id="digg_count_13645000">1</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/passzhang/p/13645000.html#commentform">
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_comment"></use>
                    </svg>
                    <span>0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/passzhang/p/13645000.html">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_views"></use>
                    </svg>
                    <span>123</span>
                </a>
                <span id="digg_tip_13645000" class="digg-tip" style="color: red"></span>
            </footer>
        </section>
        <figure>
        </figure>
    </article>
    <article class="post-item">
        <section class="post-item-body">
            <div class="post-item-text">
                <a class="post-item-title" href="https://www.cnblogs.com/Chenjiabing/p/13644884.html" target="_blank">Mybati源码解析篇之六剑客!!!</a>
                <p class="post-item-summary">
                    目录 前言 环境版本 Mybatis的六剑客 SqlSession 有何方法 语句执行方法 立即批量更新方法 事务控制方法 本地缓存方法 获取映射方法 有何实现类？ Executor 实现类 BaseExecutor CachingExecutor SimpleExecutor BatchExecu ...
                </p>
            </div>
            <footer class="post-item-foot">
                <a href="https://www.cnblogs.com/Chenjiabing/" class="post-item-author"><span>爱撒谎的男孩</span></a>
                <span class="post-meta-item">
                    <span>2020-09-10 11:59</span>
                </span>
                <a class="post-meta-item btn " href="javascript:void(0)" onclick="DiggPost('Chenjiabing', 13644884, 357835, 1);return false;">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_digg"></use>
                    </svg>
                    <span id="digg_count_13644884">1</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/Chenjiabing/p/13644884.html#commentform">
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_comment"></use>
                    </svg>
                    <span>1</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/Chenjiabing/p/13644884.html">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_views"></use>
                    </svg>
                    <span>154</span>
                </a>
                <span id="digg_tip_13644884" class="digg-tip" style="color: red"></span>
            </footer>
        </section>
        <figure>
        </figure>
    </article>
    <article class="post-item">
        <section class="post-item-body">
            <div class="post-item-text">
                <a class="post-item-title" href="https://www.cnblogs.com/liudw-0215/p/13644600.html" target="_blank">用C、python手写redis客户端，兼容redis集群 (-MOVED和-ASK)，快速搭建redis集群</a>
                <p class="post-item-summary">
                        <img src="https://pic.cnblogs.com/face/1249620/20181206194409.png" class="avatar" />
                    想没想过，自己写一个redis客户端，是不是很难呢？ 其实，并不是特别难。 首先，要知道redis服务端用的通信协议，建议直接去官网看，博客啥的其实也是从官网摘抄的，或者从其他博客抄的（忽略）。 协议说明中文官网地址: http://www.redis.cn/topics/protocol.html ...
                </p>
            </div>
            <footer class="post-item-foot">
                <a href="https://www.cnblogs.com/liudw-0215/" class="post-item-author"><span>逆袭之路666</span></a>
                <span class="post-meta-item">
                    <span>2020-09-10 11:17</span>
                </span>
                <a class="post-meta-item btn " href="javascript:void(0)" onclick="DiggPost('liudw-0215', 13644600, 385576, 1);return false;">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_digg"></use>
                    </svg>
                    <span id="digg_count_13644600">0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/liudw-0215/p/13644600.html#commentform">
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_comment"></use>
                    </svg>
                    <span>0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/liudw-0215/p/13644600.html">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_views"></use>
                    </svg>
                    <span>145</span>
                </a>
                <span id="digg_tip_13644600" class="digg-tip" style="color: red"></span>
            </footer>
        </section>
        <figure>
        </figure>
    </article>
    <article class="post-item">
        <section class="post-item-body">
            <div class="post-item-text">
                <a class="post-item-title" href="https://www.cnblogs.com/xueweihan/p/13640258.html" target="_blank">Java 序列化界新贵 kryo 和熟悉的“老大哥”，就是 PowerJob 的序列化方案</a>
                <p class="post-item-summary">
                        <img src="https://pic.cnblogs.com/face/759200/20150524073137.png" class="avatar" />
                    本文适合有 Java 基础知识的人群 作者：HelloGitHub-Salieri HelloGitHub 推出的《讲解开源项目》系列。 项目地址： https://github.com/KFCFans/PowerJob 序列化与反序列化一直是分布式编程中无法绕开的话题。PowerJob 作为一个完 ...
                </p>
            </div>
            <footer class="post-item-foot">
                <a href="https://www.cnblogs.com/xueweihan/" class="post-item-author"><span>削微寒</span></a>
                <span class="post-meta-item">
                    <span>2020-09-10 11:13</span>
                </span>
                <a class="post-meta-item btn " href="javascript:void(0)" onclick="DiggPost('xueweihan', 13640258, 228315, 1);return false;">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_digg"></use>
                    </svg>
                    <span id="digg_count_13640258">0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/xueweihan/p/13640258.html#commentform">
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_comment"></use>
                    </svg>
                    <span>0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/xueweihan/p/13640258.html">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_views"></use>
                    </svg>
                    <span>164</span>
                </a>
                <span id="digg_tip_13640258" class="digg-tip" style="color: red"></span>
            </footer>
        </section>
        <figure>
        </figure>
    </article>
    <article class="post-item">
        <section class="post-item-body">
            <div class="post-item-text">
                <a class="post-item-title" href="https://www.cnblogs.com/rancherlabs/p/13644520.html" target="_blank">详细教程丨使用Prometheus和Thanos进行高可用K8S监控</a>
                <p class="post-item-summary">
                        <img src="https://pic.cnblogs.com/face/1834389/20191014151338.png" class="avatar" />
                    本文转自Rancher Labs 介 绍 Prometheus高可用的必要性 在过去的几年里，Kubernetes的采用量增长了数倍。很明显，Kubernetes是容器编排的不二选择。与此同时，Prometheus也被认为是监控容器化和非容器化工作负载的绝佳选择。监控是任何基础设施的一个重要关注点， ...
                </p>
            </div>
            <footer class="post-item-foot">
                <a href="https://www.cnblogs.com/rancherlabs/" class="post-item-author"><span>RancherLabs</span></a>
                <span class="post-meta-item">
                    <span>2020-09-10 11:04</span>
                </span>
                <a class="post-meta-item btn " href="javascript:void(0)" onclick="DiggPost('rancherlabs', 13644520, 552480, 1);return false;">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_digg"></use>
                    </svg>
                    <span id="digg_count_13644520">0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/rancherlabs/p/13644520.html#commentform">
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_comment"></use>
                    </svg>
                    <span>0</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/rancherlabs/p/13644520.html">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <use xlink:href="#icon_views"></use>
                    </svg>
                    <span>109</span>
                </a>
                <span id="digg_tip_13644520" class="digg-tip" style="color: red"></span>
            </footer>
        </section>
        <figure>
        </figure>
    </article>


                        </div>
                        <script type="text/javascript">
                        var aggSiteModel = {"CategoryType":"SiteHome","ParentCategoryId":0,"CategoryId":808,"PageIndex":1,"TotalPostCount":4000,"ItemListActionName":"AggSitePostList"};
                        </script>
                        <div id="pager_bottom">
<div id="paging_block"><div class="pager"><a href="/" class="p_1 current" onclick="aggSite.loadCategoryPostList(1,20);buildPaging(1);return false;">1</a><a href="/sitehome/p/2" class="p_2 middle" onclick="aggSite.loadCategoryPostList(2,20);buildPaging(2);return false;">2</a><a href="/sitehome/p/3" class="p_3 middle" onclick="aggSite.loadCategoryPostList(3,20);buildPaging(3);return false;">3</a><span class="ellipsis">···</span><a href="/sitehome/p/200" class="p_200 last" onclick="aggSite.loadCategoryPostList(200,20);buildPaging(200);return false;">200</a><a href="/sitehome/p/2" onclick="aggSite.loadCategoryPostList(2,20);buildPaging(2);return false;">&gt;</a></div></div><script type="text/javascript">var pagingBuider={"OnlyLinkText":false,"TotalCount":4000,"PageIndex":1,"PageSize":20,"ShowPageCount":1,"SkipCount":0,"UrlFormat":"/sitehome/p/{0}","OnClickJsFunc":"aggSite.loadCategoryPostList()","FirstPageLink":"/","AjaxUrl":"/AggSite/Pager","AjaxCallbak":null,"TopPagerId":"pager_top","IsRenderScript":true};function buildPaging(pageIndex){pagingBuider.PageIndex=pageIndex;$.ajax({url:pagingBuider.AjaxUrl,data:JSON.stringify(pagingBuider),type:'post',dataType:'text',contentType:'application/json; charset=utf-8',success:function (data) { $('#paging_block').html(data); var pagerTop=$('#pager_top');if(pageIndex>1){$(pagerTop).html(data).show();}else{$(pagerTop).hide();}}});}</script>
                        </div>
                    </div>
                </div>

                <div id="side_right" class="side-right card-list sidebar">
                    <div id="cnblogs_b1" class="sidebar-image">
                        <div id='div-gpt-ad-1546331539224-0' style="height:250px; width:300px;">
                            <script>
                                googletag.cmd.push(function () { googletag.display('div-gpt-ad-1546331539224-0'); });
                            </script>
                        </div>
                    </div>
                    <div id="ad_right_text" class="ad-right-text"></div>
                </div>
            </div>
        </div>
        <footer id="footer" class="footer">
            <div id="friend_link" class="link-list friend-link">
    友情链接：<a href="https://www.vpsor.cn" target="_blank">硅云</a><a href="https://www.aliyun.com" target="_blank">阿里云</a><a href="https://cloud.tencent.com/act/developer?fromSource=gwzcw.3196334.3196334.3196334&utm_medium=cpc&utm_id=gwzcw.3196334.3196334.3196334" target="_blank">腾讯云</a><a href="https://www.huaweicloud.com/" target="_blank">华为云</a><a href="https://cloud.baidu.com" target="_blank">百度云</a><a href="https://www.jdcloud.com" target="_blank">京东云</a><a href="https://www.yisu.com/" target="_blank">亿速云</a><a href="https://www.163yun.com" target="_blank">网易云</a><a href="http://www.gcpowertools.com.cn" target="_blank">葡萄城控件</a><a href="http://www.chinaz.com/" target="_blank">站长之家</a><a href="http://dev.yesky.com" target="_blank">天极网</a><a href="http://www.hightopo.com/cn-index.html" target="_blank">图扑软件</a><a href="http://www.cnblogs.com/mipengine/" target="_blank">百度MIP博客</a><a href="http://wetest.qq.com/?from=links_cnblogs" target="_blank">腾讯WeTest</a><a href="http://yaq.qq.com/" target="_blank">腾讯御安全</a><a href="http://www.ucancode.com/index.html" target="_blank">工控组态源码</a><a href="https://163yun.cnblogs.com/" target="_blank">网易云博客</a><a href="https://kb.cnblogs.com" target="_blank">知识库</a>
</div>
            <div class="footer-splitter"></div>
            <div id="footer_bottom">
                <div class="poweredby">Powered by .NET Core on Kubernetes</div>
                <div class="about"><a href="https://about.cnblogs.com/">关于博客园</a><a href="https://about.cnblogs.com/contact">联系我们</a><a href="https://about.cnblogs.com/ad">广告服务</a><a href="https://about.cnblogs.com/job">人才服务</a>&copy;2004-2020<a href="https://www.cnblogs.com/">博客园</a>保留所有权利<a href="http://www.beian.miit.gov.cn" target="_blank">沪ICP备09004260号</a></div>
                <div class="beian"><a href="https://ss.knet.cn/verifyseal.dll?sn=e131108110100433392itm000000&amp;ct=df&amp;a=1&amp;pa=0.25787803245785335" rel="nofollow" target="_blank"><img id="cnnic_img" src="//common.cnblogs.com/images/cnnic.png" alt="" width="64" height="23" /></a><a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011502001144" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="//common.cnblogs.com/images/ghs.png" alt="" /><span style="float:left;height:20px;line-height:20px;margin: 0 5px 0 5px;">沪公网安备 31011502001144号</span></a></div>
                <div class="report-contact">举报电话：0571-88079867，举报邮箱：contact@cnblogs.com <a href="http://www.shjbzx.cn" target="_blank"><img src="/images/jblogo.png?v=20200730" alt="" /></a></div>
            </div>
        </footer>
    </div>
</body>
</html>
