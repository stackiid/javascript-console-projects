let tasksTodo = [];
let tasksDone = [];
let tasksRemoved = [];
let task;

while (true) {
  let option = prompt(
    "Choose an option: \n 1. Add a task \n 2. Remove a task \n 3. Mark a task as done \n 4. Display list \n 5. Quit",
  );

  if (option === "1") {
    task = prompt("Enter a task to add to your Todo list:");
    tasksTodo.push(task);
    alert(`Task '${task}' added successfully.`);
  } else if (option === "2") {
    if (tasksTodo.length === 0) {
      alert("Your Todo list is empty. No tasks to remove.");
      console.error("Error: Todo list is empty.");
    } else {
      let taskToRemove = prompt("Enter the task name to remove:");
      if (tasksTodo.includes(taskToRemove)) {
        tasksRemoved.push(taskToRemove);
        let taskIndex = tasksTodo.indexOf(taskToRemove);
        tasksTodo.splice(taskIndex, 1);
        alert(`Task '${taskToRemove}' removed successfully.`);
      } else {
        alert(`Task '${taskToRemove}' not found in the list.`);
        console.error("Task not found in the list.");
      }
    }
  } else if (option === "3") {
    if (tasksTodo.length === 0) {
      alert("Your Todo list is empty. No tasks to mark as done.");
      console.error("Error: Todo list is empty.");
    } else {
      let taskToMarkDone = prompt("Enter the task name to mark as done:");
      if (tasksTodo.includes(taskToMarkDone)) {
        tasksDone.push(taskToMarkDone);
        let taskIndex = tasksTodo.indexOf(taskToMarkDone);
        tasksTodo.splice(taskIndex, 1);
        alert(`Task '${taskToMarkDone}' is marked as done.`);
      } else {
        alert(`Task '${taskToMarkDone}' not found in the list.`);
        console.error("Task not found in the list.");
      }
    }
  } else if (option === "4") {
    let displayOption = prompt(
      "Which list do you want to display? \n 1. Todo List \n 2. Done List \n 3. Removed List \n 4. All Lists",
    );
    if (displayOption === "1") {
      if (tasksTodo.length === 0) {
        alert("Your Todo list is empty.");
        console.error("Error: Todo list is empty.");
      } else {
        alert("Todo List displayed successfully.");
        console.log("===== Todo List =====");
        for (let i = 0; i < tasksTodo.length; i++) {
          console.log(`${i + 1} - ${tasksTodo[i]}`);
        }
      }
    } else if (displayOption === "2") {
      if (tasksDone.length === 0) {
        alert("Your Done list is empty.");
        console.error("Error: Done list is empty.");
      } else {
        alert("Done List displayed successfully.");
        console.log("===== Done List =====");
        for (let i = 0; i < tasksDone.length; i++) {
          console.log(`${i + 1} - ${tasksDone[i]}`);
        }
      }
    } else if (displayOption === "3") {
      if (tasksRemoved.length === 0) {
        alert("Your Removed list is empty.");
        console.error("Error: Removed list is empty.");
      } else {
        alert("Removed List displayed successfully.");
        console.log("===== Removed List =====");
        for (let i = 0; i < tasksRemoved.length; i++) {
          console.log(`${i + 1} - ${tasksRemoved[i]}`);
        }
      }
    } else if (displayOption === "4") {
      if (
        tasksTodo.length === 0 &&
        tasksDone.length === 0 &&
        tasksRemoved.length === 0
      ) {
        alert("All lists are empty.");
        console.error("Error: All lists are empty.");
      } else {
        alert("All Lists displayed successfully.");
        if (tasksTodo.length > 0) {
          console.log("===== Todo List =====");
          for (let i = 0; i < tasksTodo.length; i++) {
            console.log(`${i + 1} - ${tasksTodo[i]}`);
          }
        }
        if (tasksDone.length > 0) {
          console.log("===== Done List =====");
          for (let i = 0; i < tasksDone.length; i++) {
            console.log(`${i + 1} - ${tasksDone[i]}`);
          }
        }
        if (tasksRemoved.length > 0) {
          console.log("===== Removed List =====");
          for (let i = 0; i < tasksRemoved.length; i++) {
            console.log(`${i + 1} - ${tasksRemoved[i]}`);
          }
        }
      }
    } else {
      alert("INVALID OPTION. Please choose a valid option (1, 2, 3, or 4)");
      console.error("ERROR: Invalid option selected.");
    }
  } else if (option === "5") {
    alert("Goodbye! Hope you accomplished your tasks.");
    console.log("Application closed.");
    break;
  } else {
    alert("INVALID OPTION. Please choose a valid option (1, 2, 3, 4, or 5)");
    console.error("ERROR: Invalid option selected.");
  }
}
