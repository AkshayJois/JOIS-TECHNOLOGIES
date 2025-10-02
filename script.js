// GSAP Animations

// Fade-in animation for logo
gsap.to(".logo-left", {
    opacity: 1,
    duration: 1.5,
    delay: 0.5,
    ease: "power2.out",
});

gsap.to(".logo-left", {
    y: -2, // Move up
    duration: 1.5,
    repeat: -1, // Infinite loop
    yoyo: true, // Go back and forth
    ease: "power1.inOut",
});

// Heartbeat animation for "Coming Soon" text
gsap.to(".coming-soon", {
    y: -10, // Move up
    duration: 0.5,
    repeat: -1, // Infinite loop
    yoyo: true, // Go back and forth
    ease: "power1.inOut",
});

// Hovering effect for "Coming Soon" text
gsap.to(".coming-soon", {
    y: -10, // Move up
    duration: 2,
    repeat: -1, // Infinite loop
    yoyo: true, // Go back and forth
    ease: "sine.inOut",
});

// Hovering effect for download button
gsap.to("#downloadBtn", {
    y: -5, // Move up
    duration: 2,
    repeat: -1, // Infinite loop
    yoyo: true, // Go back and forth
    ease: "sine.inOut",
});

// Fade-in animation for footer (reduced delay)
gsap.to(".footer", {
    opacity: 1,
    duration: 0.75,
    delay: 1, // Reduced delay
    ease: "power2.out",
});

// Typing effect for contact info
const phoneText = "+91 8748838850";
const emailText = "joistechnologies@gmail.com";
const addressText = "Urgaduru, Shivamogga- 577203";

function typeText(element, text, delay) {
    let index = 0;
    const interval = setInterval(() => {
        element.textContent += text[index];
        index++;
        if (index === text.length) clearInterval(interval);
    }, delay);
}

typeText(document.querySelector(".phone-text"), phoneText, 100);
typeText(document.querySelector(".email-text"), emailText, 100);
typeText(document.querySelector(".address-text"), addressText, 100);

// GSAP loading animation for download button
const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", function () {
    // Disable button to prevent multiple clicks
    downloadBtn.classList.add("disabled");

    // GSAP animation for loading effect
    gsap.to(downloadBtn, {
        background: `linear-gradient(
            135deg,
            #019ef5 0%,
            #6ec3dc 25%,
            #12294b 50%,
            #6ec3dc 75%,
            #019ef5 100%
        )`,
        backgroundPosition: "200% 0", // Move gradient to create loading effect
        duration: 2,
        ease: "power1.inOut",
        repeat: 1, // Repeat once for a smooth loop
        yoyo: true, // Reverse the animation
        onComplete: () => {
            // Trigger download after animation completes
            const brochureUrl = "assets/JT Brochure.pdf"; // Updated file path

            // Create a temporary anchor element
            const link = document.createElement("a");
            link.href = brochureUrl;
            link.download = "JT Brochure.pdf";

            // Append to the body (required for Firefox)
            document.body.appendChild(link);

            // Trigger the download
            link.click();

            // Clean up and remove the link
            document.body.removeChild(link);

            // Reset button
            downloadBtn.classList.remove("disabled");
            gsap.to(downloadBtn, {
                background: `linear-gradient(135deg, #019ef5 0%, #6ec3dc 100%)`,
                backgroundPosition: "0 0",
                duration: 0.5,
            });
        },
    });
});

const firebaseConfig = {
  apiKey: "AIzaSyDRdI2xV8vli0vRUDsYbGc73J_RTPFvJss",
  authDomain: "joistechnologies-71f4b.firebaseapp.com",
  databaseURL: "https://joistechnologies-71f4b-default-rtdb.firebaseio.com",
  projectId: "joistechnologies-71f4b",
  storageBucket: "joistechnologies-71f4b.firebasestorage.app",
  messagingSenderId: "800694286983",
  appId: "1:800694286983:web:5c282481c787026bfe9622",
  measurementId: "G-9L16N0FPLS"
};
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

async function logVisit() {
try {
    // Get visitor IP from external service
    const ipResponse = await fetch("https://api64.ipify.org?format=json");
    const ipData = await ipResponse.json();
    const ip = ipData.ip;

    // Save to Firebase
    const visitRef = db.ref("visits/logs").push();
    await visitRef.set({
    ip: ip,
    timestamp: Date.now()
    });

    // Increment total count
const countRef = db.ref("visits/count");
countRef.transaction((current) => {
  if (current === null) {
    return 1;   // first visit → start count
  }
  return current + 1;
});
} catch (err) {
  console.error("Failed to log visit", err);
}
}
logVisit();
