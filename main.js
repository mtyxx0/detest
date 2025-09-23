let currentLang = localStorage.getItem("currentLang") || "pl";

let languages = {
    "pl": document.querySelector(".polish"),
    "en": document.querySelector(".english"),
    "ru": document.querySelector(".russian"),
    "uk": document.querySelector(".ukrainian"),
    "es": document.querySelector(".spanish")
}

let HCharacters = document.querySelector(".characters");
let HCMessage = document.querySelector(".message-content");

const FBL = document.getElementById("FBL");
const IGL = document.getElementById("IGL");
const FBL2 = document.getElementById("FBL2");
const IGL2 = document.getElementById("IGL2");

let BackToTop = document.querySelector(".scroll-up");
let ShowAllServices = document.querySelector(".more-services");
let BTMain = document.querySelector(".home2");
let MMServices = document.querySelector(".main-more-services");
let ContactUs = document.querySelector(".contact-us-button");

let welcomePage = document.querySelector(".in");
let welcomeText = document.querySelector(".in-welcome");
let welcomeTransition = document.querySelector(".transition");

let cd = document.querySelector(".contact-info-data");

let contactButtons = {
    "mail": document.querySelector(".mail"),
    "phone": document.querySelector(".phone")
}

let contactDataList = {
    "mail": "mail@mail.com",
    "phone": "123-456-789"
}

let Scroll = {
    "home": document.querySelector(".home"),
    "services": document.querySelector(".services"),
    "about": document.querySelector(".about"),
    "contact": document.querySelector(".contact"),
}

let ScrollValue = {
    "home": document.querySelector(".main-page"),
    "services": document.querySelector(".services-page"),
    "about": document.querySelector(".about-page"),
    "contact": document.querySelector(".contact-page"),
}

let ServicesVehiclesList = {
    "Motorcycle": "motorcycle",
    "SmallCar": "car",
    "MediumCar": "car",
    "SUV": "truck-suv",
    "Van": "van",
    "SmallDeliveryTruck": "truck",
    "BigDeliveryTruck": "truck",
    "Bus": "bus-side"
}

let ServicesVehiclesName = {
    "pl": {
        "motorcycle": "Motocykl",
        "scar": "Samochód osobowy (mały)",
        "mcar": "Samochód osobowy (średni)",
        "suv": "SUV",
        "van": "Van",
        "sdt": "Samochód dostawczy (mały)",
        "bdt": "Samochód dostawczy (duży)",
        "bus": "Bus"
    }
}

let ServicesClasses = {
    "Motorcycle": "motorcycle",
    "SmallCar": "scar",
    "MediumCar": "mcar",
    "SUV": "suv",
    "Van": "van",
    "SmallDeliveryTruck": "sdt",
    "BigDeliveryTruck": "bdt",
    "Bus": "bus"
}

let ServicePrice = document.querySelector(".service-price");

let bIsDetailsOpen = true; // jeśli false --- hoveredInfo -> display: none;

let hoveredInfo = document.querySelector(".hovered-info");
let hoveredInfoVehicle = document.querySelector(".hovered-info-vehicle");

let SDBack = document.querySelector(".service-details-back");

const SD = document.querySelector(".srcv");
const ASL = document.querySelector(".asl");

let ASLBack = document.querySelector(".back-to-main");

let prices = document.querySelector(".price-list");

document.addEventListener("DOMContentLoaded", async () => {
    const allServicesList = document.querySelector(".all-services-list");

    const [servicesData, imagesData, prDscData, descsData, linksData] = await Promise.all([
        fetch('./translations/services.json').then(r => r.json()),
        fetch('./img.json').then(r => r.json()),
        fetch('./translations/s_pr_dsc.json').then(r => r.json()),
        fetch('./translations/descriptions.json').then(r => r.json()),
        fetch('./links.json').then(r => r.json())
    ]);

    const Services = {};
    const fragment = document.createDocumentFragment();

    for (const key in servicesData[currentLang]) {
        const div = document.createElement("div");
        div.className = "service-new";

        div.innerHTML = `
            <div class="service-title">${servicesData[currentLang][key]}</div>
            <div class="service-thumbnail" style="background-image: url(img/${imagesData[key]}); background-size: cover; background-position: center;"></div>
            <div class="service-description">${prDscData[currentLang][key]}</div>
            <button class="service-read-more ${key}">Zobacz</button>
        `;

        const titleElement = div.querySelector(".service-title");
        const maxLength = 25;
        if (titleElement.textContent.length > maxLength) {
            titleElement.textContent = titleElement.textContent.slice(0, maxLength - 3) + "...";
        }

        Services[key] = div;
        fragment.appendChild(div);
    }

    if (allServicesList) {
        allServicesList.appendChild(fragment);
    }

    // const observer = new IntersectionObserver(entries => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             const thumb = entry.target.querySelector(".service-thumbnail");
    //             const src = thumb.getAttribute("data-src");
    //             thumb.style.backgroundImage = `url(/${src})`;
    //             thumb.style.backgroundSize = "cover";
    //             thumb.style.backgroundPosition = "center";
    //             thumb.style.backgroundRepeat = "no-repeat";
    //             observer.unobserve(entry.target);
    //         }
    //     });
    // }, { rootMargin: "200px" });

    // Object.values(Services).forEach(el => observer.observe(el));

    for (const key in Services) {
        Services[key].querySelector(".service-read-more").addEventListener("click", () => {
            if (typeof ServiceDetails === "function") {
                ServiceDetails(
                    servicesData[currentLang][key],
                    linksData[key],
                    descsData[currentLang][key],
                    key
                );
            }
        });
    }
});

let toSave = localStorage.getItem("toSave") || "";

function ServiceDetails(name, link, description, fclass) {
    let serviceName = document.querySelector(".service-name");
    let replace = document.querySelector('.html-replace');
    
    serviceName.textContent = name;

    toSave = fclass;
    localStorage.setItem("toSave", fclass);

    replace.innerHTML = description;
    
    const old = document.querySelector(".instagram-media");
    if (old) old.remove();

    const insta = document.createElement("blockquote");
    insta.className = 'instagram-media';
    insta.setAttribute('data-instgrm-permalink', link);
    insta.setAttribute('data-instgrm-version', '14');
    document.querySelector('.service-preview').appendChild(insta);

    if (window.instgrm) {
        window.instgrm.Embeds.process();
    }

    requestAnimationFrame(()=>{
        SD.style.display = "flex";
        requestAnimationFrame(()=>{
            SD.style.opacity = '1';
            SD.style.transform = "translate(-50%, -50%) scale(1)";
        })
    })
}

if (HCMessage) {
    HCMessage.addEventListener("input", ()=>{
        let length = HCMessage.value.length;
        HCharacters.textContent = `${length}/1000`;
    })
}

if (FBL) {
    FBL.addEventListener("click", ()=>{
        window.open("https://www.facebook.com/dawid.pierog");
    })
}

if (IGL) {
    IGL.addEventListener("click", ()=>{
        window.open("https://www.instagram.com/cardetailing_d.pierog")
    })
}

if (FBL2) {
    FBL2.addEventListener("click", ()=>{
        window.open("https://www.facebook.com/dawid.pierog");
    })
}

if (IGL2) {
    IGL2.addEventListener("click", ()=>{
        window.open("https://www.instagram.com/cardetailing_d.pierog")
    })
}

for (let key in Scroll) {
    if (Scroll[key]) {
        Scroll[key].addEventListener("click", () => {
            ScrollValue[key].scrollIntoView({ behavior: "smooth" });
        });
    }
}

window.addEventListener("scroll", ()=>{
    if (window.scrollY >= 345) {
        BackToTop.style.right = '0';
    } else {
        BackToTop.style.right = '-3vw';
    }
})

if (BackToTop) {
    BackToTop.addEventListener("click", ()=>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })
}

let int;

if (ShowAllServices) {
    ShowAllServices.addEventListener("click", ()=>{
        ASL.style.display = "block";

        setTimeout(() => {
            ASL.style.opacity = "1";
        }, 0);

        int = setInterval(() => {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        }, 10);
    })
}

if (MMServices) {
    MMServices.addEventListener("click", ()=>{
        ASL.style.display = "block";

        setTimeout(() => {
            ASL.style.opacity = "1";
        }, 0);

        int = setInterval(() => {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        }, 10);
    })
}

if (ContactUs) {
    const target = document.querySelector(".contact-page");
    if (target) {
        target.scrollIntoView({ behavior: "smooth" })
    }
}

async function setLanguage(lang) {
    const translations = await fetch(`./languages/${lang}.json`).then(res => res.json());

    document.querySelectorAll('[data-i18n]').forEach(el => {
        if (el.dataset.i18n !== 'mainTitle') {
            const key = el.dataset.i18n;
            if (translations[key]) el.textContent = translations[key];
        }
    });

    const mainDiv = document.querySelector('[data-i18n="mainTitle"]');
    if (mainDiv) {
        mainDiv.innerHTML = '';
        mainDiv.appendChild(document.createTextNode(translations.mainTitle));

        const spanHighlight = document.createElement('span');
        spanHighlight.className = 'highlight';
        spanHighlight.textContent = translations.mainTitleSpan;
        mainDiv.appendChild(spanHighlight);

        const spanEnd = document.createElement('span');
        spanEnd.className = 'end';
        spanEnd.textContent = translations.mainTitleEnd;
        mainDiv.appendChild(spanEnd);
    }

    if (translations.placeholders) {
        const { name, email, phone, message, submit } = translations.placeholders;

        const nameInput = document.querySelector('.name');
        if (nameInput) nameInput.placeholder = name || nameInput.placeholder;

        const emailInput = document.querySelector('.email');
        if (emailInput) emailInput.placeholder = email || emailInput.placeholder;

        const phoneInput = document.querySelector('.phone-number');
        if (phoneInput) phoneInput.placeholder = phone || phoneInput.placeholder;

        const messageTextarea = document.querySelector('.message-content');
        if (messageTextarea) messageTextarea.placeholder = message || messageTextarea.placeholder;

        const submitInput = document.querySelector('.send');
        if (submitInput) submitInput.value = submit || submitInput.value;
    }
}

setLanguage(currentLang)

for (const key in languages) {
    if (languages[key]) {
        languages[key].addEventListener("click", ()=>{
            currentLang = key;
            localStorage.setItem("currentLang", currentLang);
            location.reload();
        })
    }
}

let isTrue = true;

if (welcomeText) {
    document.addEventListener("DOMContentLoaded", ()=>{
        setTimeout(() => {
            welcomeText.style.opacity = "1";
            welcomeText.style.top = "20%";
        
            setTimeout(() => {
                welcomeTransition.style.width = "100vw";
        
                setTimeout(() => {
                    welcomeTransition.style.height = "100vh";
        
                    setTimeout(() => {
                        isTrue = false;
                        document.body.style.overflowY = "auto";
                        document.documentElement.style.overflowY = "auto";
                        welcomePage.style.transition = "none";
        
                        setTimeout(() => {
                            welcomePage.style.display = "none";
        
                            mainPageShow()
                        }, 1);
                    }, 1000);
                }, 1000);
            }, 1500);
        }, 500);
    })
}

const scrollToTopInterval = setInterval(() => {
    if (isTrue) {
        window.scrollTo({ top: 0, behavior: "auto" })
    } else {
        clearInterval(scrollToTopInterval);
    }
}, 100);

function revealOnScroll() {
    const hiddenElements = document.querySelectorAll('.hidden');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;

                const sequenceClasses = ['name', 'email', 'phone-number', 'message-content', 'send'];
                const sequenceClasses2 = ['mail', 'phone', 'pin'];
                const targetClassIndex = sequenceClasses.findIndex(cls => target.classList.contains(cls));
                const targetClassIndex2 = sequenceClasses2.findIndex(cls => target.classList.contains(cls));

                if (targetClassIndex !== -1) {
                    setTimeout(() => {
                        target.classList.remove('hidden');
                    }, 250 * targetClassIndex);
                } else if (targetClassIndex2 !== -1) {
                    setTimeout(() => {
                        setTimeout(() => {
                            target.classList.remove('hidden')
                        }, 250 * targetClassIndex2);
                    }, 1500);
                } else {
                    target.classList.remove('hidden');
                }

                observer.unobserve(target);
            }
        });
    }, {
        threshold: 0
    });

    hiddenElements.forEach(el => observer.observe(el));
}

window.addEventListener("DOMContentLoaded", revealOnScroll)

function mainPageShow() {
    let box = document.querySelector(".box");
    let mainTitle = document.querySelector(".main-title");
    let mainSubtitle = document.querySelector(".main-subtitle");
    let image1 = document.querySelector(".image-1");
    let image2 = document.querySelector(".image-2");
    let image3 = document.querySelector(".image-3");
    let mainButton1 = document.querySelector(".main-button-template.services");
    let mainButton2 = document.querySelector(".main-button-template.contact");
    let languages = document.querySelector(".languages");
    let menu = document.querySelector(".menu");

    setTimeout(() => {
        box.classList.remove("main-hidden");

        setTimeout(() => {
            mainTitle.classList.remove("main-hidden");

            setTimeout(() => {
                mainSubtitle.classList.remove("main-hidden");

                setTimeout(() => {
                    image1.classList.remove("main-hidden");
                    image2.classList.remove("main-hidden");
                    image3.classList.remove("main-hidden");

                    setTimeout(() => {
                        mainButton1.classList.remove("main-hidden");
                        mainButton2.classList.remove("main-hidden");

                        setTimeout(() => {
                            languages.classList.remove("main-hidden");
                            menu.classList.remove("main-hidden");
                        }, 800);
                    }, 800);
                }, 800);
            }, 800);
        }, 800);
    }, 100);
}

for (const key in contactButtons) {
    if (contactButtons[key]) {
        contactButtons[key].addEventListener("click", ()=>{
            if (cd.style.opacity === "0") {
                cd.textContent = contactDataList[key];
                setTimeout(() => {
                    cd.style.opacity = "1"
                }, 0);
            } else {
                cd.style.opacity = "0"
                
                setTimeout(() => {
                    cd.textContent = contactDataList[key];
                    setTimeout(() => {
                        cd.style.opacity = "1"
                    }, 10);
                }, 500);
            }
        })
    }
}

const vehicles = document.querySelectorAll(".vehicle");

if (vehicles) {
    vehicles.forEach(vehicle => {
        vehicle.addEventListener("mouseover", ()=>{
            const classes = vehicle.classList;
            let vehicleClass = Array.from(classes).find(c => c !== "vehicle");

            hoveredInfoVehicle.textContent = ServicesVehiclesName[currentLang][vehicleClass]
            hoveredInfo.style.opacity = "1";
        });

        vehicle.addEventListener("mouseout", ()=>{
            hoveredInfo.style.opacity = "0";
        })
    })
}

if (SDBack) {
    SDBack.addEventListener("click", ()=>{
        SD.style.opacity = "0";
        
        setTimeout(() => {
            SD.style.display = "none";
        }, 1000);
    })
}

if (ASLBack) {
    ASLBack.addEventListener("click", ()=>{
        ASL.style.opacity = '0';
        setTimeout(() => {
            ASL.style.display = "none";
        }, 1000);
    
        document.body.style.overflow = "auto";
        document.body.style.overflowY = "auto";
        document.body.style.overflowX = "hidden";
        document.documentElement.style.overflow = "auto";
        document.documentElement.style.overflowY = "auto";
        document.documentElement.style.overflowX = "hidden";
    
        clearInterval(int);
    })
}

if (prices) {
    prices.addEventListener("click", ()=>{
        window.location.href = "prices.html"
    })
}

// Price list part

function CreatePriceList(fclass, name, thumbnail, LOR) {
    let leftSide = document.querySelector(".left-side");
    let rightSide = document.querySelector(".right-side");

    const html = `<div class="pexm ${fclass} fh">
                    <div class="pexm-thumbnail" style="background-image: url(/img/${thumbnail});"></div>
                    <div class="pexm-footer">
                        <div class="pexm-name">${name}</div>
                    </div>
                </div>`
    
    if (leftSide && rightSide) {
        if (LOR < 4) {
            leftSide.insertAdjacentHTML("beforeend", html);
        } else {
            rightSide.insertAdjacentHTML("beforeend", html);
        }
    }
}
let i = 0;

let PLThumbnails = {
    "twoWheeler": "two-wheeler.jpg",
    "atv": "atv.jpg",
    "smallCars": "s-car1.jpg",
    "biggerCars": "s-car2.jpg",
    "trailer": "trailer.jpg",
    "suv": "suv.jpg",
    "deliveryTruck": "delitruck.jpg",
    "truck": "truck.jpg"
}

let PriceListBack = document.querySelector(".back-to-main2");

function UMC(selname, seldesc1, seldesc2) {
    let selectedName = document.querySelector(".selected-name");
    selectedName.textContent = selname;

    let TRSeldescLeft = document.querySelector(".seldesc-left-to-replace");
    let TRSeldescRight = document.querySelector(".seldesc-right-to-replace");

    TRSeldescLeft.innerHTML = seldesc1.join("");

    TRSeldescRight.innerHTML = Object.values(seldesc2).join("");
}

let names;
let seldescs;
let prcs;
let srcs;

let pls = document.querySelector(".plservice");

document.addEventListener("keydown", (event)=>{
    if(event.key=="Enter"){
        console.log(toSave)
    }
})

Promise.all([
    fetch('./translations/services-price-vehicle-titles.json').then(r => r.json()),
    fetch('./translations/seldescs.json').then(r => r.json()),
    fetch('./services-price-list.json').then(r => r.json()),
    fetch('./translations/services.json').then(r => r.json())
]).then(([namesData, seldescsData, prcsData, srcsData]) => {
    names = namesData;
    seldescs = seldescsData;
    prcs = prcsData;
    srcs = srcsData;

    let i = 0;
    for (const key in names["pl"]) {
        CreatePriceList(key, names[currentLang][key], PLThumbnails[key], i);
        i++;
    }

    const cards = document.querySelectorAll(".pexm");

    cards.forEach(element => {
        element.addEventListener("click", () => {
            UMC(names[currentLang][element.classList[1]], seldescs[currentLang][element.classList[1]], prcs[toSave][element.classList[1]]);
        });
    });

    if (pls) {
        pls.textContent = srcsData[currentLang][toSave];
    }
});

if (PriceListBack) {
    PriceListBack.addEventListener("click", ()=>{
        window.location.href = "index.html"
    })
}

const container = document.querySelector(".loading-container");
let progress = 0;
let direction = 0.55;
const waitText = document.querySelector(".title-text.wait");
const doneText = document.querySelector(".title-text.done");
const loading = document.querySelector(".loading");

function animate() {
    if (direction !== 0 && container) {
        container.style.opacity = "1"
        container.style.transform = "translateY(0)"
    }

    progress += direction * 1; 
    if (progress >= 100) {
        progress = 100;
        direction = 0;

        if (waitText && doneText) {
            waitText.style.opacity = "0";
            waitText.style.transform = "translateY(-100%)";
            doneText.style.opacity = "1";
            doneText.style.transform = "translateY(0)";
        }

        setTimeout(() => {
            if (container) {
                container.style.opacity = "0";
                container.style.transform = "translateY(3vw)";
            }

            if (loading) {
                loading.style.opacity = "0";
                setTimeout(() => {
                    loading.style.display = "none";
                }, 500);
            }
        }, 1000);
    }

    if (container) {
        container.style.background = `conic-gradient(#ffd613 0% ${progress}%, #0000 0% 100%)`;
    }

    requestAnimationFrame(animate);
}

document.addEventListener("DOMContentLoaded", ()=>{
    setTimeout(() => {
        if (container && waitText && doneText) {
            animate();
        }
    }, 1250);
})

// Locations page
let pin = document.querySelector(".pin");
let locationsBack = document.querySelector(".locations-back");

if(pin){
    pin.addEventListener("click", () => {
        window.location.href = "locations.html"
    })
}

if (locationsBack){
    locationsBack.addEventListener("click", () => {
        window.location.href = "index.html"
    })
}

document.addEventListener("DOMContentLoaded", ()=>{
    animate();
})

// Visit page

let info = document.querySelector(".info-box-wrapper")
let iContent = document.querySelector(".info");
let iTimer = document.querySelector(".timer")
let functionCalled = false;

let nameInfo = document.querySelector(".name-info")
let infoContainer = document.querySelector(".info-container")

function ShowInfo(infoContent, seconds) {
    if (info && iContent && iTimer) {
        iTimer.textContent = `${seconds}s`

        info.style.transform = "translate(-50%, -50%) scale(1)";
        info.style.opacity = "1";
        
        iContent.textContent = infoContent;
    
        let time = seconds;
            
        let interval = setInterval(() => {
            if (time > 0) {
                time--;
            }
                
            if (time === 0) {
                clearInterval(interval);
                functionCalled = false;

                setTimeout(() => {
                    info.style.transform = "translate(-50%, -50%) scale(0)";
                    info.style.opacity = "0";
                }, 500);
            }
    
            iTimer.textContent = `${time}s`;
        }, 1000);
    }
}

function isValidName(name) {
    name = name.trim();

    const regex = /^[A-Za-zÀ-žŻŹĆĄŚĘŁÓŃżźćąśęłóń-]{3,}$/

    return regex.test(name);
}

function isValidPhone(phone) {
    const regex = /^\+([1-9][0-9]{0,2})\s/;
    const match = phone.match(regex);

    if (match) {
        const code = parseInt(match[1], 10);
        return code >= 1 && code <= 994;
    }

    return false;
}

function isValidEmail(email) {
    const regex = /^[^@]+@[^@]+\.[^@]+$/;
    return regex.test(email);
}

let inputs = {
    "name": document.querySelector(".visit-name"),
    "surname": document.querySelector(".visit-surname"),
    "phone": document.querySelector(".visit-phone"),
    "email": document.querySelector(".visit-email")
}

let next = document.querySelector(".next");

let AppFirst = document.querySelector(".first-column");
let AppSecond = document.querySelector(".second-column");
let AppThird = document.querySelector(".third-column");

function fadeOut(el, dur = 500) {
    el.style.opacity = "0";
    return new Promise(resolve => setTimeout(()=>{
        el.style.display = "none";
        resolve();
    }, dur))
}

function fadeIn(element, display = "flex", duration = 500) {
    element.style.display = display;
    element.style.opacity = "0";
    element.style.transition = `opacity ${duration}ms`;
    requestAnimationFrame(() => {
        element.style.opacity = "1";
    });
    return new Promise(resolve => setTimeout(resolve, duration));
}

if (next) {
    next.addEventListener("click", ()=>{
        let hasError = false;
        
        for (const key in inputs) {
            let currentInput = inputs[key];
    
            currentInput.classList.remove("error");
            currentInput.offsetHeight;
    
            if (currentInput.value.trim() === "") {
                currentInput.classList.add("error")
                hasError = true;
            }
        }
    
        if (hasError && !functionCalled) {
            ShowInfo("Wypełnij wszystkie pola!", 10);
            functionCalled = true;
            
            return;
        }
    
        if (!isValidName(inputs["name"].value) && !functionCalled) {
            ShowInfo("Podaj poprawne imię!", 10)
            functionCalled = true;
            
            return;
        }
    
        if (!isValidPhone(inputs["phone"].value) && !functionCalled) {
            ShowInfo("Podaj poprawny numer telefonu! (np.: +48 123456789)", 10)
            
            return;
        }
    
        if (!isValidEmail(inputs["email"].value) && !functionCalled) {
            ShowInfo("Podaj poprawny adres e-mail! (np. jan.kowalski@gmail.com)", 10)
            
            return;
        }
        fadeOut(AppFirst).then(() => fadeIn(AppSecond));
        document.querySelector(".second-stage").classList.add("current");
    })
}

let selected = document.querySelector(".selected");
let selected2 = document.querySelector(".selected2");
let list = document.querySelector(".list");
let list2 = document.querySelector(".list2")
let addService = document.querySelector(".add-service");

let visitServices;
let clicked;

let added = [];

function setupDropdown(selected, list) {
    let isAnimating = false;
    let isOpen = false;

    const showList = () => {
        if (isAnimating || isOpen) return;
        isAnimating = true;
        list.style.display = "flex";

        requestAnimationFrame(() => {
            list.style.opacity = "1";
            list.style.transform = "translate(0%, 0%) translateY(0vw)";
        });

        setTimeout(() => {
            isAnimating = false;
            isOpen = true;
        }, 500);
    };

    const hideList = () => {
        if (isAnimating || !isOpen) return;
        isAnimating = true;
        list.style.opacity = "0";
        list.style.transform = "translate(0%, 0%) translateY(2vw)";

        setTimeout(() => {
            list.style.display = "none";
            isAnimating = false;
            isOpen = false;
        }, 500);
    };

    selected.addEventListener("click", (e) => {
        e.stopPropagation();
        if (isOpen) {
            hideList();
        } else {
            showList();
        }
    });

    document.addEventListener("click", (e) => {
        if (!selected.contains(e.target) && !list.contains(e.target)) {
            hideList();
        }
    });
}

if (selected && list) setupDropdown(selected, list);
if (selected2 && list2) setupDropdown(selected2, list2);

function VPSCreate(fclass, name, fos) {
    if (fos && fos === list) {
        const html = `<div class="element ${fclass}"> ${name}</div>`
        fos.insertAdjacentHTML("beforeend", html);
    } else if (fos) {
        const html = `<div class="element e2 ${fclass}"> ${name}</div>`
        fos.insertAdjacentHTML("beforeend", html);
    }
}

let as = document.querySelector(".added-services")

function addToList(what, translated, ac) {
    if (ac === 1) {
        if (as.querySelector(`.added.${what}`)) {
            return;
        }
        
        const html = `<div title="Kliknij aby usunąć" class="added ${what}">${translated}</div>`
        
        as.insertAdjacentHTML("beforeend", html);
    } else if (ac === 0) {
        const el = as.querySelector(`.added.${what}`);
        if (el) {
            el.remove();
        }
    }
}

fetch('./translations/services.json').then(r=>r.json()).then(data => {
    visitServices = data;

    for (const key in visitServices["pl"]) {
        VPSCreate(key, visitServices[currentLang][key], list);
    }
    
    let created = document.querySelectorAll(`.element`);

    created.forEach((el)=>{
        let searched = el.classList[1];

        el.addEventListener("click", ()=>{
            let text = visitServices[currentLang][searched]
            let maxLength = 23;
            if (text.length > maxLength) {
                text = text.slice(0, maxLength - 3) + "...";
            }
            selected.textContent = text;
            
            clicked = searched;

            list.style.opacity = "0";
            list.style.transform = "translate(0%, 0%) translateY(2vw)";

            setTimeout(() => {
                list.style.display = "none";
            }, 500);
        })
    })

    if (addService) {
        addService.addEventListener("click", ()=>{
            if (clicked !== "" && clicked !== undefined) {
                if (!added.includes(clicked)) {
                    added.push(clicked);
    
                    added.forEach((el)=>{
                        addToList(el, visitServices[currentLang][el], 1);
                    })
                    
                    let addedServices = document.querySelectorAll(`.added`);
                    
                    addedServices.forEach((el)=>{
                        el.addEventListener("click", ()=>{
                            let c = el.classList[1];
    
                            const index = added.indexOf(c);
                            if (index !== -1) {
                                added.splice(index, 1);
                            }
    
                            addToList(c, visitServices[currentLang][el], 0);
                        })
                    })
                }
            }
        })
    }
})

let v;

fetch('./translations/vehicles-translated.json').then(r=>r.json()).then(data => {
    v = data;

    for (const key in v["pl"]) {
        VPSCreate(key, v[currentLang][key], list2)
    }

    let l2b = document.querySelectorAll(".element.e2");

    l2b.forEach((e)=>{
        e.addEventListener("click", ()=>{
            selected2.textContent = v[currentLang][e.classList[2]];
        })
    })
})

let next2 = document.querySelector(".next2");
let makeAppointment = document.querySelector(".make-appointment");
let addPerson = document.querySelector(".add-new-person");
let newPersonList = document.querySelector(".new-person-list");

let addedPersons = [];

let inputs2 = {
    "date": document.querySelector(".visit-date"),
    "time": document.querySelector(".visit-time"),
    "plate": document.querySelector(".visit-plate")
}

let inputs3 = {
    "newName": document.getElementById("n-name"),
    "newSurname": document.getElementById("n-surname"),
    "newID": document.getElementById("n-id")
}

let dft = {
    "pl": "Wybierz rodzaj pojazdu"
}

function isValidTime(time) {
    const timeValue = time.value;
    const [hoursStr, minutesStr] = timeValue.split(":");
    
    const hours = Number(hoursStr);

    return hours > 8 && hours < 22
}

function isVehicleChecked() {
    let isChecked = (selected2.textContent === dft[currentLang]);
    return !isChecked;
}

function NoServicesAdded() {
    let isAdded = (as.innerHTML === "");
    return isAdded;
}

function isRadioChecked() {
    const radio1 = document.querySelector(".prefer-sms");
    const radio2 = document.querySelector(".prefer-email");

    if (radio1.checked || radio2.checked) {
        return true;
    }

    return false;
}

function addNew(name, sur, id) {
    let formula = `${name}${id}`;

    if (!addedPersons.includes(formula)) {
        const html = `<div title="Kliknij aby usunąć" class="new-person" data-formula="${formula}">${name} ${sur}, ${id}</div>`
        newPersonList.insertAdjacentHTML("beforeend", html);
                
        const newElement = newPersonList.querySelector(`.new-person[data-formula="${formula}"]`);
        newElement.addEventListener("click", ()=>{
            newElement.remove();

            const formulaValue = newElement.dataset.formula;
            const index = addedPersons.indexOf(formulaValue);
            if (index > -1) {
                addedPersons.splice(index, 1);
            }
        })
        
        addedPersons.push(formula);
    }
}

if(next2) {
    next2.addEventListener("click", ()=>{
        let hasError = false;
    
        for (const key in inputs2) {
            let currentInput = inputs2[key];
    
            currentInput.classList.remove("error");
            currentInput.offsetHeight;
    
            if (currentInput.value.trim() === "") {
                currentInput.classList.add("error")
                hasError = true;
            }
        }
    
        if (hasError && !functionCalled) {
            ShowInfo("Wypełnij wszystkie pola!", 10);
            functionCalled = true;
            return;
        }

        if (!isValidTime(inputs2["time"]) && !functionCalled) {
            ShowInfo("Godzina musi być w przedziale 8:00–22:00", 10)
            return;
        }

        if (!isVehicleChecked()) {
            ShowInfo("Wybierz rodzaj pojazdu!", 10);
            return;
        }

        if (NoServicesAdded()) {
            ShowInfo("Wybierz usługę!", 10);
            return;
        }

        fadeOut(AppSecond).then(() => fadeIn(AppThird));
        document.querySelector(".third-stage").classList.add("current");
    })
}

if (makeAppointment) {
    makeAppointment.addEventListener("click", ()=>{
        if (!isRadioChecked()) {
            ShowInfo("Zaznacz preferowaną formę kontaktu!", 10)
        }
    })
}

if (addPerson){
    addPerson.addEventListener("click", ()=>{
        for (const key in inputs3) {
            if (inputs3[key].value === "") {
                ShowInfo("Podaj brakujące informacje!", 10)
            }
        }

        if (inputs3["newID"].value.length === 4) {
            if (inputs3["newName"].value.length >= 3 && inputs3["newSurname"].value.length > 0) {
                addNew(inputs3["newName"].value, inputs3["newSurname"].value, inputs3["newID"].value);
            }
        }
    })
}

let AMake = document.querySelector(".a-make");

if (AMake) {
    AMake.addEventListener("click", ()=>{
        window.location.href = "visit.html";
    })
}

let date = new Date();
let year = date.getFullYear();

let footer = `&copy; ${year} COMPANY. Wszelkie prawa zastrzeżone`;
let footerContent = document.querySelector(".footer-content");

if (footerContent) {
    footerContent.innerHTML = footer;
}

let OpenAll = document.querySelector(".open-all-blog");

if(OpenAll) {
    OpenAll.addEventListener("click", ()=>{
        window.location.href = "blog.html";
    })
}
