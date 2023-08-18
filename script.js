document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");

    function debounce(func, wait = 10, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    function checkSlide() {
        sections.forEach(section => {
            const slideInAt = (window.scrollY + window.innerHeight) - section.clientHeight / 2;
            const sectionBottom = section.offsetTop + section.clientHeight;
            const isHalfShown = slideInAt > section.offsetTop;
            const isNotScrolledPast = window.scrollY < sectionBottom;

            if (isHalfShown && isNotScrolledPast) {
                section.classList.add("active");
            } else {
                section.classList.remove("active");
            }
        });
    }

    window.addEventListener("scroll", debounce(checkSlide));
});
