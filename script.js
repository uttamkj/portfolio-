// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Save theme preference
    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    
    // Add animation effect
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Animate Elements on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .project-card, .skill-category, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Simple form validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Here you would typically send the data to a backend service
    // For now, we'll just show a success message
    console.log('Form Data:', formData);
    
    showNotification('Thank you! Your message has been sent successfully.', 'success');
    contactForm.reset();
});

// Notification System
function showNotification(message, type = 'success') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'var(--accent-primary)' : '#e74c3c'};
        color: white;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add notification animations to stylesheet dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Download Resume Functionality
const downloadResumeBtn = document.getElementById('downloadResume');

downloadResumeBtn.addEventListener('click', () => {
    // Create a simple resume content
    const resumeContent = generateResumeHTML();
    
    // Create a Blob from the HTML content
    const blob = new Blob([resumeContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Uttam_Kumar_Jena_Resume.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL
    URL.revokeObjectURL(url);
    
    showNotification('Resume downloaded successfully!', 'success');
});

// Generate Resume HTML
function generateResumeHTML() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Uttam Kumar Jena - Resume</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem;
            background: #f9f9f9;
        }
        
        .resume-container {
            background: white;
            padding: 3rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        header {
            text-align: center;
            border-bottom: 3px solid #2C5F2D;
            padding-bottom: 1.5rem;
            margin-bottom: 2rem;
        }
        
        h1 {
            font-size: 2.5rem;
            color: #2C5F2D;
            margin-bottom: 0.5rem;
        }
        
        .title {
            font-size: 1.3rem;
            color: #555;
            margin-bottom: 1rem;
        }
        
        .contact-info {
            display: flex;
            justify-content: center;
            gap: 2rem;
            flex-wrap: wrap;
            font-size: 0.95rem;
            color: #666;
        }
        
        .contact-info a {
            color: #2C5F2D;
            text-decoration: none;
        }
        
        section {
            margin-bottom: 2rem;
        }
        
        h2 {
            color: #2C5F2D;
            font-size: 1.5rem;
            border-bottom: 2px solid #e0e0e0;
            padding-bottom: 0.5rem;
            margin-bottom: 1rem;
        }
        
        .job-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 0.5rem;
        }
        
        h3 {
            color: #333;
            font-size: 1.2rem;
        }
        
        .date {
            color: #2C5F2D;
            font-weight: 600;
            font-size: 0.95rem;
        }
        
        .company {
            color: #666;
            font-style: italic;
            margin-bottom: 0.5rem;
        }
        
        ul {
            margin-left: 1.5rem;
            margin-bottom: 1rem;
        }
        
        li {
            margin-bottom: 0.5rem;
            color: #555;
        }
        
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
        }
        
        .skill-category h3 {
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
            color: #2C5F2D;
        }
        
        .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            list-style: none;
            margin: 0;
        }
        
        .skills-list li {
            background: #f0f0f0;
            padding: 0.4rem 0.8rem;
            border-radius: 4px;
            font-size: 0.9rem;
            color: #333;
            margin: 0;
        }
        
        .summary {
            background: #f5f5f5;
            padding: 1.5rem;
            border-left: 4px solid #2C5F2D;
            margin-bottom: 2rem;
            color: #555;
            line-height: 1.8;
        }
        
        @media print {
            body {
                background: white;
                padding: 0;
            }
            
            .resume-container {
                box-shadow: none;
                padding: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="resume-container">
        <header>
            <h1>Uttam Kumar Jena</h1>
            <p class="title">Software Engineer</p>
            <div class="contact-info">
                <span>📧 <a href="mailto:uttamkumarjena507@gmail.com">uttamkumarjena507@gmail.com</a></span>
                <span>💼 <a href="https://www.linkedin.com/in/uttam-kumar-jena/">LinkedIn</a></span>
                <span>💻 <a href="https://github.com/uttamkumarjena">GitHub</a></span>
            </div>
        </header>
        
        <div class="summary">
            <p>Enthusiastic and detail-oriented Computer Science postgraduate with hands-on experience in full-stack development, Java programming, and dynamic web applications. Passionate about solving real-world problems and eager to contribute to a collaborative tech-driven team.</p>
        </div>
        
        <section>
            <h2>Professional Experience</h2>
            <div class="job-header">
                <h3>Software Engineer</h3>
                <span class="date">June 2024 - Present</span>
            </div>
            <p class="company">TECHNOSHRINE INFOSOLUTIONS</p>
            <ul>
                <li>Add your key responsibilities and achievements here</li>
                <li>Developed and maintained full-stack applications</li>
                <li>Collaborated with cross-functional teams</li>
            </ul>
        </section>
        
        <section>
            <h2>Projects</h2>
            <div style="margin-bottom: 1.5rem;">
                <h3>Project Name 1</h3>
                <p style="color: #666; margin-bottom: 0.5rem;">Add project description and technologies used</p>
            </div>
            <div style="margin-bottom: 1.5rem;">
                <h3>Project Name 2</h3>
                <p style="color: #666; margin-bottom: 0.5rem;">Add project description and technologies used</p>
            </div>
        </section>
        
        <section>
            <h2>Technical Skills</h2>
            <div class="skills-grid">
                <div class="skill-category">
                    <h3>Languages</h3>
                    <ul class="skills-list">
                        <li>Java</li>
                        <li>JavaScript</li>
                        <li>Python</li>
                        <li>SQL</li>
                        <li>HTML/CSS</li>
                    </ul>
                </div>
                <div class="skill-category">
                    <h3>Frameworks</h3>
                    <ul class="skills-list">
                        <li>Spring Boot</li>
                        <li>React</li>
                        <li>Node.js</li>
                        <li>Express</li>
                    </ul>
                </div>
                <div class="skill-category">
                    <h3>Databases</h3>
                    <ul class="skills-list">
                        <li>MySQL</li>
                        <li>PostgreSQL</li>
                        <li>MongoDB</li>
                    </ul>
                </div>
                <div class="skill-category">
                    <h3>Tools</h3>
                    <ul class="skills-list">
                        <li>Git</li>
                        <li>Docker</li>
                        <li>AWS</li>
                        <li>REST APIs</li>
                    </ul>
                </div>
            </div>
        </section>
        
        <section>
            <h2>Education</h2>
            <div class="job-header">
                <h3>Master of Computer Applications (MCA)</h3>
                <span class="date">Year</span>
            </div>
            <p class="company">University Name</p>
        </section>
    </div>
</body>
</html>
    `;
}

// Parallax Effect for Hero Section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// Typing Effect for Name (Optional - can be enabled)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment below to enable typing effect on page load
// window.addEventListener('load', () => {
//     const nameElement = document.querySelector('.name');
//     const originalText = nameElement.textContent;
//     typeWriter(nameElement, originalText, 80);
// });

// Console Easter Egg
console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #2C5F2D;');
console.log('%cLooking for something? Feel free to reach out!', 'font-size: 14px; color: #666;');
console.log('%c📧 uttamkumarjena507@gmail.com', 'font-size: 14px; color: #2C5F2D;');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for initial animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    console.log('Portfolio initialized successfully!');
});
