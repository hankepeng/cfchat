# NodeCrypt 部署与更新指南

本指南将帮助您将修改后的代码推送到 GitHub 并部署到 Cloudflare Workers。

---

## 📋 准备工作

### 1. 安装必要工具

请确保已安装以下工具：

- **Git** - 版本控制工具
- **Node.js** (v16+) - JavaScript 运行时
- **Wrangler** - Cloudflare Workers CLI 工具

安装 Wrangler：
```bash
npm install -g wrangler
```

或在项目目录安装为开发依赖：
```bash
npm install --save-dev wrangler
```

---

## 🔄 方式一：通过命令行部署（推荐）

### 第一步：初始化 Git 仓库并连接远程仓库

```bash
# 1. 进入项目目录
cd nodecrypt-main

# 2. 初始化本地 Git 仓库
git init

# 3. 添加所有文件到暂存区
git add .

# 4. 创建初始提交
git commit -m "Initial commit with image display fix"

# 5. 添加远程仓库（将 YOUR_USERNAME 替换为您的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/cfchat.git

# 6. 如果您还没有克隆过原仓库，先获取远程仓库信息
git fetch origin

# 7. 将本地分支与远程仓库关联
git branch -M main
git push -u origin main --force
```

### 第二步：推送到 GitHub

```bash
# 1. 每次代码修改后，查看修改状态
git status

# 2. 添加修改的文件
git add .

# 3. 创建提交（替换提交信息）
git commit -m "Fix: 优化图片显示功能，支持直接展示和放大查看"

# 4. 推送到 GitHub
git push origin main
```

---

## 🔄 方式二：使用 GitHub Desktop（图形界面）

### 步骤 1：克隆您的仓库

1. 打开 GitHub Desktop
2. 点击 **File** → **Clone Repository**
3. 选择您的 `cfchat` 仓库
4. 选择本地保存位置

### 步骤 2：替换文件

1. 将修改后的 `nodecrypt-main` 文件夹中的文件复制到克隆的仓库目录
2. 或者直接将整个 `nodecrypt-main` 文件夹的内容覆盖到仓库目录

### 步骤 3：提交并推送

1. GitHub Desktop 会自动检测到变更
2. 在左下角填写 **Summary**（提交信息）
3. 点击 **Commit to main**
4. 点击 **Push origin** 推送到 GitHub

---

## ☁️ 部署到 Cloudflare Workers

### 方式一：通过命令行手动部署

```bash
# 1. 进入项目目录
cd nodecrypt-main

# 2. 构建项目
npm run build

# 3. 部署到 Cloudflare
npm run deploy
```

部署成功后会显示 Workers 访问 URL，例如：
```
https://cfchat.your-subdomain.workers.dev
```

### 方式二：通过 GitHub Actions 自动部署（推荐）

项目已配置 GitHub Actions，每次推送到 main 分支会自动部署。

**前提条件：**

1. 在 Cloudflare Dashboard 获取 API Token：
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - 进入 **My Profile** → **API Tokens**
   - 点击 **Create Token**
   - 选择 **Edit Cloudflare Workers** 模板
   - 设置账户和区域权限
   - 生成 Token（复制保存）

2. 在 GitHub 仓库设置 Secrets：
   - 进入您的 GitHub 仓库
   - 点击 **Settings** → **Secrets** → **Actions**
   - 点击 **New repository secret**
   - 名称：`CLOUDFLARE_API_TOKEN`
   - 值：粘贴您复制的 API Token
   - 点击 **Add secret**

**自动部署流程：**
- 每当您推送代码到 `main` 分支
- GitHub Actions 会自动：
  1. 安装依赖 (`npm install`)
  2. 构建项目 (`npm run build`)
  3. 部署到 Cloudflare (`wrangler deploy`)

---

## 📝 常用 Git 命令速查

```bash
# 查看当前状态
git status

# 查看修改内容
git diff

# 查看提交历史
git log --oneline

# 撤销暂存的文件
git reset HEAD <文件名>

# 撤销工作区的修改
git checkout -- <文件名>

# 查看远程仓库
git remote -v

# 拉取最新代码
git pull origin main

# 创建并切换新分支
git checkout -b feature-branch

# 合并分支
git merge feature-branch

# 删除本地分支
git branch -d feature-branch
```

---

## 🛠️ Cloudflare Workers 常用命令

```bash
# 登录 Cloudflare（交互式）
wrangler login

# 退出登录
wrangler logout

# 查看当前部署状态
wrangler whoami

# 本地开发测试
wrangler dev

# 部署到生产环境
wrangler deploy

# 删除 Workers
wrangler delete <worker-name>
```

---

## 🔧 常见问题与解决方案

### 问题 1：推送被拒绝

**错误信息：** `! [rejected] main -> main (fetch first)`

**解决方案：**
```bash
git pull origin main --rebase
git push origin main
```

### 问题 2：Wrangler 登录失败

**解决方案：**
```bash
wrangler logout
wrangler login
```

### 问题 3：部署失败 - 权限不足

**解决方案：**
- 检查 Cloudflare API Token 是否有效
- 确保 Token 有 `Cloudflare Workers` 编辑权限

### 问题 4：本地构建成功但部署失败

**可能原因：**
- `wrangler.toml` 配置错误
- 账户配额已满（免费版有 100,000 请求/天限制）

**解决方案：**
```bash
# 检查配置
cat wrangler.toml

# 查看详细错误
wrangler deploy --verbose
```

---

## 📊 项目工作流程建议

### 日常开发流程

```
1. 拉取最新代码
   └─ git pull origin main

2. 创建功能分支（可选）
   └─ git checkout -b feature/image-fix

3. 修改代码并测试
   └─ npm run dev

4. 提交代码
   └─ git add .
   └─ git commit -m "描述修改内容"

5. 推送代码
   └─ git push origin <分支名>

6. 部署
   └─ npm run deploy
```

### Git 分支策略（可选）

```
main          ─ 生产环境分支
    │
    ├── develop        ─ 开发分支
    │       │
    │       └── feature/image-fix  ─ 功能分支
```

---

## 📚 相关资源

- [Cloudflare Workers 官方文档](https://developers.cloudflare.com/workers/)
- [Wrangler CLI 文档](https://developers.cloudflare.com/workers/wrangler/)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [NodeCrypt 原项目](https://github.com/shuaiplus/nodecrypt)

---

## ❓ 获取帮助

如果您遇到问题：

1. 查看 [GitHub Issues](https://github.com/YOUR_USERNAME/cfchat/issues)
2. 检查 Cloudflare [状态页面](https://www.cloudflarestatus.com/)
3. 查看 Wrangler [故障排除指南](https://developers.cloudflare.com/workers/wrangler/troubleshooting/)

---

**文档版本：** v1.0  
**最后更新：** 2026-06-15
