<template>
  <section id="proyectos" class="section projects">
    <div class="container">
      <div class="section-header text-center reveal" v-reveal>
        <span class="eyebrow accent-text">Impulsamos marcas</span>
        <h2 class="section-title">Proyectos Recientes</h2>
      </div>
      
      <div class="projects-grid">
        <div class="grid-col main-col">
          <div class="project-card large reveal" v-reveal>
            <img src="../assets/imagen2.jpg" alt="Project 1" />
            <div class="project-info">
              <h3>Corporate Branding</h3>
              <p>Identidad visual en gran formato.</p>
            </div>
          </div>
        </div>
        
        <div class="grid-col side-col">
          <div class="project-card square reveal" v-reveal style="transition-delay: 0.1s">
            <img src="../assets/imagen3.jpg" alt="Project 2" />
            <div class="project-info">
              <h3>Vinyl Graphics</h3>
              <p>Acabados mate premium.</p>
            </div>
          </div>
          <div class="project-card wide reveal" v-reveal style="transition-delay: 0.2s">
            <img src="../assets/imagen4.jpg" alt="Project 3" />
            <div class="project-info">
              <h3>Outdoor Banners</h3>
              <p>Resistencia extrema.</p>
            </div>
          </div>
        </div>

        <div class="grid-footer fade-in" style="animation-delay: 0.3s">
          <div class="project-card horizontal">
            <img src="../assets/imagen5.jpg" alt="Project 4" />
            <div class="project-info">
              <h3>Industrial Printing</h3>
              <p>Producción en serie.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects {
  background-color: var(--bg-secondary);
}

.text-center {
  text-align: center;
  margin-bottom: 4rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 2rem;
}

.grid-col {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.project-card {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--bg-primary);
  aspect-ratio: 1;
  cursor: pointer;
}

.project-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.project-card:hover img {
  transform: scale(1.05);
  filter: brightness(0.6);
}

.project-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  opacity: 0;
  transform: translateY(20px);
  transition: var(--transition);
}

.project-card:hover .project-info {
  opacity: 1;
  transform: translateY(0);
}

.project-info h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.project-info p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.large {
  aspect-ratio: 4/5;
}

.wide {
  aspect-ratio: 4/3;
}

.grid-footer {
  grid-column: span 2;
}

.horizontal {
  aspect-ratio: 3/1;
}

@media (max-width: 968px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .grid-footer {
    grid-column: span 1;
  }
  .horizontal {
    aspect-ratio: 1;
  }
}
</style>
