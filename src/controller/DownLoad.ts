import { createReadStream, ReadStream } from 'fs';
import { join } from 'path';
import { Controller } from '../Interface/Controller';
import { Context } from '../Interface/Context';
import { PUBLIC_PATH } from '../common/path';

export class DownLoad implements Controller {
  readonly PATH_NAME: string = '/api/download'
  POST(ctx: Context) {
    const file: string = 'ajax.js'
    const filename: string = join(PUBLIC_PATH, file)
    ctx.res.setHeader('Content-Type', 'application/octet-stream; charset=utf-8')
    ctx.res.setHeader('Content-Disposition', `attachment; filename=${file}`)
    const reader: ReadStream = createReadStream(filename)
    reader.pipe(ctx.res)
  }
}

/*
  前端代码
  const res = await ajax('/api/download', {
    type: 'post',
    responseType: 'arraybuffer'
  })
  // 创建blob对象
  const blob = new Blob([res], { type: 'application/octet-stream', endings: 'native' })
  // 创建下载链接
  const href = window.URL.createObjectURL(blob)
  // 创建a标签并为其添加属性
  const link = document.createElement('a')
  link.href = href
  link.download = 'ajax.js'
  // 触发事件
  link.click()
*/