const formatDate = (date: Date | string) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  return `${day < 10 ? `0${day}` : day}/${
    month < 10 ? `0${month}` : month
  }/${year} ${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
};

export default formatDate;
