// ** FADE IN FUNCTION **
function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        let val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0.1) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function isEmptyObject(obj) {
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
}

DOMTokenList.prototype.containsMany = function (classes) {
    var items = classes.split(' ');
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (this.contains(item) == false) {
            return false;
        }
    }
    return true;
}

const anchorLinks = (e) => {
    e.preventDefault();
    const id = e.currentTarget.getAttribute('href');
    const point = document.querySelector(id)
    if (point) {
        point.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}
/*const bonusRedirect = (el) => {
    let link = el[0].dataset.external_link;
    if (link) {
        setTimeout(() => {
            window.location.href = link;
        }, 3000)
    }
};*/
const bonusRedirect = (el) => {
    const link = el.getAttribute("data-external_link");
    if (!link) return;

    const progressBar = el.querySelector("#review-bonus-line");
    const start = Date.now();
    let percentage = 0;

    const interval = setInterval(() => {
        percentage = ((Date.now() - start) / 3000) * 100;
        progressBar.style.width = `${percentage}%`;

        if (percentage >= 100) {
            clearInterval(interval);
            window.location.href = link;
        }
    }, 10);
};
window.addEventListener("load", function () {
    let header = document.getElementById("header");
    const body = document.body;
    const scrollUp = "scroll-up";
    const scrollDown = "scroll-down";
    let lastScroll = 0;
    let currentDirection;

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            body.classList.remove(scrollUp, scrollDown);
            header.classList.remove("active");
            return;
        }
        const direction = currentScroll > lastScroll ? scrollDown : scrollUp;
        if (direction !== currentDirection) {
            body.classList.remove(scrollUp, scrollDown);
            body.classList.add(direction);
            header.classList.add("active");
            currentDirection = direction;
        }
        lastScroll = currentScroll;
    });

    let FormLinks = document.querySelectorAll(".ui-tab-btn");
    let FormPanels = document.querySelectorAll(".ui-collapse");
    if (!isEmptyObject(FormPanels) && !isEmptyObject(FormLinks)) {
        for (let el of FormLinks) {
            el.addEventListener("click", e => {
                e.preventDefault();
                if (el.parentNode.parentNode.querySelector(".ui-tab-btn.ui-tab-btn--active")) {
                    el.parentNode.parentNode.querySelector(".ui-tab-btn.ui-tab-btn--active").classList.remove("ui-tab-btn--active");
                }
                if (el.parentNode.parentNode.querySelector(".ui-collapse.ui-collapse--open")) {
                    el.parentNode.parentNode.querySelector(".ui-collapse.ui-collapse--open").classList.remove("ui-collapse--open");
                }
                //const parentListItem = el.parentElement;
                el.classList.add("ui-tab-btn--active");
                var index = [...el.parentElement.children].indexOf(el);
                var panel = [...el.parentNode.parentNode.querySelectorAll(".ui-collapse")].filter(el => el.getAttribute("data-index") == index);
                panel[0].classList.add("ui-collapse--open");
            });
        }
    }


    // класс для создание таймера обратного отсчета
    class CountdownTimer {
        constructor(deadline, cbChange, cbComplete) {
            this._deadline = deadline;
            this._cbChange = cbChange;
            this._cbComplete = cbComplete;
            this._timerId = null;
            this._out = {
                minutes: '', seconds: '',
            };
            this._start();
        }

        _start() {
            this._calc();
            this._timerId = setInterval(this._calc.bind(this), 1000);
        }

        _calc() {
            const diff = this._deadline - new Date();
            const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
            const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
            const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
            this._out.hours = hours < 10 ? '0' + hours : hours;
            this._out.minutes = minutes < 10 ? '0' + minutes : minutes;
            this._out.seconds = seconds < 10 ? '0' + seconds : seconds;
            this._cbChange ? this._cbChange(this._out) : null;
            if (diff <= 0) {
                clearInterval(this._timerId);
                this._cbComplete ? this._cbComplete() : null;
            }
        }
    }


    let itemMain = document.getElementById("best-casino-main");
    let itemThumb = document.getElementById("best-casino-sub");
    if (itemMain !== null) {
        itemThumb = itemThumb.querySelectorAll(".best-casino-slide");
        itemMain = itemMain.querySelectorAll(".best-casino-slide");
        let deadline;
        let date = new Date(Date.now());
        for (let i = 0, k = 1; i < itemThumb.length, i < itemMain.length; i++, k++) {
            let promoTimer = document.getElementById("promo-timer");
            let durationTime = itemMain[i].getAttribute("data-delay");
            let elMinutesThumb = itemThumb[i].querySelector(".minutes");
            //let elSecondsThumb = itemThumb[i].querySelector(".seconds");
            let elMinutesMain = itemMain[i].querySelector(".minutes");
            let elSecondsMain = itemMain[i].querySelector(".seconds");
            let elMinutesPromo = promoTimer.querySelector(".minutes");
            let elSecondsPromo = promoTimer.querySelector(".seconds");
            let nextTime = Number(((k - 1) * 600000) + (k * 600000 - durationTime));
            if (i == 0) {
                nextTime = Number(600000 - durationTime);
                deadline = new Date(Number(date.valueOf()) + nextTime);
            } else {
                deadline = new Date(Number(date.valueOf()) + nextTime);
            }
            new CountdownTimer(deadline, (timer) => {
                let minutes = timer.minutes;
                if(timer.hours > 0){
                    minutes = Number(timer.hours) / 10 * 600 + Number(timer.minutes);
                }
                if(i == 0){
                    elMinutesPromo.textContent = minutes;
                    elSecondsPromo.textContent = timer.seconds;
                }
            });
            new CountdownTimer(deadline, (timer) => {
                let minutes = timer.minutes;
                if(timer.hours > 0){
                    minutes = Number(timer.hours) / 10 * 600 + Number(timer.minutes);
                }
                elMinutesMain.textContent = minutes;
                elSecondsMain.textContent = timer.seconds;
            }, () => {
                itemMain[i].parentNode.parentNode.querySelector(".swiper-button-next").click()

                let durationTimePromo = itemMain[i+1].getAttribute("data-delay");
                let deadlinePromo;
                let nextTimePromo = Number(((i+1) * 600000) + (((i+2) * 600000) - durationTimePromo));
                deadlinePromo = new Date(Number(date.valueOf()) + nextTimePromo);
                new CountdownTimer(deadlinePromo, (timer) => {
                    let minutes = timer.minutes;
                    if(timer.hours > 0){
                        minutes = Number(timer.hours) / 10 * 600 + Number(timer.minutes);
                    }
                    elMinutesPromo.textContent = minutes;
                    elSecondsPromo.textContent = timer.seconds;
                });
            });
            new CountdownTimer(deadline, (timer) => {
                let minutes = timer.minutes;
                if(timer.hours > 0){
                    minutes = Number(timer.hours) / 10 * 600 + Number(timer.minutes);
                }
                elMinutesThumb.textContent = minutes;
                //elSecondsThumb.textContent = timer.seconds;
            }, () => {
                itemThumb[i].parentNode.parentNode.querySelector(".swiper-button-next").click()
            });

            durationTime = Number(durationTime);
            let barMain = new ProgressBar.Circle(itemMain[i].querySelector('.best-casino-slide__logo'), {
                strokeWidth: 3,
                easing: 'linear',
                duration: nextTime,
                color: '#F0284A',
                trailColor: '#5A5C5E',
                trailWidth: 3,
                svgStyle: {width: '115px', height: '115px'},

            });
            barMain.animate(1.0);
            let bar = new ProgressBar.Circle(itemThumb[i].querySelector('.best-casino-slide__logo'), {
                strokeWidth: 3,
                easing: 'linear',
                duration: nextTime,
                color: '#1876F0',
                trailColor: '#eee',
                trailWidth: 3,
                svgStyle: {width: '48px', height: '48px'},
            });
            bar.animate(1.0);
        }
        let swiperMain = new Swiper(document.getElementById("best-casino-main"), {
            spaceBetween: 12,
            effect: "fade",
            loop: true,
            /*allowTouchMove: false,*/
            autoplay: {
                delay: 600000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
        let swiperThumb = new Swiper(document.getElementById("best-casino-sub"), {
            spaceBetween: 16,
            slidesPerView: "auto",
            loop: true,
            allowTouchMove: false,
            autoplay: {
                delay: 600000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }

    const CookieService = {
        setCookie(name, value, days) {
            let expires = '';
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = '; expires=' + date.toUTCString();
            }
            document.cookie = name + '=' + (value || '') + expires + ';';
        },
        getCookie(name) {
            const cookies = document.cookie.split(';');
            for (const cookie of cookies) {
                if (cookie.indexOf(name + '=') > -1) {
                    return cookie.split('=')[1];
                }
            }
            return null;
        }
    };
    let registrationPopup = document.getElementById("registration-popup");
    let registrationPopupClose = document.querySelector(".registration-popup__close");
    let fade = document.getElementById('fade');
    let exitPopup = document.getElementById('exit-popup');
    let exitPopupClose = document.querySelector(".exit-popup__close");
    const mouseEvent = e => {
        const shouldShowExitIntent = !e.toElement && !e.relatedTarget && e.clientY < 10;
        if (shouldShowExitIntent) {
            document.removeEventListener('mouseout', mouseEvent);
            fadeIn(fade)
            fadeIn(exitPopup)
            CookieService.setCookie('exitIntentShown', true, 30);
        }
    };
    if (!CookieService.getCookie('exitIntentShown')) {
        fadeIn(registrationPopup)
        document.addEventListener('mouseout', mouseEvent);
    }
    const regexEmail = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
    const contactFormEmail = document.getElementById('register-email');
    const registrationPopupForm = document.getElementById('registration-popup-form');
    if(registrationPopupForm !== null) {
        registrationPopupForm.addEventListener('keyup', () => {
            if (regexEmail.test(contactFormEmail.value)) {
                contactFormEmail.classList.remove("error");
                contactFormEmail.classList.add("valid");
            } else {
                contactFormEmail.classList.remove("valid");
                contactFormEmail.classList.add("error");
            }
        });
        registrationPopupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (!regexEmail.test(contactFormEmail.value)) {
                return false;
            } else {
                const ajax = async () => {
                    let response = await fetch("https://www.stakers.com/platform//user/register_customer", {
                        body: {"email":"${mail}","tag":"subscription_br"},
                        method: "POST",
                        mode: "cors",
                    });
                    let data = await response.json();
                    if (data.status == 1) {
                        fadeOut(registrationPopupForm);
                        fadeOut(document.getElementById("registration-popup-thanks"));
                    }
                    else{
                        //console.log(2)
                    }
                };
                ajax()
                registrationPopupForm.reset();
            }
        });
    }
    if(registrationPopup !== null && registrationPopupClose !== null){
        registrationPopupClose.addEventListener("click", function (el){
            fadeOut(registrationPopup);
            CookieService.setCookie('exitIntentShown', true, 30);
        })
    }
    if(exitPopup !== null && exitPopupClose !== null && fade !== null){
        exitPopupClose.addEventListener("click", function (el){
            fadeOut(exitPopup);
            fadeOut(fade);
            CookieService.setCookie('exitIntentShown', true, 30);
        })
        fade.addEventListener("click", function (el){
            fadeOut(exitPopup);
            fadeOut(fade);
            CookieService.setCookie('exitIntentShown', true, 30);
        })
    }

    document.body.addEventListener('click', function(e) {
        if(e.target.closest(".apply-bonus__btn")){
            let applyParent = e.target.closest(".apply-bonus");
            applyParent.classList.toggle("apply-bonus--open");
            return;
        }
        /*else if (!e.target.closest("a")) {
            const target = e.target.closest('.straightforward-to-page'); //.bonus, .mobile-card, .card, .slots-front-page, .single-casino-banner
            if (!target) return;
            if ((target.hasAttribute('data-to_target')) || (target.hasAttribute('data-to_page'))) {
                const link = target.getAttribute('data-to_page');
                window.open(link, '_blank');
            }
        }*/
    })
    const bonusTimer = document.getElementById("bonus-timer");
    if (bonusTimer !== null) {
        const deadline = new Date(bonusTimer.getAttribute("data-time"));
        let timerId = null;

        function countdownTimer() {
            const diff = new Date() - deadline;
            if (diff <= 0) {
                clearInterval(timerId);
            }
            //const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
            const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
            const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
            const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
            //$days.textContent = days < 10 ? '0' + days : days;
            $hours.textContent = hours < 10 ? '0' + hours : hours;
            $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
            $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
        }

        //const $days = document.getElementById('bonus-timer__days');
        const $hours = document.getElementById('bonus-timer-hours');
        const $minutes = document.getElementById('bonus-timer-minutes');
        const $seconds = document.getElementById('bonus-timer-seconds');
        countdownTimer();
        timerId = setInterval(countdownTimer, 1000);
    }
    const singleBonus = document.querySelector('.review-bonus__wrapper');
    if (singleBonus !== null) {
        bonusRedirect(singleBonus);
    }


    let itemFirst = document.getElementById("online-slots-first");
    let itemSecond = document.getElementById("online-slots-second");
    let itemThird = document.getElementById("online-slots-third");
    if (itemFirst !== null) {
        itemFirst = itemFirst.querySelectorAll(".online-slots-slide");
        itemSecond = itemSecond.querySelectorAll(".online-slots-slide");
        itemThird = itemThird.querySelectorAll(".online-slots-slide");
        let deadline;
        let date = new Date(Date.now());
        for (let i = 0, k = 1; i < itemFirst.length; i++, k++) {
            let durationTime = itemFirst[i].getAttribute("data-delay");
            let elMinutesFirst = itemFirst[i].querySelector(".minutes");
            let elSecondsFirst = itemFirst[i].querySelector(".seconds");
            let nextTime = Number(((k - 1) * 600000) + (k * 600000 - durationTime));
            if (i == 0) {
                nextTime = Number(600000 - durationTime);
                deadline = new Date(Number(date.valueOf()) + nextTime);
            } else {
                deadline = new Date(Number(date.valueOf()) + nextTime);
            }
            new CountdownTimer(deadline, (timer) => {
                let minutes = timer.minutes;
                if(timer.hours > 0){
                    minutes = Number(timer.hours) / 10 * 600 + Number(timer.minutes);
                }
                elMinutesFirst.textContent = minutes;
                elSecondsFirst.textContent = timer.seconds;
            }, () => {
                itemFirst[i].parentNode.parentNode.querySelector(".swiper-button-next").click()
            });
            durationTime = Number(durationTime);
            let barFirst = new ProgressBar.Circle(itemFirst[i].querySelector('.online-slots-slide__logo'), {
                strokeWidth: 3,
                easing: 'linear',
                duration: nextTime,
                color: '#F0284A',
                trailColor: '#5A5C5E',
                trailWidth: 3,
                svgStyle: {width: '69px', height: '69px'},

            });
            barFirst.animate(1.0);
        }
        for (let i = 0, k = 1; i < itemSecond.length; i++, k++) {
            let durationTime = itemFirst[i].getAttribute("data-delay");
            let elMinutesSecond = itemSecond[i].querySelector(".minutes");
            let elSecondsSecond = itemSecond[i].querySelector(".seconds");
            let nextTime = Number(((k - 1) * 600000) + (k * 600000 - durationTime));
            if (i == 0) {
                nextTime = Number(600000 - durationTime);
                deadline = new Date(Number(date.valueOf()) + nextTime);
            } else {
                deadline = new Date(Number(date.valueOf()) + nextTime);
            }
            new CountdownTimer(deadline, (timer) => {
                let minutes = timer.minutes;
                if(timer.hours > 0){
                    minutes = Number(timer.hours) / 10 * 600 + Number(timer.minutes);
                }
                elMinutesSecond.textContent = minutes;
                elSecondsSecond.textContent = timer.seconds;
            }, () => {
                itemSecond[i].parentNode.parentNode.querySelector(".swiper-button-next").click()
            });
            durationTime = Number(durationTime);
            let barSecond = new ProgressBar.Circle(itemSecond[i].querySelector('.online-slots-slide__logo'), {
                strokeWidth: 3,
                easing: 'linear',
                duration: nextTime,
                color: '#FFC700',
                trailColor: '#5A5C5E',
                trailWidth: 3,
                svgStyle: {width: '69px', height: '69px'},
            });
            barSecond.animate(1.0);
        }
        for (let i = 0, k = 3; i < itemThird.length; i++, k++) {
            let durationTime = itemFirst[i].getAttribute("data-delay");
            let elMinutesThird = itemThird[i].querySelector(".minutes");
            let elSecondsThird = itemThird[i].querySelector(".seconds");
            let nextTime = Number(((k - 1) * 600000) + ((k - 2) * 600000 - durationTime));
            deadline = new Date(Number(date.valueOf()) + nextTime);
            new CountdownTimer(deadline, (timer) => {
                let minutes = timer.minutes;
                if(timer.hours > 0){
                    minutes = Number(timer.hours) / 10 * 600 + Number(timer.minutes);
                }
                elMinutesThird.textContent = minutes;
                elSecondsThird.textContent = timer.seconds;
            }, () => {
                itemThird[i].parentNode.parentNode.querySelector(".swiper-button-next").click()
            });
            durationTime = Number(durationTime);
            let barThird = new ProgressBar.Circle(itemThird[i].querySelector('.online-slots-slide__logo'), {
                strokeWidth: 3,
                easing: 'linear',
                duration: nextTime,
                color: '#3750D7',
                trailColor: '#5A5C5E',
                trailWidth: 3,
                svgStyle: {width: '69px', height: '69px'},
            });
            barThird.animate(1.0);
        }
    }

    let swiperFirst = new Swiper(document.getElementById("online-slots-first"), {
        effect: "fade",
        //loop: true,
        allowTouchMove: false,
        autoplay: {
            delay: 600000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
    let swiperSecond = new Swiper(document.getElementById("online-slots-second"), {
        effect: "fade",
        //loop: true,
        allowTouchMove: false,
        autoplay: {
            delay: 600000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
    let swiperThird = new Swiper(document.getElementById("online-slots-third"), {
        effect: "fade",
        //loop: true,
        allowTouchMove: false,
        autoplay: {
            delay: 600000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
})