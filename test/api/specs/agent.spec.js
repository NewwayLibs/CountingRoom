const frisby = require('frisby')
const Joi = frisby.Joi
const url = 'http://localhost:3000/'

it('should return list of agents', function (done) {
  frisby.get(url + 'agents')
    .expect('status', 200)
    .expect('header', 'content-type', new RegExp('application/json'))
    .expect('jsonTypes', '*', {
      id: Joi.number().required(),
      profile_id: Joi.number().required(),
      title: Joi.string().required(),
      category_id: Joi.number().allow(null).required(),
      phone: Joi.string().allow(null).required(),
      email: Joi.string().email().allow(null).required(),
      contact: Joi.string().allow(null).required(),
      description: Joi.string().allow(null).required()
    })
    .done(done)
})
