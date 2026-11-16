
/* =========================================
   EMPLOYEE MANAGEMENT SYSTEM
   PROFESSIONAL PINK THEME JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // 1. SIDEBAR OPEN AND CLOSE
    const sidebar = document.querySelector(".sidebar");
    const menuBtn = document.querySelector("#menu-toggle");

    if (sidebar && menuBtn) {
        menuBtn.addEventListener("click", function () {
            sidebar.classList.toggle("sidebar-open");
        });
    }

    // 2. CURRENT DATE AND TIME
    function updateDateTime() {
        const dateElement = document.getElementById("current-datetime");

        if (dateElement) {
            const now = new Date();

            dateElement.textContent = now.toLocaleString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            });
        }
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);


    // 3. EMPLOYEE TABLE SEARCH
    const searchInput = document.getElementById("employee-search");

    if (searchInput) {
        searchInput.addEventListener("input", function () {

            const searchValue = this.value.toLowerCase();
            const rows = document.querySelectorAll(
                "#employee-table tbody tr"
            );

            rows.forEach(function (row) {
                const rowText = row.textContent.toLowerCase();

                row.style.display = rowText.includes(searchValue)
                    ? ""
                    : "none";
            });
        });
    }


    // 4. DELETE EMPLOYEE CONFIRMATION
    const deleteButtons = document.querySelectorAll(
        "[data-confirm-delete]"
    );

    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {

            const confirmed = confirm(
                "Are you sure you want to delete this employee?"
            );

            if (!confirmed) {
                event.preventDefault();
            }
        });
    });


    // 5. FORM VALIDATION
    const forms = document.querySelectorAll(
        "form[data-validate]"
    );

    forms.forEach(function (form) {
        form.addEventListener("submit", function (event) {

            const requiredFields = form.querySelectorAll(
                "input[required], select[required], textarea[required]"
            );

            let valid = true;

            requiredFields.forEach(function (field) {

                if (!field.value.trim()) {
                    valid = false;
                    field.style.borderColor = "#dc2626";
                } else {
                    field.style.borderColor = "#f9a8d4";
                }
            });

            if (!valid) {
                event.preventDefault();

                showNotification(
                    "Please fill in all required fields.",
                    "error"
                );
            }
        });
    });


    // 6. NOTIFICATION MESSAGE
    window.showNotification = function (message, type = "success") {

        const notification = document.createElement("div");

        notification.className = "js-notification " + type;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(function () {
            notification.classList.add("show");
        }, 10);

        setTimeout(function () {
            notification.classList.remove("show");

            setTimeout(function () {
                notification.remove();
            }, 300);

        }, 3000);
    };


    // 7. AUTO HIDE DJANGO MESSAGES
    const alerts = document.querySelectorAll(".alert");

    alerts.forEach(function (alert) {
        setTimeout(function () {
            alert.style.transition = "opacity 0.5s ease";
            alert.style.opacity = "0";

            setTimeout(function () {
                alert.remove();
            }, 500);

        }, 4000);
    });


    // 8. TABLE ROW HIGHLIGHT
    const tableRows = document.querySelectorAll("tbody tr");

    tableRows.forEach(function (row) {

        row.addEventListener("mouseenter", function () {
            this.style.transition = "background 0.2s ease";
        });

    });


    // 9. EMAIL VALIDATION
    const emailFields = document.querySelectorAll(
        'input[type="email"]'
    );

    emailFields.forEach(function (field) {

        field.addEventListener("blur", function () {

            if (this.value.trim() && !this.validity.valid) {
                this.style.borderColor = "#dc2626";
                this.setCustomValidity("Please enter a valid email address.");
            } else {
                this.style.borderColor = "#f9a8d4";
                this.setCustomValidity("");
            }
        });

        field.addEventListener("input", function () {
            this.setCustomValidity("");
        });
    });


    // 10. SCROLL TO TOP
    const topButton = document.getElementById("scroll-top");

    if (topButton) {

        window.addEventListener("scroll", function () {
            topButton.style.display =
                window.scrollY > 300 ? "block" : "none";
        });

        topButton.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

});
