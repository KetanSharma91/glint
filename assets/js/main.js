console.log('js launched')

//toggle icon navbar
let menuIcon = document.querySelector('.header-menu');
let navbar = document.querySelector('.header-nav');
let crossIcon = document.querySelector('.header-close');
let navcontent = document.querySelector('.header-nav-content');

menuIcon.onclick = () => {
  navbar.classList.toggle('show');
  navcontent.classList.toggle('show');
};

crossIcon.onclick = () => {
  navbar.classList.remove('show');
  navcontent.classList.remove('show');
};

const navLinks = document.querySelectorAll('.header-nav li'); // Select all li elements

navLinks.forEach(link => {
    link.addEventListener('click', function() {
      setTimeout(() => {
        navbar.classList.remove('show'); 
        navcontent.classList.remove('show');
    }, 500);
    });
});

// image full screen 
document.addEventListener('DOMContentLoaded', function () {
  Fancybox.bind("[data-fancybox='gallery']", {
    Toolbar: {
      display: [
        "close"
      ]
    },
    on: {
      ready: (fancybox) => {
        console.log('Fancybox initialized');
      },
      done: (fancybox, slide) => {
        console.log('Image displayed');
      }
    }
  });
});

// anmiation 
// Select all sections with the 'animate-on-scroll' class
const sections = document.querySelectorAll('.fadeamin');

// Set up the Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add 'active' class when the section is in view to trigger the animation
      entry.target.classList.add('start');
      // Optional: Unobserve the entry if you want the animation to run only once
      observer.unobserve(entry.target);
    }
  });
});

// Observe each section smoth scroll
sections.forEach(section => {
  observer.observe(section);
});

function smoothScroll(target) {
  document.querySelector(target).scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

//go-top opacity
const box = document.querySelector('.go-top');
const homeSection = document.getElementById('home');

const observerhome = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // If the section is the home section, hide the box
      if (entry.target.id === 'home') {
        box.style.opacity = '0'; // Hide the box
      } else {
        box.style.opacity = '1'; // Show the box in other sections
      }
    }
  });
}, { threshold: 0.1 }); // Adjust threshold as needed

// Observe each section
const sectionshome = document.querySelectorAll('section');
sectionshome.forEach(section => {
  observerhome.observe(section);
});


//user showcase
const users = document.querySelectorAll('.user');

document.querySelector('.client-next').addEventListener('click', () => {
  // Find the current user element with the 'now' class
  const currentUser = document.querySelector('.user.now');
  const nextUser = currentUser.nextElementSibling || users[0]; // Get the next user, loop back if at the end

  // Remove 'now' from current and add exit animation
  currentUser.classList.remove('now');
  currentUser.classList.add('slide-out-left');

  // Add entry animation to the next user
  nextUser.classList.add('slide-in-right');

  // After animation duration, update the classes
  setTimeout(() => {
    nextUser.classList.remove('slide-in-right');
    nextUser.classList.add('now');
    currentUser.classList.remove('slide-out-left');
  }, 500); // Duration should match CSS transition time
});

document.querySelector('.client-pre').addEventListener('click', () => {
  // Find the current user element with the 'now' class
  const currentUser = document.querySelector('.user.now');
  const prevUser = currentUser.previousElementSibling || users[users.length - 1]; // Get the previous user, loop back if at the beginning

  // Remove 'now' from current and add exit animation
  currentUser.classList.remove('now');
  currentUser.classList.add('slide-out-right');

  // Add entry animation to the previous user
  prevUser.classList.add('slide-in-left');

  // After animation duration, update the classes
  setTimeout(() => {
    prevUser.classList.remove('slide-in-left');
    prevUser.classList.add('now');
    currentUser.classList.remove('slide-out-right');
  }, 500); // Duration should match CSS transition time
});


//logo clients
const buttons = document.querySelectorAll('.clients-points button');
const logos = Array.from(document.querySelectorAll('.clients-rows a'));
const logoContainer = document.querySelector('.clients-rows');

const logosPerPage = 6; // Number of logos to show per group
let currentIndex = 0;   // To track the current set of logos shown
let totalLogos = logos.length;

// Function to show logos based on button clicked with animation
const showLogos = (pageIndex) => {
  currentIndex = (pageIndex - 1) * logosPerPage; // Calculate starting index

  // Hide all logos first
  logos.forEach(logo => logo.classList.remove('seen'));

  // Slide out current logos to the left
  logoContainer.classList.add('slide-left');

  setTimeout(() => {
    // Remove the sliding class and reset to original position
    logoContainer.classList.remove('slide-left');
    logoContainer.classList.add('slide-reset');

    // Calculate the range of logos to display
    const endIndex = Math.min(currentIndex + logosPerPage, totalLogos);

    // Show the new set of logos
    for (let i = currentIndex; i < endIndex; i++) {
      logos[i].classList.add('seen');
    }
  }, 500);
  // Reset the transition state after the logos are displayed
  setTimeout(() => {
    logoContainer.classList.remove('slide-reset');
  }, 500);
};

// Initialize by showing the first group of logos
showLogos(1);

// Event listener for buttons
buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    buttons.forEach(btn => btn.classList.remove('active'));

    // Add active class to the clicked button
    button.classList.add('active');

    // Show the corresponding logos based on button index
    showLogos(index + 1); // Index starts from 0, but we want groups 1-2
  });
});



//number in about us 
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stats-count");
  let hasAnimated = false; // Flag to prevent multiple animations

  const animateCounters = () => {
    const targetNumbers = Array.from(counters).map(counter => parseInt(counter.getAttribute("data-target")));
    const maxTarget = Math.max(...targetNumbers); // Get the highest target number
    const totalFrames = 100; // Total frames for the animation
    const increments = targetNumbers.map(target => target / totalFrames); // Calculate increments for each target

    let currentFrame = 0; // Frame counter

    const incrementCounter = () => {
      if (currentFrame <= totalFrames) {
        counters.forEach((counter, index) => {
          const newNumber = Math.round(currentFrame * increments[index]); // Calculate new number
          counter.textContent = newNumber; // Update the displayed number
        });
        currentFrame++; // Move to the next frame
        requestAnimationFrame(incrementCounter); // Call the function again for the next frame
      } else {
        // Ensure it ends on the target number
        counters.forEach((counter, index) => {
          counter.textContent = targetNumbers[index];
        });
      }
    };

    incrementCounter(); // Start the counting animation for all counters
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        animateCounters(); // Start animation when in view
        hasAnimated = true; // Set flag to true so it doesn't animate again
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  });

  const counterSection = document.querySelector(".about-stats");
  observer.observe(counterSection); // Observe the counter section
});

//loading screen 
window.onload = function () {
  // Simulate the loading process
  let loadingBar = document.querySelector('.loading-bar');
  let width = 0;

  // Function to simulate loading bar progress
  let progressInterval = setInterval(function () {
    if (width >= 100) {
      clearInterval(progressInterval);
      // Once loading is complete, hide the loading screen and show the main content
      document.querySelector('.loading-screen').style.display = 'none';
      document.querySelector('.loading-bar').style.display = 'none';
      document.querySelector('.main-content').style.display = 'block';
    } else {
      width += 10; // Increase loading bar by 10% each time
      loadingBar.style.width = width + '%';
    }
  }, 300); // Update every 300ms for smooth loading
};
