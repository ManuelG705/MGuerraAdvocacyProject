document.addEventListener('DOMContentLoaded', () => {
    // Function to initialize the petition form functionality
    function initPetition() {
        const signNowButton = document.getElementById('sign-now-button');
        const modal = document.getElementById('thanks-modal');
        const modalImage = document.getElementById('modal-image');
        const closeModalButton = document.getElementById('close-modal');
        const signatoriesList = document.getElementById('signatoriesList');
        const amountElement = document.getElementById('amount');
        const modalContent = document.getElementById('thanks-modal-content');
        const petitionForm = document.getElementById('sign-petition');

        if (!signNowButton || !modal || !modalImage || !closeModalButton || !signatoriesList || !amountElement || !modalContent || !petitionForm) {
            console.error('One or more required elements are missing from the DOM for the petition form.');
            return;
        }

        // Petition form functionality
        let signatoriesCount = 0;

        signNowButton.addEventListener('click', () => {
            const name = document.getElementById('petName').value;
            const hometown = document.getElementById('petHometown').value;
            const email = document.getElementById('petEmail').value;

            // Validate the form
            if (validateForm(name, hometown, email)) {
                const person = { name, hometown, email };
                addSignature(person);
                toggleModal(person);
            }
        });

        function validateForm(name, hometown, email) {
            // Basic validation
            if (name.length < 2 || hometown.length < 2 || email.length < 5) {
                alert('Please fill out all fields correctly.');
                return false;
            }
            return true;
        }

        function addSignature(person) {
            const newSignature = document.createElement('li');
            newSignature.textContent = `🖊️ ${person.name} supports this cause.`;
            signatoriesList.appendChild(newSignature);
            signatoriesCount++;
            amountElement.textContent = `${signatoriesCount} people have signed this petition and support this cause.`;
        }

        function toggleModal(person) {
            modal.style.display = 'flex';
            modalContent.textContent = `Thank you so much ${person.name}! Your support is invaluable.`;

            // Animate the image
            const intervalId = setInterval(scaleImage, 500);

            setTimeout(() => {
                clearInterval(intervalId);
                modal.style.display = 'none';  // Hide the modal after 4 seconds
            }, 4000);
        }

        let scaleFactor = 1;

        function scaleImage() {
            scaleFactor = (scaleFactor === 1) ? 0.8 : 1;
            modalImage.style.transform = `scale(${scaleFactor})`;
        }

        // Close modal button functionality
        closeModalButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Function to initialize the dark mode toggle
    function initDarkMode() {
        const themeButton = document.getElementById('theme-button');
        if (themeButton) {
            themeButton.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
            });
        }
    }

    // Function to initialize the contact form functionality
    function initContact() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) {
            console.error('Contact form is missing from the DOM.');
            return;
        }
        // Add contact form related functionality here
    }

    // Initialize features based on the presence of elements
    initDarkMode();
    if (document.getElementById('sign-now-button')) {
        initPetition();
    }
    if (document.getElementById('contact-form')) {
        initContact();
    }
});
