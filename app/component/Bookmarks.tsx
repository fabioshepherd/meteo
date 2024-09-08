import { ArrowsUpDownIcon } from '@heroicons/react/24/solid';
import { Button } from '@nextui-org/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import weatherApi from '../service/weatherApi';
import SimpleCityType from '../type/SimpleCityType';
import Bookmark from './Bookmark';
import BookmarkWeatherType from '../type/BookmarkWeatherType';

const sortBookmarks = (
  bookmarks: BookmarkWeatherType[],
  sort: 'asc' | 'desc'
) => {
  return bookmarks.sort((a, b) => {
    if (sort === 'asc') {
      return a.current.temperature_2m - b.current.temperature_2m;
    } else {
      return b.current.temperature_2m - a.current.temperature_2m;
    }
  });
};

const Bookmarks = ({
  bookmarks,
  handleBookmarkButtonClick,
}: {
  bookmarks: SimpleCityType[];
  handleBookmarkButtonClick: (city: SimpleCityType) => void;
}) => {
  const sortRef = useRef<'asc' | 'desc'>('asc');
  const [bookmarksData, setBookmarksData] = useState<BookmarkWeatherType[]>([]);

  const handleSorting = useCallback(() => {
    sortRef.current = sortRef.current === 'asc' ? 'desc' : 'asc';
    const sortedBookmarksData = [
      ...sortBookmarks(bookmarksData, sortRef.current),
    ];
    setBookmarksData(sortedBookmarksData);
  }, [bookmarksData]);

  const loadBookmarksData = async () => {
    const bookmarksPromises = bookmarks.map((bookmark) => {
      return weatherApi.getWeather(bookmark.latitude, bookmark.longitude);
    });

    const bookmarksData = await Promise.all(bookmarksPromises);
    const bookmarksDataWithInfo: BookmarkWeatherType[] = bookmarksData.map(
      (data, i) => {
        return {
          ...data,
          cityName: bookmarks[i].cityName,
          latitude: bookmarks[i].latitude,
          longitude: bookmarks[i].longitude,
        };
      }
    );
    const sortedBookmarksData = sortBookmarks(
      bookmarksDataWithInfo,
      sortRef.current
    );
    setBookmarksData(sortedBookmarksData);
  };

  useEffect(() => {
    if (bookmarks.length > 0) {
      loadBookmarksData();
    }
  }, [bookmarks]);

  return (
    <div className='flex gap-1 items-center'>
      <Button
        isIconOnly
        onPress={handleSorting}
        className='text-sm font-bold uppercase flex gap-1 items-center'>
        <ArrowsUpDownIcon className='w-5 h-5' />
      </Button>
      {bookmarksData.map((bookmark) => (
        <Bookmark
          key={`${bookmark.latitude}-${bookmark.longitude}`}
          weather={bookmark}
          onClick={handleBookmarkButtonClick}
        />
      ))}
    </div>
  );
};

export default Bookmarks;
