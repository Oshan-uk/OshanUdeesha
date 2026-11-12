/* FIRST VISIT ENTRANCE ANIMATION */
document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("cinematicIntro");

  if (!intro) return;

  const scene = document.getElementById("roomScene");
  const monitor = document.querySelector(".monitor-screen");
  const caption = document.getElementById("introCaption");
  const skipButton = document.getElementById("skipIntro");

  if (sessionStorage.getItem("oshanIntroPlayed")) {
    intro.remove();
    return;
  }

  let finished = false;

  function calculateZoom() {
    if (!scene || !monitor) return;

    const monitorRect = monitor.getBoundingClientRect();
    const sceneRect = scene.getBoundingClientRect();

    const scaleX = window.innerWidth / monitorRect.width;
    const scaleY = window.innerHeight / monitorRect.height;

    const scale = Math.max(scaleX, scaleY);

    const centerX =
        monitorRect.left + monitorRect.width / 2 - sceneRect.left;

    const centerY =
        monitorRect.top + monitorRect.height / 2 - sceneRect.top;

    scene.style.setProperty("--zoom-scale", scale);
    scene.style.setProperty(
        "--zoom-origin",
        `${centerX}px ${centerY}px`
    );
  }

  function finishIntro() {
    if (finished) return;

    finished = true;

    sessionStorage.setItem("oshanIntroPlayed", "true");

    intro.classList.add("hide");

    setTimeout(() => {
      intro.remove();
    }, 1300);
  }

  setTimeout(() => {
    if (!finished) {
      caption?.classList.add("hide");
    }
  }, 3000);

  setTimeout(() => {
    if (finished) return;

    calculateZoom();
    scene?.classList.add("zooming");
  }, 3500);

  setTimeout(finishIntro, 7500);

  skipButton?.addEventListener("click", finishIntro);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      finishIntro();
    }
  });
});




document.addEventListener("DOMContentLoaded", () => {

  const loader = document.getElementById("introLoader");

  if (!loader) return;

  const percentage = document.getElementById("loaderPercent");

  if (sessionStorage.getItem("oshANVisited")) {
    loader.remove();
    return;
  }

  let progress = 0;

  const counter = setInterval(() => {

    progress += 2;

    if (percentage) {
      percentage.textContent = progress + "%";
    }

    if (progress >= 100) {
      clearInterval(counter);
    }

  }, 44);

  setTimeout(() => {

    loader.classList.add("hide");

    sessionStorage.setItem("oshANVisited", "true");

    setTimeout(() => loader.remove(), 800);

  }, 2400);

});


// Oshan.exe — shared interactions for all pages
const page = document.body.dataset.page;
document.querySelectorAll(".nav-link").forEach(link => {
  if (link.getAttribute("href") === (page === "home" ? "index.html" : `${page}.html`)) link.classList.add("active");
});

const menuButton = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");
menuButton?.addEventListener("click", () => {
  const open = sidebar.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "×" : "☰";
});
document.addEventListener("click", event => {
  if (window.innerWidth <= 760 && sidebar?.classList.contains("open") &&
      !sidebar.contains(event.target) && !menuButton.contains(event.target)) {
    sidebar.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  }
});

// Small live clock in the footer
const clock = document.getElementById("clock");
function updateClock() {
  if (clock) clock.textContent = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Colombo", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
  }).format(new Date());
}
updateClock();
setInterval(updateClock, 1000);

// Reusable category filtering for skills and projects
document.querySelectorAll("[data-filter-group]").forEach(group => {
  const buttons = group.querySelectorAll(".filter");
  const cards = document.querySelectorAll(group.dataset.filterGroup === "skills" ? ".skill-card" : ".project-card");
  buttons.forEach(button => button.addEventListener("click", () => {
    buttons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const selected = button.dataset.filter;
    cards.forEach(card => {
      card.hidden = selected !== "all" && card.dataset.category !== selected;
    });
  }));
});

// Gallery preview lightbox
const lightbox = document.querySelector(".lightbox");
document.querySelectorAll(".gallery-item").forEach(item => item.addEventListener("click", () => {
  if (!lightbox) return;
  lightbox.querySelector("h2").textContent = item.dataset.title || "Archive item";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}));
function closeLightbox() {
  lightbox?.classList.remove("open");
  lightbox?.setAttribute("aria-hidden", "true");
}
document.querySelector(".lightbox-close")?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeLightbox(); });

// Contact form: set your email below before publishing.
// This creates an email draft; it does not store or send messages on a server.
const PORTFOLIO_EMAIL = "oshanudeesha2004@gmail.com";
document.getElementById("contactForm")?.addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);

  const subject = encodeURIComponent(`Portfolio message: ${data.get("subject")}`);
  const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\nTopic: ${data.get("subject")}\n\n${data.get("message")}`);
  window.location.href = `mailto:${PORTFOLIO_EMAIL}?subject=${subject}&body=${body}`;
});


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("pixelCanvas");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const image = new Image();

  image.src = "assets/images/walking/walking_scene_5.png";

  const pixelSize = 15;
  const pixelSpeed = 15;
  const pixelDelay = 25;
  const waitTime = 2000;

  image.onload = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let pixels = [];

    function drawImage() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scale = Math.max(
          canvas.width / image.width,
          canvas.height / image.height
      );

      const width = image.width * scale;
      const height = image.height * scale;

      ctx.drawImage(
          image,
          (canvas.width - width) / 2,
          (canvas.height - height) / 2,
          width,
          height
      );
    }

    function createPixels() {
      pixels = [];

      for (let y = 0; y < canvas.height; y += pixelSize) {
        for (let x = 0; x < canvas.width; x += pixelSize) {
          pixels.push({ x, y });
        }
      }

      pixels.sort(() => Math.random() - 0.5);
    }

    function revealPixels() {
      drawImage();

      const imageData = ctx.getImageData(
          0, 0, canvas.width, canvas.height
      );

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let index = 0;

      const reveal = setInterval(() => {
        for (let i = 0; i < pixelSpeed && index < pixels.length; i++) {
          const pixel = pixels[index++];

          ctx.putImageData(
              imageData,
              0,
              0,
              pixel.x,
              pixel.y,
              pixelSize,
              pixelSize
          );
        }

        if (index >= pixels.length) {
          clearInterval(reveal);
          setTimeout(dissolvePixels, waitTime);
        }
      }, pixelDelay);
    }

    function dissolvePixels() {
      createPixels();

      let index = 0;

      const dissolve = setInterval(() => {
        for (let i = 0; i < pixelSpeed && index < pixels.length; i++) {
          const pixel = pixels[index++];

          ctx.clearRect(
              pixel.x,
              pixel.y,
              pixelSize,
              pixelSize
          );
        }

        if (index >= pixels.length) {
          clearInterval(dissolve);
          setTimeout(revealPixels, waitTime);
        }
      }, pixelDelay);
    }

    revealPixels();
  };
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".gallery-item");
  const lightbox = document.querySelector(".lightbox");
  const closeBtn = document.querySelector(".lightbox-close");
  const content = document.querySelector(".lightbox-content");

  if (!lightbox || !content) return;

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      const title = card.dataset.title || "Gallery Image";

      if (!img) return;

      content.innerHTML = `
    <img src="${img.src}" alt="${img.alt}">
    `;
      lightbox.classList.add("active");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
  }

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLightbox();
  });
});




/* =====================================
   OSHAN.EXE - BOOT INTRO CONTROLLER
===================================== */

document.addEventListener("DOMContentLoaded", () => {

  const intro = document.getElementById("bootIntro");

  if (!intro) return;

  // Play only once per browser session
  if (sessionStorage.getItem("oshanIntroPlayed")) {
    intro.remove();
    return;
  }

  const logo = document.getElementById("bootLogo");
  const progress = document.getElementById("bootProgress");
  const percentage = document.getElementById("bootPercentage");

  let currentProgress = 0;

  const duration = 4500;
  const interval = 45;
  const increment = 100 / (duration / interval);

  const loader = setInterval(() => {

    currentProgress += increment;

    if (currentProgress >= 100) {
      currentProgress = 100;
      clearInterval(loader);
    }

    progress.style.width = currentProgress + "%";

    percentage.textContent =
        Math.floor(currentProgress).toString().padStart(2, "0") + "%";

  }, interval);

  // Finish boot sequence
  setTimeout(() => {

    // Final logo flip
    logo.style.animation = "none";

    void logo.offsetWidth;

    logo.style.animation = "logoFlip 0.8s ease-in-out";

    // Wait for final flip
    setTimeout(() => {

      sessionStorage.setItem("oshanIntroPlayed", "true");

      intro.classList.add("boot-exit");

      setTimeout(() => {
        intro.remove();
      }, 1500);

    }, 900);

  }, duration);

});