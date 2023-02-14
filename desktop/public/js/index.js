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
            //header.classList.remove("active");
            return;
        }
        const direction = currentScroll > lastScroll ? scrollDown : scrollUp;
        if (direction !== currentDirection) {
            body.classList.remove(scrollUp, scrollDown);
            body.classList.add(direction);
            //header.classList.add("active");
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


    let onlineSlotsSliderFirst = document.getElementById("online-slots-first");
    let onlineSlotsSliderSecond = document.getElementById("online-slots-second");
    let onlineSlotsSliderThird = document.getElementById("online-slots-third");
    if (onlineSlotsSliderFirst !== null) {
        onlineSlotsSliderFirst = onlineSlotsSliderFirst.querySelectorAll(".online-slots-slide");
        onlineSlotsSliderSecond = onlineSlotsSliderSecond.querySelectorAll(".online-slots-slide");
        onlineSlotsSliderThird = onlineSlotsSliderThird.querySelectorAll(".online-slots-slide");
        let deadline;
        let date = new Date(Date.now());
        for (let i = 0, k = 1; i < onlineSlotsSliderFirst.length; i++, k++) {
            let durationTime = onlineSlotsSliderFirst[i].getAttribute("data-delay");
            let elMinutesFirst = onlineSlotsSliderFirst[i].querySelector(".minutes");
            let elSecondsFirst = onlineSlotsSliderFirst[i].querySelector(".seconds");
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
                onlineSlotsSliderFirst[i].parentNode.parentNode.querySelector(".swiper-button-next").click()
            });
            durationTime = Number(durationTime);
            let barFirst = new ProgressBar.Circle(onlineSlotsSliderFirst[i].querySelector('.online-slots-slide__logo'), {
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
        for (let i = 0, k = 1; i < onlineSlotsSliderSecond.length; i++, k++) {
            let durationTime = onlineSlotsSliderFirst[i].getAttribute("data-delay");
            let elMinutesSecond = onlineSlotsSliderSecond[i].querySelector(".minutes");
            let elSecondsSecond = onlineSlotsSliderSecond[i].querySelector(".seconds");
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
                onlineSlotsSliderSecond[i].parentNode.parentNode.querySelector(".swiper-button-next").click()
            });
            durationTime = Number(durationTime);
            let barSecond = new ProgressBar.Circle(onlineSlotsSliderSecond[i].querySelector('.online-slots-slide__logo'), {
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
        for (let i = 0, k = 2; i < onlineSlotsSliderThird.length; i++, k++) {
            let durationTime = onlineSlotsSliderFirst[i].getAttribute("data-delay");
            let elMinutesThird = onlineSlotsSliderThird[i].querySelector(".minutes");
            let elSecondsThird = onlineSlotsSliderThird[i].querySelector(".seconds");
            let nextTime = Number(((k - 1) * 600000) + ((k - 1) * 600000 - durationTime));
            deadline = new Date(Number(date.valueOf()) + nextTime);
            new CountdownTimer(deadline, (timer) => {
                let minutes = timer.minutes;
                if(timer.hours > 0){
                    minutes = Number(timer.hours) / 10 * 600 + Number(timer.minutes);
                }
                elMinutesThird.textContent = minutes;
                elSecondsThird.textContent = timer.seconds;
            }, () => {
                onlineSlotsSliderThird[i].parentNode.parentNode.querySelector(".swiper-button-next").click()
            });
            durationTime = Number(durationTime);
            let barThird = new ProgressBar.Circle(onlineSlotsSliderThird[i].querySelector('.online-slots-slide__logo'), {
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
        let swiperFirst = new Swiper(document.getElementById("online-slots-first"), {
            effect: "fade",
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
        let swiperSecond = new Swiper(document.getElementById("online-slots-second"), {
            effect: "fade",
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
        let swiperThird = new Swiper(document.getElementById("online-slots-third"), {
            effect: "fade",
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
    let bestSlotsSitesSliderFirst = document.getElementById("best-slot-sites-first");
    let bestSlotsSitesSliderSecond = document.getElementById("best-slot-sites-second");
    let bestSlotsSitesSliderThumb = document.getElementById("best-slot-sites-sub");
    if (bestSlotsSitesSliderFirst !== null) {
        bestSlotsSitesSliderFirst = bestSlotsSitesSliderFirst.querySelectorAll(".best-slot-sites-slide");
        bestSlotsSitesSliderSecond = bestSlotsSitesSliderSecond.querySelectorAll(".best-slot-sites-slide");
        bestSlotsSitesSliderThumb = bestSlotsSitesSliderThumb.querySelectorAll(".best-slot-sites-slide");
        let deadline;
        let date = new Date(Date.now());
        for (let i = 0, k = 1; i < bestSlotsSitesSliderFirst.length; i++, k++) {
            let durationTime = bestSlotsSitesSliderFirst[i].getAttribute("data-delay");
            let elMinutesFirst = bestSlotsSitesSliderFirst[i].querySelector(".minutes");
            let elSecondsFirst = bestSlotsSitesSliderFirst[i].querySelector(".seconds");
            let elMinutesThumb = bestSlotsSitesSliderThumb[i].querySelector(".minutes");
            let promoTimer = document.getElementById("promo-timer");
            let elMinutesPromo = promoTimer.querySelector(".minutes");
            let elSecondsPromo = promoTimer.querySelector(".seconds");
            //let elSecondsThumb = bestSlotsSitesSliderThumb[i].querySelector(".seconds");
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
                bestSlotsSitesSliderFirst[i].parentNode.parentNode.querySelector(".swiper-button-next").click()

                let durationTimePromo = bestSlotsSitesSliderFirst[i+1].getAttribute("data-delay");
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
                elMinutesThumb.textContent = minutes;
                //elSecondsThumb.textContent = timer.seconds;
            }, () => {
                bestSlotsSitesSliderThumb[i].parentNode.parentNode.querySelector(".swiper-button-next").click()
            });
            durationTime = Number(durationTime);
            let barFirst = new ProgressBar.Circle(bestSlotsSitesSliderFirst[i].querySelector('.best-slot-sites-slide__logo'), {
                strokeWidth: 3,
                easing: 'linear',
                duration: nextTime,
                color: '#F0284A',
                trailColor: '#5A5C5E',
                trailWidth: 3,
                svgStyle: {width: '69px', height: '69px'},

            });
            barFirst.animate(1.0);
            let barSub = new ProgressBar.Circle(bestSlotsSitesSliderThumb[i].querySelector('.best-slot-sites-slide__logo'), {
                strokeWidth: 3,
                easing: 'linear',
                duration: nextTime,
                color: '#1876F0',
                trailColor: '#eee',
                trailWidth: 3,
                svgStyle: {width: '48px', height: '48px'},
            });
            barSub.animate(1.0);

        }
        for (let i = 0, k = 1; i < bestSlotsSitesSliderSecond.length; i++, k++) {
            let durationTime = bestSlotsSitesSliderFirst[i].getAttribute("data-delay");
            let elMinutesSecond = bestSlotsSitesSliderSecond[i].querySelector(".minutes");
            let elSecondsSecond = bestSlotsSitesSliderSecond[i].querySelector(".seconds");
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
                bestSlotsSitesSliderSecond[i].parentNode.parentNode.querySelector(".swiper-button-next").click()
            });
            durationTime = Number(durationTime);
            let barSecond = new ProgressBar.Circle(bestSlotsSitesSliderSecond[i].querySelector('.best-slot-sites-slide__logo'), {
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
        let swiperFirst = new Swiper(document.getElementById("best-slot-sites-first"), {
            effect: "fade",
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
        let swiperThumb = new Swiper(document.getElementById("best-slot-sites-sub"), {
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
        let swiperSecond = new Swiper(document.getElementById("best-slot-sites-second"), {
            effect: "fade",
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



    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    function getRandomCard(item, count){
        let child = item.querySelectorAll(".card");
        for (let i = 0; i < child.length; i++){
            child[i].style.display = "none";
        }
        for (let i = 0; i < child.length; i++){
            if(i < 2){
                let index = getRandomInt(count);
                //fadeIn(child[getRandomInt(count)]);
                if (index < child.length){
                    child[index].style.display = "flex";
                }
            }
        }
    }
    let x = 0;
    let interval = 0 ;
    let BannerFS = document.querySelector(".banner-fs");
    if(BannerFS !== null){
        let BannerFSBtn = BannerFS.querySelector(".banner-fs__btn");
        let BannerImage = BannerFS.querySelector(".banner-fs__center-image");
        let BannerBonuses = BannerFS.querySelectorAll(".banner-fs__bonuses");
        let BannerStatus = BannerFS.querySelector(".banner-fs__status");
        let pickBonusBtn = document.querySelector(".pick-bonus__btn");
        if(pickBonusBtn !== null){
            pickBonusBtn.addEventListener("click", function (e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
                BannerFSBtn.click();
            })
        }
        if(BannerFSBtn !== null || BannerImage !== null){
            BannerFSBtn.addEventListener("click", function() {
                x += Math.floor(Math.random() * 250) + 800;
                BannerImage.style.transform = 'rotate(' + x + 'deg)';
                //BannerImage.style.transitionDuration = '2s';
                interval = x - (360 * Math.floor(x / 360));
                for (let i = 0; i < BannerBonuses.length; i++){
                    if(!BannerBonuses[i].classList.contains("fadeOut")){
                        BannerBonuses[i].classList.add("fadeOut");
                    }
                }
                BannerStatus.classList.remove("fadeOut");
                setTimeout(() => {
                    BannerStatus.classList.add("fadeOut");
                    console.log(interval);
                    if(interval >= 18 && interval <= 44){ // blue - 26 console.log("CASH")
                        for (let i = 0; i < BannerBonuses.length; i++){
                            if(BannerBonuses[i].classList.contains("banner-fs__bonuses--cash")){
                                BannerBonuses[i].classList.remove("fadeOut");
                                getRandomCard(BannerBonuses[i], bonusesFirst);
                            }
                        }
                    }
                    else if(interval >= 45 && interval <= 77){ // white - 32 console.log("FS")
                        for (let i = 0; i < BannerBonuses.length; i++){
                            if(BannerBonuses[i].classList.contains("banner-fs__bonuses--fs")){
                                BannerBonuses[i].classList.remove("fadeOut");
                                getRandomCard(BannerBonuses[i], bonusesSecond);
                            }

                        }
                    }
                    else if(interval >= 78 && interval <= 103){ // blue - 25 console.log("ZERO FS RED")
                        for (let i = 0; i < BannerBonuses.length; i++){
                            if(BannerBonuses[i].classList.contains("banner-fs__bonuses--fs")){
                                BannerBonuses[i].classList.remove("fadeOut");
                                getRandomCard(BannerBonuses[i], bonusesSecond);
                            }
                        }
                    }
                    else if(interval >= 104 && interval <= 136){ // white - 32 console.log("FS")
                        for (let i = 0; i < BannerBonuses.length; i++){
                            if(BannerBonuses[i].classList.contains("banner-fs__bonuses--fs")){
                                BannerBonuses[i].classList.remove("fadeOut");
                                getRandomCard(BannerBonuses[i], bonusesSecond);
                            }
                        }
                    }
                    else if(interval >= 137 && interval <= 162){ //red - 25 console.log("CASH")
                        for (let i = 0; i < BannerBonuses.length; i++){
                            if(BannerBonuses[i].classList.contains("banner-fs__bonuses--cash")){
                                BannerBonuses[i].classList.remove("fadeOut");
                                getRandomCard(BannerBonuses[i], bonusesFirst);
                            }
                        }
                    }
                    else if(interval >= 163 && interval <= 195){ // white - 32 console.log("FS")
                        for (let i = 0; i < BannerBonuses.length; i++){
                            if(BannerBonuses[i].classList.contains("banner-fs__bonuses--fs")){
                                BannerBonuses[i].classList.remove("fadeOut");
                                getRandomCard(BannerBonuses[i], bonusesSecond);
                            }
                        }
                    }
                    else if(interval >= 196 && interval <= 223){ // red - 27 console.log("CASH")
                        for (let i = 0; i < BannerBonuses.length; i++){
                            if(BannerBonuses[i].classList.contains("banner-fs__bonuses--cash")){
                                BannerBonuses[i].classList.remove("fadeOut");
                                getRandomCard(BannerBonuses[i], bonusesFirst);
                            }
                        }
                    }
                    else if(interval >= 224 && interval <= 256){ // white - 32 console.log("FS")
                        for (let i = 0; i < BannerBonuses.length; i++){
                            if(BannerBonuses[i].classList.contains("banner-fs__bonuses--fs")){
                                BannerBonuses[i].classList.remove("fadeOut");
                                getRandomCard(BannerBonuses[i], bonusesSecond);
                            }
                        }
                    }
                    else if(interval >= 257 && interval <= 284){ // red - 27 console.log("FS")
                        for (let i = 0; i < BannerBonuses.length; i++){
                            if(BannerBonuses[i].classList.contains("banner-fs__bonuses--fs")){
                                BannerBonuses[i].classList.remove("fadeOut");
                                getRandomCard(BannerBonuses[i], bonusesSecond);
                            }
                        }
                    }
                    else if(interval >= 285 && interval <= 317){ // white - 32 console.log("ZERO CASH WHITE")
                        for (let i = 0; i < BannerBonuses.length; i++){
                            if(BannerBonuses[i].classList.contains("banner-fs__bonuses--cash")){
                                BannerBonuses[i].classList.remove("fadeOut");
                                getRandomCard(BannerBonuses[i], bonusesFirst);
                            }
                        }
                    }
                    else if(interval >= 318 && interval <= 344){ // blue - 27 console.log("CASH")
                        for (let i = 0; i < BannerBonuses.length; i++){
                            if(BannerBonuses[i].classList.contains("banner-fs__bonuses--cash")){
                                BannerBonuses[i].classList.remove("fadeOut");
                                getRandomCard(BannerBonuses[i], bonusesFirst);
                            }
                        }
                    }
                    else{ // first white 32 console.log("FS")
                        for (let i = 0; i < BannerBonuses.length; i++){
                            if(BannerBonuses[i].classList.contains("banner-fs__bonuses--fs")){
                                BannerBonuses[i].classList.remove("fadeOut");
                                getRandomCard(BannerBonuses[i], bonusesSecond);
                            }
                        }
                    }
                },2000);
            });
        }
    }
    let expertsChoiceSwiper = document.getElementById("experts-choice-swiper");
    if(expertsChoiceSwiper !== null){
        var swiper = new Swiper(expertsChoiceSwiper, {
            spaceBetween: 16,
            slidesPerView: "auto",
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }
    let providerSlotsCategory = document.querySelectorAll(".provider-slots-category__head");
    if(!isEmptyObject(providerSlotsCategory)){
        providerSlotsCategory.forEach(function (provider){
            provider.addEventListener("click", function (e){
                let parent = e.target.closest(".provider-slots-category");
                let formBtn = parent.querySelector(".providers-logo__btn");
                formBtn.click();
            })
        })
    }
    let videoSlotsSliders = document.querySelectorAll(".video-slots-slider__swiper");
    if(!isEmptyObject(videoSlotsSliders)){
        videoSlotsSliders.forEach(function (slider){
            let swiperBtnNext = slider.parentNode.querySelector(".swiper-button-next");
            let swiperBtnPrev = slider.parentNode.querySelector(".swiper-button-prev")
            var swiper = new Swiper(slider, {
                spaceBetween: 16,
                slidesPerView: "auto",
                navigation: {
                    nextEl: swiperBtnNext,
                    prevEl: swiperBtnPrev,
                },
            });
        })
    }
    let slotsWrap = document.getElementById('slots-wrapper');
    let slotsPagination = document.getElementById("slots-pagination");
    let slotsFilter = document.getElementById('filterForm');
    let inputsFilter;
    if(slotsFilter !== null){ //slotsWrap !== null && slotsPagination !== null &&
        async function slotsAll(query) {
            let response = await fetch('/wp-admin/admin-ajax.php', {
                method: 'post',
                headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
                body: `action=fetchSlots&data=${query}`
            });
            let data = await response.json();
            slotsWrap.innerHTML = data.result;
            /*if( data.pagination == ""){
                fadeOut(slotsPagination)
            }
            else{
                fadeIn(slotsPagination, "flex");
                slotsPagination.innerHTML = data.pagination;
            }*/
        }
        let allData = {
            slotsRtp: [0, 100],
            slotsRelease: [1999, 2023],
            slotsBetMin: [0, 5000],
            slotsBetMax: [0, 6000000],
            slotsMaxWin: [0, 25000],
            checked: [],
            query: [],
        };
        let createData = () => {
            let nodeList = slotsFilter.querySelectorAll('input:checked');
            let checked = {
                slotsProvider: [],
                slotsType: [],
                slotsVolatility: [],
                slotsThemes: [],
                slotsLayout: [],
                slotsFeatures: [],
            };
            nodeList.forEach((node) => {
                if(node.name == "slots-provider[]"){
                    checked.slotsProvider.push(node.value);
                }
                if(node.name == "slots-type[]"){
                    checked.slotsType.push(node.value);
                }
                if(node.name == "slots-volatility[]"){
                    checked.slotsVolatility.push(node.value);
                }
                if(node.name == "slots-themes[]"){
                    checked.slotsThemes.push(node.value);
                }
                if(node.name == "slots-layout[]"){
                    checked.slotsLayout.push(node.value);
                }
                if(node.name == "slots-features[]"){
                    checked.slotsFeatures.push(node.value);
                }
            });
            allData.checked.push(checked);
        }
        if(slotsFilter !== null){
            inputsFilter = slotsFilter.querySelectorAll('input');
            inputsFilter.forEach(input => {
                input.addEventListener('change', createData);
            })
            slotsFilter.addEventListener('submit', (event) => {
                event.preventDefault();
                if(allData.checked.length > 1){
                    allData.checked = [allData.checked.pop()];
                }
                //slotsWrap.innerHTML = template;
                //slotsAll(JSON.stringify(allData));
            });
        }
        let filterSearchInput = document.querySelector('.search-form__input');
        filterSearchInput.addEventListener('input', function() {
            document.querySelector('.slots-filter--aside input[name="q"]').value = this.value;
            allData.query = this.value;
            //slotsAll(JSON.stringify(allData));
        });
        function filterSelect(el) {
            const label = el.closest('label').getAttribute('aria-label'),
                parent = el.closest('.select'),
                modal = parent.querySelector('div[aria-label="' + label + '"]'),
                arr = modal.querySelectorAll('label'),
                arrNumber = el.parentNode.querySelector('.slots-filter-range__slider--two_rtp-top'),
                placeholder = el.querySelector('.text'), //placeholder__text
                //input = el.querySelector('input'),
                reset = modal.querySelector('.slots-filter__btn-clear');
            let activeCheckboxes = [];
            toggleModal();
            function toggleModal() {
                if(document.querySelectorAll(".select__content") !== null){
                    document.querySelectorAll(".select__content").forEach(function (el){
                        let parentElement = el.closest('.select')
                        let element = el.closest('.select').querySelector('div[aria-label="' + el.closest('label').getAttribute('aria-label') + '"]');
                        if(modal != element){
                            element.classList.remove("filter__modal--active");
                            parentElement.classList.remove("select--active");
                        }
                    })
                }
                modal.classList.toggle("filter__modal--active");
                parent.classList.toggle("select--active");
                let action = false;
                if (modal.classList.contains('filter__modal--active')) action = true;
                //focusInput(action);
            }
            /*function focusInput(action) {
                if (action === true) {
                    if (input !== null) {
                        input.focus({
                            preventScroll: true
                        });
                    }
                } else {
                    if (input !== null) {
                        input.blur();
                    }
                }
            }*/
            /*input.oninput = e => {
                e.target.value = ''; // не важно, что ввели, значение всегда пустое будет
            }*/
            /*input.addEventListener("input", function (e) {
                let val = this.value;
                if (val.length > 0) {
                    placeholder.classList.add('text_disabled');
                } else {
                    placeholder.classList.remove('text_disabled');
                }
                for (i = 0; i < arr.length; i++) {
                    const el = arr[i]
                    const str = el.getAttribute('data-item_title');
                    if (str.substr(0, val.length).toUpperCase() != val.toUpperCase()) {
                        el.classList.add('filter-checkbox_hide');
                    } else {
                        el.classList.remove('filter-checkbox_hide');
                    }
                }
            })*/
            function selectActive() {
                if (activeCheckboxes.length > 0) {
                    placeholder.innerText = activeCheckboxes.toString();
                } else {
                    placeholder.innerText = placeholder.getAttribute('data-placeholder');
                }
            }
            let title;
            if(arrNumber !== null){
                let parentNum = arrNumber.closest('.filter__modal');
                if (parentNum) {
                    let placeholder = parentNum.closest('.range').querySelector('.text');
                    arrNumber.noUiSlider.on('update', function (values, handle) {
                        let value = Math.floor(values[handle]);
                        title = Math.floor(values[0]) + '-' + Math.floor(values[1]) + '%';
                        placeholder.innerText = title;
                        activeCheckboxes[0] = title;
                        selectActive();
                    });
                }
            }
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].querySelector('input').checked) {
                    title = arr[i].getAttribute('data-item_title');
                    activeCheckboxes.push(title);
                }
                arr[i].onchange = function () {
                    title = arr[i].getAttribute('data-item_title');
                    if (arr[i].querySelector('input').checked) {
                        activeCheckboxes.push(title);
                    } else {
                        activeCheckboxes.splice(activeCheckboxes.indexOf(title), 1);
                    }
                    selectActive();
                }
            }
            selectActive();
            if (reset) {
                reset.onclick = function (e) {
                    e.preventDefault();
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i].querySelector('input').checked) {
                            arr[i].querySelector('input').click();
                        }
                        activeCheckboxes = [];
                    }
                    selectActive();
                }
            }
        }
        function updateSliderRangeTwo(arr) {
            arr.forEach(el => {
                let inputs = el.closest('.range-slider').querySelectorAll('input[type="number"]');
                el.noUiSlider.on('update', function (values, handle) {
                    let value = Math.floor(values[handle]);
                    if (el.getAttribute('data-id') === 'aside-rtp') {
                        document.querySelector('.slots-filter-range__slider--two_rtp-top').noUiSlider.setHandle(handle, value, true, true);
                        //document.querySelector('.slots-filter-range__slider_two_rtp-aside').noUiSlider.setHandle(handle, value, true, true);
                    }
                    if (el.getAttribute('data-id') === 'top-rtp') {}
                    if(inputs[handle].name == "rtp_min"){
                        allData.slotsRtp[0] = value;
                    }
                    if(inputs[handle].name == "rtp_max"){
                        allData.slotsRtp[1] = value;
                    }
                    if(inputs[handle].name == "release_min"){
                        allData.slotsRelease[0] = value;
                    }
                    if(inputs[handle].name == "release_max"){
                        allData.slotsRelease[1] = value;
                    }

                    if(inputs[handle].name == "min_bet_min"){
                        allData.slotsBetMin[0] = value;
                    }
                    if(inputs[handle].name == "min_bet_max"){
                        allData.slotsBetMin[1] = value;
                    }

                    if(inputs[handle].name == "max_bet_min"){
                        allData.slotsBetMax[0] = value;
                    }
                    if(inputs[handle].name == "max_bet_max"){
                        allData.slotsBetMax[1] = value;
                    }

                    if(inputs[handle].name == "max_win_min"){
                        allData.slotsMaxWin[0] = value;
                    }
                    if(inputs[handle].name == "max_win_max"){
                        allData.slotsMaxWin[1] = value;
                    }
                });
                inputs.forEach((input, handle) => {
                    input.oninput = function () {
                        el.noUiSlider.setHandle(handle, this.value);
                    };
                });
            })
        }
        function initSliderRangeTwo(arr) {
            arr.forEach(el => {
                let min = parseInt(el.getAttribute('data-min')),
                    max = parseInt(el.getAttribute('data-max')),
                    sMin = parseInt(el.getAttribute('data-start')),
                    sMax = parseInt(el.getAttribute('data-end')),
                    inputs = el.closest('.range-slider').querySelectorAll('input[type="number"]');
                parent = el.closest('.filter__modal');

                noUiSlider.create(el, {
                    start: [sMin, sMax],
                    connect: [false, true, false],
                    range: {
                        'min': min,
                        'max': max
                    }
                });
                el.noUiSlider.on('update', function (values, handle) {
                    let value = Math.floor(values[handle]);
                    inputs[handle].value = value;
                })
            });
        }

        let modalBlockHandlers = document.querySelectorAll('.select__content');
        if (modalBlockHandlers) {
            modalBlockHandlers.forEach(i => {
                (i.onclick = function (e) {
                    e.preventDefault();
                    filterSelect(i);
                });
            })
        }

        let sliderRangeTwo = document.querySelectorAll('.slots-filter-range__slider--two');
        if (!isEmptyObject(sliderRangeTwo)) {
            if (sliderRangeTwo !== null) {
                initSliderRangeTwo(sliderRangeTwo);
                updateSliderRangeTwo(sliderRangeTwo)
            }
        }
        let slotsFilterGroupItem = document.querySelector(".slots-filter--aside").querySelectorAll(".slots-filter-group");
        if (!isEmptyObject(slotsFilterGroupItem)) {
            slotsFilterGroupItem.forEach(el => {
                let header = el.querySelector(".slots-filter-group__title");
                header.addEventListener("click", function (e) {
                    el.classList.toggle("slots-filter-group--active");
                })
            })
        }
        function updateSecondCheckbox(el) {
            const parent = el.closest('.select');
            if (parent) {
                const label = parent.querySelector('.select__content');
                label.click();
                label.click();
            }
        };
        let checkboxList = this.document.querySelectorAll('input[type="checkbox"]');
        if (!isEmptyObject(checkboxList)){
            checkboxList.forEach(checkbox => {
                checkbox.addEventListener('change', function change(e) {
                    const valueCheckbox = this.value;
                    if (this.checked) {
                        const secondCheckboxAll = document.querySelectorAll('input[value="' + valueCheckbox + '"]:not(:checked)');
                        if (!isEmptyObject(secondCheckboxAll)) {
                            secondCheckboxAll.forEach(function (secondCheckbox){
                                secondCheckbox.checked = true;
                                updateSecondCheckbox(secondCheckbox);
                            })
                        }
                    } else {
                        const secondCheckboxAll = document.querySelectorAll('input[value="' + valueCheckbox + '"]:checked');
                        if (!isEmptyObject(secondCheckboxAll)) {
                            secondCheckboxAll.forEach(function (secondCheckbox){
                                secondCheckbox.checked = false;
                                updateSecondCheckbox(secondCheckbox);
                            })
                        }
                    }
                });
            });
        }
        function updateSecond(el) {
            const parent = el;
            if (parent) {
                const label = parent.querySelector('.select__content');
                label.click();
                label.click();
            }
        };
        document.querySelectorAll(".select").forEach(function (el){
            updateSecond(el);
        })
    }

    let popularSlotsSwiper = document.getElementById("popular-slots-swiper");
    if(popularSlotsSwiper !== null){
        var swiper = new Swiper(popularSlotsSwiper, {
            slidesPerView: "auto",
            spaceBetween: 16,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }

    let reviewSlots = document.querySelector(".review--slots");
    if(reviewSlots !== null && header !== null){
        header.style.position = "static";
        document.querySelector(".aside-menu").style.top = "20px";
    }
    let tagsHead = document.querySelector(".review-slots-tags__head");
    let tagsContent = document.querySelector(".review-slots-tags__content");
    if (tagsHead !== null && tagsContent !== null) {
        tagsHead.addEventListener("click",function (e){
            if(tagsHead.classList.contains("review-slots-tags__head--active")){
                fadeOut(tagsContent);
                tagsHead.classList.toggle("review-slots-tags__head--active");
            }
            else{
                fadeIn(tagsContent);
                tagsHead.classList.toggle("review-slots-tags__head--active");
            }
        });
    }


    let reviewCasino = document.querySelector(".review--casino");
    if(reviewCasino !== null && header !== null){
        header.style.position = "static";
        document.querySelector(".aside-menu").style.top = "20px";
    }
    let unitedKingdomMap = document.getElementById("united-kingdom-map");
    if(unitedKingdomMap !== null){
        var clickCountry = function (t){
            document.querySelectorAll(".uk-map-country").forEach(function (el) {
                el.setAttribute("class", "uk-map-country");
            });
            document.querySelector("#g" + t).setAttribute("class", "uk-map-country uk-map-country--selected");
            var e = _mapArray.find(function (e) {
                if (t === e.country.value) return e
            }), a = document.querySelector(".worldmap__label"), a = (a && a.remove(), document.getElementById("united-kingdom-map")), n = document.querySelector(".uk-country-card");
            n.className = "uk-country-card block", n.innerHTML = '\n        <div class="uk-country-card__top df df-ai-center p2 mb-10">\n            <div class="uk-country-card__icon bg-image" style="background-image: url(../img/png/icon-153.png);"></div><span class="uk-country-card__name h4">'.concat(e.country.label, '</span>\n        </div>\n        <div class="uk-country-card__text p1">Players from the ').concat(e.country.label,':<span>').concat(new Intl.NumberFormat('uk-UK').format(e.traffic), '</span></div>\n        <div class="uk-country-card__text p1">Share in the total number of UK players: <span>').concat(new Intl.NumberFormat('uk-UK').format(e.share), '%</span>'), n.parentNode.append(n)
        }
        document.body.addEventListener("click", function (e){
            let ukMap = e.target.closest(".uk-map-country");
            if(ukMap !== null){
                console.log(ukMap)
                let id = ukMap.getAttribute("data-local");
                clickCountry(id);
            }
        })
    }
    let reviewChart = document.getElementById("review-chart");
    if(reviewChart !== null){
        const labelCasino = [];
        const dataCasino = [];
        document.querySelectorAll(".review-chart-data").forEach(function (elem, index){
            let value = elem.getAttribute("data-value");
            let label = elem.getAttribute("data-label");
            if(value > 0){
                labelCasino.push(label)
                dataCasino.push(value)
            }
        })
        const data = {
            labels: labelCasino,
            datasets: [{
                data: dataCasino,
                backgroundColor: [
                    'rgba(174, 31, 209, 0.5)',
                    'rgba(70, 49, 207, 0.5)',
                    'rgba(24, 118, 240, 0.5)',
                    'rgba(15, 151, 94, 0.5)',
                    'rgba(255, 181, 38, 0.5)',
                    'rgba(240, 40, 74, 0.5)'
                ],
                hoverBackgroundColor: [
                    'rgba(174, 31, 209, 1)',
                    'rgba(70, 49, 207, 1)',
                    'rgba(24, 118, 240, 1)',
                    'rgba(15, 151, 94, 1)',
                    'rgba(255, 181, 38, 1)',
                    'rgba(240, 40, 74, 1)'
                ],
                borderWidth: 0.5,
                borderColor: 'rgb(247, 250, 252)',
                hoverOffset: 0
            }]
        };
        let positionLegend = 'right';
        if(window.innerWidth < 768){
            positionLegend = 'bottom';
        }
        const chart = new Chart(reviewChart, {
            type: 'doughnut',
            data: data,
            options: {
                cutout: 75,
                plugins: {
                    legend: {
                        display: true,
                        position: positionLegend,
                        padding: {
                            left: 50
                        },
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'rectRounded',
                            boxWidth: 12,
                            boxHeight: 12,
                            color: '#222222',
                        },
                        onClick: false,
                        onHover: (evt, legendItem) => {
                            reviewChart.style.cursor = 'pointer';
                            const activeElement = {
                                datasetIndex: 0,
                                index: legendItem.index
                            };
                            chart.setActiveElements([activeElement]); // to also show thick border
                            chart.tooltip.setActiveElements([activeElement]);
                            chart.update();
                        }
                    },
                    beforeInit: function(pdChart, options) {
                        pdChart.legend.beforeFit = function() {
                            this.width = this.width + 100;
                        };
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                        titleColor: '#222222',
                        bodyColor: '#222222',
                        footerColor: '#222222',
                        cornerRadius: 8,
                        boxWidth: 8,
                        boxHeight: 8,
                        boxPadding: 8,
                        usePointStyle: true,
                    },
                }
            }
        });
    }
    let casinoOtherSwiper = document.getElementById("casino-other-swiper");
    if(casinoOtherSwiper !== null){
        var swiper = new Swiper(casinoOtherSwiper, {
            spaceBetween: 16,
            slidesPerView: "auto",
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }
})