# 广西少数民族文化遗产数字化保护与展示平台

## How to Run

```bash
# 方式一：Docker Compose 一键启动（推荐）
docker-compose up -d --build

# 启动后访问：http://localhost:8081

# 方式二：本地开发运行
cd frontend-admin
npm install
npm run dev

# 开发环境访问：http://localhost:5173
```

## Services

| 服务名称 | 端口 | 说明 |
|---------|------|------|
| frontend-admin | 8081 | 前端展示平台（Vue 3 + Element Plus） |

## 测试账号

admin / admin123（管理员）
user / user123（文化探索者）

**数据说明：** 本项目所有文化资源、传承人、文创产品等数据均为前端 Mock 数据（位于 `frontend-admin/src/utils/mockData.js`），内容基于广西壮、瑶、苗、侗少数民族真实文化遗产编写，用于展示平台完整功能。实际生产环境中应替换为后端 API 接口。

## 题目内容

任务：基于Vue开发【广西少数民族文化遗产数字化保护与展示平台】前端，需深度贴合广西壮、瑶、苗、侗等少数民族文化特色（古籍、技艺、民俗、音乐舞蹈），兼顾文化展示的专业性与用户体验的沉浸感。

核心要求：

1. 视觉风格：**严禁使用任何渐变紫色系**（含纯紫、淡紫、紫渐变），拒绝AI生成的悬浮玻璃感、夸张光影、过度模糊叠加等非实用风格；采用"壮族铜鼓青（#1A535C）+ 瑶族织锦红（#FF6B6B）+ 侗族鼓楼木（#F7FFF7）"为主色调，走"简约雅致+文化质感+民族特色"路线，界面干净有层次，符合文化遗产展示的庄重与美感。

2. 核心页面：覆盖首页（文化遗产总览）、资源分类页（古籍/技艺/民俗/音乐）、3D虚拟漫游页（壮族村寨/瑶族梯田）、非遗传承人展示页、文创产品页5大核心页面。

3. 动画效果：添加自然、轻量化的文化类动画，避免喧宾夺主，具体包括：
   - 页面切换：Vue Router原生过渡（时长0.3s），无自定义夸张特效；
   - 资源加载：文化资源卡片、传承人信息逐行/逐张淡入动画（opacity从0到1，配合Y轴5px微动）；
   - 交互反馈：按钮点击时轻微缩放（scale 0.98）+ 颜色加深，3D漫游场景加载完成后有"场景加载成功"轻量弹窗动画（淡入淡出）；
   - 特色动效：进入3D虚拟漫游页时，场景模型从模糊到清晰的渐变动画（时长1s，匀速）；非遗技艺展示视频播放时，进度条采用壮族织锦纹理样式，加载动画从左到右渐显。

4. 民族文化特色融入：
   - 装饰元素：卡片边框、标题栏添加极简壮锦纹理（非大面积堆砌），使用铜鼓、绣球、银饰、风雨桥等广西少数民族特色图标的线条样式；
   - 功能贴合：突出文化资源分类筛选（按民族/类型/地区）、3D虚拟漫游交互控制、传承人作品展示等核心功能；支持多语种（中/英/壮语）切换，界面术语贴合文化遗产专业表述；
   - 内容适配：资源详情页包含文化背景介绍、历史渊源、传承现状，3D虚拟漫游页支持视角切换、热点交互（点击查看文化知识点）。

5. 适配性：兼容PC端/移动端，支持响应式布局；3D虚拟漫游模块适配不同分辨率，低网络环境下可加载简化版模型；文字内容适配不同年龄段用户，避免过于学术化的表述。

6. 交互逻辑：符合文化展示类平台操作习惯，资源搜索支持"关键词+民族+类型"多维度筛选；3D虚拟漫游支持鼠标拖拽/触屏滑动控制视角，热点交互有明确提示；用户可对文化资源进行收藏/分享/评论。
输出要求：

先输出整体设计方案（配色规范、页面架构、动画规划、民族文化元素融入方式）；
再输出各页面核心布局代码（Vue2/Vue3）；
标注动画实现方式（CSS3 transition 或 Vue动画钩子）；
说明针对文化遗产展示的界面优化细节（3D虚拟漫游、多语种切换、资源分类）。

---

## 项目介绍

### 概述

「广西少数民族文化遗产数字化保护与展示平台」是一个基于 **Vue 3 + Element Plus** 构建的纯前端展示项目，旨在以数字化手段保护和展示广西壮、瑶、苗、侗等少数民族的璀璨文化遗产。

### 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue 3 | ^3.4 | 前端框架，Composition API |
| Element Plus | ^2.6 | UI 组件库 |
| Vue Router | ^4.3 | 路由管理 |
| Pinia | ^2.1 | 状态管理 |
| Vue I18n | ^9.10 | 国际化（中/英/壮语） |
| Three.js | ^0.162 | 3D 虚拟漫游场景渲染 |
| Vite | ^5.1 | 构建工具 |
| Sass | ^1.71 | CSS 预处理器 |

### 配色规范

- **壮族铜鼓青** `#1A535C` — 主色调，用于导航、标题、按钮
- **瑶族织锦红** `#FF6B6B` — 强调色，用于重点标记、交互高亮
- **侗族鼓楼木** `#F7FFF7` — 浅色背景、卡片底色
- 严格禁用任何紫色系配色

### 页面架构

```
├── 首页（文化遗产总览）        /
├── 资源分类页                  /resources
│   └── 资源详情页              /resources/:id
├── 3D虚拟漫游页                /virtual-tour
├── 非遗传承人展示页            /inheritors
└── 文创产品页                  /products
```

### 动画实现方式

| 动画类型 | 实现方式 | 时长 |
|---------|---------|------|
| 页面切换 | Vue Router `<transition>` + CSS3 transition | 0.3s |
| 卡片淡入 | CSS3 `@keyframes fadeInUp` + `animation-delay` 逐项延迟 | 0.4s |
| 按钮点击 | CSS3 `:active { transform: scale(0.98) }` | 0.15s |
| 3D场景渐显 | CSS3 `@keyframes sceneBlurReveal` (blur→clear) | 1s linear |
| 织锦进度条 | CSS3 `clip-path` 动画 + `repeating-linear-gradient` | 2s |
| Toast弹窗 | Vue `<transition>` + CSS3 淡入淡出 | 0.3s |

### 民族文化元素融入

- **壮锦纹理边框**：卡片顶部使用 CSS `repeating-linear-gradient` 模拟壮锦纹理条
- **民族图标**：铜鼓、绣球、风雨桥、银饰、鼓楼等 SVG 线条图标
- **民族标签**：壮/瑶/苗/侗各有专属配色标签
- **多语种支持**：中文/English/Vahcuengh（壮语）三语切换

### 3D虚拟漫游优化

- 使用 Three.js 构建壮族村寨和瑶族梯田两个场景
- 支持鼠标拖拽/触屏滑动控制视角、滚轮缩放
- 热点交互：点击红色标记点查看文化知识点
- 场景加载完成后有轻量 Toast 提示
- 进入场景时 blur→clear 渐变动画（1s 匀速）

### 项目目录结构

```
label-02199/
├── README.md                       # 项目说明
├── docker-compose.yml              # Docker 编排
├── .gitignore                      # Git 忽略配置
└── frontend-admin/                 # 前端工程
    ├── Dockerfile                  # Docker 构建文件
    ├── nginx.conf                  # Nginx 配置
    ├── package.json                # 依赖管理
    ├── vite.config.js              # Vite 配置
    ├── index.html                  # 入口 HTML
    └── src/
        ├── main.js                 # 应用入口
        ├── App.vue                 # 根组件
        ├── router/index.js         # 路由配置
        ├── store/index.js          # Pinia 状态管理
        ├── i18n/                   # 国际化
        │   ├── index.js
        │   ├── zh.js               # 中文
        │   ├── en.js               # 英文
        │   └── za.js               # 壮语
        ├── styles/                 # 样式系统
        │   ├── variables.scss      # 设计变量
        │   ├── global.scss         # 全局样式
        │   ├── animations.scss     # 动画系统
        │   └── ethnic-patterns.scss# 民族纹样
        ├── components/             # 组件
        │   ├── layout/             # 布局组件
        │   ├── common/             # 通用组件
        │   └── icons/              # 民族图标
        ├── views/                  # 页面视图
        │   ├── HomePage.vue
        │   ├── ResourceClassification.vue
        │   ├── ResourceDetail.vue
        │   ├── VirtualTour.vue
        │   ├── InheritorDisplay.vue
        │   ├── CulturalProducts.vue
        │   └── NotFound.vue        # 404 页面
        ├── composables/            # 组合函数
        │   └── useAnimation.js
        └── utils/                  # 工具函数
            ├── constants.js        # 常量定义
            └── mockData.js         # Mock 数据
```
