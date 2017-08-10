const frisby = require('frisby')
const Joi = frisby.Joi
const url = 'http://localhost:3000/'

it('should return list of accounts', function (done) {
  frisby.get(url + 'accounts')
    .expect('status', 200)
    .expect('header', 'content-type', new RegExp('application/json'))
    .expect('jsonTypes', '*', {
      id: Joi.number().required(),
      profile_id: Joi.number().required(),
      account_type_id: Joi.number().required(),
      currency_id: Joi.number().required(),
      title: Joi.string().required(),
      description: Joi.string().allow(null).required(),
      start_balance: Joi.number().required(),
      is_closed: Joi.boolean().required()
    })
    .done(done)
})
