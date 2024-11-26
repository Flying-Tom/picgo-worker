import { handleResponse } from "./util/http";
import { deletePic, uploadPic } from "./handler";
import { Env } from "./types/env";

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
        return uploadPic(request, env, ctx);
      } else if (url.pathname.startsWith('/delete')) {
        return deletePic(request, env, ctx);
      }
    }
    return handleResponse(200, { success: true, message: "This is PicGo Worker!" });
  },
};
