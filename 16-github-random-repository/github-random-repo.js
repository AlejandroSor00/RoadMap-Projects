const $languageSelect = document.getElementById("repo-languages");
const $fragment = document.createDocumentFragment();
const $resultSection = document.querySelector(".wrapper-result");
const $loaderErrorSection = document.querySelector(".wrapper-loader");
const $buttonRefresh = document.getElementById('repo-refresh')
const $msgInitial = $loaderErrorSection.querySelector(".repo-selected-title");
const $msgLoading = $loaderErrorSection.querySelector(".repo-selected-loading");
const $msgError   = $loaderErrorSection.querySelector(".repo-selected-error");
let loading = false;
   language = null

 $buttonRefresh.addEventListener('click', () => {selectedOption()} )


fetch("https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json")
  .then(response => response.json())
  .then(data => {
    data.forEach(language => {
      const $option = document.createElement("option");
      $option.value = language.value;
      $option.textContent = language.title;
      $fragment.appendChild($option);
    });
    $languageSelect.appendChild($fragment);
    $languageSelect.addEventListener("change", selectedOption);
  });

function selectedOption(e) {
    
   if(e) language = e.target.value;
  if (!language || loading) return;

  loading = true;

  $msgInitial.classList.add("hidden");
  $msgError.classList.remove("visible");
  $msgLoading.classList.add("visible");
  $resultSection.classList.remove("visible");
  $loaderErrorSection.classList.remove("error");

  fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=30`)
    .then(response => response.json())
    .then(data => {
      const items = data.items || [];
      if (items.length === 0) {
        throw new Error("No repos found");
      }
      const repo = items[Math.floor(Math.random() * items.length)];

      const $repoTitle = $resultSection.querySelector(".repo-selected-title");
      const $repoDescription = $resultSection.querySelector(".repo-selected-description");
      const $repoStars = $resultSection.querySelector(".repo-info-stars");
      const $repoForks = $resultSection.querySelector(".repo-info-forks");
      const $repoIssues = $resultSection.querySelector(".repo-info-issues");
      const $repoLanguage = $resultSection.querySelector(".repo-info-language");

      $repoTitle.textContent = repo.name;
      $repoLanguage.textContent = language;
      $repoDescription.textContent = repo.description || "No description";
      $repoStars.textContent = repo.stargazers_count;
      $repoIssues.textContent = repo.open_issues_count;
      $repoForks.textContent = repo.forks_count;

      $msgLoading.classList.remove("visible");
      $resultSection.classList.add("visible");
      loading = false;
    })
    .catch(err => {
      console.error(err);
      $msgLoading.classList.remove("visible");
      $msgError.classList.add("visible");
      $resultSection.classList.remove("visible");
      $loaderErrorSection.classList.add("error");
      loading = false;
    });
}
