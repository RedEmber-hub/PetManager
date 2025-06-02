const additionalFieldsDiv = document.getElementById("additional-fields");
const animalTypeSelect = document.getElementById("animal-type");

let animals = JSON.parse(localStorage.getItem("animals")) || [];

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