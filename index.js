import getRefs from "./js/refs.js";
import {
  getNotes,
  createNote,
  deleteNote,
  getNoteId,
  changeNote,
  patchNote,
} from "./js/services.js";
const refs = getRefs();

function toggleModal() {
  refs.modal.classList.toggle("is-hidden");
}

refs.openModalBtn.addEventListener("click", toggleModal);
refs.closeModalBtn.addEventListener("click", toggleModal);
const timeElapsed = Date.now();
const today = new Date(timeElapsed);

getNotes().then((tasks) => {
  return refs.column.insertAdjacentHTML("beforeend", renderTable(tasks));
});
function renderTable(arr) {
  return arr
    .map((el, i, a) => {
      if (el.isActive == true)
        return `<tr id=${el.id} class=''>
      <td>${el.name}</td>
      <td>${el.createDate}</td>
      <td>${el.category}</td>
      <td>${el.max}</td>
      <td>${el.min}</td>
      <td>${el.date}</td>
      <td>
      <div class="wrap-btn">
      <button type="button" class="edit"><svg class='icon-edit' version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#7f8383" width="32" height="32" viewBox="0 0 32 32">
      <path  d="M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z"></path>
      </svg></button>
      <button type="submit" class="del"><svg class='icon-edit' version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#7f8383" width="32" height="32" viewBox="0 0 32 32">
      <title>bin</title>
      <path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>
      <path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>
      </svg></button>
      </div>
      </td>
          </tr>`;
    })
    .join("");
}

function submitForm(e) {
  const pay =
    Number(refs.form[2].value) *
    (Number(refs.form[1].value) / 100) *
    (Number(refs.form[3].value) / 12);

  e.preventDefault();
  const newTask = {
    name: refs.form[0].value,
    createDate: today.toDateString(),
    category: refs.form[1].value,
    max: refs.form[2].value,
    min: ((pay + Number(refs.form[2].value)) / refs.form[3].value).toFixed(2),
    isActive: true,
  };
  createNote(newTask);
}
refs.form.addEventListener("submit", submitForm);

function removeNote(e) {
  if (e.target.classList.contains("del")) {
    return deleteNote(e.target.parentNode.parentNode.parentNode.id);
  }
}

document.addEventListener("click", removeNote);
function openModalChange(e) {
  if (e.target.classList.contains("edit")) {
    refs.modal1.classList.toggle("is-hidden");
    getNoteId(e.target.parentNode.parentNode.parentNode.id).then((data) => {
      console.log(Object.values(data));

      return Object.values(data).map((el, i, a) => {
        return (
          (refs.form1[0].value = a[0]),
          (refs.form1[1].value = a[1]),
          (refs.form1[2].value = a[2]),
          (refs.form1[3].value = a[3]),
          (refs.form1[4].value = a[4]),
          (refs.form1[5].value = a[5]),
          refs.form1.childNodes[1].setAttribute("id", a[7]),
          console.log(refs.form1.childNodes[1])
        );
      });
    });
  }
}
document.addEventListener("click", openModalChange);
refs.closeModalBtn1.addEventListener("click", () => {
  return refs.modal1.classList.toggle("is-hidden");
});

function submitChangeForm(e) {
  const pay =
    Number(refs.form1[3].value) *
    (Number(refs.form1[2].value) / 100) *
    (Number(refs.form1[5].value) / 12);

  e.preventDefault();
  const newTask = {
    name: refs.form1[0].value,
    createDate: today.toDateString(),
    category: refs.form1[2].value,
    max: refs.form1[3].value,
    min: ((pay + Number(refs.form1[3].value)) / refs.form1[5].value).toFixed(2),
    date: refs.form1[5].value,
    isActive: true,
  };
  const { id } = e.target.childNodes[1];
  changeNote(id, newTask);
}
refs.form1.addEventListener("submit", submitChangeForm);

function getBanksSelect() {
  getNotes().then((banks) =>
    refs.selectBank.insertAdjacentHTML("beforeend", renderBankSelect(banks))
  );
}

function renderBankSelect(arr) {
  return arr
    .map((el, i, a) => {
      return ` <option value=${el.name} class="opt" id=${el.id} >${el.name}</option>`;
    })
    .join("");
}
getBanksSelect();
async function renderBankCount(e) {
  if (e.target.classList.contains("sel")) {
    const { id } = Array.from(e.target.children).find((el) => el.selected);
    console.log(id);
    const bank = await getNoteId(+id);
    return refs.column2.insertAdjacentHTML("beforeend", renderOneBank([bank]));
  }
}
console.log(refs.cell.children[1].firstChild);

function renderOneBank(arr) {
  console.log(arr);
  return arr.map((el, i, a) => {
    console.log(refs.cell);
    refs.cell.setAttribute("id", `${el.id}`);
    refs.cell.children[0].innerHTML = `${el.name}`;
    refs.cell.children[1].firstChild.value = `${el.max}`;
    refs.cell.children[2].firstChild.value = `${el.min}`;
  });
}
refs.selectBank.addEventListener("input", renderBankCount);

function resultCountBank() {
  getNoteId(refs.cell.id).then((data) => {
    const newArr = [data];
    let valCredit = refs.cell.children[1].firstChild.value;
    let onePay = refs.cell.children[2].firstChild.value;
    for (let i = 0; i < newArr.length; i++) {
      const el = newArr[i];
      const pay =
        Number(valCredit) *
        (Number(el.category) / 100) *
        (Number(el.date) / 12); // переплата
      const totalPay = (pay + Number(valCredit)).toFixed(2); //Общая сумма с переплатой
      let payOne = Number(valCredit) * (el.category / 100); //минимальный взнос
      console.log(pay, totalPay, payOne);
      console.log(el);
      if (Number(valCredit) > Number(el.max)) {
        return alert("Initial loan more than max value credit");
      }
      if (Number(payOne) > Number(onePay)) {
        return alert(` minimum payment: ${payOne}`);
      }
      if (Number(onePay) >= +valCredit) {
        return alert(` max payment: ${valCredit}`);
      }
      const result = (totalPay - onePay) / Number(el.date - 1);

      return (refs.cell.children[3].innerHTML = result.toFixed(2));
    }
  });
}
refs.resultBtn.addEventListener("click", resultCountBank);
