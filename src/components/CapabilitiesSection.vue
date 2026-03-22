<template>
  <section id="capacidades" class="section capabilities bg-dark">
    <div class="container">
      <div class="section-header v-reveal" v-reveal>
        <h2 class="section-title">Capacidades Técnicas</h2>
        <p class="section-subtitle">Tecnología de última generación para resultados excepcionales.</p>
      </div>
      
      <div class="capabilities-grid">
        <div v-for="(cap, index) in capabilities" :key="index" 
             class="cap-card reveal" 
             v-reveal
             :style="{ transitionDelay: (index * 0.1) + 's' }">
          <div class="cap-icon">
            <component :is="cap.icon" class="icon-svg" />
          </div>
          <h3>{{ cap.title }}</h3>
          <p>{{ cap.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { h } from 'vue'

const capabilities = [
  { 
    title: 'Fabricación 3D y Corpóreos', 
    description: 'Ruteo CAD/CAM y modelado en Acrílico, PVC, MDF y Galvánico con integración de iluminación LED especializada.',
    icon: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', xmlns: 'http://www.w3.org/2000/svg' }, [
      h('path', { d: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
      h('polyline', { points: '3.27 6.96 12 12.01 20.73 6.96', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
      h('line', { x1: '12', y1: '22.08', x2: '12', y2: '12', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    ])
  },
  { 
    title: 'Revestimiento Arquitectónico', 
    description: 'Manejo avanzado e instalación de paneles compuestos de aluminio (Alucobond/ACM) para fachadas de alto impacto.',
    icon: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', xmlns: 'http://www.w3.org/2000/svg' }, [
      h('path', { d: 'M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v14H4V5z', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
      h('path', { d: 'M14 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v14h-6V5z', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    ])
  },
  { 
    title: 'Estructuras Modulares', 
    description: 'Diseño industrial y ensamblaje de stands portátiles y corporativos integrando elementos tecnológicos e interactivos.',
    icon: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', xmlns: 'http://www.w3.org/2000/svg' }, [
      h('rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', ry: '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
      h('line', { x1: '3', y1: '9', x2: '21', y2: '9', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
      h('line', { x1: '9', y1: '21', x2: '9', y2: '9', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    ])
  },
  { 
    title: 'Impresión Gran Formato', 
    description: 'Sublimación textil de alta fidelidad, vinilos y lonas resistentes para banderas y rotulación comercial.',
    icon: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', xmlns: 'http://www.w3.org/2000/svg' }, [
      h('polyline', { points: '6 9 6 2 18 2 18 9', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
      h('path', { d: 'M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
      h('rect', { x: '6', y: '14', width: '12', height: '8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    ])
  }
]
</script>

<style scoped>
.capabilities {
  background-color: var(--bg-primary);
}

.section-header {
  margin-bottom: 5rem;
}

.section-title {
  margin-bottom: 1rem;
}

.section-subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.capabilities-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

@media (max-width: 1100px) {
  .capabilities-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .capabilities-grid {
    grid-template-columns: 1fr;
  }
}

.cap-card {
  padding: 2rem;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  transition: var(--transition);
}

.cap-card:hover {
  background: linear-gradient(to bottom, rgba(255, 107, 53, 0.05), transparent);
  border-left-color: var(--bg-accent);
}

.cap-icon {
  width: 40px;
  height: 40px;
  color: var(--bg-accent);
  margin-bottom: 2rem;
}

.icon-svg {
  width: 100%;
  height: 100%;
}

.cap-card h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.cap-card p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.7;
}

@media (max-width: 768px) {
  .section-header {
    text-align: center;
  }
}
</style>
