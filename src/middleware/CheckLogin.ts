import { Middleware } from '../Interface/Middleware';
import { Session } from '../Interface/Session';
import { KEY, remove, reset, select } from '../modules/Session';
import { ResRedirect } from '../respond/ResRedirect';
import { getCookie, setCookie } from '../common/cookie';
import { Context } from '../Interface/Context';
import { LOGIN } from '../configure';

export const CheckLogin: Middleware = (ctx, next) => {
  if (!LOGIN) {
    next()
    return
  }
  
  //排除不需要登录的接口
  const { req: { method }, relativePath } = ctx
  if ((method === 'GET' && relativePath === '/login') ||
    (method === 'POST' && relativePath === '/getToken')
  ) {
    next()
    return
  }

  if (!isLogin(ctx)) {
    ResRedirect({ ctx, location: '/login', code: 302, reasonPhrase: 'temporarily moved' })
  } else {
    next()
  }
}

function isLogin(ctx: Context): boolean {
  const { req, res } = ctx
  const id: string | null = getCookie(req, KEY)
  //检查id
  if (!id) return false
  //查询
  const ses: Session | undefined = select(id)
  //不存在
  if (!ses) {
    setCookie({ res, key: KEY, value: 'delete', expires: new Date(), httpOnly: true })
    return false
  }
  //超时
  if (ses.expire < Date.now()) {
    remove(id)
    setCookie({ res, key: KEY, value: 'delete', expires: new Date(), httpOnly: true })
    return false
  }
  //存在 & 重置
  reset(id)
  return true
}