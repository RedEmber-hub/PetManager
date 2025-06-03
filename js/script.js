const additionalFieldsDiv = document.getElementById("additional-fields");
const animalTypeSelect = document.getElementById("animal-type");
const tbody = document.querySelector("#animals-table tbody");

let animals = JSON.parse(localStorage.getItem("animals")) || [];

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

// добавление новых полей для ввода данных при разных типах животных
animalTypeSelect.addEventListener("change", () => {
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
})

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
      <td><button data-index="${index}" class="delete-btn">Удалить</button></td>
    `;

        tbody.appendChild(tr);
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