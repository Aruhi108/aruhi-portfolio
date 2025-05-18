// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Import Typed.js and ScrollReveal
  const Typed = window.Typed
  const ScrollReveal = window.ScrollReveal

  // Initialize Typed.js
  const typed = new Typed(".typed-text", {
    strings: ["Web Developer", "BCA Student", "Frontend Developer"],
    typeSpeed: 80,
    backSpeed: 60,
    backDelay: 2000,
    loop: true,
  })

  // Initialize ScrollReveal
  const sr = ScrollReveal({
    origin: "top",
    distance: "60px",
    duration: 1000,
    delay: 200,
    reset: false,
  })

  // Apply ScrollReveal to elements
  sr.reveal(".hero-content", {})
  sr.reveal(".hero-image", { delay: 400 })
  sr.reveal(".section-header", {})
  sr.reveal(".about-image", { origin: "left" })
  sr.reveal(".about-text", { origin: "right", delay: 300 })
  sr.reveal(".skills-categories", { delay: 300 })
  sr.reveal(".project-card", { interval: 200 })
  sr.reveal(".timeline-item", { interval: 200 })
  sr.reveal(".certification-card", { interval: 200 })
  sr.reveal(".contact-info", { origin: "left" })
  sr.reveal(".contact-form", { origin: "right", delay: 300 })

  // Mobile Menu Toggle
  const hamburger = document.querySelector(".hamburger")
  const nav = document.querySelector("nav")
  const navLinks = document.querySelectorAll("nav ul li a")

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active")
    nav.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      nav.classList.remove("active")
    })
  })

  // Dark Mode Toggle
  const themeToggle = document.querySelector(".theme-toggle")
  const body = document.body

  // Check for saved theme preference
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode")
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
  }

  themeToggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode")

    if (body.classList.contains("dark-mode")) {
      this.innerHTML = '<i class="fas fa-sun"></i>'
      localStorage.setItem("theme", "dark")
    } else {
      this.innerHTML = '<i class="fas fa-moon"></i>'
      localStorage.setItem("theme", "light")
    }
  })

  // Active Navigation Link
  function setActiveLink() {
    const sections = document.querySelectorAll("section")
    const navLinks = document.querySelectorAll("nav ul li a")

    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  }

  window.addEventListener("scroll", setActiveLink)

  // Back to Top Button
  const backToTopBtn = document.querySelector(".back-to-top")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("active")
    } else {
      backToTopBtn.classList.remove("active")
    }
  })

  // Skills Tab Functionality
  const tabBtns = document.querySelectorAll(".tab-btn")
  const skillsCategories = document.querySelectorAll(".skills-category")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const category = this.dataset.category

      // Remove active class from all buttons
      tabBtns.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Hide all skill categories
      skillsCategories.forEach((cat) => cat.classList.remove("active"))

      // Show the selected category
      document.querySelector(`.skills-category[data-category="${category}"]`).classList.add("active")
    })
  })

  // Project Filtering
  const filterBtns = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.dataset.filter

      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Filter projects
      projectCards.forEach((card) => {
        if (filter === "all") {
          card.style.display = "block"
        } else {
          if (card.dataset.category.includes(filter)) {
            card.style.display = "block"
          } else {
            card.style.display = "none"
          }
        }
      })
    })
  })

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm")

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const subject = document.getElementById("subject").value
    const message = document.getElementById("message").value

    // Here you would typically send the form data to a server
    // For now, we'll just log it to the console
    console.log("Form submitted:", { name, email, subject, message })

    // Show success message (in a real application)
    alert("Thank you for your message! I will get back to you soon.")

    // Reset form
    contactForm.reset()
  })

  // Initialize skill progress bars with animation
  function animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress")

    skillBars.forEach((bar) => {
      const width = bar.style.width
      bar.style.width = "0"

      setTimeout(() => {
        bar.style.width = width
      }, 300)
    })
  }

  // Trigger skill bar animation when skills section is in view
  const skillsSection = document.querySelector(".skills")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkillBars()
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 },
  )

  observer.observe(skillsSection)

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })
})
