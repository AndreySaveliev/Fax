export const useFormatDate = (timestamp) => {
  const date = new Date(timestamp);
  const dateNow = new Date(Date.now());

  const yearNow = dateNow.getFullYear();
  const monthNow = dateNow.getMonth();
  const dayNow = dateNow.getDate();

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  //   if (yearNow - year > 0) {
  //     return "Last time more than year ago";
  //   } else if (monthNow - month > 1) {
  //     return `Last time ${monthNow - month} months ago`;
  //   } else if (dayNow - day >= 30) {
  //     return `Last time month ago`;
  //   } else if (dayNow - day < 30 && (dayNow - day) / 7 == 3) {
  //     return `Last time ${(dayNow - day) / 7} weeks ago`;
  //   } else if (dayNow - day < 30 && (dayNow - day) / 7 == 2) {
  //     return `Last time ${(dayNow - day) / 7} weeks ago`;
  //   } else if (dayNow - day < 30 && (dayNow - day) / 7 == 1) {
  //     return `Last time ${(dayNow - day) / 7} week ago`;
  //   } else if (dayNow - day < 7 && dayNow - day > 1) {
  //     return `Last time ${day - dayNow} days ago`;
  //   } else return `Last time recently`;
  if (yearNow - year > 0) {
    return "Last year";
  } else if (monthNow - month > 1) {
    return `Last year`;
  } else if (dayNow - day >= 30) {
    return `Last more than month`;
  } else if (dayNow - day < 30 && dayNow - day > 7) {
    return `Last month`;
  } else if (dayNow - day < 7 && dayNow - day > 1) {
    return `Last week ago`;
  } else return `Recent`;
};
