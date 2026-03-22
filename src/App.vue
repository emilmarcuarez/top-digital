<script setup>
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
</script>

<template>
  <div class="app-wrapper">
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
</style>
