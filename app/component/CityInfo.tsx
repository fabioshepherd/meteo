import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { Button } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import bookmarksService from '../service/bookmarks';
import SimpleCityType from '../service/type/SimpleCityType';
import weatherApi from '../service/weatherApi';
import wmoIcons from '../utils/wmoIcons';
import InfoCard from './InfoCard';
import TemperatureChart from './TemperatureChart';

const CityInfo = ({
  data: cityData,
  addBookmark,
  removeBookmark,
}: {
  data: SimpleCityType;
  addBookmark: (cityType: SimpleCityType) => void;
  removeBookmark: (cityType: SimpleCityType) => void;
}) => {
  const [isBookmarked, setIsBookmarked] = useState(
    bookmarksService.isBookmarked(
      cityData.cityName,
      cityData.latitude,
      cityData.longitude
    )
  );

  useEffect(() => {
    setIsBookmarked(
      bookmarksService.isBookmarked(
        cityData.cityName,
        cityData.latitude,
        cityData.longitude
      )
    );
  }, [cityData]);

  const { data } = useQuery({
    queryKey: ['city', cityData.latitude, cityData.longitude],
    queryFn: () => weatherApi.getWeather(cityData.latitude, cityData.longitude),
    enabled: !!cityData.latitude && !!cityData.longitude,
  });

  const hourlyData = useMemo(() => {
    if (!data) return [];
    return data.hourly.temperature_2m.map((temperature, i) => ({
      temperature,
      time: data.hourly.time[i],
    }));
  }, [data]);

  const handleBookmarkButtonClick = useCallback(() => {
    if (
      bookmarksService.isBookmarked(
        cityData.cityName,
        cityData.latitude,
        cityData.longitude
      )
    ) {
      removeBookmark(cityData);
      setIsBookmarked(false);
    } else {
      addBookmark(cityData);
      setIsBookmarked(true);
    }
  }, [addBookmark, cityData, removeBookmark]);

  return (
    <div className='flex flex-col gap-2'>
      <div className='text-5xl font-bold flex gap-3 items-center'>
        <Button
          isIconOnly
          variant='light'
          color='default'
          onPress={handleBookmarkButtonClick}>
          {isBookmarked ? (
            <StarIconSolid className='w-5 ' />
          ) : (
            <StarIcon className='w-5' />
          )}
        </Button>
        {cityData.cityName}
        {wmoIcons[String(data?.current.weather_code)] && (
          <img
            src={wmoIcons[String(data?.current.weather_code)].day.image}
            alt=''
            className='w-16 h-16'
          />
        )}
      </div>
      {data && (
        <>
          <div className='flex gap-2'>
            <InfoCard title='Temperatura'>{`${data?.current.temperature_2m}${data?.current_units.temperature_2m}`}</InfoCard>
            <InfoCard title='Umidità'>{`${data?.current.relative_humidity_2m}${data?.current_units.relative_humidity_2m}`}</InfoCard>
            <InfoCard title='Vento'>{`${data?.current.wind_speed_10m}${data?.current_units.wind_speed_10m}`}</InfoCard>
          </div>
          <div>
            <TemperatureChart
              data={hourlyData}
              timeUnit={data.hourly_units.time}
              temperatureUnit={data.hourly_units.temperature_2m}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CityInfo;
