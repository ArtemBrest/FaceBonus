window.addEventListener("load", function (){
    function throttle(func, ms) {
        let is_throttled = false,
            saved_args,
            saved_this;
        function wrapper() {
            if (is_throttled) {
                saved_args = arguments;
                saved_this = this;
                return;
            }
            func.apply(this, arguments);
            is_throttled = true;
            setTimeout(function() {
                is_throttled = false;
                if (saved_args) {
                    wrapper.apply(saved_this, saved_args);
                    saved_args = saved_this = null;
                }
            }, ms);
        }
        return wrapper;
    }
    function debounce(func, ms) {
        let timer;
        return function wrapper() {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(() => {
                func();
            }, ms);
        };
    }
    function ga(path) {
        //console.log('send to google');
        window.ga && window.ga('send', 'pageview', path);
    }
    const getByClassName = (className, index = 0) => {
        return document.getElementsByClassName(className)[index]
    };
    const getElementsByClassName = (className) => {
        return Array.from(document.getElementsByClassName(className))
    };
    let contents = [];
    let common_link = "";
    let base_link = "";
    let common_title = "";
    const getSectionInViewportKey = (nodes) => {
        const top_blocks_height = 50;
        let next_section_in_view_port = null;
        let min_section_top_from_viewport = 20; // null
        nodes.forEach((section) => {
            if (!section) return;
            const rect = section.getBoundingClientRect();
            if (rect.bottom - top_blocks_height < 5) return;
            if (rect.top < min_section_top_from_viewport) {
                min_section_top_from_viewport = rect.top;
                next_section_in_view_port = section.getAttribute("data-attr_key_menu");
            }
        });
        return next_section_in_view_port;
    }
    let active_section = "";
    const scrollContent = debounce(() => {
        const section =  getSectionInViewportKey(contents);
        let link = `${common_link}/`;
        if(common_link == "/"){
            link = "";
        }
        if (section) {
            link += `${section}/`
        }
        if (!section && base_link) {
            link = `${base_link}/`;
        }
        if (active_section !== link) {
            const full_url = `/${link}`;
            window.history.pushState(common_link, common_title, full_url);
            if (active_section !== '') {
                ga(full_url)
            }
            active_section = link
        }
    }, 200);
    const classChangeOnScroll = () => {
        document.querySelectorAll("[data-scroll_id]").forEach((el) => {
            let top = el.offsetTop - 100;
            let bottom = top + el.offsetHeight;
            let scroll = window.scrollY;
            let id = el.getAttribute("data-scroll_id");

            if (scroll > top && scroll < bottom) {
                /*document.querySelectorAll(".navigation__item_active.navigation__item").forEach((button) => {
                    button.classList.remove("navigation__item_active");
                });
                if(id.length > 1) {
                    document.querySelectorAll(`[data-id=${id}]`).forEach((button) => {
                        if (button.classList.contains("navigation__item")) {
                            button.classList.add("navigation__item_active");
                        }
                    });
                }*/
                document.querySelectorAll(".review-nav__item--active.review-nav__item").forEach((button) => {
                    button.classList.remove("review-nav__item--active");
                });
                if(id.length > 1){
                    document.querySelectorAll(`[data-id=${id}]`).forEach((button) => {
                        if (button.classList.contains("review-nav__item")) {
                            button.classList.add("review-nav__item--active");
                        }
                    });
                }
            }
        });
    };
    const scrollIntoViewWithMargin = (node, margin) => {
        const { top } = node.getBoundingClientRect();
        window.scrollTo({ top: top + window.scrollY + margin, behavior: "smooth" });
    };
    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const initScrollButtons = () => {
        const scroll_buttons = document.querySelectorAll("[data-id]");
        //const allSelectCommon = document.querySelectorAll(".navigation__item");
        if (!scroll_buttons) return;
        scroll_buttons.forEach((button) => {
            button.addEventListener("click", () => {
                window.removeEventListener("scroll", classChangeOnScroll);
                /*document.querySelectorAll(".navigation__item").forEach((select) => {
                    select.classList.remove("navigation__item_active");
                });*/
                document.querySelectorAll(".review-nav__item").forEach((select) => {
                    select.classList.remove("review-nav__item--active");
                });
                const id = button.getAttribute("data-id");
                const target = document.querySelector(`[data-scroll_id=${id}]`);
                document.querySelectorAll(`[data-id=${id}]`).forEach((button) => {
                    /*if (button.classList.contains("navigation__item")) {
                        button.classList.add("navigation__item_active");
                    }*/
                    if (button.classList.contains("review-nav__item")) {
                        button.classList.add("review-nav__item--active");
                    }
                });
                if (!target) return;
                scrollIntoViewWithMargin(target, -16);
                setTimeout(() => {
                    window.addEventListener("scroll", classChangeOnScroll);
                }, 1000);
            });
        });
        window.addEventListener("scroll", classChangeOnScroll);
    };
    contents = getElementsByClassName('content-focus');
    let data_block = getByClassName("content_for_menu_scroll");
    if(!data_block){
        return;
    }
    common_link = data_block.getAttribute('data-link');
    base_link = data_block.getAttribute('data-base-link');
    common_title = data_block.getAttribute('data-title');
    initScrollButtons()
    document.addEventListener("scroll", scrollContent);
    const getHash = (p) => {
        let pathname = "/" + common_link;
        let id = p.replace(pathname, "")
        id = id.replaceAll("/", "");
        if(document.getElementById(id) !== null){
            anchorLinks('#' + id);
        }

    }
    getHash(window.location.pathname);
})