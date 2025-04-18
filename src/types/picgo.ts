export interface IImgInfo {
  buffer?: Buffer
  base64Image?: string
  fileName?: string
  width?: number
  height?: number
  extname?: string
  imgUrl?: string
  id?: string
  type?: string
  [propName: string]: unknown
}


export interface IPicGoResponse {
  success: boolean;
  message?: string;
  msg?: string;
  result?: string[] | string;
  fullResult?: Record<string, unknown>[];
}

export interface IPicGoDeleteRequest {
  list: IImgInfo[];
}