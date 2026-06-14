@echo off
echo ========================================
echo NodeCrypt 快速部署脚本
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] 正在安装依赖...
call npm install
if errorlevel 1 (
    echo ❌ 依赖安装失败！
    pause
    exit /b 1
)

echo.
echo [2/3] 正在构建项目...
call npm run build
if errorlevel 1 (
    echo ❌ 构建失败！
    pause
    exit /b 1
)

echo.
echo [3/3] 正在部署到 Cloudflare Workers...
call npx wrangler deploy
if errorlevel 1 (
    echo ❌ 部署失败！
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✅ 部署成功！
echo ========================================
echo.
pause
