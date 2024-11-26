# PicGo-Worker

A Simple Cloudflare worker to upload image to Cloudflare R2 with PicGo API.

## Application

- [obsidian-image-auto-upload-plugin](https://github.com/renmu123/obsidian-image-auto-upload-plugin)
- [vs-piclist](https://marketplace.visualstudio.com/items?itemName=Kuingsmile.vs-piclist)

## How to start

(Fork or) Clone this repo, and set the secrets first:

- `TOKEN`: access token for your worker
  - `upload` api: `https://example.com/upload?key=${TOKEN}`
  - `delete` api: `https://example.com/delete?key=${TOKEN}`
- `BUCKET_URL`: the url of your Cloudflare R2 bucket

```bash
npx wrangler secret put TOKEN
npx wrangler secret put BUCKET_URL
```

Then, you can deploy the worker:

```bash
npm run deploy
```

## Thanks

- [PicGo](https://github.com/Molunerfinn/PicGo)
- [PicList](https://github.com/Kuingsmile/PicList)
