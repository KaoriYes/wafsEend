const details = document.querySelectorAll("details");
details.forEach((targetDetail) => {
  targetDetail.addEventListener("click", () => {
    // Close all the details that are not targetDetail.
    details.forEach((detail) => {
      if (detail !== targetDetail) {
        detail.removeAttribute("open");
      }
    });
  });
});









async function fetchDataColabs(){
  try{
    const response = await fetch('https://api.github.com/repos/Kaoriyes/wafsEend/collaborators', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        'Authorization': 'Bearer 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',
        'Accept': 'application/vnd.github+json',
      }
    })
    return await response.json();

  } catch (error) {
    console.error("Error:", error)
  }
}




const fetchedData = await fetchDataColabs();
console.log(fetchedData); // Log the fetched data to see its structure
const collabId = async () => {
  try {
    const promises = fetchedData.map(async (fetched) => {
      const dataGroup = await fetchDataEigenschappen(fetched.login); // Pass fetched.login
      return { login: fetched.login, data: dataGroup.eend };
    });
    const results = await Promise.all(promises);
    console.log(results)
    results.forEach(result => {
      const dataList = document.querySelector(`.${result.login} div.data-box ul`);
      Object.keys(result.data).forEach(key => {
        if (key === 'favorieteDoelwit'){
          const listItemSpan = document.createElement('span')
          const listItem = document.createElement('li');
          // console.log(... result.data[key])
          let favTarget =  result.data[key];
          listItemSpan.textContent = ` ${favTarget.doelwit1}, ${favTarget.doelwit2}, ${favTarget.doelwit3}`
          listItem.textContent = `${key}:`;
          listItem.append(listItemSpan)
          dataList.append(listItem);
          console.log(favTarget)
        }
        else{
          const listItemSpan = document.createElement('span')
          const listItem = document.createElement('li');
          listItemSpan.textContent = ` ${result.data[key]}`
          listItem.textContent = `${key}:`;
          listItem.append(listItemSpan)
          dataList.append(listItem);
      }});
    });

  } catch (error) {
    console.error("Error:", error);
  }
}
collabId();

async function fetchDataEigenschappen(login) {
  try {
    const response = await fetch(`https://raw.githubusercontent.com/${login}/web-app-from-scratch-2324/main/docs/data/eigenschappen.json`);
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
}

