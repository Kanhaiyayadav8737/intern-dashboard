// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    const userName = document.getElementById('userName');
    const totalDonations = document.getElementById('totalDonations');
    const referralCode = document.getElementById('referralCode');
    const joinDate = document.getElementById('joinDate');
    const rewardsGrid = document.getElementById('rewardsGrid');
    const progressFill = document.getElementById('progressFill');
    const progressPercentage = document.getElementById('progressPercentage');
    const copyBtn = document.getElementById('copyBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = '/';
        return;
    }

    // Load dashboard data
    loadDashboardData();

    // Handle logout
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userData');
        window.location.href = '/';
    });

    // Handle copy referral code
    copyBtn.addEventListener('click', function() {
        const code = referralCode.textContent;
        navigator.clipboard.writeText(code).then(function() {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy Code';
            }, 2000);
        }).catch(function(err) {
            console.error('Could not copy text: ', err);
        });
    });

    async function loadDashboardData() {
        try {
            // Try to get data from localStorage first
            const cachedData = localStorage.getItem('userData');
            if (cachedData) {
                const userData = JSON.parse(cachedData);
                updateDashboard(userData);
            }

            // Also fetch fresh data from API
            const response = await fetch(`/api/dashboard/${currentUser}`);
            const data = await response.json();

            if (data.success) {
                updateDashboard(data.data);
                // Update localStorage with fresh data
                localStorage.setItem('userData', JSON.stringify(data.data));
            } else {
                console.error('Failed to load dashboard data:', data.message);
            }
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        }
    }

    function updateDashboard(userData) {
        // Update user info
        userName.textContent = userData.name;
        totalDonations.textContent = `$${userData.totalDonations.toLocaleString()}`;
        referralCode.textContent = userData.referralCode;
        
        // Format join date
        const date = new Date(userData.joinDate);
        joinDate.textContent = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        // Update rewards
        updateRewards(userData.rewards);

        // Update progress
        updateProgress(userData.totalDonations);
    }

    function updateRewards(rewards) {
        rewardsGrid.innerHTML = '';
        
        rewards.forEach(reward => {
            const rewardCard = document.createElement('div');
            rewardCard.className = `reward-card ${reward.unlocked ? 'unlocked' : 'locked'}`;
            
            const icon = reward.unlocked ? '🏆' : '🔒';
            
            rewardCard.innerHTML = `
                <div class="reward-icon">${icon}</div>
                <div class="reward-name">${reward.name}</div>
                <div class="reward-description">${reward.description}</div>
            `;
            
            rewardsGrid.appendChild(rewardCard);
        });
    }

    function updateProgress(amount) {
        // Define milestones
        const milestones = [1000, 5000, 10000, 25000, 50000];
        
        // Find current milestone
        let currentMilestone = 50000; // Max milestone
        for (let milestone of milestones) {
            if (amount < milestone) {
                currentMilestone = milestone;
                break;
            }
        }
        
        // Calculate progress percentage
        let progressPercent;
        if (amount >= 50000) {
            progressPercent = 100;
        } else {
            const previousMilestone = milestones[milestones.indexOf(currentMilestone) - 1] || 0;
            progressPercent = ((amount - previousMilestone) / (currentMilestone - previousMilestone)) * 100;
        }
        
        // Update progress bar
        progressFill.style.width = `${Math.min(progressPercent, 100)}%`;
        progressPercentage.textContent = `${Math.round(progressPercent)}%`;
        
        // Add animation
        setTimeout(() => {
            progressFill.style.width = `${Math.min(progressPercent, 100)}%`;
        }, 100);
    }

    // Add some interactive animations
    function addInteractiveEffects() {
        // Animate stat cards on load
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });

        // Animate rewards on load
        setTimeout(() => {
            const rewardCards = document.querySelectorAll('.reward-card');
            rewardCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.3s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, index * 50);
            });
        }, 500);
    }

    // Call animation function after data loads
    setTimeout(addInteractiveEffects, 200);
});
