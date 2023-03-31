let images = [{
    url: "images/image1-slider.png",
    city: "Rostov-on-Don LCD admiral",
    apartment_area: "81 m2",
    repair_time: "3.5 months",
    repair_cost: "Upon request"
}, {
    url: "images/image2-slider.png",
    city: "Sochi Thieves",
    apartment_area: "105 m2",
    repair_time: "4 months",
    repair_cost: "Upon request"
}, {
    url: "images/image3-slider.png",
    city: "Rostov-on-Don Patriotic",
    apartment_area: "93 m2",
    repair_time: "3 months",
    repair_cost: "Upon request"
}];

function initSlider(options) {
    if (!images || !images.length) return;

    options = options || {
        dots: true,
        autoplay: false
    };

    let sliderImages = document.querySelector(".image0-1");
    let sliderArrows = document.querySelector(".arrows");
    let sliderDots = document.querySelector(".slider-dots");
    let sliderList1 = document.querySelector(".catalog-item1");
    let sliderList2 = document.querySelector(".catalog-item2");
    let sliderList3 = document.querySelector(".catalog-item3");

    initImages();
    initArrows();
    initList();

    if (options.dots) {
        initDots();
    }

    if (options.autoplay) {
        initAutoplay();
    }

    function initImages() {
        images.forEach((image, index) => {
            let imageDiv = `<div class="image n${index} ${index === 0 ? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
            sliderImages.innerHTML += imageDiv;
        });
    };

    function initList(num) {
        sliderList1.classList.add("active")
        sliderList1.addEventListener("click", function () {
            moveSlider(0)
            sliderList1.classList.add("active")
            sliderList2.classList.remove("active");
            sliderList3.classList.remove("active")
        })

        sliderList2.addEventListener("click", function () {
            moveSlider(1)
            sliderList2.classList.add("active")
            sliderList1.classList.remove("active");
            sliderList3.classList.remove("active")
        })

        sliderList3.addEventListener("click", function () {
            moveSlider(2)
            sliderList3.classList.add("active")
            sliderList2.classList.remove("active");
            sliderList1.classList.remove("active")
        })
    }

    function initDots() {
        images.forEach((image, index) => {
            let dot = `<div class="slider-dots-item n${index} ${index === 0 ? "active" : ""}" data-index="${index}"></div>`;
            sliderDots.innerHTML += dot;
        });
        sliderDots.querySelectorAll(".slider-dots-item").forEach(dot => {
            dot.addEventListener("click", function () {
                moveSlider(this.dataset.index);
                if (this.dataset.index == 0) {
                    sliderList1.classList.add("active")
                    sliderList2.classList.remove("active");
                    sliderList3.classList.remove("active")
                } else if (this.dataset.index == 1) {
                    sliderList2.classList.add("active")
                    sliderList1.classList.remove("active");
                    sliderList3.classList.remove("active")
                } else {
                    sliderList3.classList.add("active")
                    sliderList2.classList.remove("active");
                    sliderList1.classList.remove("active")
                }
            })
        })
    }

    function initArrows() {
        sliderArrows.querySelectorAll(".arrow").forEach(arrow => {
            arrow.addEventListener("click", function () {
                let curNumber = +sliderImages.querySelector(".active").dataset.index;
                let nextNumber;
                if (arrow.classList.contains("left-arrow")) {
                    nextNumber = curNumber === 0 ? images.length - 1 : curNumber - 1;
                } else {
                    nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
                }
                moveSlider(nextNumber);
                if (nextNumber == 0) {
                    sliderList1.classList.add("active")
                    sliderList2.classList.remove("active");
                    sliderList3.classList.remove("active")
                } else if (nextNumber == 1) {
                    sliderList2.classList.add("active")
                    sliderList1.classList.remove("active");
                    sliderList3.classList.remove("active")
                } else {
                    sliderList3.classList.add("active")
                    sliderList2.classList.remove("active");
                    sliderList1.classList.remove("active")
                }
            });
        });
    };

    function moveSlider(num) {
        sliderImages.querySelector(".active").classList.remove("active");
        sliderImages.querySelector(".n" + num).classList.add("active");

        if (options.dots) {
            sliderDots.querySelector(".active").classList.remove("active");
            sliderDots.querySelector(".n" + num).classList.add("active");
        }
        changeCity(num);
        changeApartmentArea(num);
        changeRepairTime(num);
    };

    function changeCity(num) {
        if (!images[num].city) return;
        let sliderTitle = document.querySelector(".slider-text1");
        sliderTitle.innerText = images[num].city;
    }

    function changeApartmentArea(num) {
        if (!images[num].apartment_area) return;
        let sliderTitle = document.querySelector(".slider-text2");
        sliderTitle.innerText = images[num].apartment_area;
    }

    function changeRepairTime(num) {
        if (!images[num].repair_time) return;
        let sliderTitle = document.querySelector(".slider-text3");
        sliderTitle.innerText = images[num].repair_time;
    }

    function initAutoplay() {
        setInterval(() => {
            let curNumber = +sliderImages.querySelector(".active").dataset.index;
            let nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
            moveSlider(nextNumber);
        }, options.autoplayInterval);
    }
};

let sliderOptions = {
    dots: true,
    autoplay: false,
    autoplayInterval: 5000
};

document.addEventListener("DOMContentLoaded", function () {
    initSlider(sliderOptions);
});