(function () {
    "use strict";

    // EmailJS Configuration
    // Replace with your actual EmailJS credentials
    const EMAILJS_CONFIG = {
        publicKey: "zF0aqs7S7fV4R-t6R",
        serviceId: "service_etvmdoh",
        templateId: "template_h11iq8f",
        confirmationTemplateId: "template_4a7676f",
    };

    // Initialize EmailJS
    function initEmailJS() {
        if (typeof emailjs !== "undefined") {
            emailjs.init({
                publicKey: EMAILJS_CONFIG.publicKey,
                blockHeadless: true,
                limitRate: {
                    throttle: 10000, // 10 seconds between requests
                },
            });
            console.log("EmailJS initialized successfully");
        } else {
            console.error("EmailJS library not loaded");
        }
    }

    // Form elements
    const contactForm = document.getElementById("contact-form");
    const formMessages = document.getElementById("form-messages");
    const submitBtn = contactForm?.querySelector('button[type="submit"]');
    const btnText = submitBtn?.querySelector(".tt-btn-text");
    const btnLoading = submitBtn?.querySelector(".tt-btn-loading");

    // Show loading state
    function showLoading() {
        if (submitBtn && btnText && btnLoading) {
            submitBtn.disabled = true;
            btnText.style.display = "none";
            btnLoading.style.display = "inline-block";
        }
    }

    // Hide loading state
    function hideLoading() {
        if (submitBtn && btnText && btnLoading) {
            submitBtn.disabled = false;
            btnText.style.display = "inline-block";
            btnLoading.style.display = "none";
        }
    }

    // Show message to user
    function showMessage(message, type = "success") {
        if (formMessages) {
            const alertClass = type === "success" ? "alert-success" : "alert-error";
            const iconClass = type === "success" ? "fa-check-circle" : "fa-exclamation-triangle";

            formMessages.innerHTML = `
                <div class="tt-alert ${alertClass}">
                    <i class="fas ${iconClass}"></i>
                    <span>${message}</span>
                </div>
            `;

            // Auto-hide success messages after 5 seconds
            if (type === "success") {
                setTimeout(() => {
                    if (formMessages) {
                        formMessages.innerHTML = "";
                    }
                }, 5000);
            }
        }
    }

    // Validate form
    function validateForm(formData) {
        const errors = [];

        if (!formData.user_help || formData.user_help.trim().length < 10) {
            errors.push("Please provide more details about how we can help you (minimum 10 characters)");
        }

        if (!formData.user_name || formData.user_name.trim().length < 2) {
            errors.push("Please enter your name (minimum 2 characters)");
        }

        if (!formData.user_email || !isValidEmail(formData.user_email)) {
            errors.push("Please enter a valid email address");
        }

        return errors;
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Send confirmation email to user
    async function sendConfirmationEmail(userEmail, userName) {
        try {
            const confirmationParams = {
                to_email: userEmail,
                to_name: userName,
                from_name: "Kease Studio",
            };

            await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.confirmationTemplateId, confirmationParams, {
                publicKey: EMAILJS_CONFIG.publicKey,
            });
            console.log("Confirmation email sent successfully");
        } catch (error) {
            console.error("Failed to send confirmation email:", error);
            // Don't show error to user for confirmation email failure
        }
    }

    // Handle form submission
    async function handleFormSubmit(event) {
        event.preventDefault();

        if (!contactForm) {
            console.error("Contact form not found");
            return;
        }

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Validate form
        const errors = validateForm(data);
        if (errors.length > 0) {
            showMessage(errors.join("<br>"), "error");
            return;
        }

        // Show loading state
        showLoading();

        try {
            // Prepare template parameters for the main email
            const templateParams = {
                from_name: data.user_name,
                from_email: data.user_email,
                message: data.user_help,
                to_name: "Kease Studio Team",
                to_email: "connect@kease.studio",
            };

            // Send main email to your business
            await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams, {
                publicKey: EMAILJS_CONFIG.publicKey,
            });

            // Send confirmation email to user (non-blocking)
            sendConfirmationEmail(data.user_email, data.user_name);

            // Show success message
            showMessage(
                `
                Thank you, ${data.user_name}! Your message has been sent successfully. 
                We'll get back to you soon at ${data.user_email}.
            `,
                "success"
            );

            // Reset form
            contactForm.reset();
        } catch (error) {
            console.error("EmailJS Error:", error);

            let errorMessage = "Sorry, there was an error sending your message. Please try again later.";

            if (error.text) {
                if (error.text.includes("rate")) {
                    errorMessage = "Please wait a moment before sending another message.";
                } else if (error.text.includes("template")) {
                    errorMessage = "There was a configuration error. Please contact us directly at connect@kease.studio";
                }
            }

            showMessage(errorMessage, "error");
        } finally {
            hideLoading();
        }
    }

    // Initialize when DOM is ready
    function init() {
        initEmailJS();

        if (contactForm) {
            contactForm.addEventListener("submit", handleFormSubmit);
            console.log("Contact form initialized");
        } else {
            console.error("Contact form not found in DOM");
        }
    }

    // Initialize when document is ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
