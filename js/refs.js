export default function getRefs() {
    return {
      column: document.querySelector(".column"),
      column2: document.querySelector(".column2"),
      column3: document.querySelector(".column3"),
      openModalBtn: document.querySelector("[data-modal-open]"),
      closeModalBtn: document.querySelector("[data-modal-close]"),
      closeModalBtn1: document.querySelector("[data-modal-close1]"),
      modal: document.querySelector("[data-modal]"),
      modal1: document.querySelector("[data-modal1]"),
      form: document.querySelector(".modal-form"),
      form1: document.querySelector(".modal-form1"),
      submitBtn: document.querySelector(".modal-send"),
      categories: document.querySelector(".select-form"),
      selectBank:document.querySelector(".sel"),
      dateControl: document.querySelector('input[type="date"]'),
      resultTable:document.querySelector('.table-result'),
      cell:document.querySelector('.cell'),
      resultBtn:document.querySelector('.resBtn')
    };
  }