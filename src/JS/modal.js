export class Modal {
  constructor(modalId, openBtnID, closeBtnID) {
    this.modal = document.getElementById(modalId);
    this.openButton = document.getElementById(openBtnID);
    this.closeButton = document.getElementById(closeBtnID);
    this._handleEsc = (event) => {
      if (event.key === "Escape") {
        this.close();
      }
    };

    this._bindEvents();
  }
  open() {
    if (this.modal) {
      this.modal.classList.add("is-Open");
      document.addEventListener("keydown", this._handleEsc);
    }
  }

  close() {
    if (this.modal) {
      this.modal.classList.remove("is-Open");
      document.removeEventListener("keydown", this._handleEsc);
    }
  }

  _bindEvents() {
    if (this.openButton)
      this.openButton.addEventListener("click", () => this.open());
    if (this.closeButton)
      this.closeButton.addEventListener("click", () => this.close());

    if (this.modal) {
      this.modal.addEventListener("click", (event) => {
        if (event.target === this.modal) this.close();
      });
    }
  }
}
