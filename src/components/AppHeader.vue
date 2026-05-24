<template>
  <header
    class="header"
    :class="{ 'scrolled': isScrolled, 'menu-open': isMenuOpen }"
    :style="headerStyle"
    @pointermove="handlePointerMove"
  >
    <div class="nav-shell">
      <div class="nav-topline">
        <a href="#inicio" class="brand" aria-label="Top Digital">
          <span class="brand-mark">
            <img src="../assets/logo Top Digital.png" alt="Top Digital Logo" class="logo-img" />
          </span>
          <span class="brand-copy">
            <strong>Top Digital</strong>
          </span>
        </a>

      </div>

      <nav class="nav desktop-nav" aria-label="Principal">
        <a v-for="item in navItems" :key="item.href" :href="item.href">
          <span>{{ item.label }}</span>
        </a>
      </nav>

      <button
        class="mobile-toggle"
        :class="{ 'is-active': isMenuOpen }"
        @click="toggleMenu"
        :aria-expanded="isMenuOpen"
        aria-label="Menu"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>

    <button
      v-if="isMenuOpen"
      class="mobile-close"
      type="button"
      aria-label="Cerrar menu"
      @click="closeMenu"
    >
      <span></span>
      <span></span>
    </button>

    <div class="mobile-menu-overlay" :class="{ 'is-open': isMenuOpen }">
      <div class="mobile-menu-content">
        <a
          v-for="(item, index) in navItems"
          :key="item.href"
          :href="item.href"
          class="mobile-link"
          :style="{ '--delay': `${0.08 + index * 0.05}s` }"
          @click="closeMenu"
        >
          <small>{{ String(index + 1).padStart(2, '0') }}</small>
          <span>{{ item.label }}</span>
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMenuOpen = ref(false)
const pointerX = ref(50)
const pointerY = ref(50)

const navItems = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#capacidades', label: 'Capacidades' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#contacto', label: 'Contacto' }
]

const headerStyle = computed(() => ({
  '--spotlight-x': `${pointerX.value}%`,
  '--spotlight-y': `${pointerY.value}%`
}))

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const handlePointerMove = (event) => {
  const bounds = event.currentTarget.getBoundingClientRect()
  pointerX.value = ((event.clientX - bounds.left) / bounds.width) * 100
  pointerY.value = ((event.clientY - bounds.top) / bounds.height) * 100
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
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding-top: 0;
  pointer-events: none;
  --spotlight-x: 50%;
  --spotlight-y: 50%;
  --scroll-progress: 0;
}

.header::before {
  content: "";
  position: absolute;
  inset: 0 0 auto;
  height: 0;
  background: none;
  pointer-events: none;
}

.nav-shell {
  position: relative;
  display: grid;
  width: 100%;
  min-height: 104px;
  padding: 0;
  pointer-events: auto;
  border: 0;
  border-radius: 0;
  background:
    linear-gradient(90deg, rgba(255, 107, 53, 0.1), transparent 30%, rgba(255, 107, 53, 0.08)),
    rgba(12, 12, 12, 0.72);
  box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px) saturate(120%);
  -webkit-backdrop-filter: blur(18px) saturate(120%);
  overflow: hidden;
  transition: min-height 0.35s ease, transform 0.35s ease, background 0.35s ease, border-color 0.35s ease;
}

.nav-shell::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background:
    radial-gradient(circle at var(--spotlight-x) var(--spotlight-y), rgba(255, 255, 255, 0.06), transparent 20rem);
  pointer-events: none;
}

.nav-shell::after {
  content: none;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: none;
  pointer-events: none;
}

.header.scrolled .nav-shell {
  min-height: 92px;
  transform: none;
  background:
    linear-gradient(90deg, rgba(255, 107, 53, 0.08), transparent 30%, rgba(255, 107, 53, 0.06)),
    rgba(9, 9, 9, 0.9);
}

.brand,
.nav-topline,
.desktop-nav,
.mobile-toggle {
  position: relative;
  z-index: 2;
}

.nav-topline {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 58px;
  padding: 0 5vw;
  border-bottom: 1px solid rgba(255, 255, 255, 0.11);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0;
  min-width: 0;
  color: white;
  text-decoration: none;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 0;
  background: transparent;
  border: 0;
  box-shadow: none;
  transform: none;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.brand:hover .brand-mark {
  transform: translateY(-1px);
  box-shadow: none;
}

.logo-img {
  width: 36px;
  height: auto;
  display: block;
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.5));
}

.brand-copy {
  display: flex;
  flex-direction: column;
  line-height: 1;
  text-transform: uppercase;
}

.brand-copy strong {
  font-family: var(--font-body);
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: 0.03em;
}

.desktop-nav {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
  gap: 0;
  min-height: 46px;
  padding: 0 5vw;
  border: 0;
  border-radius: 0;
  background: rgba(0, 0, 0, 0.12);
}

.desktop-nav a {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 1.1rem;
  border-radius: 0;
  border-left: 1px solid rgba(255,255,255,0.08);
  color: rgba(255, 255, 255, 0.76);
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.25s ease, transform 0.25s ease, background 0.25s ease;
}

.desktop-nav a::before {
  content: "";
  position: absolute;
  left: 1.1rem;
  right: 1.1rem;
  bottom: 0;
  height: 1px;
  background: var(--bg-accent);
  opacity: 0;
  transform: scaleX(0.4);
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.desktop-nav a span {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.17em;
}

.desktop-nav a:hover {
  color: white;
  transform: none;
  background: rgba(255,255,255,0.045);
}

.desktop-nav a:hover::before {
  opacity: 1;
  transform: scaleX(1);
}

.mobile-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  justify-self: end;
  width: 46px;
  height: 46px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  cursor: pointer;
}

@media (min-width: 1121px) {
  .mobile-toggle {
    display: none;
  }
}

.mobile-toggle .bar {
  position: absolute;
  width: 22px;
  height: 2px;
  border-radius: 99px;
  background: white;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.mobile-close {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 3000;
  display: none;
  pointer-events: auto;
  width: 48px;
  height: 48px;
  border: 1px solid rgba(255, 107, 53, 0.45);
  border-radius: 10px;
  background: rgba(10, 10, 10, 0.94);
  box-shadow: 0 16px 34px rgba(0, 0, 0, 0.35);
  cursor: pointer;
}

.mobile-close span {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 24px;
  height: 2px;
  border-radius: 99px;
  background: white;
  transform-origin: center;
}

.mobile-close span:first-child {
  transform: translate(-50%, -50%) rotate(45deg);
}

.mobile-close span:last-child {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.mobile-toggle .bar:nth-child(1) {
  transform: translateY(-7px);
}

.mobile-toggle .bar:nth-child(3) {
  transform: translateY(7px);
}

.mobile-toggle.is-active .bar:nth-child(1) {
  transform: rotate(45deg);
}

.mobile-toggle.is-active .bar:nth-child(2) {
  opacity: 0;
  transform: translateX(12px);
}

.mobile-toggle.is-active .bar:nth-child(3) {
  transform: rotate(-45deg);
}

.mobile-menu-overlay {
  position: fixed;
  inset: 0 0 0 auto;
  width: min(100%, 480px);
  min-height: 100vh;
  padding-top: 9rem;
  border-left: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(8, 8, 8, 0.96);
  backdrop-filter: blur(30px) saturate(155%);
  -webkit-backdrop-filter: blur(30px) saturate(155%);
  opacity: 0;
  visibility: hidden;
  transform: translateX(105%);
  transition: opacity 0.35s ease, visibility 0.35s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: auto;
  overflow: hidden;
}

.mobile-menu-overlay.is-open {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
}

.mobile-menu-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
}

.mobile-link {
  display: grid;
  grid-template-columns: 3rem 1fr;
  align-items: baseline;
  gap: 0.6rem;
  padding: 1.05rem 0;
  color: white;
  text-decoration: none;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0;
  transform: translateX(44px) rotateX(18deg);
  transition: opacity 0.34s ease, transform 0.34s ease, color 0.25s ease;
}

.mobile-menu-overlay.is-open .mobile-link {
  opacity: 1;
  transform: translateX(0) rotateX(0);
  transition-delay: var(--delay);
}

.mobile-link small {
  color: #ff7a35;
  font-size: 0.72rem;
  font-weight: 800;
}

.mobile-link span {
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 9vw, 3.1rem);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: 0;
}

.mobile-link:hover {
  color: #ff9b4a;
}

@media (max-width: 1120px) {
  .nav-shell {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 64px;
    width: 100%;
    margin: 0;
    padding: 0 1rem;
    border: 0;
    border-bottom: 1px solid rgba(255,255,255,0.12);
    border-radius: 0;
    background:
      linear-gradient(180deg, rgba(8, 8, 8, 0.76), rgba(8, 8, 8, 0.34)),
      transparent;
    box-shadow: none;
  }

  .nav-topline {
    display: flex;
    flex: 1;
    min-height: auto;
    padding: 0;
    border-bottom: 0;
  }

  .desktop-nav {
    display: none;
  }

  button.mobile-toggle {
    position: relative;
    top: auto;
    right: auto;
    z-index: 1405;
    display: inline-flex !important;
    flex: 0 0 44px;
    width: 44px;
    height: 44px;
    margin-left: auto;
    border-color: rgba(255, 255, 255, 0.18);
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.18);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .header.menu-open button.mobile-toggle {
    opacity: 0;
    pointer-events: none;
  }

  .mobile-close {
    display: inline-flex;
  }
}

@media (max-width: 600px) {
  .header {
    padding-top: 0;
  }

  .nav-shell {
    width: 100%;
    min-height: 62px;
    padding-left: 1rem;
    padding-right: 0.9rem;
    border-radius: 0;
  }

  .brand {
    flex: 1 1 auto;
  }

  .brand-mark {
    width: 42px;
    height: 42px;
    border-radius: 0;
  }

  .logo-img {
    width: 38px;
  }

  .brand-copy strong {
    font-size: 0.86rem;
  }

  .mobile-toggle {
    width: 44px;
    height: 44px;
  }

  .mobile-menu-overlay {
    width: 100%;
    padding-top: 7.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav-shell,
  .brand-mark,
  .desktop-nav a,
  .desktop-nav a::before,
  .desktop-nav a::after,
  .mobile-toggle .bar,
  .mobile-menu-overlay,
  .mobile-link {
    transition-duration: 0.01ms;
  }
}

</style>
