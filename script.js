/* ============================================
   GEORGI AGHAJANYAN — PORTFOLIO JAVASCRIPT
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {

    // Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================

    const navbar = document.querySelector(".navbar");

    function updateNavbar() {
        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    updateNavbar();

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });


    // ============================================
    // MOBILE MENU
    // ============================================

    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-link");

    function closeMenu() {
        navLinks.classList.remove("open");
        document.body.classList.remove("menu-open");

        mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';

        if (window.lucide) {
            lucide.createIcons();
        }
    }

    mobileMenuBtn.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        document.body.classList.toggle("menu-open", isOpen);

        mobileMenuBtn.innerHTML = isOpen
            ? '<i data-lucide="x"></i>'
            : '<i data-lucide="menu"></i>';

        if (window.lucide) {
            lucide.createIcons();
        }
    });

    navItems.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    });


    // ============================================
    // LIVE CLOCK
    // ============================================

    const clockElement = document.getElementById("clock");

    function updateClock() {
        const now = new Date();

        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    updateClock();

    setInterval(updateClock, 1000);


    // ============================================
    // FOOTER YEAR
    // ============================================

    document.getElementById("currentYear").textContent =
        new Date().getFullYear();


    // ============================================
    // SCROLL REVEAL
    // ============================================

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // ============================================
    // ACTIVE NAVIGATION SECTION
    // ============================================

    const sections = document.querySelectorAll("main section[id]");

    const sectionObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.id;

                    navItems.forEach(link => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${currentId}`
                        );
                    });
                }
            });
        },
        {
            threshold: 0.35
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    // ============================================
    // BACK TO TOP
    // ============================================

    const backToTop = document.getElementById("backToTop");

    function updateBackToTop() {
        if (window.scrollY > 600) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    }

    window.addEventListener("scroll", updateBackToTop, {
        passive: true
    });

    updateBackToTop();

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    // ============================================
    // TERMINAL TYPING ANIMATION
    // ============================================

    const typingElement = document.getElementById("typingCommand");

    const commands = [
        "docker ps",
        "ip addr show",
        "kubectl get pods",
        "ping 8.8.8.8",
        "git status",
        "systemctl status nginx"
    ];

    let commandIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeTerminal() {
        const currentCommand = commands[commandIndex];

        if (!deleting) {
            typingElement.textContent =
                currentCommand.substring(0, characterIndex + 1);

            characterIndex++;

            if (characterIndex === currentCommand.length) {
                deleting = true;

                setTimeout(typeTerminal, 1800);
                return;
            }

            setTimeout(typeTerminal, 75);
        } else {
            typingElement.textContent =
                currentCommand.substring(0, characterIndex - 1);

            characterIndex--;

            if (characterIndex === 0) {
                deleting = false;

                commandIndex = (commandIndex + 1) % commands.length;

                setTimeout(typeTerminal, 400);
                return;
            }

            setTimeout(typeTerminal, 35);
        }
    }

    setTimeout(typeTerminal, 1200);


    // ============================================
    // TECHNOLOGY CARD INTERACTION
    // =======================================================

    const techCards = document.querySelectorAll(".tech-card");

    techCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-5px) scale(1.02)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });

        card.addEventListener("click", () => {
            const tech = card.dataset.tech;

            card.classList.add("tech-selected");

            setTimeout(() => {
                card.classList.remove("tech-selected");
            }, 500);

            // Lightweight feedback without a popup
            card.style.borderColor = "rgba(75,157,255,0.65)";

            setTimeout(() => {
                card.style.borderColor = "";
            }, 500);

            console.log(`Technology selected: ${tech}`);
        });
    });


    // ============================================
    // PROJECT CARD INTERACTION
    // ============================================

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(card => {
        card.addEventListener("mousemove", event => {
            if (window.innerWidth < 900) return;

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });


    // ============================================
    // CONTACT FORM VALIDATION
    // ============================================

    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");
    const sendButton = contactForm.querySelector(".send-btn");

    contactForm.addEventListener("submit", event => {
        event.preventDefault();

        formMessage.classList.remove("show", "error");

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name.length < 2) {
            showFormMessage("Please enter your name.", true);
            return;
        }

        if (!emailPattern.test(email)) {
            showFormMessage("Please enter a valid email address.", true);
            return;
        }

        if (subject.length < 2) {
            showFormMessage("Please enter a subject.", true);
            return;
        }

        if (message.length < 10) {
            showFormMessage("Your message should contain at least 10 characters.", true);
            return;
        }

        sendButton.disabled = true;

        sendButton.innerHTML = `
            <span>Preparing message...</span>
            <i data-lucide="loader-circle"></i>
        `;

        if (window.lucide) {
            lucide.createIcons();
        }

        // Since no backend is connected, use mailto
        const mailtoLink =
            `mailto:your.email@example.com` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\n${message}`
            )}`;

        setTimeout(() => {
            showFormMessage("Your email application will open to send your message.");

            window.location.href = mailtoLink;

            sendButton.disabled = false;

            sendButton.innerHTML = `
                <span>Send Message</span>
                <i data-lucide="arrow-up-right"></i>
            `;

            if (window.lucide) {
                lucide.createIcons();
            }
        }, 700);
    });

    function showFormMessage(message, error = false) {
        formMessage.textContent = message;

        formMessage.classList.add("show");

        if (error) {
            formMessage.classList.add("error");
        } else {
            formMessage.classList.remove("error");
        }
    }


    // ============================================
    // BUTTON RIPPLE EFFECT
    // ============================================

    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(button => {
        button.addEventListener("click", event => {
            const rect = button.getBoundingClientRect();

            const ripple = document.createElement("span");

            ripple.className = "button-ripple";

            ripple.style.left = `${event.clientX - rect.left}px`;
            ripple.style.top = `${event.clientY - rect.top}px`;

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });


    // ============================================
    // SMOOTH ANCHOR SCROLLING
    // ============================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", event => {
            const targetId = anchor.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });


    // ============================================
    // ACCESSIBILITY: KEYBOARD ESCAPE
    // ============================================

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });


    // ============================================
    // PERFORMANCE: DISABLE ANIMATIONS ON HIDDEN TAB
    // ============================================

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            // Browser naturally pauses most animations.
            // No additional processing needed.
        }
    });


    console.log(
        "%cPortfolio initialized successfully.",
        "color: #4b9dff; font-weight: bold; font-size: 12px;"
    );

});