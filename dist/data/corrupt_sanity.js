export function ritualCorruption(target, onComplete) {
    target.classList.add("ritual-mode");
    const fragments = [
        "The veil thins",
        "Echoes coil beneath your skin",
        "The sigil burns behind your eyes",
        "You speak, but the voice is not yours",
        "The parchment twists in your hands",
        "The parchment bleeds.",
        "The ink remembers.",
        "You are written into the wrong story.",
        "The candle casts no shadow.",
        "The name unravels.",
        "The ritual completes itself.",
        "You are the offering.",
        "The silence chants.",
        "The mirror forgets your shape.",
        "The stars blink in hunger.",
        "The floor hums with memory.",
        "You are not alone in your bones.",
        "The breath you take is borrowed.",
        "The symbols crawl.",
        "The paper folds itself.",
        "You dream in static.",
        "The room tilts.",
        "The ink speaks.",
        "The sigil pulses.",
        "The air thickens.",
        "The name fractures.",
        "The candle weeps.",
        "The seal cracks.",
        "The voice returns.",
        "The page turns itself.",
        "The glyphs rearrange.",
        "The echo deepens.",
        "The vessel empties.",
        "The eye opens.",
        "The eye closes.",
        "The eye watches.",
        "The eye forgets.",
        "The eye remembers.",
        "The eye is not yours.",
        "The eye is not alone.",
        "The eye is not closed.",
        "The eye is not open.",
        "The eye is not watching.",
        "The eye is not blinking.",
        "The eye is not dreaming.",
        "The eye is not sleeping.",
        "The eye is not speaking.",
        "The eye is not silent.",
        "The eye is not sane.",
        "The eye is not real."
    ];
    const startSlowDelay = 1000;
    const slowDelay = 600;
    const overlayDelay = 300;
    const fadeDelay = 3000;
    const firstFifth = Math.floor(fragments.length / 5);
    const halfway = Math.floor(fragments.length / 2);
    let i = 0;
    target.textContent = "";
    target.classList.add("corrupted");
    target.style.opacity = "1";
    const overlayContainer = document.getElementById("ritualOverlayContainer");
    if (overlayContainer)
        overlayContainer.innerHTML = "";
    function corrupt() {
        if (i < firstFifth) {
            target.textContent += fragments[i] + "\n";
            target.scrollTop = target.scrollHeight;
            i++;
            setTimeout(corrupt, startSlowDelay); // slowest phase
        }
        else if (i < halfway) {
            target.textContent += fragments[i] + "\n";
            target.scrollTop = target.scrollHeight;
            i++;
            setTimeout(corrupt, slowDelay); // medium phase
        }
        else if (i === halfway) {
            target.style.transition = "opacity 2s ease";
            target.style.opacity = "0";
            setTimeout(() => {
                target.textContent = "";
                target.style.opacity = "1";
                i++; // ← advance to next fragment
                corrupt(); // continue with overlay phase
            }, 2000);
        }
        else if (i < fragments.length) {
            overlayFragment(fragments[i]);
            i++;
            setTimeout(corrupt, overlayDelay); // fast overlay phase
        }
        else {
            setTimeout(() => {
                target.style.opacity = "0";
                target.classList.remove("corrupted");
                const overlayContainer = document.getElementById("ritualOverlayContainer");
                if (overlayContainer) {
                    const overlays = overlayContainer.querySelectorAll(".ritualFragment");
                    overlays.forEach(el => {
                        el.style.opacity = "0";
                    });
                    setTimeout(() => {
                        overlayContainer.innerHTML = "";
                        if (onComplete)
                            onComplete(); // ← trigger re-render
                    }, 2000);
                }
            }, fadeDelay);
        }
    }
    function overlayFragment(text) {
        const container = document.getElementById("ritualOverlayContainer");
        if (!container)
            return;
        const div = document.createElement("div");
        div.className = "ritualFragment";
        div.textContent = text;
        // Fully randomized positions, clamped to avoid clipping
        const top = Math.random() * 70 + 10; // 10%–80% vertical
        const left = Math.random() * 40 + 10; // 10%–50% horizontal
        div.style.top = `${top}%`;
        div.style.left = `${left}%`;
        container.appendChild(div);
    }
    corrupt();
}
