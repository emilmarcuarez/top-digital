<template>
  <section class="section material-pop-banner" id="material-pop">
    <div class="glow-orb pop-orb"></div>
    
    <div class="container banner-container">
      <div class="visual-content reveal" v-reveal>
        <div class="product-showcase">
          <!-- White background card container -->
          <div class="white-glow-card">
            <div class="bg-pattern"></div>
            <img src="../assets/material_pop.png" alt="Material POP" class="main-image" />
          </div>
          
          <!-- Floating badges with theme colors -->
          <div class="floating-badge badge-1">Termos</div>
          <div class="floating-badge badge-2">Mouse Pads</div>
          <div class="floating-badge badge-3">Gorras y Más</div>
        </div>
      </div>

      <div class="text-content reveal" v-reveal style="transition-delay: 0.2s">
        <span class="eyebrow accent-text">Merchandising Corporativo</span>
        <h2 class="section-title">Material POP <br><span class="accent-text">Premium</span></h2>
        <p class="section-subtitle">
          Deja una marca imborrable en la mente de tus clientes. Ofrecemos una amplia gama de artículos promocionales de alta calidad, perfectos para regalos corporativos o campañas publicitarias.
        </p>
        
        <ul class="feature-list">
          <li><span class="check">✓</span> Termos y botellas deportivas personalizadas.</li>
          <li><span class="check">✓</span> Mouse pads ergonómicos a todo color.</li>
          <li><span class="check">✓</span> Bolígrafos, libretas, lanyards y material corporativo.</li>
        </ul>
        
        <a href="#contacto" class="btn btn-primary mt-action">Potenciar mi Marca</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.material-pop-banner {
  background: var(--bg-secondary);
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(255, 107, 53, 0.05);
  border-bottom: 1px solid rgba(255, 107, 53, 0.05);
  padding: 8rem 0;
}

.pop-orb {
  background: radial-gradient(circle, var(--bg-accent-soft) 0%, transparent 70%);
  left: -10%;
  right: auto;
  width: 900px;
  height: 900px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 0;
  pointer-events: none;
}

.banner-container {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 5rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.text-content {
  padding-left: 2rem;
}

.section-title {
  color: white;
}

.section-subtitle {
  font-size: 1.15rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 2.5rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin-bottom: 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-size: 1.05rem;
  color: var(--text-primary);
}

.check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: rgba(255, 107, 53, 0.15);
  color: var(--bg-accent);
  border-radius: 50%;
  font-size: 0.9rem;
  font-weight: bold;
  flex-shrink: 0;
}

.mt-action {
  margin-top: 1rem;
}

/* Visual Content */
.visual-content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-showcase {
  position: relative;
  width: 100%;
  max-width: 550px;
  perspective: 1200px;
}

.white-glow-card {
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  border-radius: var(--radius-lg);
  padding: 3rem;
  position: relative;
  transform: rotateY(-6deg) rotateX(4deg);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease;
  box-shadow: 
    -20px 30px 50px rgba(0,0,0,0.6),
    0 0 0 1px rgba(255,255,255,0.8) inset,
    0 0 40px rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(#d5d5d5 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.5;
  z-index: 0;
}

.main-image {
  width: 100%;
  height: auto;
  object-fit: contain;
  position: relative;
  z-index: 10;
  filter: drop-shadow(0 20px 30px rgba(0,0,0,0.15));
  transform: scale(1.05) translateY(0);
  transition: transform 0.6s ease;
}

.product-showcase:hover .white-glow-card {
  transform: rotateY(0deg) rotateX(0deg) translateY(-10px);
  box-shadow: 
    0 40px 70px rgba(0,0,0,0.8),
    0 0 0 1px rgba(255,255,255,0.9) inset,
    0 0 60px rgba(255, 107, 53, 0.2);
}

.product-showcase:hover .main-image {
  transform: scale(1.08) translateY(-5px);
}

.floating-badge {
  position: absolute;
  padding: 0.6rem 1.4rem;
  background: rgba(20,20,20,0.9);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  backdrop-filter: blur(10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.5);
  animation: float 4s ease-in-out infinite;
  z-index: 20;
}

.badge-1 {
  top: 10%;
  left: -8%;
  animation-delay: 0s;
}

.badge-2 {
  bottom: 20%;
  right: -8%;
  animation-delay: 1.5s;
  background: var(--bg-accent);
  color: white;
  border-color: var(--bg-accent);
  box-shadow: 0 15px 30px rgba(255, 107, 53, 0.3);
}

.badge-3 {
  bottom: 5%;
  left: 5%;
  animation-delay: 0.8s;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}

@media (max-width: 1024px) {
  .banner-container {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
  
  .text-content {
    padding-left: 0;
    text-align: center;
    order: -1;
  }

  .feature-list {
    align-items: center;
  }
  
  .pop-orb {
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .white-glow-card {
    padding: 2rem;
  }
  
  .badge-1 { left: -2%; top: 2%; }
  .badge-2 { right: -2%; bottom: 10%; }
  .badge-3 { left: 5%; bottom: -2%; }
}

@media (max-width: 600px) {
  .product-showcase {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.8rem;
  }
  .white-glow-card {
    padding: 1.5rem;
    width: 100%;
    margin-bottom: 1rem;
  }
  .floating-badge {
    position: static;
    transform: none !important;
    animation: none !important;
    font-size: 0.85rem;
    padding: 0.6rem 1.2rem;
  }
}
</style>
