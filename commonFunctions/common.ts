export const getLabel = (label = "") => {
  return label
    .split(" ")
    .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
    .join(" ");
};

export const dateFormat = (inputDate) => {
  if (!inputDate) return "";

  const dt = new Date(inputDate).toLocaleDateString();
  const [month, day, year] = dt.split("/");
  const formattedMonth = String(month).padStart(2, "0");
  const formattedDay = String(day).padStart(2, "0");
  return `${year}-${formattedMonth}-${formattedDay}`;
};

export const exclude = (data, keys) =>
  Object.fromEntries(
    Object.entries(data).filter(([key]) => !keys.includes(key))
  );

export const debounce = (fn, delay?) => {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay || 200);
  };
};

export const objectsAreEqual = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) return false;
  }

  return true;
};

export const transformList = (inputList) =>{
  let transformedData = {};
console.log(inputList, "inputlist")
  inputList.forEach(item => {
    if (item.ID && !transformedData[item.ID]) 
      transformedData[item.ID] = { id: item.ID, name: item.Name, projects: [] };
    
    if(item.ID && item.ProjectID)
    transformedData[item.ID].projects.push({ id: item.ProjectID, name: item.ProjectName });
  });
console.log(Object.values(transformedData),"transfored")
  return Object.values(transformedData);
}
