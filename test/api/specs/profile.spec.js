const frisby = require('frisby')
const Joi = frisby.Joi
const url = 'http://localhost:3000/'

it('should return list of profiles', function (done) {
  frisby.get(url + 'profiles')
    .expect('status', 200)
    .expect('header', 'content-type', new RegExp('application/json'))
    .expect('jsonTypes', '*', {
      id: Joi.number().required(),
      title: Joi.string().required(),
      autoupdate_currency: Joi.boolean().required()
    })
    .done(done)
})
