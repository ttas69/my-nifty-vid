# Personal NiftyVid — free deployment

This package keeps the original NiftyVid UI and generation flow. The only changes are deployment configuration so it does not point at the author's GitHub Pages URL or Worker name.

## Free architecture

GitHub Pages -> Cloudflare Worker -> public Hugging Face Space (Wan 2.2)

The GPU is still the shared public Space, so generation can wait for cold starts/queue. This is the trade-off for the $0 setup.

## 1. GitHub Pages

1. Create a new GitHub repository and upload this project.
2. In repository Settings -> Pages, choose **GitHub Actions** as the source.
3. In Settings -> Secrets and variables -> Actions -> Variables, add:
   - `PUBLIC_WORKER_URL` = your deployed Worker URL
   - `PUBLIC_SITE_URL` = `https://YOURNAME.github.io`
   - `PUBLIC_BASE_PATH` = `/REPOSITORY-NAME/`
4. Push to `main`. The included workflow builds and publishes `web/`.

For a custom domain, use `PUBLIC_BASE_PATH=/` and set `PUBLIC_SITE_URL` to the custom domain.

## 2. Cloudflare Worker

Install Node.js 20+ and pnpm 9+.

```bash
cd worker
pnpm install
pnpm wrangler login
pnpm wrangler deploy
```

Copy the resulting `https://my-nifty-vid.<your-subdomain>.workers.dev` URL into the GitHub variable `PUBLIC_WORKER_URL`.

Then update `ALLOWED_ORIGINS` in `worker/wrangler.toml` to your exact Pages URL and deploy again.

## 3. Local test

Terminal 1:
```bash
cd web
pnpm install
pnpm dev
```

Terminal 2:
```bash
cd worker
pnpm install
pnpm wrangler dev
```

The local frontend defaults to `http://localhost:8787` for the Worker.

## Notes

- The original UI is intentionally left unchanged.
- The public HF Space can sleep or queue. That cannot be eliminated while staying on the public free backend.
- Do not put private API keys into frontend code or GitHub Pages variables.
