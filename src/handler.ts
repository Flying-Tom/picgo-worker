import { formatPath } from "./util/filepath";
import { IImgInfo, IPicGoDeleteRequest } from "./types/picgo";
import { handleResponse } from "./util/http";
import { Env } from "./types/env";
import path from "path";

export async function uploadPic(
  request: Request,
  env: Env,
  ctx: ExecutionContext
) {
  try {
    const img = await request.formData().then((data) => {
      for (let val of data.values()) {
        if (val instanceof File) {
          return val;
        }
      }
    });
    if (!img) {
      return handleResponse(400, { success: false, message: "No image found in request" });
    }
    const imginfo: IImgInfo = {
      extname: "png"
    };

    imginfo.buffer = Buffer.from(await img.arrayBuffer());
    const imagePath = formatPath(imginfo, env.FORMAT);
    await env.BUCKET.put(imagePath, imginfo.buffer);

    imginfo.imgUrl = path.join(env.BUCKET_URL, imagePath);

    return handleResponse(200, {
      success: true,
      result: [imginfo.imgUrl],
      fullResult: [imginfo]
    });
  } catch (err: any) {
    console.debug(err);
    return handleResponse(500, { success: false, message: err.message });
  }
}

export async function deletePic(
  request: Request,
  env: Env,
  ctx: ExecutionContext
) {
  const body: IPicGoDeleteRequest = await request.json();
  if (!body || !body.list) {
    return handleResponse(400, { success: false, message: "No list found in body" });
  }
  const imgList: IImgInfo[] = body.list;
  for (const img of imgList) {
    if (!img.imgUrl) {
      return handleResponse(400, { success: false, message: "No imgUrl found in imginfo" });
    }
    const imgPath = new URL(img.imgUrl).pathname;
    await env.BUCKET.delete(imgPath.slice(1)); // remove the first slash
  }
  return handleResponse(200, { success: true, message: "Delete success" });
}