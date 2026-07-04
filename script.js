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

    // Parallax Scroll Offset Tracker for the Background Image
    const bgImage = document.getElementById("bgImage");
    window.addEventListener("scroll", () => {
        let scrollTop = window.scrollY;
        // Offsets image positioning cleanly down without breaking content margins
        bgImage.style.transform = `translateY(${scrollTop * 0.18}px)`;
    });

});