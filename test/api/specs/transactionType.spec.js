const frisby = require('frisby')
const Joi = frisby.Joi
const url = 'http://localhost:3000/'

it('should return list of transaction types', function (done) {
  frisby.get(url + 'transaction-types')
    .expect('status', 200)
    .expect('header', 'content-type', new RegExp('application/json'))
    .expect('jsonTypes', '*', {
      id: Joi.number().required(),
      name: Joi.string().required(),
      title: Joi.string().required()
    })
    .done(done)
})
