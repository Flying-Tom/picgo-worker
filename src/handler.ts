/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import path from "path";
import { Env } from "./types/env";
import { IImgInfo, IPicGoDeleteRequest } from "./types/picgo";
import { formatPath } from "./util/filepath";
import { handleResponse } from "./util/http";

async function createImgInfo(img: File, env: Env) {
  const imginfo: IImgInfo = {
    extname: "png",
  };

  imginfo.buffer = Buffer.from(await img.arrayBuffer());
  const imagePath = formatPath(imginfo, env.FORMAT);
  await env.BUCKET.put(imagePath, imginfo.buffer);

  imginfo.imgUrl = path.join(env.BUCKET_URL, imagePath);
  return imginfo;
}

export async function uploadImage(
  request: Request,
  env: Env,
  ctx: ExecutionContext
) {
  try {
    const img = await request.formData().then((data) => {
      for (const val of data.values()) {
        if (val instanceof File) {
          return val;
        }
      }
    });
    if (!img) {
      return handleResponse(400, {
        success: false,
        message: "No image found in request",
      });
    }

    const imginfo = await createImgInfo(img, env);
    if (!imginfo.imgUrl) {
      return handleResponse(500, {
        success: false,
        message: "Failed to generate image URL",
      });
    }
    return handleResponse(200, {
      success: true,
      result: [imginfo.imgUrl],
      fullResult: [imginfo],
    });

  } catch (err: any) {
    console.debug(err);
    return handleResponse(500, { success: false, message: err.message });
  }
}

export async function deleteImage(
  request: Request,
  env: Env,
  ctx: ExecutionContext
) {
  const body: IPicGoDeleteRequest = await request.json();
  if (!body || !body.list) {
    return handleResponse(400, {
      success: false,
      message: "No list found in body",
    });
  }
  const imgList: IImgInfo[] = body.list;
  for (const img of imgList) {
    if (!img.imgUrl) {
      return handleResponse(400, {
        success: false,
        message: "No imgUrl found in imginfo",
      });
    }
    const imgPath = new URL(img.imgUrl).pathname;
    await env.BUCKET.delete(imgPath.slice(1)); // remove the first slash
  }
  return handleResponse(200, { success: true, message: "Delete success" });
}
