import { deleteImage, uploadImage } from "./handler";
import { Env } from "./types/env";
import { handleResponse } from "./util/http";

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {

    if (request.method === 'POST') {
      const url = new URL(request.url)
      if (url.searchParams.get('key') !== env.TOKEN) {
        return handleResponse(403, { success: false, message: "Unauthorized access" });
      }
      if (url.pathname.startsWith('/upload')) {
        return uploadImage(request, env, ctx);
      } else if (url.pathname.startsWith('/delete')) {
        return deleteImage(request, env, ctx);
      }
    }
    return handleResponse(200, { success: true, message: "This is PicGo Worker!" });
  },
};
