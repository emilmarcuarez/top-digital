import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

// Scroll Reveal Logic
app.directive('reveal', {
  mounted(el) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.classList.add('active')
          observer.unobserve(el)
        }
      })
    }, { threshold: 0.1 })
    observer.observe(el)
  }
})

app.mount('#app')
