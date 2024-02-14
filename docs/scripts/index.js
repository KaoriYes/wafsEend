const darkModeToggle = document.getElementById('darkModeToggle');

function toggleDarkMode() {
  if (darkModeToggle.checked) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

darkModeToggle.addEventListener('change', toggleDarkMode);

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

const collabId = async () => {
  try {
    const promises = fetchedData.map(async (fetched) => {
      const dataGroup = await fetchDataEigenschappen(fetched.login); // Pass fetched.login
      return { login: fetched.login, data: dataGroup.eend };
    });
    const results = await Promise.all(promises);
    console.log(results)
    results.forEach(result => {
      const dataList = document.querySelector(`.${result.login} div.data-box`);
      Object.keys(result.data).forEach(key => {
        if (key === 'favorieteDoelwit'){
          const listItem = document.createElement('li');
          // console.log(... result.data[key])
          let favTarget =  result.data[key];
          listItem.textContent = `${key}: ${favTarget.doelwit1}, ${favTarget.doelwit2}, ${favTarget.doelwit3} `;
          dataList.append(listItem);
          console.log(favTarget)
        }
        else{
          const listItem = document.createElement('li');
        listItem.textContent = `${key}: ${result.data[key]}`;
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

