import Vue from 'vue'
import routes from './routes'
import About from './pages/About'
import Home from './pages/Home'

const app = new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      const matchingView = routes[this.currentRoute]
      const newPath = matchingView==='About' ?About:Home
      return newPath
    }
  },
  render (h) {
    return h(this.ViewComponent)
  }
})

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})
