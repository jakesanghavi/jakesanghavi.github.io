$(document).ready(function(){
    const sections = document.querySelectorAll("section");
    let scrollY = window.pageYOffset;

    function navHighlighter() {
    
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 50;
            sectionId = current.getAttribute("id");
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector("#navbar a[href*=" + sectionId + "]").classList.add("active");
            } else {
                document.querySelector("#navbar a[href*=" + sectionId + "]").classList.remove("active");
            }
        });
    }

    navHighlighter();
    window.addEventListener("scroll", navHighlighter);
});