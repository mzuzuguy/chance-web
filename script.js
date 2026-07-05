document.addEventListener("DOMContentLoaded", () => {

    // --- Dynamic JSON Data Engine ---
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            initProfile(data.profile);
            initStats(data.stats);
            initSkills(data.skills);
            initExperience(data.experience);
            initProjects(data.projects);
        })
        .catch(error => console.error("Error loading JSON data registry:", error));

    function initProfile(profile) {
        document.getElementById("statusHeader").textContent = profile.status;
        document.getElementById("id").textContent = profile.id;
        document.getElementById("name").textContent = profile.name;
        document.getElementById("socialSync").textContent = profile.socialSync;
        document.getElementById("interaction").textContent = profile.interaction;
        document.getElementById("emotion").textContent = profile.emotion;
        document.getElementById("rank").textContent = profile.rank;
        document.getElementById("profession").textContent = profile.profession;
    }

    function initStats(stats) {
        const container = document.getElementById("stats-container");
        container.innerHTML = stats.map(stat => `
            <div class="stat">
                <span class="label">${stat.label}</span>
                <span class="value">${stat.value}</span>
            </div>
        `).join('');
    }

    function initSkills(skills) {
        const container = document.getElementById("skills-container");
        container.innerHTML = skills.map(group => `
            <div class="skill-card">
                <h3><i class="${group.icon} card-icon"></i> ${group.category}</h3>
                <div class="skill-items">
                    ${group.items.map(item => `
                        <div class="skill-line">
                            <span>${item.name}</span>
                            <span class="status-tag">${item.tag}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    function initExperience(experience) {
        const container = document.getElementById("experience-container");
        if (!experience || experience.length === 0) {
            container.innerHTML = `
                <div class="experience-card">
                    <div class="experience-desc">// NO_RECORDS_FOUND</div>
                </div>
            `;
            return;
        }
        container.innerHTML = experience.map(job => `
            <div class="experience-card">
                <div class="experience-head">
                    <div>
                        <h3>${job.role}</h3>
                        <span class="experience-company">${job.company}</span>
                    </div>
                    <div class="experience-meta">
                        <span class="experience-duration">${job.duration}</span>
                        <span class="status-tag">${job.status}</span>
                    </div>
                </div>
                <p class="experience-desc">${job.description}</p>
            </div>
        `).join('');
    }

    function initProjects(projects) {
        const container = document.getElementById("projects-container");
        const wrapper = document.querySelector(".projects-wrapper");

        if (!projects || projects.length === 0) {
            // Render the frosted development glass layout if log is empty
            wrapper.innerHTML = `
                <div class="development-overlay">
                    <h3 class="dev-title">// LOGS_EMPTY: COMING SOON</h3>
                    <p class="dev-subtitle">ACTIVE_DEVELOPMENT_IN_PROGRESS // REPOSITORIES_LOCKED</p>
                </div>
            `;
        } else {
            // Clean up overlay structure if real active entries are inside json
            const existingOverlay = wrapper.querySelector(".development-overlay");
            if (existingOverlay) existingOverlay.remove();

            container.innerHTML = projects.map(proj => `
                <div class="project-card">
                    <h3><i class="fas fa-folder-open card-icon"></i> ${proj.title}</h3>
                    <p style="font-size:13px; color:#d0d5dc; line-height:1.6;">${proj.description}</p>
                    <div style="margin-top:15px; font-family:'Chivo Mono'; font-size:11px; color:#00bcff;">
                        STACK: ${proj.techStack}
                    </div>
                </div>
            `).join('');
        }
    }

    // --- Clock Logic ---
    function updateClock() {
        const now = new Date();
        const timeString = now.toTimeString().split(' ')[0];
        const topClock = document.getElementById("time");
        const bottomClock = document.getElementById("time-bottom");
        if(topClock) topClock.textContent = `TIME: ${timeString}`;
        if(bottomClock) bottomClock.textContent = `TIME: ${timeString}`;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // --- Active Link Viewport Observer ---
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-item");

    window.addEventListener("scroll", () => {
        let currentSectionId = "home";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                currentSectionId = section.getAttribute("id");
            }
        });
        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${currentSectionId}`) {
                item.classList.add("active");
            }
        });
    });

    // --- Dynamic Background Canvas Simulation ---
    const canvas = document.getElementById("background");
    const ctx = canvas.getContext("2d");
    let width, height, cols, rows;
    const separation = 40; 
    let count = 0;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        cols = Math.ceil(width / separation) + 2;
        rows = Math.ceil(height / separation) + 2;
    }
    window.addEventListener("resize", resize);
    resize();

    function drawWaveMatrix() {
        ctx.clearRect(0, 0, width, height);
        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                const px = x * separation - 20;
                const py = y * separation - 20;
                const wave = Math.sin((x + count) * 0.35) * 14 + Math.cos((y + count) * 0.4) * 14;
                ctx.beginPath();
                ctx.arc(px, py + wave, 1.5, 0, Math.PI * 2);
                const opacity = Math.abs(Math.sin((x + y + count) * 0.15)) * 0.45 + 0.15;
                ctx.fillStyle = `rgba(0, 188, 255, ${opacity})`;
                ctx.fill();
            }
        }
        count += 0.035;
        requestAnimationFrame(drawWaveMatrix);
    }
    drawWaveMatrix();
});