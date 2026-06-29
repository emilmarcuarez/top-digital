<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import imageIvoo from '../assets/imagen4.jpg'
import imageProyectoDuncan from '../assets/proyectos-recientes-8.jpg'
import imageProyectoCandela from '../assets/proyectos-recientes-candela.jpg'
import imageProyectoIlaui from '../assets/proyectos-recientes-ilaui.jpeg'
import imageProyectoDigitel from '../assets/stands-corporativos.jpg'
import imageProyectoOpticolor from '../assets/proyectos-recientes-opticolor.jpeg'
import imageProyectoOutdoor from '../assets/proyectos-recientes-outdoor.jpeg'

const activeIndex = ref(0)
let timer

const projects = [
  {
    title: 'Ivoo',
    tag: 'Fachadas',
    image: imageIvoo,
    text: 'Rotulacion arquitectonica, fachada comercial y volumen visual para una marca de alto trafico.'
  },
  {
    title: 'Duncan',
    tag: 'Proyecto reciente',
    image: imageProyectoDuncan,
    text: 'Produccion e instalacion visual para una marca con presencia comercial de alto trafico.'
  },
  {
    title: 'Candela',
    tag: 'Proyecto reciente',
    image: imageProyectoCandela,
    text: 'Soluciones visuales para retail con acabados limpios y alto impacto de marca.'
  },
  {
    title: 'Ilahui',
    tag: 'Proyecto reciente',
    image: imageProyectoIlaui,
    text: 'Elementos visuales para punto de venta pensados para visibilidad, lectura y recordacion.'
  },
  {
    title: 'Digitel',
    tag: 'Proyecto reciente',
    image: imageProyectoDigitel,
    text: 'Stand corporativo con presencia de marca y acabados pensados para eventos comerciales.'
  },
  {
    title: 'Opticolor',
    tag: 'Proyecto reciente',
    image: imageProyectoOpticolor,
    text: 'Aplicaciones de imagen comercial con terminaciones precisas para una presencia profesional.'
  },
  {
    title: 'Outdoor',
    tag: 'Proyecto reciente',
    image: imageProyectoOutdoor,
    text: 'Produccion de piezas exteriores para comunicar marca con visibilidad y resistencia.'
  }
]

const activeProject = computed(() => projects[activeIndex.value])

const goToProject = (index) => {
  activeIndex.value = index
  restartTimer()
}

const nextProject = () => {
  activeIndex.value = (activeIndex.value + 1) % projects.length
}

const startTimer = () => {
  timer = window.setInterval(nextProject, 4200)
}

const restartTimer = () => {
  window.clearInterval(timer)
  startTimer()
}

onMounted(startTimer)

onUnmounted(() => {
  window.clearInterval(timer)
})
</script>

<template>
  <section id="proyectos" class="section projects">
    <div class="projects-grid-bg" aria-hidden="true"></div>

    <div class="container">
      <div class="projects-head reveal" v-reveal>
        <span class="eyebrow accent-text">Impulsamos marcas</span>
        <h2 class="section-title">Proyectos Destacados</h2>
      </div>

      <div class="td-project-stage reveal" v-reveal>
        <div class="td-project-copy" :key="`copy-${activeProject.title}`">
          <span class="project-kicker">0{{ activeIndex + 1 }} / Proyecto destacado</span>
          <h3>{{ activeProject.title }}</h3>
          <p>{{ activeProject.text }}</p>

          <div class="project-bars" aria-hidden="true">
            <span
              v-for="(_, index) in projects"
              :key="index"
              :class="{ active: index === activeIndex }"
            ></span>
          </div>
        </div>

        <div class="td-project-visual" :key="`visual-${activeProject.title}`">
          <img :src="activeProject.image" :alt="activeProject.title" />
          <div class="visual-caption">
            <span>{{ activeProject.tag }}</span>
            <strong>{{ activeProject.title }}</strong>
          </div>
        </div>
      </div>

      <div class="td-project-thumbs">
        <button
          v-for="(project, index) in projects"
          :key="project.title"
          type="button"
          class="project-thumb"
          :class="{ active: index === activeIndex }"
          :style="{
            '--thumb-grow': index + 1,
            '--thumb-height': `${150 + index * 16}px`
          }"
          @click="goToProject(index)"
        >
          <img :src="project.image" :alt="project.title" />
          <strong>{{ project.title }}</strong>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 18% 16%, rgba(255, 107, 53, 0.11), transparent 24rem),
    linear-gradient(135deg, #11181d 0%, #151515 48%, #0f0f0f 100%);
}

.projects-grid-bg {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(180deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 38px 38px;
  opacity: 0.24;
  pointer-events: none;
}

.projects-head {
  position: relative;
  z-index: 1;
  margin-bottom: 2.4rem;
}

.projects-head .section-title {
  margin-bottom: 0;
}

.td-project-stage {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 1rem;
  align-items: stretch;
  min-height: 560px;
  max-height: 640px;
}

.td-project-copy,
.td-project-visual,
.project-thumb {
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 8px;
  background: rgba(255,255,255,0.035);
  overflow: hidden;
}

.td-project-copy {
  flex: 0 0 min(34%, 520px);
  min-width: 360px;
  padding: 2.2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background:
    radial-gradient(circle at 100% 0%, rgba(255, 107, 53, 0.22), transparent 18rem),
    rgba(15, 15, 15, 0.72);
  animation: copyIn 0.58s ease both;
}

.project-kicker {
  color: var(--bg-accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.td-project-copy h3 {
  max-width: 520px;
  margin: 0.85rem 0 1rem;
  color: white;
  font-size: clamp(2.6rem, 4vw, 4.35rem);
  line-height: 0.92;
}

.td-project-copy p {
  max-width: 460px;
  margin: 0;
  color: rgba(255,255,255,0.76);
  font-size: 1rem;
  line-height: 1.65;
}

.project-bars {
  display: flex;
  gap: 0.5rem;
  margin-top: 2rem;
}

.project-bars span {
  width: 2.6rem;
  height: 3px;
  border-radius: 99px;
  background: rgba(255,255,255,0.22);
  overflow: hidden;
}

.project-bars span::before {
  content: "";
  display: block;
  width: 0;
  height: 100%;
  background: var(--bg-accent);
}

.project-bars span.active::before {
  animation: fillBar 4.2s linear forwards;
}

.td-project-visual {
  position: relative;
  flex: 1 1 auto;
  min-width: 0;
  animation: visualIn 0.58s ease both;
}

.td-project-visual img {
  width: 100%;
  height: 100%;
  min-height: 560px;
  max-height: 640px;
  object-fit: cover;
  filter: saturate(1.05) contrast(1.04);
  display: block;
}

.td-project-visual::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, transparent 44%, rgba(0,0,0,0.82)),
    radial-gradient(circle at 84% 20%, rgba(255, 107, 53, 0.18), transparent 22rem);
}

.visual-caption {
  position: absolute;
  left: 1.6rem;
  right: 1.6rem;
  bottom: 1.6rem;
  z-index: 1;
}

.visual-caption span,
.project-thumb span {
  color: var(--bg-accent);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.visual-caption strong {
  display: block;
  max-width: 680px;
  margin-top: 0.5rem;
  color: white;
  font-family: var(--font-heading);
  font-size: clamp(2rem, 3.4vw, 3.6rem);
  line-height: 0.95;
  text-transform: uppercase;
}

.td-project-thumbs {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.project-thumb {
  position: relative;
  flex: calc(var(--thumb-grow) * 0.16) 1 clamp(150px, 11vw, 230px);
  height: var(--thumb-height);
  min-height: 150px;
  padding: 0;
  border-color: rgba(255,255,255,0.12);
  cursor: pointer;
  opacity: 0.62;
  transition: opacity 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
}

.project-thumb.active,
.project-thumb:hover {
  opacity: 1;
  border-color: rgba(255, 107, 53, 0.56);
  transform: translateY(-5px) scale(1.02);
}

.project-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
}

.project-thumb::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent, rgba(0,0,0,0.82));
}

.project-thumb strong {
  position: absolute;
  left: 1rem;
  right: 1rem;
  z-index: 1;
}

.project-thumb strong {
  bottom: 1.1rem;
  color: white;
  font-family: var(--font-heading);
  font-size: clamp(1.05rem, 1.28vw, 1.38rem);
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

@keyframes copyIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
}

@keyframes visualIn {
  from {
    opacity: 0;
    transform: translateX(18px);
  }
}

@keyframes fillBar {
  to {
    width: 100%;
  }
}

@media (max-width: 968px) {
  .td-project-stage {
    flex-direction: column;
    min-height: auto;
    max-height: none;
  }

  .td-project-copy {
    flex: none;
    min-width: 0;
    min-height: 320px;
  }

  .td-project-visual {
    min-height: 390px;
  }

  .td-project-visual img {
    min-height: 390px;
    max-height: 430px;
  }

  .td-project-thumbs {
    align-items: stretch;
  }

  .project-thumb {
    flex-basis: calc(50% - 0.5rem);
    height: clamp(160px, var(--thumb-height), 230px);
  }
}

@media (max-width: 600px) {
  .projects-head {
    margin-bottom: 1.6rem;
  }

  .td-project-copy {
    min-height: 310px;
    padding: 1.35rem;
  }

  .td-project-copy h3 {
    font-size: clamp(2rem, 11vw, 2.8rem);
  }

  .td-project-visual {
    min-height: 340px;
  }

  .td-project-visual img {
    min-height: 340px;
    max-height: 360px;
  }

  .visual-caption {
    left: 1.1rem;
    right: 1.1rem;
    bottom: 1.1rem;
  }

  .visual-caption strong {
    font-size: clamp(1.75rem, 9vw, 2.4rem);
  }

  .project-thumb {
    flex-basis: 100%;
    height: clamp(150px, var(--thumb-height), 210px);
  }

  .project-thumb strong {
    font-size: 1.05rem;
  }
}
</style>
