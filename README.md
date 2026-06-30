# module-ai-product-manager

OpenSkill Galaxy · **AI 产品经理训练** 模块

面向想进入 AI 产品、AIGC 产品、Agent 产品、RAG 知识库产品、企业 AI 工具、AI 教育产品、AI SaaS 产品方向的学习者，提供 AI 产品基础、需求分析、Prompt 工程、Agent 设计、RAG 产品设计、数据与评测、原型设计、商业化和面试作品集训练。

## 访问地址

- 线上：https://openskill-galaxy.github.io/module-ai-product-manager/
- 仓库：https://github.com/openskill-galaxy/module-ai-product-manager
- 总入口站：https://openskill-galaxy.github.io/

## 技术栈

Vite + React + TypeScript + Tailwind CSS + React Router + Zustand + Fuse.js + 静态 JSON + GitHub Actions Pages。无后端、无数据库、不调用 AI API。

## 数据规模

| 数据集 | 数量 |
|---|---|
| courses | 14 |
| lessons | 192 |
| knowledge-points | 820 |
| questions | 3000（7 题型：single=900, multiple=450, judge=350, fill=250, short=500, calculation=150, case_analysis=400） |
| cases | 280 |
| exams | 90 |
| routes | 31 |
| glossary | 360 |
| faqs | 220 |
| tags | 1513 |
| search-index | 4886 |

## 本地开发

```bash
npm install
npm run dev      # 开发服务器
npm run build    # 生产构建
npm run preview  # 预览构建
node scripts/validate-data.mjs  # 静态数据校验
```

## 部署

推送到 main 分支后，GitHub Actions 自动构建并部署到 GitHub Pages（项目站点，base = `/module-ai-product-manager/`）。

## License

MIT
