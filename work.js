const filterButtons = document.querySelectorAll(".filter-button");
const portfolioCards = document.querySelectorAll(".portfolio-card");
const visibleCount = document.querySelector("#visible-count");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    let visible = 0;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    portfolioCards.forEach((card) => {
      const categories = card.dataset.category.split(/\s+/);
      const isStory = categories.some((category) => ["brand", "origin", "person"].includes(category));
      const shouldShow = selectedFilter === "all"
        || (selectedFilter === "stories" && isStory)
        || categories.includes(selectedFilter);
      card.hidden = !shouldShow;
      if (shouldShow) visible += 1;
    });

    visibleCount.textContent = String(visible).padStart(2, "0");
  });
});

const storiesDropdown = document.querySelector(".filter-dropdown");
const storiesToggle = document.querySelector(".filter-dropdown-toggle");

if (storiesDropdown && storiesToggle) {
  storiesDropdown.addEventListener("pointerenter", () => {
    storiesToggle.setAttribute("aria-expanded", "true");
  });

  storiesDropdown.addEventListener("pointerleave", () => {
    storiesToggle.setAttribute("aria-expanded", "false");
  });

  storiesDropdown.addEventListener("focusin", () => {
    storiesToggle.setAttribute("aria-expanded", "true");
  });

  storiesDropdown.addEventListener("focusout", (event) => {
    if (!storiesDropdown.contains(event.relatedTarget)) {
      storiesToggle.setAttribute("aria-expanded", "false");
    }
  });
}
