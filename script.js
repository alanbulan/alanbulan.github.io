// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initializeAnimations();
    initializeSkillBars();
    initializeScrollAnimations();
    initializeInteractiveElements();
    initializeTypingEffect();
});

// 初始化动画
function initializeAnimations() {
    // 为所有动画元素添加观察器
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// 初始化技能进度条动画
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                
                // 延迟动画以创建更好的视觉效果
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                    
                    // 添加数字计数动画
                    animateNumber(progressBar, 0, progress, 1500);
                }, 200);
                
                skillObserver.unobserve(progressBar);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// 数字计数动画
function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        
        // 创建或更新数字显示
        let numberDisplay = element.querySelector('.skill-number');
        if (!numberDisplay) {
            numberDisplay = document.createElement('span');
            numberDisplay.className = 'skill-number';
            numberDisplay.style.cssText = `
                position: absolute;
                right: 8px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 0.7rem;
                font-weight: 600;
                color: white;
                text-shadow: 0 1px 2px rgba(0,0,0,0.3);
            `;
            element.appendChild(numberDisplay);
        }
        
        numberDisplay.textContent = Math.round(current) + '%';
    }, 16);
}

// 滚动动画
function initializeScrollAnimations() {
    let ticking = false;
    
    function updateScrollAnimations() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // 背景视差效果
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollAnimations);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// 交互元素初始化
function initializeInteractiveElements() {
    // 项目卡片悬停效果
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // 技能分类悬停效果
    const skillCategories = document.querySelectorAll('.skill-category');

    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });

        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // GitHub链接悬停效果
    const githubContainer = document.querySelector('.github-link-container');
    if (githubContainer) {
        githubContainer.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(360deg)';
                icon.style.transition = 'transform 0.5s ease';
            }
        });

        githubContainer.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    }
    
    // 头像点击效果
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulse 2s infinite';
            }, 10);
            
            // 添加点击波纹效果
            createRippleEffect(this, event);
        });
    }
}

// 创建波纹效果
function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// 添加波纹动画CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// 打字机效果
function initializeTypingEffect() {
    const titleElement = document.querySelector('.title');
    if (!titleElement) return;
    
    const originalText = titleElement.textContent;
    titleElement.textContent = '';
    
    let index = 0;
    const typingSpeed = 100;
    
    function typeWriter() {
        if (index < originalText.length) {
            titleElement.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // 添加闪烁光标
            const cursor = document.createElement('span');
            cursor.textContent = '|';
            cursor.style.animation = 'blink 1s infinite';
            titleElement.appendChild(cursor);
            
            // 3秒后移除光标
            setTimeout(() => {
                cursor.remove();
            }, 3000);
        }
    }
    
    // 延迟开始打字效果
    setTimeout(typeWriter, 1000);
}

// 添加闪烁光标CSS
const blinkStyle = document.createElement('style');
blinkStyle.textContent = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(blinkStyle);

// 平滑滚动
function smoothScrollTo(targetY, duration = 1000) {
    const startY = window.pageYOffset;
    const difference = targetY - startY;
    const startTime = performance.now();
    
    function step() {
        const progress = (performance.now() - startTime) / duration;
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, startY + (difference * ease));
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    
    requestAnimationFrame(step);
}

// 缓动函数
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// 添加键盘导航支持
document.addEventListener('keydown', function(event) {
    // 按ESC键回到顶部
    if (event.key === 'Escape') {
        smoothScrollTo(0);
    }
    
    // 按空格键暂停/恢复动画
    if (event.key === ' ' && event.target === document.body) {
        event.preventDefault();
        toggleAnimations();
    }
});

// 切换动画状态
let animationsPaused = false;
function toggleAnimations() {
    const shapes = document.querySelectorAll('.shape');
    const avatar = document.querySelector('.avatar');
    const avatarRing = document.querySelector('.avatar-ring');
    
    if (animationsPaused) {
        shapes.forEach(shape => {
            shape.style.animationPlayState = 'running';
        });
        if (avatar) avatar.style.animationPlayState = 'running';
        if (avatarRing) avatarRing.style.animationPlayState = 'running';
        animationsPaused = false;
    } else {
        shapes.forEach(shape => {
            shape.style.animationPlayState = 'paused';
        });
        if (avatar) avatar.style.animationPlayState = 'paused';
        if (avatarRing) avatarRing.style.animationPlayState = 'paused';
        animationsPaused = true;
    }
}

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 窗口大小改变时重新计算动画
window.addEventListener('resize', debounce(() => {
    // 重新初始化需要重新计算的动画
    initializeScrollAnimations();
}, 250));

// 页面可见性API - 当页面不可见时暂停动画
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面不可见时暂停动画以节省性能
        document.body.style.animationPlayState = 'paused';
    } else {
        // 页面可见时恢复动画
        document.body.style.animationPlayState = 'running';
    }
});

// 添加加载完成提示
window.addEventListener('load', function() {
    console.log('🎉 简历页面加载完成！');
    console.log('💡 提示：按ESC键回到顶部，按空格键暂停/恢复动画');
    
    // 添加加载完成的视觉反馈
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});
