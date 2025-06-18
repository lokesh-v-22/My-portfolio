// Debug GSAP and tsparticles loading
console.log("GSAP loaded:", typeof gsap !== "undefined");
console.log("tsparticles loaded:", typeof tsParticles !== "undefined");
console.log("VanillaTilt loaded:", typeof VanillaTilt !== "undefined");

// Hide loading screen
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.loading-screen').classList.add('hidden');
  }, 1000);
});

// GSAP Animations with ScrollSmoother
if (typeof gsap !== "undefined" && typeof ScrollSmoother !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  ScrollSmoother.create({
    wrapper: 'body',
    content: 'body',
    smooth: 1.5,
    effects: true
  });

  // Home section animations
  gsap.from(".home-text h2", {
    opacity: 0,
    y: 50,
    rotation: 5,
    duration: 0.8,
    delay: 0.3
  });

  gsap.from(".home-text p, .home-text .tagline, .home-text .cta-button", {
    opacity: 0,
    y: 50,
    duration: 0.8,
    delay: 0.5,
    stagger: 0.2
  });

  gsap.from(".home-image img", {
    opacity: 0,
    scale: 0.8,
    rotation: -5,
    duration: 0.8,
    delay: 0.7
  });

  gsap.from(".home-icons a", {
    opacity: 0,
    y: 10,
    duration: 0.5,
    stagger: 0.1,
    delay: 0.9
  });

  // Section animations with ScrollTrigger
  gsap.utils.toArray("section").forEach((section) => {
    gsap.from(section.querySelectorAll("h2, .about-card, .project, .skill-category, form"), {
      opacity: 0,
      y: 50,
      rotation: 3,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  });

  // Progress bar animations
  gsap.utils.toArray(".progress-fill").forEach((bar) => {
    gsap.from(bar, {
      width: 0,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: bar,
        start: "top 80%"
      }
    });
  });
} else {
  console.error("GSAP or ScrollSmoother failed to load. Content will be visible without animations.");
}

// Particles.js configuration for all sections
if (typeof tsParticles !== "undefined") {
  const particleConfig = {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: "#319795" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out"
      },
      links: {
        enable: true,
        distance: 150,
        color: "#319795",
        opacity: 0.4,
        width: 1
      }
    },
    interactivity: {
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: true, mode: "push" }
      },
      modes: {
        grab: { distance: 200, links: { opacity: 0.5 } },
        push: { particles_nb: 4 }
      }
    }
  };
  ["home", "about", "projects", "skills", "resume", "contact"].forEach((section) => {
    tsParticles.load(`particles-${section}`, particleConfig).catch((error) => {
      console.error(`tsParticles failed to load for ${section}:`, error);
    });
  });
} else {
  console.error("tsParticles failed to load. No particle background will be shown.");
}

// VanillaTilt for 3D tilt effects
if (typeof VanillaTilt !== "undefined") {
  VanillaTilt.init(document.querySelectorAll(".about-card, .project"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.5
  });
} else {
  console.error("VanillaTilt failed to load. No tilt effects will be applied.");
}

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
  const body = document.body;
  const isDark = body.dataset.theme === 'dark';
  body.dataset.theme = isDark ? 'light' : 'dark';
  themeToggle.innerHTML = `<i class="fas fa-${isDark ? 'sun' : 'moon'}"></i>`;
});

// Modal for project details
function openModal(projectId) {
  const modal = document.getElementById('project-modal');
  const title = document.getElementById('modal-title');
  const image = document.getElementById('modal-image');
  const description = document.getElementById('modal-description');
  const technologies = document.getElementById('modal-technologies');
  const link = document.getElementById('modal-link');

  const projects = {
    1: {
      title: "Online Result Analysis",
      image: "https://via.placeholder.com/600x400?text=Result+Analysis",
      description: "A collaborative web application to visualize student academic performance using interactive charts. Built with HTML, CSS, JavaScript, and Chart.js to provide insights for educators and students.",
      technologies: "HTML, CSS, JavaScript, Chart.js",
      link: "https://github.com/result-analysis"
    },
    2: {
      title: "Fraud Detection in Banking System",
      image: "https://via.placeholder.com/600x400?text=Fraud+Detection",
      description: "A machine learning model to detect fraudulent transactions in real-time. Utilized Python, scikit-learn, and pandas for data preprocessing and model training, achieving high accuracy.",
      technologies: "Python, scikit-learn, pandas, Jupyter",
      link: "https://github.com/fraud-detection"
    },
    3: {
      title: "Desktop Voice Assistant",
      image: "https://via.placeholder.com/600x400?text=Voice+Assistant",
      description: "A Python-based voice assistant that performs tasks like opening applications, sending emails, and fetching web data using speech recognition and APIs.",
      technologies: "Python, SpeechRecognition, pyttsx3, APIs",
      link: "https://github.com/voice-assistant"
    }
  };

  const project = projects[projectId];
  title.textContent = project.title;
  image.src = project.image;
  description.textContent = project.description;
  technologies.textContent = `Technologies: ${project.technologies}`;
  link.href = project.link;

  modal.style.display = 'flex';
  gsap.from(".modal-content", { opacity: 0, scale: 0.8, duration: 0.5 });
}

document.querySelector('.close-modal').addEventListener('click', () => {
  const modal = document.getElementById('project-modal');
  gsap.to(".modal-content", {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    onComplete: () => {
      modal.style.display = 'none';
    }
  });
});

// Resume viewer
function viewResume() {
  const container = document.getElementById("resume-view");
  container.innerHTML = `<iframe src="Lokesh resume.pdf" class="fullscreen" title="Lokesh Resume"></iframe>`;
  container.scrollIntoView({ behavior: "smooth" });
}

// Form submission
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const formMessage = document.querySelector('.form-message');
  formMessage.style.display = 'block';
  gsap.from(".form-message", { opacity: 0, y: 20, duration: 0.5 });
  setTimeout(() => {
    formMessage.style.display = 'none';
    e.target.reset();
  }, 3000);
});