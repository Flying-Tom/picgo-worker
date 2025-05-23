import * as crypto from 'crypto';
import { IImgInfo } from "../types/picgo";

class FileNameGenerator {
  date: Date
  info: IImgInfo

  static fields = [
    'year', // 当前日期 - 年
    'month', // 当前日期 - 月
    'day', // 当前日期 - 日
    'fullName', // 文件名, 包含扩展名
    'fileName', // 文件名, 不包含扩展名
    'extName', // 扩展名
    'md5', // md5
    'md5B64', // md5 base64
    'md5B64Short', // md5 base64 short
    'sha1', // sha1
    'sha256', // sha256
    'timestamp', // 当前时间戳, 秒
    'timestampMS' // 当前时间戳, 毫秒
  ]

  constructor(info: IImgInfo) {
    this.date = new Date()
    this.info = info
  }

  public year(): string {
    return `${this.date.getFullYear()}`
  }

  public month(): string {
    return (this.date.getMonth() + 1).toString().padStart(2, '0')
  }

  public day(): string {
    return this.date.getDate().toString().padStart(2, '0')
  }

  public fullName(): string | undefined {
    return this.info.fileName
  }

  public fileName(): string {
    return (this.info.fileName ?? '').replace(this.info.extname ?? '', '')
  }

  public extName(): string {
    return (this.info.extname ?? '').replace('.', '')
  }

  public md5(): string {
    return crypto.createHash('md5').update(this.imgBuffer()!).digest('hex')
  }

  public md5B64(): string {
    return crypto
      .createHash('md5')
      .update(this.imgBuffer()!)
      .digest('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
  }

  public md5B64Short(): string {
    return crypto
      .createHash('md5')
      .update(this.imgBuffer()!)
      .digest('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .slice(0, 7)
  }

  public sha1(): string {
    return crypto.createHash('sha1').update(this.imgBuffer()!).digest('hex')
  }

  public sha256(): string {
    return crypto.createHash('sha256').update(this.imgBuffer()!).digest('hex')
  }

  public timestamp(): string {
    return Math.floor(Date.now() / 1000).toString()
  }

  public timestampMS(): string {
    return Date.now().toString()
  }

  private imgBuffer(): string | Buffer | undefined {
    return this.info.base64Image ? this.info.base64Image : this.info.buffer
  }
}

export function formatPath(info: IImgInfo, format?: string): string {
  if (!format) {
    return info.fileName!
  }

  const fileNameGenerator = new FileNameGenerator(info)
  let formatPath: string = format
  for (const key of FileNameGenerator.fields) {
    const re = new RegExp(`{${key}}`, 'g')
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    formatPath = formatPath.replace(re, fileNameGenerator[key]())
  }

  return formatPath
}