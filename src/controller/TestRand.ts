import { Controller } from "../Interface/Controller";
import { Context } from "../Interface/Context";

export class TestRand implements Controller {
  readonly PATH_NAME: string = '/api/rand/*'
  GET(ctx: Context) {
    const { res, query } = ctx
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify(query))
  }
}