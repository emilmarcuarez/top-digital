<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'

const scrollY = ref(0)
const activeSlideIndex = ref(0)
let carouselTimer

const showcaseSlides = [
  {
    eyebrow: 'Gigantografia',
    title: ['Gigantografia', 'premium'],
    detail: 'Alto alcance',
    caption: 'Vallas, lonas y piezas de gran escala para dominar el entorno.',
    tags: ['Exterior', 'Vinil', 'Lona'],
    accent: '#ff6b35'
  },
  {
    eyebrow: 'Sublimación',
    title: ['Sublimación', 'textil'],
    detail: 'Color textil',
    caption: 'Franelas, chaquetas y uniformes con color intenso y acabado limpio.',
    tags: ['Textil', 'Uniformes', 'Full color'],
    accent: '#ff9f45'
  },
  {
    eyebrow: 'Material POP',
    title: ['Material', 'POP'],
    detail: 'Punto de venta',
    caption: 'Exhibidores, habladores y piezas promocionales con presencia.',
    tags: ['Retail', 'Stands', 'Promo'],
    accent: '#f5c46b'
  }
]

const activeSlide = computed(() => showcaseSlides[activeSlideIndex.value])
const stageStyle = computed(() => ({
  '--stage-accent': activeSlide.value.accent
}))

const handleParallax = () => {
  scrollY.value = window.scrollY
}

const nextSlide = () => {
  activeSlideIndex.value = (activeSlideIndex.value + 1) % showcaseSlides.length
}

onMounted(() => {
  window.addEventListener('scroll', handleParallax, { passive: true })
  carouselTimer = window.setInterval(nextSlide, 3600)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleParallax)
  window.clearInterval(carouselTimer)
})
</script>

<template>
  <section id="inicio" class="hero">
    <div class="hero-bg">
      <img
        src="../assets/imagen1.jpg"
        alt="Impresión de gran formato Top Digital"
        class="bg-img"
        :style="{ transform: `scale(1.12) translateY(${scrollY * 0.26}px)` }"
      />
      <div class="overlay"></div>
      <div class="print-grid" aria-hidden="true"></div>
      <div class="ink-burst ink-burst-one" aria-hidden="true"></div>
      <div class="ink-burst ink-burst-two" aria-hidden="true"></div>
    </div>

    <div class="container hero-container">
      <div class="hero-content fade-in">
        <h1 class="hero-title">
          <span>Impresión visual</span>
          <span>de alto impacto</span>
        </h1>

        <p class="hero-description">
          Impresión de alto impacto, color intenso y acabados premium para convertir marcas,
          espacios y eventos en experiencias visuales imposibles de ignorar.
        </p>

        <div class="hero-actions">
          <a href="#servicios" class="btn btn-outline">Nuestros Servicios</a>
        </div>
      </div>

      <div class="hero-stage" :style="stageStyle" aria-hidden="true">
        <div class="showcase-glow"></div>

        <div class="hero-orbit" :key="`plate-${activeSlideIndex}`">
          <span class="trace trace-one"></span>
          <span class="trace trace-two"></span>
          <span class="trace trace-three"></span>

          <div class="showcase-number">0{{ activeSlideIndex + 1 }}</div>

          <div class="showcase-copy">
            <small>{{ activeSlide.detail }}</small>
            <strong>
              <span v-for="line in activeSlide.title" :key="line">{{ line }}</span>
            </strong>
            <em>{{ activeSlide.eyebrow }}</em>
            <p>{{ activeSlide.caption }}</p>
          </div>

          <div class="showcase-tags">
            <span v-for="tag in activeSlide.tags" :key="`${activeSlide.eyebrow}-${tag}`">{{ tag }}</span>
          </div>

          <div class="showcase-progress">
            <span
              v-for="(_, index) in showcaseSlides"
              :key="index"
              :class="{ active: index === activeSlideIndex }"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 8.2rem 0 4rem;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.72) contrast(1.14) saturate(1.12);
}

.overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 76% 34%, rgba(255, 107, 53, 0.2), transparent 24rem),
    linear-gradient(110deg, rgba(5, 5, 5, 0.97) 0%, rgba(10, 10, 10, 0.86) 45%, rgba(13, 13, 13, 0.45) 100%);
}

.print-grid {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px),
    linear-gradient(180deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 78px 78px;
  mask-image: linear-gradient(90deg, black, transparent 78%);
  opacity: 0.14;
  transform: perspective(720px) rotateX(62deg) translateY(10rem);
  transform-origin: bottom;
  animation: gridSlide 10s linear infinite;
}

.ink-burst {
  position: absolute;
  border-radius: 999px;
  filter: blur(28px);
  opacity: 0.28;
  mix-blend-mode: screen;
  pointer-events: none;
}

.ink-burst-one {
  width: 24rem;
  height: 24rem;
  right: 8%;
  top: 18%;
  background: conic-gradient(from 110deg, transparent, rgba(255, 107, 53, 0.5), rgba(255, 199, 92, 0.24), transparent 55%);
  animation: floatInk 8s ease-in-out infinite alternate;
}

.ink-burst-two {
  width: 17rem;
  height: 17rem;
  left: 18%;
  bottom: 8%;
  background: radial-gradient(circle, rgba(255, 107, 53, 0.26), transparent 68%);
  animation: floatInk 6s ease-in-out infinite alternate-reverse;
}

.hero-container {
  position: relative;
  z-index: 10;
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 0.94fr) minmax(390px, 0.58fr);
  align-items: center;
  gap: 3rem;
}

.hero-content {
  max-width: 940px;
  text-align: left;
}

.hero-title {
  display: flex;
  flex-direction: column;
  gap: 0.18rem;
  max-width: 980px;
  font-size: clamp(4.35rem, 7.15vw, 8rem);
  line-height: 0.86;
  margin-bottom: 2.2rem;
  font-weight: 800;
  letter-spacing: 0;
  text-wrap: balance;
}

.hero-title span {
  display: block;
  width: fit-content;
  color: #f7f4ee;
  text-shadow:
    0 1px 0 rgba(255, 107, 53, 0.42),
    0 16px 44px rgba(0, 0, 0, 0.58);
}

.hero-title span:last-child {
  position: relative;
  color: #ff6b35;
}

.hero-title span:last-child::after {
  content: "";
  position: absolute;
  left: 0.02em;
  right: 0.04em;
  bottom: -0.14em;
  height: 0.045em;
  background: linear-gradient(90deg, #ff6b35, rgba(255, 209, 138, 0.8), transparent);
  box-shadow: 0 0 18px rgba(255, 107, 53, 0.34);
}

.hero-description {
  font-size: 1.18rem;
  color: var(--text-secondary);
  margin-bottom: 2.4rem;
  max-width: 620px;
  border-left: 2px solid rgba(255, 107, 53, 0.75);
  padding-left: 1.2rem;
}

.hero-actions {
  display: flex;
  gap: 1.5rem;
}

.hero-stage {
  position: relative;
  min-height: 500px;
  display: grid;
  place-items: center;
  --stage-accent: #ff6b35;
  perspective: 1000px;
}

.showcase-glow {
  position: absolute;
  width: min(34vw, 470px);
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle, color-mix(in srgb, var(--stage-accent) 44%, transparent), transparent 62%),
    radial-gradient(circle at 70% 20%, rgba(255, 255, 255, 0.16), transparent 34%);
  filter: blur(38px);
  opacity: 0.68;
  transform: translate3d(1.5rem, -1rem, 0);
  animation: glowBreathe 3.6s ease-in-out infinite;
}

.hero-orbit {
  position: relative;
  width: min(34vw, 470px);
  aspect-ratio: 0.92;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 28px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.035)),
    radial-gradient(circle at 70% 30%, color-mix(in srgb, var(--stage-accent) 28%, transparent), transparent 52%),
    rgba(255, 255, 255, 0.04);
  box-shadow:
    0 28px 80px rgba(0, 0, 0, 0.34),
    inset 0 0 40px rgba(255, 255, 255, 0.06);
  transform: rotate(2deg);
  animation: plateIn 0.72s cubic-bezier(0.16, 1, 0.3, 1), stageFloat 7s ease-in-out 0.72s infinite alternate;
  overflow: hidden;
}

.hero-orbit::before {
  content: "";
  position: absolute;
  inset: 1.15rem;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px),
    linear-gradient(180deg, rgba(255,255,255,0.08) 1px, transparent 1px);
  background-size: 42px 42px;
  opacity: 0.42;
}

.hero-orbit::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(115deg, transparent 18%, rgba(255, 255, 255, 0.16) 34%, transparent 48%),
    radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--stage-accent) 26%, transparent), transparent 42%);
  transform: translateX(-38%);
  animation: plateSweep 3.6s ease-in-out infinite;
}

.trace {
  position: absolute;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, var(--stage-accent), transparent);
  box-shadow: 0 0 18px color-mix(in srgb, var(--stage-accent) 45%, transparent);
  animation: lineTrace 1s ease both;
}

.trace-one {
  display: none;
}

.trace-two {
  top: 54%;
  left: 18%;
  right: 9%;
}

.trace-three {
  left: 12%;
  right: 26%;
  bottom: 20%;
}

.showcase-number {
  position: absolute;
  right: 1.3rem;
  top: 1rem;
  color: rgba(255, 255, 255, 0.08);
  font-family: var(--font-heading);
  font-size: clamp(6rem, 9vw, 9.2rem);
  font-weight: 800;
  line-height: 0.8;
  letter-spacing: 0;
  pointer-events: none;
}

.showcase-copy {
  position: absolute;
  left: 2.2rem;
  right: 2rem;
  top: 2.4rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  animation: specIn 0.64s cubic-bezier(0.16, 1, 0.3, 1);
}

.showcase-copy small,
.showcase-copy em {
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.showcase-copy small {
  display: inline-flex;
  padding: 0.55rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.76);
  background: rgba(10, 10, 10, 0.34);
  font-size: 0.68rem;
}

.showcase-copy strong {
  display: flex;
  flex-direction: column;
  margin: 1.25rem 0 0.5rem;
  color: var(--stage-accent);
  font-family: var(--font-heading);
  font-size: clamp(2rem, 3vw, 3.05rem);
  line-height: 0.95;
  letter-spacing: 0;
  text-transform: uppercase;
  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.16),
    0 20px 40px rgba(0, 0, 0, 0.48),
    0 0 26px color-mix(in srgb, var(--stage-accent) 34%, transparent);
}

.showcase-copy strong span {
  display: block;
  max-width: 100%;
  white-space: normal;
}

.showcase-copy em {
  color: rgba(255, 255, 255, 0.66);
  font-style: normal;
  font-size: 0.58rem;
}

.showcase-info {
  position: absolute;
  left: 50%;
  bottom: 3.15rem;
  width: min(78%, 360px);
  transform: translateX(-50%);
  animation: captionIn 0.62s cubic-bezier(0.16, 1, 0.3, 1);
}

.showcase-tags {
  position: absolute;
  left: 2.2rem;
  right: 2.2rem;
  bottom: 7.2rem;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.showcase-tags span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  padding: 0.48rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  color: white;
  background: rgba(10, 10, 10, 0.46);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.28);
}

.showcase-copy p {
  max-width: 310px;
  margin: 0;
  margin-top: 1.2rem;
  padding-left: 1rem;
  border-left: 2px solid var(--stage-accent);
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.88rem;
  font-weight: 700;
  line-height: 1.55;
  text-align: left;
}

.showcase-progress {
  position: absolute;
  left: 2.2rem;
  bottom: 2rem;
  display: flex;
  gap: 0.55rem;
}

.showcase-progress span {
  width: 2.4rem;
  height: 3px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  overflow: hidden;
}

.showcase-progress span::before {
  content: "";
  display: block;
  height: 100%;
  width: 0;
  border-radius: inherit;
  background: var(--stage-accent);
}

.showcase-progress span.active::before {
  animation: progressFill 3.6s linear forwards;
}

@media (max-width: 1100px) {
  .hero-container {
    grid-template-columns: 1fr;
  }

  .hero-stage {
    display: none;
  }
}

@media (max-width: 600px) {
  .hero {
    padding: 7rem 0 3rem;
    min-height: auto;
  }

  .hero-container {
    width: calc(100% - 2rem);
    margin: 0 auto;
    gap: 2.2rem;
  }

  .hero-content {
    width: 100%;
  }

  .hero-title {
    max-width: 100%;
    font-size: clamp(2.55rem, 10.4vw, 3.3rem);
    line-height: 0.9;
  }

  .hero-description {
    font-size: 1rem;
  }

  .hero-actions {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    width: 100%;
  }

  .hero-stage {
    display: grid;
    min-height: 390px;
    width: 100%;
    margin: 0 auto;
    perspective: 850px;
  }

  .showcase-glow {
    width: min(86vw, 350px);
    opacity: 0.58;
    filter: blur(30px);
    transform: translate3d(0, -0.5rem, 0);
  }

  .hero-orbit {
    width: min(88vw, 345px);
    border-radius: 22px;
    transform: rotate(1.2deg);
  }

  .hero-orbit::before {
    inset: 0.82rem;
    border-radius: 18px;
    background-size: 28px 28px;
  }

  .showcase-number {
    right: 1rem;
    top: 0.8rem;
    font-size: 5.4rem;
  }

  .showcase-copy {
    left: 1.45rem;
    right: 1.35rem;
    top: 1.55rem;
  }

  .showcase-copy small {
    padding: 0.46rem 0.65rem;
    font-size: 0.58rem;
  }

  .showcase-copy strong {
    margin-top: 1rem;
    font-size: clamp(2rem, 12vw, 2.85rem);
    line-height: 0.9;
  }

  .showcase-copy em {
    font-size: 0.55rem;
  }

  .showcase-copy p {
    max-width: 250px;
    margin-top: 1rem;
    padding-left: 0.85rem;
    font-size: 0.78rem;
    line-height: 1.45;
  }

  .showcase-tags {
    left: 1.45rem;
    right: 1.45rem;
    bottom: 5.8rem;
    gap: 0.38rem;
  }

  .showcase-tags span {
    padding: 0.42rem 0.62rem;
    font-size: 0.54rem;
    letter-spacing: 0.1em;
  }

  .showcase-progress {
    left: 1.45rem;
    bottom: 1.55rem;
    gap: 0.42rem;
  }

  .showcase-progress span {
    width: 1.8rem;
    height: 2px;
  }

  .trace-two {
    left: 19%;
    right: 8%;
  }

  .trace-three {
    left: 11%;
    right: 28%;
    bottom: 18%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .print-grid,
  .ink-burst,
  .showcase-glow,
  .hero-orbit,
  .hero-orbit::after,
  .hero-stage,
  .hero-spec,
  .showcase-info,
  .showcase-progress span.active::before {
    animation: none;
  }
}

@keyframes gridSlide {
  to {
    background-position: 78px 78px;
  }
}

@keyframes floatInk {
  to {
    transform: translate3d(1.4rem, -1.2rem, 0) rotate(10deg) scale(1.08);
  }
}

@keyframes stageFloat {
  to {
    transform: rotate(0.6deg) translate3d(0.8rem, -0.7rem, 0);
  }
}

@keyframes glowBreathe {
  50% {
    opacity: 0.42;
    transform: translate3d(0.8rem, -0.4rem, 0) scale(0.94);
  }
}

@keyframes plateIn {
  from {
    opacity: 0;
    transform: rotate(7deg) translate3d(2rem, 1rem, 0) scale(0.94);
  }
}

@keyframes plateSweep {
  0%,
  35% {
    transform: translateX(-55%);
    opacity: 0;
  }
  55% {
    opacity: 1;
  }
  100% {
    transform: translateX(45%);
    opacity: 0;
  }
}

@keyframes specIn {
  from {
    opacity: 0;
    transform: translate(-50%, -42%) scale(0.96);
  }
}

@keyframes captionIn {
  from {
    opacity: 0;
    transform: translate(-50%, 0.8rem);
  }
}

@keyframes lineTrace {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

@keyframes progressFill {
  to {
    width: 100%;
  }
}
</style>
