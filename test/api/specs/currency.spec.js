const frisby = require('frisby')
const Joi = frisby.Joi
const url = 'http://localhost:3000/'

it('should return list of currencies', function (done) {
  frisby.get(url + 'currencies')
    .expect('status', 200)
    .expect('header', 'content-type', new RegExp('application/json'))
    .expect('jsonTypes', '*', {
      id: Joi.number().required(),
      profile_id: Joi.number().required(),
      title: Joi.string().required(),
      code: Joi.string().required(),
      value: Joi.number().required(),
      default: Joi.boolean().required()
    })
    .done(done)
})
