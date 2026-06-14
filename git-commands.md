# Git 速查卡片

## 🚀 快速开始

### 首次设置
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/hankepeng/cfchat.git
git push -u origin main --force
```

### 日常工作流程
```bash
# 1. 拉取最新代码
git pull origin main

# 2. 修改代码...

# 3. 查看修改
git status
git diff

# 4. 提交修改
git add .
git commit -m "你的提交信息"

# 5. 推送
git push origin main
```

---

## 📝 常用命令

### 查看状态
```bash
git status              # 查看当前状态
git log --oneline      # 查看提交历史
git remote -v          # 查看远程仓库
```

### 撤销操作
```bash
git checkout -- .      # 撤销所有未提交的修改
git reset HEAD .       # 取消暂存
git commit --amend     # 修改最后一次提交
```

### 分支操作
```bash
git branch -a                    # 查看所有分支
git checkout -b feature-name      # 创建并切换到新分支
git checkout main                # 切换到主分支
git merge feature-name           # 合并分支
git branch -d feature-name      # 删除分支
```

### 更新代码
```bash
git pull origin main             # 拉取并合并
git fetch origin                 # 仅获取不合并
git rebase main                  # 变基操作
```

---

## 🔧 推送被拒绝解决方案

### 情况1：远程有更新，本地没有
```bash
git pull origin main --rebase
git push origin main
```

### 情况2：强制覆盖远程（慎用！）
```bash
git push -u origin main --force
```

---

## 📌 提交信息规范

### 格式
```
<类型>: <描述>

[可选的详细说明]
```

### 常用类型
- `Fix:` - 修复 bug
- `Feat:` - 新功能
- `Update:` - 更新功能
- `Docs:` - 文档修改
- `Style:` - 样式调整
- `Refactor:` - 代码重构
- `Test:` - 测试相关

### 示例
```bash
git commit -m "Fix: 修复图片无法显示的问题"
git commit -m "Feat: 添加深色模式支持"
git commit -m "Update: 优化图片压缩算法"
```

---

## ⚠️ 注意事项

1. **推送前先拉取** - 始终先 `git pull origin main`
2. **提交前检查** - 使用 `git status` 确认修改
3. **描述清晰** - 提交信息要描述清楚做了什么
4. **小步提交** - 每次提交只做一件事
5. **不要提交敏感信息** - 包含 API Keys、密码等

---

## 🆘 常见问题

### Q: 如何查看某个文件的修改历史？
```bash
git log -p <文件名>
```

### Q: 如何暂存当前修改？
```bash
git stash                 # 暂存
git stash pop            # 恢复暂存
```

### Q: 如何查看远程仓库信息？
```bash
git remote -v
git remote show origin
```

### Q: 如何修改远程仓库地址？
```bash
git remote set-url origin <新地址>
```

---

**记住：** `git push` 之前先 `git pull`！
