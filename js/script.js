const additionalFieldsDiv = document.getElementById("additional-fields");
const animalTypeSelect = document.getElementById("animal-type");
const tbody = document.querySelector("#animals-table tbody");

class Animal {
    constructor(name, type, gender, birthDate, city, isSterilized) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.type = type;
        this.gender = gender;
        this.birthDate = birthDate;
        this.city = city;
        this.isSterilized = isSterilized;
    }
}

class Dog extends Animal {
    constructor(name, type, gender, birthDate, city, isSterilized, breed, isTrained) {
        super(name, type, gender, birthDate, city, isSterilized);
        this.breed = breed;
        this.isTrained = isTrained;
    }
}

class Cat extends Animal {
    constructor(name, type, gender, birthDate, city, isSterilized, breed, color) {
        super(name, type, gender, birthDate, city, isSterilized);
        this.breed = breed;
        this.color = color;
    }
}

// Функция для восстановления экземпляров из plain объектов
function reviveAnimals(rawAnimals) {
    return rawAnimals.map(obj => {
        switch (obj.type) {
            case 'dog':
                return Object.assign(new Dog(), obj);
            case 'cat':
                return Object.assign(new Cat(), obj);
            default:
                return Object.assign(new Animal(), obj);
        }
    });
}

// Загрузка и "оживление" животных из localStorage
const rawAnimals = JSON.parse(localStorage.getItem("animals")) || [];
let animals = reviveAnimals(rawAnimals);

// функция для обновления полей формы при изменении типа животного
function updateAdditionalFields() {
    additionalFieldsDiv.innerHTML = "";

    if (animalTypeSelect.value == "dog") {
        additionalFieldsDiv.innerHTML = `
      <label>
        Порода:
        <input type="text" name="breed" required>
      </label>
      <label class="checkbox">
        Дрессирован:
        <input type="checkbox" name="isTrained">
      </label>
    `;
    } else if (animalTypeSelect.value === 'cat') {
        additionalFieldsDiv.innerHTML = `
      <label>
        Порода:
        <input type="text" name="breed" required>
      </label>

      <label>
        Окрас:
        <input type="text" name="color" required>
      </label>
    `;
    }
}

// обновление доп полей формы при изменении типа животного
animalTypeSelect.addEventListener("change", updateAdditionalFields);

updateAdditionalFields();

// обработка отправки формы и добавления нового животного в таблицу
document.getElementById("animal-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value.trim();
    const type = form.type.value;
    const gender = form.gender.value;
    const birthDate = form.arrivalDate.value;
    const city = form.city.value.trim();
    const isSterilized = form.isSterilized.checked;

    let newAnimal;

    if (type === "dog") {
        const breed = form.breed.value.trim();
        const isTrained = form.isTrained.checked;
        newAnimal = new Dog(name, type, gender, birthDate, city, isSterilized, breed, isTrained)
    } else if (type === "cat") {
        const breed = form.breed.value.trim();
        const color = form.color.value.trim();
        newAnimal = new Cat(name, type, gender, birthDate, city, isSterilized, breed, color);
    } else {
        alert("Выберите тип животного");
        return;
    }

    animals.push(newAnimal);
    localStorage.setItem("animals", JSON.stringify(animals));

    form.reset();
    document.getElementById("additional-fields").innerHTML = '';

    renderTable();
})

// отображение данных формы в таблице
function renderTable() {
    tbody.innerHTML = "";

    animals.forEach((animal, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
      <td>${animal.name}</td>
      <td>${animal.city}</td>
      <td>${animal.birthDate}</td>
      <td>${animal.gender}</td>
      <td>${animal.isSterilized ? "Да" : "Нет"}</td>
      <td>${animal.type}</td>
      <td>${getAdditionalFieldsText(animal)}</td>
      <td><button data-id="${animal.id}" class="delete-btn">Удалить</button></td>
    `;

        tbody.appendChild(tr);
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const idToDelete = e.target.dataset.id;

            animals = animals.filter(a => a.id !== idToDelete);
            localStorage.setItem("animals", JSON.stringify(animals));
            renderTable();
        });
    });
}

// возвращает строки для отображения дополнительной информации о животном
function getAdditionalFieldsText(animal) {
    if (animal instanceof Dog) {
        return `Порода: ${animal.breed}, Дрессирован: ${animal.isTrained ? "Да" : "Нет"}`;
    } else if (animal instanceof Cat) {
        return `Порода: ${animal.breed}, Окрас: ${animal.color}`;
    } else {
        return "";
    }
}

