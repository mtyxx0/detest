let currentLang = localStorage.getItem("currentLang") || "pl";

let languages = {
    "pl": document.querySelector(".polish"),
    "en": document.querySelector(".english"),
    "ru": document.querySelector(".russian"),
    "uk": document.querySelector(".ukrainian"),
    "es": document.querySelector(".spanish")
}

const blogFiles = [];

let HCharacters = document.querySelector(".characters");
let HCMessage = document.querySelector(".message-content");

const FBL = document.getElementById("FBL");
const IGL = document.getElementById("IGL");
const FBL2 = document.getElementById("FBL2");
const IGL2 = document.getElementById("IGL2");

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
    "blog": document.querySelector(".blog-scroll"),
    "contact": document.querySelector(".contact"),
}

let ScrollValue = {
    "home": document.querySelector(".main-page"),
    "services": document.querySelector(".services-page"),
    "about": document.querySelector(".about-page"),
    "blog": document.querySelector(".blog-page"),
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

    const [servicesData, imagesData, prDscData, descsData, linksData, translationsData] = await Promise.all([
        fetch('./translations/services.json').then(r => r.json()),
        fetch('img.json').then(r => r.json()),
        fetch('./translations/s_pr_dsc.json').then(r => r.json()),
        fetch('./translations/descriptions.json').then(r => r.json()),
        fetch('./links.json').then(r => r.json()),
        fetch(`./languages/${currentLang}.json`).then(r => r.json())
    ]);

    const Services = {};
    const fragment = document.createDocumentFragment();

    for (const key in servicesData[currentLang]) {
        const div = document.createElement("div");
        div.className = "service-new";

        div.innerHTML = `
            <div class="service-title">${servicesData[currentLang][key]}</div>
            <div class="service-thumbnail" data-src="img/${imagesData[key]}"></div>
            <div class="service-description">${prDscData[currentLang][key]}</div>
            <button class="service-read-more ${key}">${translationsData["service-new-read"]}</button>
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

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const thumb = entry.target.querySelector(".service-thumbnail");
                const src = thumb.getAttribute("data-src");
                thumb.style.backgroundImage = `url(${src})`;
                thumb.style.backgroundSize = "cover";
                thumb.style.backgroundPosition = "center";
                thumb.style.backgroundRepeat = "no-repeat";
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: "200px" });

    Object.values(Services).forEach(el => observer.observe(el));

        for (const key in Services) {
        Services[key].querySelector(".service-read-more").addEventListener("click", () => {
            if (typeof ServiceDetails === "function") {
                if (linksData[key] !== "") {
                    ServiceDetails(
                        servicesData[currentLang][key],
                        linksData[key],
                        descsData[currentLang][key],
                        key
                    );
                } else {
                    ServiceDetails(servicesData[currentLang][key], 0, descsData[currentLang][key], key)
                }
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

    if (link !== 0) {
        const insta = document.createElement("blockquote");
        insta.className = 'instagram-media';
        insta.setAttribute('data-instgrm-permalink', link);
        insta.setAttribute('data-instgrm-version', '14');
        document.querySelector('.service-preview').appendChild(insta);
    } else {
        let insta = document.querySelector("blockquote");

        if (insta) {
            insta.remove();
        }
    }

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
        ContactUs.addEventListener("click", ()=>{
            target.scrollIntoView({ behavior: "smooth" })
        })
    }
}

async function setLanguage(lang) {
    const translations = await fetch(`languages/${lang}.json`).then(res => res.json());

    document.querySelectorAll('[data-i18n]').forEach(el => {
        if (el.dataset.i18n !== 'mainTitle') {
            const key = el.dataset.i18n;
            if (translations[key]) el.textContent = translations[key];
        }
    });

    const updateText = (el) => {
        const key = el.dataset.i18n;
        if (translations[key]) el.textContent = translations[key];
    }

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

    const isMobile = window.innerHeight < 786;
    const blog = document.querySelector('[data-i18n="blogSubtitle"]');
    const blog2 = document.querySelector('[data-i18n="bLatestTitle"]');
    if (blog && isMobile) {
        blog.setAttribute('data-i18n', 'bLatestTitle2');
        updateText(blog);
    }

    if (blog2 && isMobile) {
        blog2.setAttribute('data-i18n', 'bLatestTitle2');
        updateText(blog2);
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
        const skipWelcome = sessionStorage.getItem("skipWelcome");

        if (skipWelcome) {
            sessionStorage.removeItem("skipWelcome");
            welcomePage.style.display = "none";
            mainPageShow();
            document.body.style.overflowY = "auto";
            document.documentElement.style.overflowY = "auto";
            isTrue = false;
            ASL.style.display = "block";

            setTimeout(() => { 
                ASL.style.opacity = "1";
            }, 0);
    
            int = setInterval(() => {
                document.body.style.overflow = "hidden";
                document.documentElement.style.overflow = "hidden";
            }, 10);

            window.scrollTo(0, 0);
        } else {
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
        }
    })
}

let OSBack = document.querySelector(".osback");

if (OSBack) {
    OSBack.addEventListener("click", ()=>{
        sessionStorage.setItem("skipWelcome", "true")
        window.location.href = "index.html";
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
                    <div class="pexm-thumbnail" style="background-image: url(img/${thumbnail});"></div>
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
let PriceListBack2 = document.querySelector(".back-to-main2-2");

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

if (PriceListBack2) {
    PriceListBack2.addEventListener("click", ()=>{
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
let functionCalled = false;

let nameInfo = document.querySelector(".name-info")
let infoContainer = document.querySelector(".info-container")

let visitContainer = document.querySelector(".visit-page.main-page")

function ShowInfo(infoContent, ats) {
    if (info && iContent && visitContainer) {
        if (ats !== "ATT") {
            functionCalled = true;
        
            visitContainer.scrollTo({ top: 0, behavior: "smooth"})
    
            visitContainer.style.overflow = "hidden";
    
            info.style.display = "flex";
            setTimeout(() => {
                info.style.opacity = "1";
            }, 0);
    
            window.addEventListener("keydown", (event)=>{
                if (event.code === "Space") {
                    event.preventDefault();
    
                    info.style.opacity = "0";
                    setTimeout(() => {
                        info.style.display = "none";
                        functionCalled = false;
                        visitContainer.style.overflowX = "hidden";
                        visitContainer.style.overflowY = "auto";
                    }, 1000);
                }
            })
            
            iContent.textContent = infoContent;
        } else {
            iContent.textContent = infoContent;
        }
    }
}

function isValidName(name) {
    name = name.trim();

    const regex = /^[A-Za-zÀ-žŻŹĆĄŚĘŁÓŃżźćąśęłóń-]{3,}$/

    return regex.test(name);
}

function isValidPhone(phone) {
    return /^\d+$/.test(phone);
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

let error = {
    "pl": {
        "001": "Wypełnij wszystkie pola!",
        "002": "Podaj poprawne imię!",
        "003": "Podaj poprawny numer telefonu!",
        "004": "Podaj poprawny adres e-mail!",
        "005": "Godzina musi być w przedziale 8:00–22:00",
        "006": "Wybierz rodzaj pojazdu!",
        "007": "Wybierz usługę!",
        "008": "Zaznacz preferowaną formę kontaktu!",
        "009": "Podaj brakujące informacje!",
    },

    "en": {
        "001": "Fill in all fields!",
        "002": "Enter a valid first name!",
        "003": "Enter a valid phone number!",
        "004": "Enter a valid email address!",
        "005": "The time must be between 8AM and 10PM",
        "006": "Select the type of vehicle!",
        "007": "Select a service!",
        "008": "Select your preffered method of contact!",
        "009": "Provide the missing information!"
    },
    
    "ru": {
        "001": "Заполните все поля!",
        "002": "Введите правильное имя!",
        "003": "Введите правильный номер телефона!",
        "004": "Введите правильный адрес электронной почты!",
        "005": "Время должно быть с 8:00 до 22:00",
        "006": "Выберите тип транспортного средства!",
        "007": "Выберите услугу!",
        "008": "Выберите предпочитаемый способ связи!",
        "009": "Укажите недостающую информацию!"
    },

    "es": {
        "001": "¡Rellena todos los campos!",
        "002": "¡Introduce un nombre válido!",
        "003": "¡Introduce un número de teléfono válido!",
        "004": "¡Introduce una dirección de correo electrónico válida!",
        "005": "La hora debe estar entre las 8:00 y las 22:00",
        "006": "¡Selecciona el tipo de vehículo!",
        "007": "¡Selecciona un servicio!",
        "008": "¡Selecciona tu método de contacto preferido!",
        "009": "¡Proporciona la información que falta!"
    },

    "uk": {
        "001": "Заповніть усі поля!",
        "002": "Введіть правильне ім'я!",
        "003": "Введіть правильний номер телефону!",
        "004": "Введіть правильну електронну адресу!",
        "005": "Час повинен бути між 8:00 та 22:00",
        "006": "Виберіть тип транспортного засобу!",
        "007": "Виберіть послугу!",
        "008": "Виберіть бажаний спосіб зв'язку!",
        "009": "Надайте відсутню інформацію!"
    }
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
            ShowInfo(error[currentLang]["001"], 3);
            functionCalled = true;
            
            return;
        }
    
        if (!isValidName(inputs["name"].value) && !functionCalled) {
            ShowInfo(error[currentLang]["002"], 3)
            functionCalled = true;
            
            return;
        }
        
        if (!isValidPhone(inputs["phone"].value) && !functionCalled) {
            ShowInfo(error[currentLang]["003"], 3)
            
            return;
        }

        if (!isValidEmail(inputs["email"].value) && !functionCalled) {
            ShowInfo(error[currentLang]["004"], 3)
            
            return;
        }

        fadeOut(AppFirst).then(() => fadeIn(AppSecond));
        document.querySelector(".second-stage").classList.add("current");
    })
}

let selected = document.querySelector(".selected");
let selected2 = document.querySelector(".selected2");
let list = document.querySelector(".list");
let list2 = document.querySelector(".list")
let addService = document.querySelector(".add-service");

let visitServices;
let clicked;

let added = [];

function setupDropdown(selected, listw) {
    let isAnimating = false;
    let isOpen = false;

    const handleKeydown = (event) => {
        if (event.code === "Space") {
            event.preventDefault();
            hideList();
            visitContainer.style.overflowX = "hidden";
            visitContainer.style.overflowY = "auto";
        }
    };

    const showList = () => {
        if (isAnimating || isOpen) return;
        isAnimating = true;
        isOpen = true;

        listw.style.display = "flex";
        requestAnimationFrame(() => {
            listw.style.opacity = "1";
        });

        listw.addEventListener("transitionend", function onTransitionEnd() {
            isAnimating = false;
            listw.removeEventListener("transitionend", onTransitionEnd);
        });

        window.addEventListener("keydown", handleKeydown);
    };

    const hideList = () => {
        if (isAnimating || !isOpen) return;
        isAnimating = true;

        listw.style.opacity = "0";

        listw.addEventListener("transitionend", function onTransitionEnd() {
            listw.style.display = "none";
            isAnimating = false;
            isOpen = false;
            listw.removeEventListener("transitionend", onTransitionEnd);
        });

        window.removeEventListener("keydown", handleKeydown);
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
        if (isOpen && !selected.contains(e.target) && !listw.contains(e.target)) {
            hideList();
            visitContainer.style.overflowX = "hidden";
            visitContainer.style.overflowY = "auto";
        }
    });
}

if (selected && list) setupDropdown(selected, list);
if (selected2 && list2) setupDropdown(selected2, list2);

let FOSChild = document.querySelector(".sr-list");
let as = document.querySelector(".added-services");
let selectedVehicle = "";

// --- FUNKCJE ---

function VPSCreate(fclass, name, fos) {
    const html = `<div class="element ${fclass}">${name}</div>`;
    fos.insertAdjacentHTML("beforeend", html);
}

function addToList(what, translated, ac) {
    if (ac === 1) {
        if (as.querySelector(`.added.${what}`)) return;

        let ttitle = currentLang === "pl" ? "Kliknij aby usunąć" : "Click to remove";
        const html = `<div title="${ttitle}" class="added ${what}">${translated}</div>`;
        as.insertAdjacentHTML("beforeend", html);
    } else if (ac === 0) {
        const el = as.querySelector(`.added.${what}`);
        if (el) el.remove();
    }
}

if (selected) {
    selected.addEventListener("click", () => {
        visitContainer.scrollTo({ top: 0, behavior: "smooth"})
        visitContainer.style.overflow = "hidden";
    
        FOSChild.innerHTML = "";
        fetch('./translations/services.json')
            .then(r => r.json())
            .then(data => {
                visitServices = data;
    
                for (const key in visitServices["pl"]) {
                    VPSCreate(key, visitServices[currentLang][key], FOSChild); // <-- tutaj wstawiamy do list
                }
    
                list.querySelectorAll(`.element`).forEach(el => {
                    let searched = el.classList[1];
                    el.addEventListener("click", () => {
                        let text = visitServices[currentLang][searched];
                        if (text.length > 23) text = text.slice(0, 20) + "...";
                        selected.textContent = text;
                        clicked = searched;
                        
                        selected.click();
                    });
                });
            });
    });
}

if (selected2) {
    selected2.addEventListener("click", () => {
        visitContainer.scrollTo({ top: 0, behavior: "smooth"})
        visitContainer.style.overflow = "hidden";
    
        FOSChild.innerHTML = "";
        fetch('./translations/vehicles-translated.json')
            .then(r => r.json())
            .then(data => {
                v = data;
    
                for (const key in v["pl"]) {
                    VPSCreate(`e2 ${key}`, v[currentLang][key], FOSChild);
                }
    
                FOSChild.querySelectorAll(".element.e2").forEach(e => {
                    e.addEventListener("click", () => {
                        selected2.textContent = v[currentLang][e.classList[2]];
                        selectedVehicle = v[currentLang][e.classList[2]];
                        
                        selected2.click();
                    });
                });
            });
    });
}

if (addService) {
    addService.addEventListener("click", () => {
        if (clicked && !added.includes(clicked)) {
            added.push(clicked);
            added.forEach(el => {
                addToList(el, visitServices[currentLang][el], 1);
            });

            document.querySelectorAll(`.added`).forEach(el => {
                el.addEventListener("click", () => {
                    let c = el.classList[1];
                    const index = added.indexOf(c);
                    if (index !== -1) added.splice(index, 1);
                    addToList(c, visitServices[currentLang][c], 0);
                });
            });
        }
    });
}

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
    let formula = `${name} ${sur} - ${id}`;

    if (!addedPersons.includes(formula)) {
        let ttitle = ""

        if (currentLang === "pl") {
            ttitle = "Kliknij aby usunąć"
        } else if (currentLang === "en") {
            ttitle = "Click to remove"
        }

        const html = `<div title="${ttitle}" class="new-person" data-formula="${formula}">${name} ${sur}, ${id}</div>`
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
            ShowInfo(error[currentLang]["001"], 3);
            functionCalled = true;
            return;
        }

        if (!isValidTime(inputs2["time"]) && !functionCalled) {
            ShowInfo(error[currentLang]["005"], 3)
            return;
        }

        if (selectedVehicle === "") {
            ShowInfo(error[currentLang]["006"], 3);
            return;
        }
        console.log(selectedVehicle)

        if (NoServicesAdded()) {
            ShowInfo(error[currentLang]["007"], 3);
            return;
        }

        fadeOut(AppSecond).then(() => fadeIn(AppThird));
        document.querySelector(".third-stage").classList.add("current");
    })
}

if (makeAppointment) {
    makeAppointment.addEventListener("click", ()=>{
        if (!isRadioChecked()) {
            ShowInfo(error[currentLang]["008"], 3)
        }
    })
}

if (addPerson){
    addPerson.addEventListener("click", ()=>{
        for (const key in inputs3) {
            if (inputs3[key].value === "") {
                ShowInfo(error[currentLang]["009"], 3)
            }
        }

        if (inputs3["newName"].value.length < 3) {
            ShowInfo(error[currentLang]["002"], 3)
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

let footer = `&copy; ${year} Pierog Detailing. <span class="copyright-text" data-i18n="copyright"></span>`;
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
            
let latest = document.querySelector(".latest-nothing")

async function loadBlogEntries() {
    const allListContainer = document.querySelector('.all-list');
    if (!allListContainer) return;

    try {

        if (blogFiles.length > 0) {
            latest.style.display = "none";
        }

        for (const file of blogFiles) {
            const res = await fetch(`/blogs/${file}`);
            if (!res.ok) continue;
            const blogData = await res.json();

            const entry = document.createElement('div');
            entry.classList.add('main-entry');
            
            const thumb = document.createElement('div');
            thumb.classList.add('main-entry-thumbnail');
            if (blogData.mainPhoto) {
                thumb.style.backgroundImage = `url(/blogs-thumbnails/${blogData.mainPhoto})`;
                thumb.style.backgroundSize = 'cover';
                thumb.style.backgroundPosition = 'center';
            }

            const titleWrapper = document.createElement('div');
            titleWrapper.classList.add('main-entry-title-wrapper');

            const descWrapper = document.createElement("div");
            descWrapper.classList.add("main-entry-blog-description");
            descWrapper.textContent = blogData.blogDesc || "Brak opisu";

            const title = document.createElement('div');
            title.classList.add('blog-main-entry-title');
            title.textContent = blogData.blogName || 'Brak tytułu';

            const openBtn = document.createElement('button');
            openBtn.classList.add('main-entry-open-blog');
            openBtn.innerHTML = '<i class="fal fa-arrow-up-right"></i>';

            openBtn.addEventListener("click", ()=>{
                const content = Array.isArray(blogData.content) ? blogData.content : [];
                sessionStorage.setItem('selectedBlogContent', JSON.stringify(content));   
                sessionStorage.setItem("image", JSON.stringify(blogData.mainPhoto));   
                sessionStorage.setItem("fltrs", JSON.stringify(blogData.allFilters));          
                window.location.href = "/entry.html"
            })

            const date = document.createElement("div");
            date.classList.add("main-entry-date");
            date.textContent = blogData.date || "Nieznana data";

            const filtersWrapper = document.createElement("div");
            filtersWrapper.classList.add("main-entry-blog-filters");
        

            titleWrapper.appendChild(title);
            titleWrapper.appendChild(openBtn);

            entry.appendChild(thumb);
            entry.appendChild(date);
            entry.appendChild(titleWrapper);
            entry.appendChild(descWrapper);

            allListContainer.appendChild(entry);
        }
    } catch (err) {
        console.error('Błąd przy wczytywaniu blogów:', err);
    }
}

document.addEventListener('DOMContentLoaded', loadBlogEntries);

let filtersTranslations = {
    "pcar": "Samochody osobowe",
    "suv": "SUV'y",
    "motorcycle": "Motocykle",
    "sports": "Samochody sportowe",
    "tut": "Poradnik",
    "review": "Recenzja",
    "wnd": "Mycie i dekontaminacja",
    "paintcorrection": "Korekta lakieru",
    "protection": "Zabezpieczenie",
    "interior": "Wnętrze",
    "rimntires": "Felgi i opony",
    "wnr": "Szyby i reflektory",
    "beginnerFriendly": "Dla początkujących",
    "intermediate": "Średniozaawansowany detailing",
    "advanced": "Profesjonalny detailing",
    "summer": "Pielęgnacja letnia",
    "winter": "Pielęgnacja zimowa"
}

document.addEventListener("DOMContentLoaded", () => {
    const addHere = document.querySelector(".add-here");
    if (!addHere) return;

    const blogRaw = sessionStorage.getItem("selectedBlogContent");
    if (!blogRaw) return;

    const blogImage = sessionStorage.getItem("image");
    if (!blogImage) return;

    let blog;
    try {
        blog = JSON.parse(blogRaw);
    } catch (err) {
        console.error("Błąd przy parsowaniu zawartości bloga:", err);
        return;
    }

    const filters = document.createElement("div");
    const rawFilters = sessionStorage.getItem("fltrs");
    const fixedRawFilters = JSON.parse(rawFilters);

    filters.classList.add("filters-list");
    
    fixedRawFilters.forEach((e)=>{
        const fwrap = document.createElement("div");
        fwrap.classList.add("fwrap");
        fwrap.textContent = filtersTranslations[e];
        filters.appendChild(fwrap);
    })
    
    addHere.appendChild(filters);

    const img = document.createElement("div");
    img.classList.add("main-image");
    img.style.backgroundImage = `url(blogs-thumbnails/${blogImage.replace(/['"]/g, '')})`;
    addHere.appendChild(img);

    const contentArray = blog;
    if (!Array.isArray(contentArray)) return;

    contentArray.forEach(item => {
        if (item.type === "text") {
            const textDiv = document.createElement("div");
            textDiv.classList.add("preview-text");
            textDiv.innerHTML = item.text || "";
            addHere.appendChild(textDiv);
        } else if (item.type === "image") {
            const otherDiv = document.createElement("div");
            otherDiv.classList.add("othd")

            const top = document.createElement("div");
            top.classList.add("other-photo-upper");
            top.textContent = item.topText || "";

            const photo = document.createElement("div");
            photo.classList.add("other-photo");
            if (item.src) {
                photo.style.backgroundImage = `url(/blogs-thumbnails/${item.src})`;
            }

            const bottom = document.createElement("div");
            bottom.classList.add("other-photo-under");
            bottom.textContent = item.bottomText || "";

            otherDiv.appendChild(top);
            otherDiv.appendChild(photo);
            otherDiv.appendChild(bottom);

            addHere.appendChild(otherDiv);
        }
    });
});

function parseDate(dateStr) {
    if (!dateStr) return new Date(0);
    const [day, month, year] = dateStr.split('.').map(Number);
    return new Date(2000 + year, month - 1, day);
}

async function getTop3NewestBlogs() {
    const blogs = [];

    for (const file of blogFiles) {
        const res = await fetch(`/blogs/${file}`);
        if (!res.ok) continue;

        const data = await res.json();
        blogs.push({
            file,
            ...data,
            parsedDate: parseDate(data.date)
        });
    }

    blogs.sort((a, b) => b.parsedDate - a.parsedDate);

    return blogs.slice(0, 3);
}

async function loadTop3NewestBlogs() {
    const latestListContainer = document.querySelector('.latest-list');
    const latestListMainContainer = document.querySelector(".three-sample");
    if (!latestListContainer && !latestListMainContainer) return;

    try {
        const top3Blogs = await getTop3NewestBlogs();

        const isMobile = window.innerWidth < 768;

        if ((latestListContainer || latestListMainContainer) && latest && top3Blogs.length > 0) {
            latest.style.display = "none";
        }

        const blogsToShow = isMobile ? top3Blogs.slice(0, 1) : top3Blogs;

        for (const blogData of blogsToShow) {
            const entry = document.createElement('div');
            entry.classList.add('main-entry');
            
            const thumb = document.createElement('div');
            thumb.classList.add('main-entry-thumbnail');
            if (blogData.mainPhoto) {
                thumb.style.backgroundImage = `url(/blogs-thumbnails/${blogData.mainPhoto})`;
                thumb.style.backgroundSize = 'cover';
                thumb.style.backgroundPosition = 'center';
            }

            const titleWrapper = document.createElement('div');
            titleWrapper.classList.add('main-entry-title-wrapper');

            const descWrapper = document.createElement("div");
            descWrapper.classList.add("main-entry-blog-description");
            descWrapper.textContent = blogData.blogDesc || "Brak opisu";

            const title = document.createElement('div');
            title.classList.add('blog-main-entry-title');
            title.textContent = blogData.blogName || 'Brak tytułu';

            const openBtn = document.createElement('button');
            openBtn.classList.add('main-entry-open-blog');
            openBtn.innerHTML = '<i class="fal fa-arrow-up-right"></i>';

            const date = document.createElement("div");
            date.classList.add("main-entry-date");
            date.textContent = blogData.date || "Nieznana data";

            const filtersWrapper = document.createElement("div");
            filtersWrapper.classList.add("main-entry-blog-filters");

            titleWrapper.appendChild(title);
            titleWrapper.appendChild(openBtn);

            entry.appendChild(thumb);
            entry.appendChild(date);
            entry.appendChild(titleWrapper);
            entry.appendChild(descWrapper);

            const clone1 = entry.cloneNode(true);
            const clone2 = entry.cloneNode(true);
            
            if (latestListContainer) {
                latestListContainer.appendChild(clone1);
                clone1.querySelector('.main-entry-open-blog').addEventListener("click", ()=> {
                    const content = Array.isArray(blogData.content) ? blogData.content : [];
                    sessionStorage.setItem('selectedBlogContent', JSON.stringify(content));   
                    sessionStorage.setItem("image", JSON.stringify(blogData.mainPhoto));   
                    sessionStorage.setItem("fltrs", JSON.stringify(blogData.allFilters));          
                    window.location.href = "/entry.html"
                });
            }
            
            if (latestListMainContainer) {
                latestListMainContainer.appendChild(clone2);
                clone2.querySelector('.main-entry-open-blog').addEventListener("click", ()=> {
                    const content = Array.isArray(blogData.content) ? blogData.content : [];
                    sessionStorage.setItem('selectedBlogContent', JSON.stringify(content));   
                    sessionStorage.setItem("image", JSON.stringify(blogData.mainPhoto));   
                    sessionStorage.setItem("fltrs", JSON.stringify(blogData.allFilters));          
                    window.location.href = "/entry.html"
                });
            }
            
        }
    } catch (err) {
        console.error('Błąd przy wczytywaniu najnowszych blogów:', err);
    }
}

document.addEventListener('DOMContentLoaded', loadTop3NewestBlogs);

let entryBack = document.querySelector(".entry-back");
let blogBack = document.querySelector(".blog-back");

if (entryBack) {
    entryBack.addEventListener("click", ()=>{
        window.location.href = "blog.html"
    })
}

if (blogBack) {
    blogBack.addEventListener("click", ()=>{
        window.location.href = "index.html"
    })
}

let ServicesTranslation = [];

fetch('./translations/services.json').then(res=>res.json()).then(data => {
    ServicesTranslation = data;
})

if (window.location.pathname === "/visit.html") { 
    let toCheck = document.querySelector(".visit-name");

    if (toCheck) {
        emailjs.init("5i-8koClXzrxQ2s9t");

        document.querySelector(".make-appointment").addEventListener('click', function(event){
            event.preventDefault();
            
            const contactPrefer = document.querySelector('input[name="contact"]:checked');
            if (!contactPrefer) {
                allFilted = false;
                return;
            }
            
            const name = document.querySelector('.visit-name').value;
            const surname = document.querySelector('.visit-surname').value;
            const email = document.querySelector('.visit-email').value;
            const phone = document.querySelector('.visit-phone').value;
            const date = document.querySelector('.visit-date').value;
            const time = document.querySelector('.visit-time').value;
            const plate = document.querySelector('.visit-plate').value;
            const describing = document.querySelector('.visit-describing').value;
            const preference = document.querySelector('input[name="contact"]:checked')?.classList.contains('prefer-sms') ? 'sms' : document.querySelector('input[name="contact"]:checked')?.classList.contains('prefer-email') ? 'email' : '';          
            const services = [];
            const id = document.querySelector(".visit-new-id").value;

            added.forEach((e)=>{
                services.push(ServicesTranslation[currentLang][e]);
            })

            const templateParams = {name, surname, email, phone, date, time, plate, describing, preference, services, selectedVehicle, addedPersons};
            
            ShowInfo("Czekaj...", 10);

            emailjs.send('service_r4x3cbr', 'template_8ce20cj', templateParams)
                .then(function(response){
                    console.log('Wiadomość wysłana!', response.status, response.text);
                    ShowInfo('Dziękujemy! Twoja wiadomość została wysłana.', "ATT");
                }, function(error) {
                    console.error('Błąd przy wysyłaniu...', error);
                    ShowInfo('Ups! Coś poszło nie tak. Spróbuj ponownie.', "ATT");
                });
        });
    }
}

let newTranslations;

let navigationButtons = {
    "navHomeTitle": document.querySelector(".menu-button.home"),
    "navServicesTitle": document.querySelector(".menu-button.services"),
    "navAboutTitle": document.querySelector(".menu-button.about"),
    "navBlog-scrollTitle": document.querySelector(".menu-button.blog-scroll"),
    "navContactTitle": document.querySelector(".menu-button.contact")
}

let npin = document.querySelector(".pin.info");
let eBack = document.querySelector(".entry-back");
let bBack = document.querySelector(".blog-back");

fetch(`./languages/${currentLang}.json`).then(response => response.json()).then(data => {
    newTranslations = data;

    const path = window.location.pathname.split("/")[1];
    
    if (newTranslations[path]) {
        document.title = `Pierog Detailing - ${newTranslations[path]}`;
    }

    for (const key in navigationButtons) {
        if (navigationButtons[key]) {
            navigationButtons[key].title = newTranslations[key];
        }
    }

    if (npin) {
        npin.title = newTranslations["npin"];
    }

    if (eBack) {
        eBack.title = newTranslations["gBack"];
    }

    if (bBack) {
        bBack.title = newTranslations["navHomeTitle"];
    }
});

document.addEventListener("DOMContentLoaded", ()=>{
    const icon = document.querySelector(".input-icon");
    const input = document.querySelector("#time");

    const visitDescribing = document.querySelector(".visit-describing");
    const nMakeAppointment = document.querySelector("input.make-appointment");

    if (icon) {
        icon.addEventListener("click", ()=>{
            input.showPicker?.();
            input.focus();
        })
    }

    fetch(`./languages/${currentLang}.json`).then(r => r.json()).then(data => {
        if (visitDescribing && nMakeAppointment) {
            visitDescribing.placeholder = data["vdp"]
            nMakeAppointment.value = data["mav"]
        }
    })
})

fetch(`./languages/${currentLang}.json`).then(r => r.json()).then(data => {
    let back = document.querySelector(".osback");
    let back2 = document.querySelector(".back-to-main2-2");

    if (back) {
        back.title = data["lBack"];
        back2.title = data["navHomeTitle"];
    }
})

let empty = document.querySelector(".empty");
let latestNothing = document.querySelector(".latest-nothing");

if (blogFiles.length === 0) {
    if (empty) {
        empty.style.display = "flex";
    }

    if (latestNothing) {
        latestNothing.style.display = "block";
    }
} else {
    if (empty) {
        empty.style.display = "none";
    }

    if (latestNothing) {
        latestNothing.style.display = "none";
    }
}


    async function MakePrices(which) {
    const response = await fetch("/translations/seldescs.json");
    const translations = await response.json();

    const priceResponse = await fetch("/services-price-list.json");
    const prices = await priceResponse.json();

    const wrappers = {
        "twoWheeler": document.querySelector(".wrapper.wapwhe"),
        "atv": document.querySelector(".wrapper.wapatv"),
        "smallCars": document.querySelector(".wrapper.wapmso"),
        "biggerCars": document.querySelector(".wrapper.wapdso"),
        "trailer": document.querySelector(".wrapper.waptrl"),
        "deliveryTruck": document.querySelector(".wrapper.wapsds"),
        "suv": document.querySelector(".wrapper.wapsuv"),
        "truck": document.querySelector(".wrapper.waptr")
    };

    const targets = wrappers;

    for (const [key, wrapper] of Object.entries(wrappers)) {
        if (!wrapper) continue;
        const wrapperContent = wrapper.querySelector(".wrapper-content");
        const leftContent = wrapper.querySelector(".wrapper-content-left");
        const RightContent = wrapper.querySelector(".wrapper-content-right");
        if (!leftContent) continue;
        if (!RightContent) continue;

        leftContent.innerHTML = "";
        RightContent.innerHTML = "";

        const descDiv = document.createElement("div");
        descDiv.innerHTML = translations[currentLang][key].join(" ");
        leftContent.appendChild(descDiv);

        const priceData = prices[which]?.[key];
        if (priceData) {
            const priceDiv = document.createElement("div");

            const priceHTML = Object.values(priceData).join(" ");
            priceDiv.innerHTML = priceHTML;

            RightContent.appendChild(priceDiv);
        }
    }
}
