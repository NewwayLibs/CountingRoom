const frisby = require('frisby')
const Joi = frisby.Joi
const url = 'http://localhost:3000/'

it('should return list of account types', function (done) {
  frisby.get(url + 'account-types')
    .expect('status', 200)
    .expect('header', 'content-type', new RegExp('application/json'))
    .expect('jsonTypes', '*', {
      id: Joi.number().required(),
      title: Joi.string().required(),
      description: Joi.string().allow(null).required()
    })
    .done(done)
})
