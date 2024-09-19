import { FIRST_PAGES, SIZE_GROUP, START_DOTS, STEP } from "./const";

export const getInitialData = (totalPages: number, current: number) => {
  return {
    firstPages: FIRST_PAGES,
    lastPages: Array.from({ length: SIZE_GROUP }, (_, i) => totalPages - 2 + i),
    startPage: Math.max(START_DOTS, current - STEP),
    endPage: Math.min(totalPages - SIZE_GROUP, current + STEP),
  };
};

const getSmallData = (amount: number) => Array.from({length: amount}, (_, i) => i + 1);

export const getPages = (totalPages: number, current: number): (number | string)[] => {
  const pages: (number | string)[] = [];
  const addedPages = new Set<number>();

  if(totalPages === SIZE_GROUP || totalPages < SIZE_GROUP) return getSmallData(totalPages)

  const { firstPages, lastPages, startPage, endPage } = getInitialData(
    totalPages,
    current
  );

  const addPage = (page: number | string) => {
    if (typeof page === "number" && addedPages.has(page)) return;
    
    pages.push(page);

    if (typeof page === "number") {
      addedPages.add(page);
    }
  };

  firstPages.forEach(addPage);

  if (startPage > START_DOTS) {
    addPage("...");
  }

  for (let i = startPage; i <= endPage; i++) {
    addPage(i);
  }

  if (endPage < totalPages - SIZE_GROUP) {
    addPage("...");
  }

  lastPages.forEach(addPage);

  return pages;
};
