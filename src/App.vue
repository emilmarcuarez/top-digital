<script setup>
import { onMounted, ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import SublimationBanner from './components/SublimationBanner.vue'
import MaterialPopBanner from './components/MaterialPopBanner.vue'
import CapabilitiesSection from './components/CapabilitiesSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ContactSection from './components/ContactSection.vue'
import AppFooter from './components/AppFooter.vue'
import logo from './assets/logo Top Digital.png'

const isLoading = ref(true)

onMounted(() => {
  const finishLoading = () => {
    window.setTimeout(() => {
      isLoading.value = false
    }, 650)
  }

  if (document.readyState === 'complete') {
    finishLoading()
  } else {
    window.addEventListener('load', finishLoading, { once: true })
    window.setTimeout(finishLoading, 2200)
  }
})
</script>

<template>
  <div class="app-wrapper">
    <Transition name="preloader-fade">
      <div v-if="isLoading" class="site-preloader">
        <div class="preloader-mark">
          <img :src="logo" alt="Top Digital Group" />
          <span class="preloader-ring"></span>
        </div>
      </div>
    </Transition>

    <AppHeader />
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <SublimationBanner />
      <MaterialPopBanner />
      <CapabilitiesSection />
      <ProjectsSection />
      <ContactSection />
    </main>
    <AppFooter />
  </div>
</template>

<style>
/* Global app layout styles if needed */
.app-wrapper {
  overflow-x: hidden;
}

.site-preloader {
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 1.15rem;
  background:
    radial-gradient(circle at 50% 42%, rgba(255, 107, 53, 0.16), transparent 18rem),
    linear-gradient(135deg, #070707, #111111 52%, #090909);
}

.preloader-mark {
  position: relative;
  width: 96px;
  height: 96px;
  display: grid;
  place-items: center;
}

.preloader-mark img {
  width: 62px;
  height: auto;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 16px 28px rgba(0, 0, 0, 0.48));
  animation: logoPulse 1.45s ease-in-out infinite;
}

.preloader-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-top-color: var(--bg-accent);
  border-right-color: rgba(255, 107, 53, 0.52);
  box-shadow: 0 0 36px rgba(255, 107, 53, 0.18);
  animation: preloaderSpin 0.9s linear infinite;
}

.site-preloader p {
  margin: 0;
  color: white;
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.preloader-fade-enter-active,
.preloader-fade-leave-active {
  transition: opacity 0.45s ease, transform 0.45s ease;
}

.preloader-fade-enter-from,
.preloader-fade-leave-to {
  opacity: 0;
  transform: scale(1.02);
}

@keyframes preloaderSpin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes logoPulse {
  50% {
    transform: scale(0.94);
    opacity: 0.82;
  }
}
</style>
