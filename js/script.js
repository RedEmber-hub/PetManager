const additionalFieldsDiv = document.getElementById("additional-fields");
const animalTypeSelect = document.getElementById("animal-type");

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