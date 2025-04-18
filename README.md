# PicGo-Worker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Lint CI](https://github.com/Flying-Tom/picgo-worker/actions/workflows/lint.yml/badge.svg)](https://github.com/Flying-Tom/picgo-worker/actions/workflows/lint.yml)

一个简单的 Cloudflare worker，用于通过 PicGo API 将图片上传到 Cloudflare R2。

## 应用场景

- [obsidian-image-auto-upload-plugin](https://github.com/renmu123/obsidian-image-auto-upload-plugin)
- [vs-piclist](https://marketplace.visualstudio.com/items?itemName=Kuingsmile.vs-piclist)

## 部署

1. 点击如下按钮快速安装

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Flying-Tom/picgo-worker)

2. Fork 或者 Clone 这个仓库，并在`wrangler.toml` 中设置如下 secrets：

- `TOKEN`: worker 的访问令牌
  - `upload` api: `https://example.com/upload?key=${TOKEN}`
  - `delete` api: `https://example.com/delete?key=${TOKEN}`
- `BUCKET_URL`: 您的 Cloudflare R2 桶的 url

```bash
npx wrangler secret put TOKEN
npx wrangler secret put BUCKET_URL
```

然后通过如下命令进行部署：

```bash
npm run deploy
```

## 致谢

- [PicGo](https://github.com/Molunerfinn/PicGo)
- [PicList](https://github.com/Kuingsmile/PicList)
