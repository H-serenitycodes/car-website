/* ==========================================================================
   CAR DATA STORE (Comprehensive specification dataset)
   ========================================================================== */
const carDetailsData = {
    lexus: {
        title: "Lexus LX 570",
        subtitle: "5.7L V8 Natural Aspiration • Luxury Flagship SUV",
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80",
        tag: "FLAGSHIP SUV",
        specs: [
            { name: "Engine", value: "5.7-Liter V8 DOHC 32-Valve" },
            { name: "Horsepower", value: "383 HP @ 5,600 RPM" },
            { name: "Torque", value: "403 lb-ft @ 3,600 RPM" },
            { name: "Transmission", value: "8-Speed Sequential Shift Automatic" },
            { name: "Drivetrain", value: "Full-Time 4WD with Torsen LSD" },
            { name: "Towing Capacity", value: "7,000 lbs" },
            { name: "Interior Trim", value: "Semi-Aniline Leather & Open-Pore Walnut" }
        ]
    },
    alpina: {
        title: "BMW Alpina B7",
        subtitle: "4.4L Bi-Turbo V8 • High Performance Executive Sedan",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80",
        tag: "PERFORMANCE SEDAN",
        specs: [
            { name: "Engine", value: "4.4L ALPINA Bi-Turbo V8" },
            { name: "Horsepower", value: "600 HP @ 6,000 RPM" },
            { name: "Torque", value: "590 lb-ft @ 2,000 RPM" },
            { name: "Acceleration", value: "0 - 60 mph in 3.5 seconds" },
            { name: "Top Speed", value: "205 mph" },
            { name: "Transmission", value: "Switch-Tronic 8-Speed Sport Auto" },
            { name: "Audio System", value: "Bowers & Wilkins Diamond Surround" }
        ]
    },
    rangerover: {
        title: "Range Rover Sport",
        subtitle: "3.0L Turbocharged I6 • Dynamic All-Terrain Luxury SUV",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=80",
        tag: "ALL-TERRAIN LUXURY",
        specs: [
            { name: "Engine", value: "3.0L Turbocharged Inline 6 MHEV" },
            { name: "Horsepower", value: "395 HP @ 6,200 RPM" },
            { name: "Terrain System", value: "Terrain Response 2 with Dynamic Program" },
            { name: "Wading Depth", value: "35.4 inches" },
            { name: "Suspension", value: "Dynamic Air Suspension with Active Roll" },
            { name: "Display", value: "13.1-inch Curved Touchscreen Pivi Pro" }
        ]
    },
    porsche: {
        title: "Porsche Cayenne Turbo GT",
        subtitle: "4.0L Twin-Turbo V8 • Ultimate Performance SUV",
        image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=80",
        tag: "SUPER SUV",
        specs: [
            { name: "Engine", value: "4.0-Liter Twin-Turbo V8" },
            { name: "Horsepower", value: "650 HP @ 6,000 RPM" },
            { name: "Torque", value: "626 lb-ft @ 2,300 RPM" },
            { name: "Acceleration", value: "0 - 60 mph in 3.1 seconds" },
            { name: "Exhaust System", value: "Lightweight Titanium Sports Exhaust" },
            { name: "Brakes", value: "Porsche Ceramic Composite Brakes (PCCB)" }
        ]
    }
};

/* ==========================================================================
   DOM INITIALIZATION & EVENT LISTENERS
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    
    // Elements Setup
    const mobileToggle = document.getElementById("mobileToggle");
    const navLinks = document.getElementById("navLinks");
    const specModal = document.getElementById("specModal");
    const modalClose = document.getElementById("modalClose");
    const modalOverlay = document.getElementById("modalOverlay");
    const testDriveForm = document.getElementById("testDriveForm");
    const carSelect = document.getElementById("carSelect");
    const formSuccess = document.getElementById("formSuccess");

    /* ----------------------------------------------------------------------
       1. Mobile Menu Navigation Toggle
       ---------------------------------------------------------------------- */
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            
            // Toggle menu icon between bars and close X
            const icon = mobileToggle.querySelector("i");
            if (navLinks.classList.contains("active")) {
                icon.className = "fa-solid fa-xmark";
            } else {
                icon.className = "fa-solid fa-bars";
            }
        });

        // Auto close menu when clicking link on mobile
        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                const icon = mobileToggle.querySelector("i");
                if (icon) icon.className = "fa-solid fa-bars";
            });
        });
    }

    /* ----------------------------------------------------------------------
       2. Full Specifications Modal Functionality
       ---------------------------------------------------------------------- */
    const openModalButtons = document.querySelectorAll(".open-spec-modal");

    openModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const carId = button.getAttribute("data-car-id");
            const data = carDetailsData[carId];

            if (data) {
                // Populate Modal Elements
                document.getElementById("modalTitle").innerText = data.title;
                document.getElementById("modalSubtitle").innerText = data.subtitle;
                document.getElementById("modalTag").innerText = data.tag;
                document.getElementById("modalImg").src = data.image;

                // Render Specifications List
                const specsContainer = document.getElementById("modalSpecsContainer");
                specsContainer.innerHTML = "";

                data.specs.forEach(spec => {
                    const li = document.createElement("li");
                    li.innerHTML = `<strong>${spec.name}</strong> <span>${spec.value}</span>`;
                    specsContainer.appendChild(li);
                });

                // Attach Model Name to Modal Test Drive Button
                const modalBookBtn = document.getElementById("modalBookBtn");
                modalBookBtn.onclick = () => {
                    closeModal();
                    if (carSelect) carSelect.value = data.title;
                };

                // Show Modal
                specModal.classList.add("active");
            }
        });
    });

    // Close Modal Handler
    const closeModal = () => {
        if (specModal) specModal.classList.remove("active");
    };

    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modalOverlay) modalOverlay.addEventListener("click", closeModal);

    /* ----------------------------------------------------------------------
       3. Quick Test Drive Button Pre-selection
       ---------------------------------------------------------------------- */
    const selectDriveButtons = document.querySelectorAll(".select-test-drive");

    selectDriveButtons.forEach(button => {
        button.addEventListener("click", () => {
            const carName = button.getAttribute("data-car-name");
            if (carSelect && carName) {
                carSelect.value = carName;
            }
        });
    });

    /* ----------------------------------------------------------------------
       4. Form Submission Handling
       ---------------------------------------------------------------------- */
    if (testDriveForm) {
        testDriveForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent standard page reload

            // Hide form and display sleek success confirmation message
            testDriveForm.classList.add("hidden");
            if (formSuccess) formSuccess.classList.remove("hidden");
        });
    }
});