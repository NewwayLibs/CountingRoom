import axios from 'axios'

export default {
  getTranslation: function ({ translationKey }) {
    return axios.get(`http://localhost:8080/static/lang/${translationKey}/translation.json`).then(function (response) {
      console.log('getTranslation', response)
      return response.data
    })
  }
}
