# D·N·A — Design Nucleus Analyzer

> `/dna <url>` — 将任意网站的完整设计语言提取为可安装的 AI 技能。

## 名字的由来

**D·N·A** 即 **Design Nucleus Analyzer**（设计核心分析器）。

"DNA" 包含两层含义：

- **生物 DNA** — 定义生命体外观和行为的遗传密码。网站的设计系统就是它的视觉 DNA：颜色、字体、间距、动效——这些可识别的遗传特征。
- **Nucleus（细胞核）** — 细胞的核心，DNA 的所在。分析器穿透网站的表面外观，提取其核心设计规则——不是具体的像素值，而是编码其中的底层原理。

每次提取产出一个可复用的"基因"——一个可安装的 `.skill.md` 文件。任何 AI agent 加载后即可按该风格创作。如同基因一般，这些技能可以在项目之间继承、组合、进化。

## 快速开始

```
/dna https://example.com --name my-style
```

Agent 将自动完成：

1. **穿透** — 通过 Chrome Profile 导入或公开路径绕过登录墙
2. **采样** — 统计级 CSS 提取（每页 600+ 元素）
3. **测序** — 聚类取值、映射语义角色、推断设计规则
4. **编码** — 产出完整的 DESIGN.md（10 个维度）
5. **封装** — 打包为可安装的 `.skill.md`

安装到任意项目使用：

```bash
cp skills/my-style.skill.md ~/my-project/skills/
# "用 skill://my-style 设计一个 landing page"
```

## 提取维度

| 维度 | 提取内容 |
|---|---|
| 1. 氛围 | 密度、变化度、动效强度、流派、情绪 |
| 2. 色彩 | 亮色/暗色双模、语义角色、渐变 |
| 3. 字体 | 字体栈、字号阶梯、字重层级、文字色阶 |
| 4. 间距 | 基准单位、间距阶梯、最大宽度、垂直节奏 |
| 5. 形状 | 圆角阶梯、阴影层级、边框惯例 |
| 6. 布局 | 栅格/弹性布局、断点、固定元素、z-index 分层 |
| 7. 组件 | 按钮、卡片、输入框、导航、模态框、徽章、头像 |
| 8. 动效 | 过渡、悬停、滚动行为、入场动画 |
| 9. 图像 | 宽高比、图片处理、图标风格 |
| 10. 约束 | 反模式、刻意回避、文案语气 |

## 致谢

本项目站在两个巨人的肩膀上：
- **[ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template)**（18k ★）— 由 JCodesMore 开创的"AI agent 逆向工程网站"范式。它的多阶段流水线（侦察 → 提取 → 规范 → 并行构建 → 组装）和 13 平台 agent 支持，为 D·N·A 提供了架构蓝本。没有它，"用 AI 提取网站设计"这个想法根本不会出现。
- **[browser-act](https://github.com/browser-act/skills)**（2.8k ★）— 由 BrowserAct 团队打造的"为 AI agent 设计的浏览器自动化 CLI"。与传统爬虫工具不同，browser-act 从四个维度重新定义了 agent 与浏览器的交互方式：
  - **突破反爬封锁**（三层渐进：环境层指纹伪装 → 执行层 `solve-captcha` 自动过验证码 → 人工层 `remote-assist` 远程接管）
  - **三种浏览器模式**（`chrome` 复用本地登录态、`stealth` 隐私模式零残留、`stealth` 固定身份多账号并行无关联）
  - **零干扰并发**（跨浏览器并行独立 Cookie/指纹/代理，同浏览器多 session 共享登录态互不阻塞）
  - **面向 agent 推理设计**（`state` 索引式元素列表 + `click 3` 索引交互，无需 DOM 解析；`get markdown` 紧凑文本输出，token 效率数倍于 JSON/HTML）
  D·N·A 的每一步都踩在 browser-act 的肩膀上：**CSS 统计采样**用的是 `eval` 在浏览器上下文执行 JS 的能力；**登录态穿透**依赖 `browser create --source-profile` 导入 Chrome Profile 的 419 条 Cookie；**交互扫描**（滚动/点击/悬停）由 `scroll`/`click`/`hover` 驱动；**页面结构分析**靠 `state` 和 `get markdown`。没有 browser-act，D·N·A 对任何需要登录的网站都将束手无策。

D·N·A 的独特贡献在于：将这个流水线从"像素级复刻"转向了"设计基因提取"——归纳设计规则而非复制实例。但灵感、思路和技术基底，都来自这两个项目。

## 缘起

首次公开提取——zhihu.com——揭示了一个近乎扁平的设计系统：1,200+ 个元素中仅 1 处阴影。这一个数据点比任何截图都更能说明知乎的设计哲学。

## 环境要求

- Node.js 24+
- 带有浏览器 MCP 访问能力的 AI 编程 agent（推荐 Claude Code）
- 支持：Claude Code、Codex CLI、OpenCode、GitHub Copilot、Cursor、Windsurf、Gemini CLI、Cline、Roo Code、Continue、Amazon Q、Augment Code、Aider

## 项目结构

```
dna/
├── SKILL.md                       # /dna 命令本身
├── templates/
│   ├── DESIGN_TEMPLATE.md         # 10 维规范模板
│   └── SKILL_TEMPLATE.md          # .skill.md 包装模板
├── scripts/
│   └── package-skill.mjs          # DESIGN.md → .skill.md
├── skills/                        # 提取产物输出目录
│   └── <样式名>.skill.md          # 你的提取结果放这里
└── README.md
```

## 不适用场景

- **克隆网站** — 见 [ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template)
- **钓鱼或冒名**
- **违反目标网站服务条款**

## License

MIT
