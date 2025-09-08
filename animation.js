document.addEventListener("DOMContentLoaded", () => {
  gsap.from(".heading h1", { 
      duration: 1, 
      y: -50, 
      opacity: 0, 
      ease: "bounce.out" 
  });

  gsap.from(".box", { 
      duration: 0.8, 
      scale: 0, 
      opacity: 0, 
      stagger: 0.1, 
      ease: "back.out(1.7)"
  });

  gsap.from(".reset", { 
      duration: 1, 
      y: 50, 
      opacity: 0, 
      ease: "power2.out"
  });

  document.querySelectorAll(".box").forEach(box => {
      box.addEventListener("mouseenter", () => {
          gsap.to(box, { scale: 1.1, duration: 0.2, ease: "power1.out" });
      });
      box.addEventListener("mouseleave", () => {
          gsap.to(box, { scale: 1, duration: 0.2, ease: "power1.in" });
      });
  });
});