console.log("JS is connected");
document.addEventListener("DOMContentLoaded", () => {

    const profile = {
        name: "Chance Musole",
        rank: "Best",
        profession: "CYBER SECURITY",
        id: "P-2204-02",
        status: "OFFLINE ACTIVITY DETECTED",
        socialSync: "43%",
        interaction: "RARE",
        emotion: "CONTROLLED"
    };

    // Inject matching string variables cleanly into containers
    document.getElementById("statusHeader").textContent = profile.status;
    document.getElementById("id").textContent = profile.id;
    document.getElementById("name").textContent = profile.name;
    document.getElementById("socialSync").textContent = profile.socialSync;
    document.getElementById("interaction").textContent = profile.interaction;
    document.getElementById("emotion").textContent = profile.emotion;
    document.getElementById("rank").textContent = profile.rank;
    document.getElementById("profession").textContent = profile.profession;

    // Running Dynamic Live Clock Synchronization Loop
    function updateClock() {
        const now = new Date();
        const timeString = now.toTimeString().split(' ')[0];
        
        // Output text exactly to both target elements
        document.getElementById("time").textContent = `TIME: ${timeString}`;
        document.getElementById("time-bottom").textContent = `TIME: ${timeString}`;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // --- Dynamic Vector Wave Canvas Simulation ---
    const canvas = document.getElementById("background");
    const ctx = canvas.getContext("2d");

    let width, height;
    const separation = 40; 
    let cols, rows;
    let count = 0;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        
        // Dynamically calculate grid limits based on screen size
        cols = Math.ceil(width / separation) + 2;
        rows = Math.ceil(height / separation) + 2;
    }

    window.addEventListener("resize", resize);
    resize();

    function drawWaveMatrix() {
        ctx.clearRect(0, 0, width, height);

        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                // Pin coordinates cleanly across viewport paths
                const px = x * separation - 20;
                const py = y * separation - 20;

                // Mathematical matrix modulation mapping
                const wave = Math.sin((x + count) * 0.35) * 14 + 
                             Math.cos((y + count) * 0.4) * 14;

                ctx.beginPath();
                ctx.arc(px, py + wave, 1.5, 0, Math.PI * 2);

                // Fluid transparency calculations using signature Cyber Blue (#00bcff)
                const opacity = Math.abs(Math.sin((x + y + count) * 0.15)) * 0.45 + 0.15;
                ctx.fillStyle = `rgba(0, 188, 255, ${opacity})`;
                ctx.fill();
            }
        }

        count += 0.035; // Controlled tempo adjustment loop
        requestAnimationFrame(drawWaveMatrix);
    }

    // Initialize animation execution framework
    drawWaveMatrix();
});