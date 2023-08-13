import FullList from "../models/FullList";

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
  ul: HTMLUListElement;

  static instance: ListTemplate = new ListTemplate();
  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }

  clear(): void {
    this.ul.innerHTML = "";
  }
  render(fullList: FullList): void {
    this.clear();

    fullList.list.forEach((item) => {
      const li = document.createElement("li") as HTMLLIElement;
      li.className = "item";

      const check = document.createElement("input") as HTMLInputElement;
      check.type = "checkbox";
      check.id = item.id;
      check.tabIndex = 0;
      check.checked = item.checked;
      li.append(check);

      check.addEventListener("change", () => {
        item.checked = !item.checked;
        fullList.save();
      });

      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = item.id;
      label.textContent = item.item;
      li.append(label);

      const button = document.createElement("button") as HTMLButtonElement;
      button.className = "button";
      button.textContent = "x";
      li.append(button);

      button.addEventListener("click", () => {
        fullList.removeItem(item.id);
        this.render(fullList);
      });
      const span = document.createElement("span") as HTMLSpanElement;
      const date = new Date();
      let hours = date.getHours();
      const minutes = date.getMinutes();

      let period = "AM";
      if (hours >= 12) {
        period = "PM";
        if (hours > 12) {
          hours -= 12;
        }
      }

      const formattedDate = `${hours}: ${minutes}${period}`;
      span.textContent = formattedDate;
      li.append(span);
      this.ul.prepend(li);
    });
  }
}
