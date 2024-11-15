const badges = {
    "Активист": { 
        categories: ["events", "kap", "social_rights", "tutors", "professional_dev", "union_leaders"],
        description: "Яркая студенческая жизнь, много друзей с разных институтов и масса воспоминаний – все это для тебя! Приходи на мероприятия и образовательные проекты от нашего профбюро и профкома студентов и получай новый уникальный опыт."
    },
    "Выступающий": { 
        categories: ["recreation", "events", "kap"],
        description: "Выступления на сцене, интересное времяпровождение, раскрытие своих талантов в университете – это все твое! Совсем скоро начнутся кастинги на фестиваль первокурсников «Зажигай сердца – ИИМРТ», приходи и получи классную возможность выступить на большой сцене."
    },
    "Консультант": { 
        categories: ["social_rights", "discounts", "tutors", "professional_dev", "union_leaders"],
        description: "Знание всех социально-правовых вопросов, помощь одногруппникам, развитие в различных сферах – это все про тебя! Ждем тебя на наших социальных акциях, а в будущем ты можешь попробовать податься на конкурс «Ты - лидер»!"
    },
    "Магнат": { 
        categories: ["social_rights", "recreation", "discounts"],
        description: "Уверен, что ты знаешь как сэкономить и найти самое выгодное предложение. Ты можешь попробовать себя в секторе фандрайзинга на мероприятия и работать с крупными партнерами!"
    },
    "Орг": { 
        categories: ["recreation", "events", "kap", "professional_dev", "union_leaders"],
        description: "Ты уже видел, как проходят мероприятия, но тебе так интересно посмотреть на это с обратной стороны? Тогда ты вылитый организатор! Лидерство, работа в команде, координация процессов — все это ты сможешь освоить, прокачать и применить на практике в школе организаторов мероприятий «Intensive»!"
    },
    "СТЛ": { 
        categories: ["social_rights", "discounts", "events", "tutors", "kap", "professional_dev", "union_leaders"],
        description: "Уверены, что все идут за тобой, потому что ты вдохновляешь остальных на работу и действия. Будем ждать тебя на курсе «Студенческий лидер» на выездной школе профактива «ПавLOVEка»!"
    },
    "Отличник": { 
        categories: [],
        description: "Возможно тебе интересна только учеба в университете. Это очень здорово, и, чтобы учеба шла еще легче, научно-учебная комиссия подготовила для тебя “Помощь первокурсникам”, которая поможет лучше подготовится к сессии! А если тебя интересует научная деятельность, то будем рады видеть тебя на научной школе “PROНаУчКи”."
    }
};

const allCategories = ["social_rights", "recreation", "discounts", "events", "tutors", "kap", "professional_dev", "union_leaders"];
let selectedCategories = [];

// Toggle function to add/remove category from selectedCategories
function toggleCategory(category) {
    if (selectedCategories.includes(category)) {
        selectedCategories = selectedCategories.filter(item => item !== category);
    } else {
        selectedCategories.push(category);
    }
}

// Category button event listeners
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        toggleCategory(category);
        button.classList.toggle('active');
    });
});

// Get result button event listener
document.querySelector('.get-result-btn').addEventListener('click', () => {
    let selectedBadge = "Отличник"; // Default badge
    let highestMatchCount = 0;

    // Проверяем, если выбраны "recreation" или "discounts"
    const isRecreationOrDiscountsSelected = selectedCategories.includes("recreation") || selectedCategories.includes("discounts");

    // Назначение "Активист" при условии, что выбраны все категории, кроме запрещенных
    if (!isRecreationOrDiscountsSelected && selectedCategories.length === allCategories.length) {
        selectedBadge = "Активист";
    } else if (selectedCategories.length > 0) {
        Object.keys(badges).forEach(badge => {
            const badgeData = badges[badge];
            const matchedCategories = badgeData.categories.filter(category => selectedCategories.includes(category));

            if (matchedCategories.length > highestMatchCount || 
                (matchedCategories.length === highestMatchCount && badgeData.categories.length < badges[selectedBadge].categories.length)) {
                selectedBadge = badge;
                highestMatchCount = matchedCategories.length;
            }
        });
    }

    const result = `Поздравляем, вы получили: ${selectedBadge}`;

    // Показать модальное окно с текстом ачивки
    showAchievementModal(selectedBadge);
});
// Show category buttons with animation after a delay
setTimeout(() => {
    document.querySelectorAll('.category-btn').forEach(button => {
        button.classList.add('show');
    });
}, 1000);

// Показ модального окна с результатом
function showAchievementModal(badge) {
    const modal = document.getElementById('achievement-modal');
    const achievementText = document.getElementById('achievement-text');
    const badgeDescription = badges[badge].description;
    
    achievementText.textContent = `Ваш тип студента: ${badge}`;
    
    // Создаём параграф с описанием ачивки
    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = badgeDescription;
    descriptionParagraph.style.marginTop = '15px';
    descriptionParagraph.style.color = '#FFD700';

    // Очищаем предыдущее содержимое
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = ''; // Удаляем все элементы внутри

    // Вставляем заголовок и описание
    modalContent.appendChild(achievementText);
    modalContent.appendChild(descriptionParagraph);

    // Создаем кнопку "Пройти заново" и добавляем её в модальное окно
    const restartButton = document.createElement('button');
    restartButton.id = 'restart-button';
    restartButton.classList.add('modal-button');
    restartButton.textContent = 'Пройти заново';
    
    restartButton.style.marginTop = '20px';

    // Добавляем обработчик событий для кнопки "Пройти заново"
    restartButton.addEventListener('click', () => {
        modal.style.display = 'none';
        selectedCategories = []; // Сброс выбранных категорий
        document.querySelectorAll('.category-btn').forEach(button => button.classList.remove('active'));
    });

    // Вставляем кнопку в модальное окно
    modalContent.appendChild(restartButton);

    // Показ модального окна
    modal.style.display = 'flex';
}
