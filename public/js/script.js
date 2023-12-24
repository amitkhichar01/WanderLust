(() => {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.from(forms).forEach((form) => {
        form.addEventListener(
            "submit",
            (event) => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add("was-validated");
            },
            false
        );
    });
})();


const flashMsg = document.querySelector(".alert");
console.log(flashMsg);

if (flashMsg) {
    setTimeout(() => {
        flashMsg.style.display = "none";
    }, 10000);

    flashMsg.addEventListener("click", () => {
        flashMsg.style.display = "none";
    });
}

let center = [75.4022, 28.1317];
const map = tt.map({
    key: mapToken,
    container: "map",
    center: center,
    zoom: 10,
});
map.on("load", () => {
    new tt.Marker().setLngLat(center).addTo(map);
});

