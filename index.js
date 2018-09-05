const { router, get } = require('microrouter')
const { send } = require('micro')
const isUrl = require('is-url')
const links = require('./links')
const redirect = require('micro-redirect')

const data = (req, res) => {
  const { route } = req.params

  const destiny = links[route]

  if (destiny && isUrl(destiny)) {
    return redirect(res, 302, destiny)
  }

  send(res, 404, 'Sorry, this route not exists.')
}

const main = (req, res) => links

module.exports = router(
  get('/:route', data),
  get('/', main)
)
