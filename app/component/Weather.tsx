'use client';

import { Autocomplete, AutocompleteItem, Button } from '@nextui-org/react';
import { Key } from '@react-types/shared';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import bookmarksService from '../service/bookmarks';
import SimpleCityType from '../service/type/SimpleCityType';
import weatherApi from '../service/weatherApi';
import Bookmarks from './Bookmarks';
import CityInfo from './CityInfo';

const Weather = () => {
  const [searchValue, setSearchValue] = useState('');
  const [cityId, setCityId] = useState<Key | null>(null);
  const [city, setCity] = useState<SimpleCityType | undefined>();
  const [bookmarks, setBookmarks] = useState(bookmarksService.getBookmarks());

  const { data, isLoading, error } = useQuery({
    queryKey: ['cities', searchValue],
    queryFn: ({ queryKey }) => weatherApi.searchCity(queryKey[1]),
    enabled: searchValue.length > 2,
  });

  const handleSelectionChange = (item: Key | null) => {
    setCityId(item);
  };

  const handleBookmarkButtonClick = useCallback((city: SimpleCityType) => {
    setCity(city);
  }, []);

  useEffect(() => {}, [cityId, data?.results]);

  const handleSearch = useCallback(() => {
    const city = data?.results?.find((item) => item.id === Number(cityId));
    if (city) {
      setCity({
        cityName: city.name,
        latitude: city.latitude,
        longitude: city.longitude,
      });
    }
  }, [cityId, data?.results]);

  const addBookmark = (city: SimpleCityType) => {
    bookmarksService.addToBookmark(
      city.cityName,
      city.latitude,
      city.longitude
    );
    setBookmarks(bookmarksService.getBookmarks());
  };

  const removeBookmark = (city: SimpleCityType) => {
    bookmarksService.removeBookmark(
      city.cityName,
      city.latitude,
      city.longitude
    );
    setBookmarks(bookmarksService.getBookmarks());
  };

  return (
    <div className='p-10 flex flex-col gap-8'>
      {bookmarks.length > 0 && (
        <Bookmarks
          bookmarks={bookmarks}
          handleBookmarkButtonClick={handleBookmarkButtonClick}
        />
      )}
      <div className='flex items-center gap-2 mb-'>
        <Autocomplete
          isLoading={isLoading}
          items={data?.results || []}
          onInputChange={setSearchValue}
          size='sm'
          selectedKey={cityId}
          variant='flat'
          color='primary'
          onSelectionChange={handleSelectionChange}
          label='Cerca la città'>
          {(item) => (
            <AutocompleteItem
              key={item.id}
              className='capitalize'
              textValue={item.name}>
              <div className='font-bold'>{item.name}</div>
              <div className='text-xs text-gray-500'>
                {item.country} - {item.admin1} - {item.admin2}
              </div>
            </AutocompleteItem>
          )}
        </Autocomplete>
        <Button size='lg' onPress={handleSearch} color='primary'>
          Cerca
        </Button>
      </div>
      <div>
        {city && (
          <CityInfo
            data={city}
            addBookmark={addBookmark}
            removeBookmark={removeBookmark}
          />
        )}
      </div>
    </div>
  );
};

export default Weather;
