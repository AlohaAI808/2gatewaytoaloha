// Navigation scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('sticky-nav');
    } else {
        navbar.classList.remove('sticky-nav');
    }
});

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

// Smooth scrolling
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Budget Calculator
function calculateBudget() {
    const nights = parseInt(document.getElementById('nights').value);
    const travelers = parseInt(document.getElementById('travelers').value);
    const lodging = document.getElementById('lodging').value;
    const transport = document.getElementById('transport').value;
    const activitiesPercent = parseInt(document.getElementById('activities').value);
    
    // Lodging costs per night
    const lodgingCosts = {
        hostel: 32.5,
        budget: 75,
        mid: 125,
        luxury: 250
    };
    
    // Transport costs per day
    const transportCosts = {
        bus: 3.5,
        car: 47.5,
        uber: 30
    };
    
    // Calculate costs
    const lodgingTotal = lodgingCosts[lodging] * nights;
    const transportTotal = transportCosts[transport] * nights;
    const foodPerDay = 35; // Average budget food cost
    const foodTotal = foodPerDay * nights * travelers;
    const activitiesPerDay = (activitiesPercent / 100) * 40; // Max $40/day activities
    const activitiesTotal = activitiesPerDay * nights * travelers;
    
    const totalCost = (lodgingTotal + transportTotal + foodTotal + activitiesTotal) * travelers;
    const perPersonCost = totalCost / travelers;
    const perDayCost = totalCost / nights;
    
    // Display results
    const resultDiv = document.getElementById('budget-result');
    const detailsDiv = document.getElementById('budget-details');
    
    detailsDiv.innerHTML = `
        <div class="space-y-2">
            <div class="flex justify-between">
                <span>Total Trip Cost:</span>
                <span class="font-bold">$${totalCost.toFixed(0)}</span>
            </div>
            <div class="flex justify-between">
                <span>Per Person:</span>
                <span class="font-bold">$${perPersonCost.toFixed(0)}</span>
            </div>
            <div class="flex justify-between">
                <span>Per Day:</span>
                <span class="font-bold">$${perDayCost.toFixed(0)}</span>
            </div>
            <hr class="border-white border-opacity-30 my-3">
            <div class="text-sm space-y-1">
                <div>Lodging: $${lodgingTotal.toFixed(0)}</div>
                <div>Transport: $${transportTotal.toFixed(0)}</div>
                <div>Food: $${foodTotal.toFixed(0)}</div>
                <div>Activities: $${activitiesTotal.toFixed(0)}</div>
            </div>
        </div>
        <div class="mt-4 p-3 bg-yellow-400 text-ink rounded-lg">
            <p class="font-semibold text-sm">💡 Money-Saving Tips:</p>
            <ul class="text-xs mt-2 space-y-1">
                <li>• Book accommodations early for better rates</li>
                <li>• Use public transport and walk when possible</li>
                <li>• Mix free activities with paid experiences</li>
                <li>• Shop at local markets for affordable meals</li>
            </ul>
        </div>
        <button onclick="showAffiliateDeals()" class="w-full mt-4 bg-white bg-opacity-20 text-white py-2 rounded-lg text-sm hover:bg-opacity-30 transition-colors">
            Find Deals for Your Budget
        </button>
    `;
    
    resultDiv.classList.remove('hidden');
}

// Update activities slider value
document.getElementById('activities').addEventListener('input', function() {
    document.getElementById('activities-value').textContent = this.value + '%';
});

// Trip Planner
function generateItinerary() {
    const island = document.getElementById('trip-island').value;
    const duration = document.getElementById('trip-duration').value;
    const interests = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
    
    const itineraries = {
        oahu: {
            3: {
                hiking: ["Diamond Head Crater", "Manoa Falls", "Koko Head Stairs"],
                beaches: ["Waikiki Beach", "Hanauma Bay", "Lanikai Beach"],
                culture: ["Pearl Harbor", "Polynesian Cultural Center", "Iolani Palace"],
                food: ["Leonard's Bakery", "Giovanni's Shrimp Truck", "Matsumoto Shave Ice"]
            },
            5: {
                hiking: ["Diamond Head", "Manoa Falls", "Koko Head", "Makapuu Lighthouse", "Pillbox Hike"],
                beaches: ["Waikiki", "Hanauma Bay", "Lanikai", "Sunset Beach", "Sandy Beach"],
                culture: ["Pearl Harbor", "Polynesian Cultural Center", "Iolani Palace", "Chinatown", "Bishop Museum"]
            }
        },
        maui: {
            3: {
                hiking: ["Haleakala Sunrise", "Bamboo Forest", "Waihee Ridge"],
                beaches: ["Road to Hana", "Makena Beach", "Wailea Beach"],
                snorkeling: ["Molokini Crater", "Turtle Town", "Black Rock"]
            }
        }
    };
    
    const resultDiv = document.getElementById('itinerary-result');
    const detailsDiv = document.getElementById('itinerary-details');
    
    let itinerary = `<div class="space-y-3">`;
    itinerary += `<h5 class="font-bold">${island.charAt(0).toUpperCase() + island.slice(1)} - ${duration} Days</h5>`;
    
    interests.forEach(interest => {
        if (itineraries[island] && itineraries[island][duration] && itineraries[island][duration][interest]) {
            itinerary += `<div class="bg-white bg-opacity-10 p-3 rounded-lg">`;
            itinerary += `<h6 class="font-semibold capitalize mb-2">${interest}</h6>`;
            itinerary += `<ul class="text-sm space-y-1">`;
            itineraries[island][duration][interest].forEach(item => {
                itinerary += `<li>• ${item}</li>`;
            });
            itinerary += `</ul></div>`;
        }
    });
    
    itinerary += `</div>`;
    itinerary += `<button onclick="downloadItinerary()" class="w-full mt-4 bg-white bg-opacity-20 text-white py-2 rounded-lg text-sm hover:bg-opacity-30 transition-colors">
        Download Itinerary
    </button>`;
    
    detailsDiv.innerHTML = itinerary;
    resultDiv.classList.remove('hidden');
}

// Email subscription
function subscribeEmail() {
    const email = document.getElementById('email-input').value;
    if (email && email.includes('@')) {
        alert('Thanks for subscribing! Your free Hawaii Starter Kit will be sent to ' + email);
        document.getElementById('email-input').value = '';
    } else {
        alert('Please enter a valid email address.');
    }
}

// Modal functions
function showEmailCapture() {
    const modal = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');
    
    content.innerHTML = `
        <div class="p-8">
            <div class="flex justify-between items-center mb-6">
                <h3 class="font-poppins text-2xl font-bold text-ink">Get Your Free Hawaii Starter Kit</h3>
                <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <div class="space-y-4">
                <p class="text-gray-600">Get instant access to:</p>
                <ul class="space-y-2 text-gray-600">
                    <li class="flex items-center"><i class="fas fa-check text-tropical-green mr-3"></i>Budget planning checklist</li>
                    <li class="flex items-center"><i class="fas fa-check text-tropical-green mr-3"></i>Hidden gems map</li>
                    <li class="flex items-center"><i class="fas fa-check text-tropical-green mr-3"></i>Free activities guide</li>
                    <li class="flex items-center"><i class="fas fa-check text-tropical-green mr-3"></i>Local food recommendations</li>
                </ul>
                <div class="flex flex-col sm:flex-row gap-4 mt-6">
                    <input type="email" id="modal-email" placeholder="Enter your email" class="flex-1 px-4 py-3 rounded-lg border border-gray-300">
                    <button onclick="subscribeModalEmail()" class="bg-tropical-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                        Get Free Kit
                    </button>
                </div>
                <p class="text-sm text-gray-500 mt-4">No spam, just amazing Hawaii travel tips. Unsubscribe anytime.</p>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
}

function subscribeModalEmail() {
    const email = document.getElementById('modal-email').value;
    if (email && email.includes('@')) {
        alert('Thanks for subscribing! Your free Hawaii Starter Kit will be sent to ' + email);
        closeModal();
    } else {
        alert('Please enter a valid email address.');
    }
}

// Close modal when clicking outside
document.getElementById('modal-overlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Island and activity detail functions (placeholders for future content)
function showIslandDetails(island) {
    alert(`${island.charAt(0).toUpperCase() + island.slice(1)} guide coming soon! This will show detailed budget travel information for ${island}.`);
}

function showActivityDetails(activity) {
    alert(`${activity.charAt(0).toUpperCase() + activity.slice(1)} guide coming soon! This will show budget-friendly ${activity} options across Hawaii.`);
}

function showAffiliateDeals() {
    alert('Redirecting to our partner deals page... (This would integrate with your affiliate links)');
}

function downloadItinerary() {
    alert('Itinerary download feature coming soon! This will generate a PDF of your custom itinerary.');
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Any initialization code goes here
    console.log('Everything Aloha website loaded successfully!');
});
