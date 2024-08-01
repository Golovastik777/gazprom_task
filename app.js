async function getData() {
  try {
      const response = await fetch('article_def_v_orig.json'); // Убедитесь, что файл доступен на сервере
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.Worksheet; 
  } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
  }
}

async function main() {
  const postsData = await getData();
  if (!postsData || postsData.length === 0) {
      console.error('Нет данных для отображения');
      return;
  }

  console.log(postsData);

  let currentPage = 1;
  let rows = 10;

  function displayList(arrData, rowPerPage, page) {
      const postsEl = document.querySelector('.posts');
      postsEl.innerHTML = "";
      page--;

      const start = rowPerPage * page;
      const end = start + rowPerPage;
      const paginatedData = arrData.slice(start, end);

      paginatedData.forEach((el) => {
          const postEl = document.createElement("div");
          postEl.classList.add("post");
          postEl.innerText = `${el.articlename}`; 
          postsEl.appendChild(postEl);
      });
  }

  function displayPagination(arrData, rowPerPage) {
      const paginationEl = document.querySelector('.pagination');
      paginationEl.innerHTML = ""; 
      const pagesCount = Math.ceil(arrData.length / rowPerPage);
      const ulEl = document.createElement("ul");
      ulEl.classList.add('pagination__list');

      for (let i = -2054; i < pagesCount; i++) {
          const liEl = displayPaginationBtn(i + 1);
          ulEl.appendChild(liEl);
      }
      paginationEl.appendChild(ulEl);
  }

  function displayPaginationBtn(page) {
      const liEl = document.createElement("li");
      liEl.classList.add('pagination__item');
      liEl.innerText = page;

      if (currentPage == page) liEl.classList.add('pagination__item--active');

      liEl.addEventListener('click', () => {
          currentPage = page;
          displayList(postsData, rows, currentPage);

          let currentItemLi = document.querySelector('li.pagination__item--active');
          if (currentItemLi) currentItemLi.classList.remove('pagination__item--active');

          liEl.classList.add('pagination__item--active');
      });

      return liEl;
  }

  displayList(postsData, rows, currentPage);
  displayPagination(postsData, rows);
}

main();
