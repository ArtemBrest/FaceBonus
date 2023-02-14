const toggleWrapper = (toggleContainer) => {
    toggleContainer.forEach((container) => {
        const toggleText = container.querySelector('.toggle-text');
        const btn = container.querySelector('.toggle-button');
        const btnIcon = "<svg>\n" +
            "<use xlink:href=\"./img/sprites.svg#plus\"></use>\n" +
            "</svg>"
        let toggleTextChild;
        if (toggleText.querySelector(".cms-description-text") !== null) {
            toggleTextChild = toggleText.querySelector(".cms-description-text").querySelectorAll("*");
        }
        let heighEl = 0;
        for (let i = 0; i < toggleTextChild.length; i++) {
            if (toggleTextChild[i].tagName === 'P') {
                toggleTextChild[i].style.display = "-webkit-box";
                toggleTextChild[i].style.webkitBoxOrient = "vertical";
                toggleTextChild[i].style.overflow = "hidden";
                toggleTextChild[i].style.webkitLineClamp = "4";
                heighEl += toggleTextChild[i].offsetHeight;
                break
            } else if (toggleTextChild[i].tagName === 'IMG') {
                heighEl += toggleTextChild[i].offsetHeight + 10;
                //continue;
            } else if (toggleTextChild[i].tagName === 'B') {
                continue;
            } else {
                heighEl += toggleTextChild[i].offsetHeight;
            }
        }
        heighEl = heighEl + 10;
        /*heighEl = (Math.ceil(heighEl/10)*10) + 10;*/
        toggleText.style.maxHeight = heighEl + "px";
        container.addEventListener('click', function(e) {
            if (e.target.classList.contains('toggle-button') || e.target.closest('.toggle-button')) {
                if (container.classList.contains('toggle-text-container--active')) {
                    btn.innerHTML = btnIcon + "Load More";
                    container.classList.remove('toggle-text-container--active');
                } else {
                    btn.innerHTML = btnIcon + "Hide";
                    container.classList.add('toggle-text-container--active');
                }
            }
        })
    })
}

const changeTab = (e) => {
    const parent = e.target.closest('.tabs-block');
    parent.querySelectorAll('.tab-item').forEach(tab => tab.classList.remove('tab-item--active'));
    e.target.classList.add('tab-item--active');
    parent.querySelectorAll('.tab-wrap').forEach(tab => tab.classList.remove('tab-wrap--active'));

    if (e.target.hasAttribute('data-id')) {
        const id = e.target.getAttribute('data-id');
        document.querySelector(`.tab-wrap[data-id="${id}"]`).classList.add('tab-wrap--active');
    }
}

const toggleWrap = (e) => {
    const id = e.getAttribute('data-id');
    e.classList.toggle('active');
    document.querySelector(`.toggle-wrap[data-id=${id}]`).classList.toggle('active');
}

const toggleMenu = (e) => {
    document.body.classList.toggle('fix');
    const wrap = document.querySelector('.mobile-wrap');
    wrap.classList.toggle('mobile-wrap--active');
}

window.addEventListener("load", function(e) {
    const toggleContainer = this.document.querySelectorAll('.toggle-text-container');
    if (toggleContainer) toggleWrapper(toggleContainer)
    this.document.addEventListener('click', function(e) {
        if (e.target.closest('.js-toggle')) toggleWrap(e.target.closest('.js-toggle'));
        if (e.target.closest('.mobile-menu') || e.target.closest('.close-menu') || e.target.closest(".bg-wrapper")) toggleMenu(e);
        if (e.target.closest('.tab-item')) changeTab(e);
    })
})