export const handleAddComment = () => {
  const inputEl = document.getElementById("input");
  const textareaEl = document.getElementById("textarea");

  const name = inputEl.value.trim();
  const comment = textareaEl.value.trim();

  if (!name || !comment) {
    alert("Пожалуйста, укажите имя и текст комментария.");
    return;
  }

  const date = new Date();
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    
  };