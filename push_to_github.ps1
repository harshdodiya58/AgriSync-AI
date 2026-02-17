# Refresh PATH to include Git
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host "=== AgriSync AI - GitHub Push Script ===" -ForegroundColor Cyan
Write-Host ""

# Commit 1: Documentation
Write-Host "Commit 1: Adding project documentation..." -ForegroundColor Yellow
git status
git commit -m "docs: Add project documentation and gitignore"

# Commit 2: Backend configuration and models
Write-Host "`nCommit 2: Adding backend configuration and database models..." -ForegroundColor Yellow
git add backend/config/ backend/models/ backend/.env.example
git commit -m "feat: Add backend configuration and MongoDB models"

# Commit 3: Backend controllers and middleware
Write-Host "`nCommit 3: Adding backend controllers and middleware..." -ForegroundColor Yellow
git add backend/controllers/ backend/middleware/
git commit -m "feat: Add backend controllers and authentication middleware"

# Commit 4: Backend routes and server
Write-Host "`nCommit 4: Adding backend routes and server setup..." -ForegroundColor Yellow
git add backend/routes/ backend/server.js backend/package.json
git commit -m "feat: Add API routes and Express server configuration"

# Commit 5: Backend seed data
Write-Host "`nCommit 5: Adding database seed script..." -ForegroundColor Yellow
git add backend/seed/
git commit -m "feat: Add database seed script with demo data"

# Commit 6: Frontend configuration
Write-Host "`nCommit 6: Adding frontend configuration..." -ForegroundColor Yellow
git add frontend/package.json frontend/tsconfig.json frontend/next.config.ts frontend/postcss.config.mjs frontend/eslint.config.mjs frontend/.gitignore frontend/next-env.d.ts
git commit -m "feat: Add Next.js configuration and dependencies"

# Commit 7: Frontend components and layout
Write-Host "`nCommit 7: Adding frontend components and layout..." -ForegroundColor Yellow
git add frontend/src/components/ frontend/src/context/
git commit -m "feat: Add reusable components and auth context"

# Commit 8: Frontend API utilities
Write-Host "`nCommit 8: Adding frontend API utilities..." -ForegroundColor Yellow
git add frontend/src/lib/
git commit -m "feat: Add API helper functions and utilities"

# Commit 9: Frontend pages - Landing and Auth
Write-Host "`nCommit 9: Adding landing and authentication pages..." -ForegroundColor Yellow
git add frontend/src/app/page.tsx frontend/src/app/login/ frontend/src/app/register/ frontend/src/app/layout.tsx frontend/src/app/globals.css
git commit -m "feat: Add landing page and authentication UI"

# Commit 10: Frontend pages - Dashboard features
Write-Host "`nCommit 10: Adding dashboard feature pages..." -ForegroundColor Yellow
git add frontend/src/app/dashboard/ frontend/src/app/yield-prediction/ frontend/src/app/demand-forecast/ frontend/src/app/synchronization/ frontend/src/app/alerts/ frontend/src/app/admin/
git commit -m "feat: Add dashboard and feature pages (yield, demand, sync, alerts)"

# Commit 11: Frontend public assets
Write-Host "`nCommit 11: Adding public assets..." -ForegroundColor Yellow
git add frontend/public/ frontend/README.md
git commit -m "feat: Add public assets and frontend README"

# Add remote repository
Write-Host "`nAdding remote repository..." -ForegroundColor Yellow
git remote add origin https://github.com/harshdodiya58/AgriSync-AI.git

# Set default branch to main
Write-Host "`nSetting default branch to main..." -ForegroundColor Yellow
git branch -M main

# Push to GitHub
Write-Host "`nPushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host "`n=== Push Complete! ===" -ForegroundColor Green
Write-Host "Repository: https://github.com/harshdodiya58/AgriSync-AI" -ForegroundColor Cyan
