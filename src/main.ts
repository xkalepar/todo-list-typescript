import "./css/style.css";
import FullList from "./models/FullList";
import LitsItem from "./models/ListItem";
import ListTemplate from "./templates/ListTemplate";

const initApp = (): void => {
  const fullList = FullList.instance;
  const template = ListTemplate.instance;

  // Add listener to new entry form submit
  const itemEntryForm = document.getElementById(
    "itemEntryForm"
  ) as HTMLFormElement;

  itemEntryForm.addEventListener("submit", (e: SubmitEvent): void => {
    e.preventDefault();

    // get new item
    const input = document.getElementById("newItem") as HTMLInputElement;
    const myEntryText: string = input.value.trim();
    if (!myEntryText) return;

    // calculate item ID
    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1;

    // create new item
    const newItem = new LitsItem(itemId.toString(), myEntryText);

    fullList.addItem(newItem);
    template.render(fullList);
  });

  // Add listener to "Clear" button
  const clearItems = document.getElementById(
    "clearItemsButton"
  ) as HTMLButtonElement;
  clearItems.addEventListener("click", () => {
    fullList.clearList();
    template.clear();
  });

  // load initial data
  fullList.load();

  // initial render of template
  template.render(fullList);
};

document.addEventListener("DOMContentLoaded", initApp);
