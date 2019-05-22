const { CONTROLLER } = require('../store/CONTROLLER')

function CheckController(req, res, next) {
  const { method, relativePath } = req
  const Con = CONTROLLER.find(v => v.PATH === relativePath)
  if (!Con || !Con.prototype[method]) return next()
  const r0 = new Con()
  r0[method](req, res)
}
module.exports = CheckController