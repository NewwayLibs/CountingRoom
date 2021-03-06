function isAuthorized (req) {
  let userId = fetchUserId(req)
  return 1 || userId > 0
}

function fetchUserId (req) {
  let token = req.header('authorization')
  if (token) {
    return parseUserId(token)
  }
  return null
}

function parseUserId (token) {
  token = token.split(/Bearer\:?\s?/i)

  if (token.length > 1) {
    return parseInt(token[1])
  }
  return null

}

exports.isAuthorized = isAuthorized
exports.parseUserId = parseUserId
exports.fetchUserId = fetchUserId
