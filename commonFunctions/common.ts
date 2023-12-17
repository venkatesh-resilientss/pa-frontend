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

export const include = (obj, keys) =>
  Object.fromEntries(
    keys.filter((key) => key in obj).map((key) => [key, obj[key]])
  );

export const debounce = (fn, delay?) => {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay || 200);
  };
};

export const areArraysEqual = (arr1, arr2) => {
  return (
    arr1.length === arr2.length &&
    arr1.every((element, index) => element === arr2[index])
  );
};

export const objectsAreEqual = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (
      (!["clients", "softwares", "projectTypes"].includes(key) &&
        obj1[key] !== obj2[key]) ||
      (["clients", "softwares", "projectTypes"].includes(key) &&
        !areArraysEqual(obj1[key], obj2[key]))
    )
      return false;
  }

  return true;
};

export const groupAndConcatProjects = (data) => {
  const groupedData = {};
  data.forEach((entry) => {
    const { id, name: clientName, projects } = entry;
    const groupId = id || 0;
    const client = groupId ? { label: clientName || "", value: groupId } : null;
    const projectsArr = Array.isArray(projects) ? projects : [];
    const projectNames = projectsArr;
    if (!groupedData[groupId])
      groupedData[groupId] = { id: groupId, client, projects: [] };

    groupedData[groupId].projects.push(...projectNames);
  });

  return Object.values(groupedData);
};

export const removeDuplicates = (arr, key) => {
  const uniqueKeys = {};
  return arr.filter((item) => {
    if (!uniqueKeys[item[key]]) {
      uniqueKeys[item[key]] = true;
      return true;
    }
    return false;
  });
};
