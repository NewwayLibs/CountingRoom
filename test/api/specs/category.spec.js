const frisby = require('frisby')
const Joi = frisby.Joi
const url = 'http://localhost:3000/'

it('should return list of categories', function (done) {
  frisby.get(url + 'categories')
    .expect('status', 200)
    .expect('header', 'content-type', new RegExp('application/json'))
    .expect('jsonTypes', '*', {
      id: Joi.number().required(),
      profile_id: Joi.number().required(),
      parent_id: Joi.number().allow(null).required(),
      is_income: Joi.boolean().required(),
      title: Joi.string().required()
    })
    .done(done)
})
