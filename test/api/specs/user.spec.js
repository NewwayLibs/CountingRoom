const frisby = require('frisby')
const Joi = frisby.Joi
const url = 'http://localhost:3000/'

it('should return list of users', function (done) {
  frisby.get(url + 'users')
    .expect('status', 200)
    .expect('header', 'content-type', new RegExp('application/json'))
    .expect('jsonTypes', '*', {
      id: Joi.number().required(),
      profile_id: Joi.number().required(),
      currency_id: Joi.number().required(),
      email: Joi.string().required(),
      fullname: Joi.string().required(),
      status: Joi.boolean().required()
    })
    .done(done)
})
