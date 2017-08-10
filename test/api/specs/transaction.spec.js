const frisby = require('frisby')
const Joi = frisby.Joi
const url = 'http://localhost:3000/'

it('should return list of transactions', function (done) {
  frisby.get(url + 'transactions')
    .expect('status', 200)
    .expect('header', 'content-type', new RegExp('application/json'))
    .expect('jsonTypes', '*', {
      id: Joi.number().required(),
      parent_id: Joi.number().required().allow(null), // транзакция, которую мы схлопываем списанием
      related_transaction_id: Joi.number().required().allow(null), // связанная транзакция при внутреннем переводе
      account_id: Joi.number().required(),
      category_id: Joi.number().required().allow(null),
      agent_id: Joi.number().required().allow(null),
      date: Joi.string().required(),
      amount: Joi.number().required(),
      commission: Joi.number().required().allow(null),
      exchange_rate: Joi.number().required().allow(null), // курс конвертации при невоспадении валют
      description: Joi.string().required().allow(null),
      status: Joi.number().required() // 0 - новая, 1 - запланированная, 2 - проведенная, 3 - отмененная
    })
    .done(done)
})
