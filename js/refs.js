export default function getRefs() {
    return {
      rowInfoBanks: document.querySelector(".row-info"),
      rowBank: document.querySelector(".row-list"),
      openModalBtn: document.querySelector("[data-modal-open]"),
      closeModalBtn: document.querySelector("[data-modal-close]"),
      closeModalBtn1: document.querySelector("[data-modal-close1]"),
      modalAdd: document.querySelector("[data-modal]"),
      modalChange: document.querySelector("[data-modal1]"),
      formAdd: document.querySelector(".modal-form"),
      formChange: document.querySelector(".modal-form1"),
      submitBtn: document.querySelector(".modal-send"),
      categories: document.querySelector(".select-form"),
      selectBank:document.querySelector(".sel"),
      resultTable:document.querySelector('.table-result'),
      cell:document.querySelector('.cell'),
      resultBtn:document.querySelector('.resBtn'),
    };
  }