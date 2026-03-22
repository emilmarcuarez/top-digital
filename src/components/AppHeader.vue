<template>
  <header class="header glass" :class="{ 'scrolled': isScrolled }">
    <div class="container nav-content">
      <div class="logo">
        <img src="../assets/logo Top Digital.png" alt="Top Digital Logo" class="logo-img" />
      </div>
      
      <!-- Desktop Nav -->
      <nav class="nav desktop-nav">
        <a href="#inicio">Inicio</a>
        <a href="#nosotros">Nosotros</a>
        <a href="#servicios">Servicios</a>
        <a href="#capacidades">Capacidades</a>
        <a href="#proyectos">Proyectos</a>
        <a href="#contacto">Contacto</a>
      </nav>
      
      <!-- Desktop Action -->
      <div class="actions desktop-actions">
        <a href="#contacto" class="btn btn-primary btn-sm">Solicitar Presupuesto</a>
      </div>

      <!-- Mobile Menu Toggle -->
      <button class="mobile-toggle" :class="{ 'is-active': isMenuOpen }" @click="toggleMenu" aria-label="Menu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>

    <!-- Mobile Nav Overlay -->
    <div class="mobile-menu-overlay" :class="{ 'is-open': isMenuOpen }">
      <div class="mobile-menu-content">
        <a href="#inicio" class="mobile-link" @click="closeMenu">Inicio</a>
        <a href="#nosotros" class="mobile-link" @click="closeMenu">Nosotros</a>
        <a href="#servicios" class="mobile-link" @click="closeMenu">Servicios</a>
        <a href="#capacidades" class="mobile-link" @click="closeMenu">Capacidades</a>
        <a href="#proyectos" class="mobile-link" @click="closeMenu">Proyectos</a>
        <a href="#contacto" class="mobile-link" @click="closeMenu">Contacto</a>
        <div class="mobile-actions">
          <a href="#contacto" class="btn btn-primary btn-mobile-action" @click="closeMenu">Solicitar Presupuesto</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.2rem 0;
  transition: var(--transition);
}

.header.scrolled {
  padding: 0.8rem 0;
  background: rgba(13, 13, 13, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-img {
  height: 60px;
  width: auto;
  display: block;
  transition: height 0.3s ease;
  position: relative;
  z-index: 1002; /* Ensures logo stays above the modal */
}

.header.scrolled .logo-img {
  height: 50px;
}

.desktop-nav {
  display: flex;
  gap: 2rem;
}

.desktop-nav a {
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: var(--transition);
}

.desktop-nav a:hover {
  color: white;
}

.btn-sm {
  padding: 0.6rem 1.2rem;
  font-size: 0.85rem;
}

/* Mobile Toggle */
.mobile-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1002; /* Above the overlay */
  width: 45px;
  height: 45px;
  position: relative;
}

.mobile-toggle .bar {
  display: block;
  width: 28px;
  height: 2px;
  background-color: white;
  margin: 6px auto;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 2px;
}

/* X animation */
.mobile-toggle.is-active .bar:nth-child(2) {
  opacity: 0;
  transform: translateX(10px);
}
.mobile-toggle.is-active .bar:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}
.mobile-toggle.is-active .bar:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* Mobile Menu Overlay - Sleek Side Slide */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  right: 0; /* Align to the right */
  width: 100%;
  max-width: 400px; /* Optional: limit width on larger tablets */
  height: 100vh;
  background: rgba(13, 13, 13, 0.98); 
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding-top: 100px; /* Header spacing */
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  transform: translateX(100%); /* Slide in from right */
  border-left: 1px solid rgba(255, 255, 255, 0.05);
}

/* If full width is preferred on phones */
@media (max-width: 600px) {
  .mobile-menu-overlay {
    max-width: 100%;
    border-left: none;
  }
}

.mobile-menu-overlay.is-open {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
}

.mobile-menu-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* LEFT ALIGNED */
  width: 100%;
  padding: 0 2.5rem;
}

.mobile-link {
  width: 100%;
  font-size: 1.25rem; /* Much smaller and elegant */
  font-family: var(--font-heading);
  text-decoration: none;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 1.2rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.05); /* Separators */
  transition: all 0.3s ease;
  position: relative;
  opacity: 0;
  transform: translateX(30px);
}

.mobile-link:last-of-type {
  border-bottom: none;
  margin-bottom: 1rem;
}

.mobile-link:hover,
.mobile-link:active {
  color: var(--bg-accent);
  padding-left: 10px; /* Indent on active/hover */
}

/* Animation sequence when open */
.mobile-menu-overlay.is-open .mobile-link {
  opacity: 1;
  transform: translateX(0);
}

.mobile-menu-overlay.is-open .mobile-link:nth-child(1) { transition-delay: 0.1s; }
.mobile-menu-overlay.is-open .mobile-link:nth-child(2) { transition-delay: 0.15s; }
.mobile-menu-overlay.is-open .mobile-link:nth-child(3) { transition-delay: 0.2s; }
.mobile-menu-overlay.is-open .mobile-link:nth-child(4) { transition-delay: 0.25s; }
.mobile-menu-overlay.is-open .mobile-link:nth-child(5) { transition-delay: 0.3s; }
.mobile-menu-overlay.is-open .mobile-link:nth-child(6) { transition-delay: 0.35s; }

.mobile-actions {
  margin-top: 1.5rem;
  width: 100%;
  display: flex;
  justify-content: flex-start; /* Left aligned button */
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.4s ease;
}

.mobile-menu-overlay.is-open .mobile-actions {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 0.4s;
}

.btn-mobile-action {
  color: white !important;
  font-size: 0.95rem;
  padding: 0.75rem 1.5rem;
  width: auto;
  border-radius: var(--radius-md);
  box-shadow: 0 10px 25px rgba(255, 107, 53, 0.3);
}

@media (max-width: 968px) {
  .desktop-nav,
  .desktop-actions {
    display: none;
  }
  
  .mobile-toggle {
    display: block;
  }
}

@media (max-width: 600px) {
  .logo-img {
    height: 45px;
  }
  .header.scrolled .logo-img {
    height: 40px;
  }
  .mobile-link {
    font-size: 1.15rem;
    padding: 1rem 0;
  }
}
</style>
