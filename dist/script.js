console.log("✅ script.js is loaded!");

/* Payment toggle */
 /*  window.showPayment = function (type) {
    const naira = document.getElementById('naira-section');
    const pounds = document.getElementById('pounds-section');
    const btnNaira = document.getElementById('btn-naira');
    const btnPounds = document.getElementById('btn-pounds');

    if (type === 'naira') {
      naira.classList.remove('hidden');
      pounds.classList.add('hidden');

      btnNaira.classList.add('bg-mycolor', 'text-white');
      btnNaira.classList.remove('bg-gray-200', 'text-black');

      btnPounds.classList.remove('bg-mycolor', 'text-white');
      btnPounds.classList.add('bg-gray-200', 'text-black');
    } else {
      pounds.classList.remove('hidden');
      naira.classList.add('hidden');

      btnPounds.classList.add('bg-mycolor', 'text-white');
      btnPounds.classList.remove('bg-gray-200', 'text-black');

      btnNaira.classList.remove('bg-mycolor', 'text-white');
      btnNaira.classList.add('bg-gray-200', 'text-black');
    }
  }; */
window.addEventListener("DOMContentLoaded", () => {
  /* aos code */
  AOS.init({
    once: false, // Allow animation on both scroll down and up
  });

  /* Accordion Toggle Script */
  const firstButton = document.querySelector("#faq-accordion button");
  if (firstButton) firstButton.click();

  window.toggleAccordion = function (button) {
    const parent = button.parentElement;
    const content = parent.querySelector(".accordion-content");
    const allContents = document.querySelectorAll("#faq-accordion .accordion-content");
    const allButtons = document.querySelectorAll("#faq-accordion button");

    allContents.forEach(c => {
      if (c !== content) {
        c.style.maxHeight = null;
        c.parentElement.querySelector("button").classList.remove("open");
      }
    });

    allButtons.forEach(b => {
      if (b !== button) b.classList.remove("open");
    });

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      button.classList.remove("open");
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      button.classList.add("open");
    }
  };

  /* Mobile menu */
  document.getElementById("menu-toggle").addEventListener("click", function () {
    const menu = document.getElementById("mobile-menu");
    menu.classList.toggle("hidden");
  });

  /* Text Slide Carousel */
  const textSlides = document.querySelectorAll('#text-carousel .text-slide');
  let textIndex = 0;
  function rotateText() {
    textSlides[textIndex].classList.add('hidden');
    textIndex = (textIndex + 1) % textSlides.length;
    textSlides[textIndex].classList.remove('hidden');
  }
  setInterval(rotateText, 3000);

  /* Testimonial Carousel */
  const testimonialSlides = document.querySelectorAll('#testimonial-carousel .testimonial-slide');
  let testimonialIndex = 0;
  function rotateTestimonial() {
    testimonialSlides[testimonialIndex].classList.add('hidden');
    testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
    testimonialSlides[testimonialIndex].classList.remove('hidden');
  }
  setInterval(rotateTestimonial, 2500);

  /* Stats section animation */
  const counters = document.querySelectorAll('.counter');
  const labels = document.querySelectorAll('.text-label');

  function startCounterLoop() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1000;
      const interval = 5000;

      const runCount = () => {
        let count = 0;
        const stepTime = Math.max(Math.floor(duration / target), 20);

        const update = () => {
          if (count < target) {
            count += Math.ceil(target / (duration / stepTime));
            if (count > target) count = target;
            counter.textContent = target >= 1000 ? `${count.toLocaleString()}+` : `${count}+`;
            setTimeout(update, stepTime);
          }
        };

        update();
      };

      runCount();
      setInterval(() => {
        counter.textContent = "0";
        runCount();
      }, interval);
    });
  }

  function typeWriterEffect(label, phrases, loop = true) {
    let i = 0;
    let j = 0;
    let isDeleting = false;

    const type = () => {
      const currentPhrase = phrases[i];
      if (isDeleting) {
        label.textContent = currentPhrase.substring(0, j--);
      } else {
        label.textContent = currentPhrase.substring(0, j++);
      }

      if (!isDeleting && j === currentPhrase.length + 1) {
        isDeleting = true;
        setTimeout(type, 1200);
      } else if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % phrases.length;
        setTimeout(type, 300);
      } else {
        setTimeout(type, isDeleting ? 40 : 80);
      }
    };

    type();
  }

  function startTypingLabels() {
    labels.forEach(label => {
      const phrases = label.getAttribute('data-phrases').split(',').map(s => s.trim());
      typeWriterEffect(label, phrases);
    });
  }

  const statsSection = document.getElementById('stats-section');
  const statsObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        startCounterLoop();
        startTypingLabels();
        statsObserver.disconnect();
      }
    },
    { threshold: 0.5 }
  );
  statsObserver.observe(statsSection);

  /* Native section */
  const nativeSection = document.querySelector('#native-language-section');
  const nlCounters = nativeSection.querySelectorAll('.nl-counter');
  const nlLabels = nativeSection.querySelectorAll('.nl-label');

  function continuousCounter() {
    nlCounters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;

      const loop = () => {
        count = 0;
        const duration = 2000;
        const step = Math.ceil(target / (duration / 40));
        const interval = setInterval(() => {
          count += step;
          if (count >= target) {
            count = target;
            clearInterval(interval);
            setTimeout(loop, 1000);
          }
          counter.childNodes[0].textContent = count;
        }, 40);
      };

      loop();
    });
  }

  function continuousTextLoop() {
    nlLabels.forEach(label => {
      const phrases = label.getAttribute('data-phrases').split(',').map(p => p.trim());
      let i = 0;
      label.textContent = phrases[i];

      setInterval(() => {
        i = (i + 1) % phrases.length;
        label.classList.add('opacity-0');
        setTimeout(() => {
          label.textContent = phrases[i];
          label.classList.remove('opacity-0');
        }, 300);
      }, 3000);
    });
  }

  const nlObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        continuousCounter();
        continuousTextLoop();
        nlObserver.disconnect();
      }
    },
    { threshold: 0.5 }
  );
  nlObserver.observe(nativeSection);

 

  /* Code verification input auto-jump */
  const inputs = document.querySelectorAll(".code-input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      const value = input.value;
      if (value.length === 1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && input.value === "" && index > 0) {
        inputs[index - 1].focus();
      }
    });
  });
});

/*mobile-menu-toggle  */
  document.getElementById("mobile-menu-toggle").addEventListener("click", function () {
      const menu = document.getElementById("mobile-nav-menu");
      menu.classList.toggle("hidden");
    });
    /* mobile toogle menu */
    function toggleMobileMenu() {
      const menu = document.getElementById("mobile-menu");
      menu.classList.toggle("hidden");
    }

  window.addEventListener("DOMContentLoaded", () => {
 
  // 👇 Verification code input auto-jump
  const inputs = document.querySelectorAll(".code-input");

  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      const value = input.value;
      if (value.length === 1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && input.value === "" && index > 0) {
        inputs[index - 1].focus();
      }
    });
  });

  console.log("✅ Auto-input logic initialized.");
});

 

   /* payment details section */
  function showPayment(type) {
    const naira = document.getElementById('naira-section');
    const pounds = document.getElementById('pounds-section');

    const btnNaira = document.getElementById('btn-naira');
    const btnPounds = document.getElementById('btn-pounds');

    if (type === 'naira') {
      naira.classList.remove('hidden');
      pounds.classList.add('hidden');

      // Active: Naira
      btnNaira.classList.add('bg-mycolor', 'text-white');
      btnNaira.classList.remove('bg-gray-200', 'text-black');

      // Inactive: Pounds
      btnPounds.classList.remove('bg-mycolor', 'text-white');
      btnPounds.classList.add('bg-gray-200', 'text-black');
    } else {
      pounds.classList.remove('hidden');
      naira.classList.add('hidden');

      // Active: Pounds
      btnPounds.classList.add('bg-mycolor', 'text-white');
      btnPounds.classList.remove('bg-gray-200', 'text-black');

      // Inactive: Naira
      btnNaira.classList.remove('bg-mycolor', 'text-white');
      btnNaira.classList.add('bg-gray-200', 'text-black');
    }
  }



   // 👇 Expand first FAQ if it's on the page (won't break if it's missing)
  const firstButton = document.querySelector("#faq-accordion button");
  if (firstButton) firstButton.click();


