<template>
  <section id="nosotros" class="section about">
    <div class="container about-container">
      
      <div class="about-content reveal" v-reveal>
        <div class="section-header">
          <span class="eyebrow accent-text">Sobre Nosotros</span>
          <h2 class="section-title">Nuestra Esencia</h2>
          <p class="intro-text">
            Más de una década transformando espacios y marcas a través de soluciones de impresión de alto impacto.
          </p>
        </div>

        <div class="core-values">
          <div class="value-item">
            <h3 class="value-title">Misión</h3>
            <p class="value-desc">
              Brindar a nuestros clientes productos y servicios profesionales en impresiones, fabricación de corpóreos, diseño y ambientación de espacios, mediante un proceso de comunicación efectivo, respaldados por un grupo interdisciplinario, valores y tecnología de vanguardia que beneficien a nuestros clientes, empresa y a la comunidad.
            </p>
          </div>
          
          <div class="value-item highlight-box">
            <h3 class="value-title">Visión</h3>
            <p class="value-desc">
              Ser líderes en posicionamiento de marcas utilizando la fabricación de corpóreos en materiales de vanguardia, diseños e impresiones de alta calidad para lograr alcanzar en los clientes el impacto necesario en su entorno, manejando altos estándares de calidad.
            </p>
          </div>
        </div>
      </div>

      <div class="about-visual reveal" v-reveal style="transition-delay: 0.2s">
        <div class="image-wrapper main-img">
          <img src="../assets/imagen5.jpg" alt="Nuestro Equipo" />
        </div>
        <div class="image-wrapper floating-img">
          <img src="../assets/imagen2.jpg" alt="Instalaciones" />
        </div>
        
        <div class="experience-badge glass">
          <span class="number">10+</span>
          <span class="text">Años de<br>Experiencia</span>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.about {
  background-color: var(--bg-primary);
  overflow: hidden;
}

.about-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}

.intro-text {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  line-height: 1.6;
}

.core-values {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.value-title {
  font-size: 1.8rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.value-title::before {
  content: '';
  display: block;
  width: 30px;
  height: 3px;
  background-color: var(--bg-accent);
}

.value-desc {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.8;
}

.highlight-box {
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: var(--radius-md);
  border-left: 4px solid var(--bg-accent);
}

.highlight-box .value-title::before {
  display: none;
}

/* Visual Side */
.about-visual {
  position: relative;
  height: 550px;
  width: 100%;
}

.image-wrapper {
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
  position: absolute;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.image-wrapper:hover img {
  transform: scale(1.03);
}

.main-img {
  top: 0;
  right: 0;
  width: 80%;
  height: 80%;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.floating-img {
  bottom: 0;
  left: 0;
  width: 60%;
  height: 50%;
  border: 10px solid var(--bg-primary); /* Thick border to separate from main img */
  z-index: 2;
  box-shadow: -10px 10px 40px rgba(0,0,0,0.8);
}

.experience-badge {
  position: absolute;
  top: 15%;
  left: -10%;
  padding: 1.5rem 2.5rem;
  border-radius: var(--radius-lg);
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background-color: var(--bg-secondary); /* Solid background to make it visible! */
  border: 1px solid rgba(255, 107, 53, 0.3);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
}

.number {
  font-family: var(--font-heading);
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--bg-accent);
  line-height: 1;
}

.text {
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-primary);
  line-height: 1.4;
  letter-spacing: 0.05em;
}

@media (max-width: 1024px) {
  .about-container {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
  
  .about-visual {
    height: 500px;
    max-width: 650px;
    margin: 0 auto;
  }

  .experience-badge {
    left: 0;
    top: 5%;
  }
}

@media (max-width: 600px) {
  .about-visual {
    height: 350px;
  }
  .number {
    font-size: 2.5rem;
  }
  .experience-badge {
    padding: 1rem 1.5rem;
    gap: 1rem;
    top: -5%;
  }
  .main-img {
    width: 90%;
    height: 75%;
  }
  .floating-img {
    width: 70%;
    height: 45%;
  }
}
</style>
