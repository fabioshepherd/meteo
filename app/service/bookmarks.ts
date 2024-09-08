import SimpleCityType from '../type/SimpleCityType';

const LOCAL_STORAGE_KEY = 'weatherBookmarks';

const addToBookmark = async (
  cityName: string,
  latitude: number,
  longitude: number
) => {
  const bookmarks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');

  if (
    !bookmarks.some(
      (bookmark: any) =>
        bookmark.cityName === cityName &&
        bookmark.latitude === latitude &&
        bookmark.longitude === longitude
    )
  ) {
    bookmarks.push({
      cityName,
      latitude,
      longitude,
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookmarks));
  }
};

const removeBookmark = (
  cityName: string,
  latitude: number,
  longitude: number
) => {
  const bookmarks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');

  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(
      bookmarks.filter(
        (bookmark: any) =>
          bookmark.cityName !== cityName &&
          bookmark.latitude !== latitude &&
          bookmark.longitude !== longitude
      )
    )
  );
};

const isBookmarked = (
  cityName: string,
  latitude: number,
  longitude: number
): boolean => {
  const bookmarks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');

  return bookmarks.some(
    (bookmark: any) =>
      bookmark.cityName === cityName &&
      bookmark.latitude === latitude &&
      bookmark.longitude === longitude
  );
};

const getBookmarks = (): SimpleCityType[] => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
};

const bookmarksService = {
  addToBookmark,
  isBookmarked,
  removeBookmark,
  getBookmarks,
};

export default bookmarksService;
