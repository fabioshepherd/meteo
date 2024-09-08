import { Card } from '@nextui-org/react';
import { useCallback } from 'react';
import SimpleCityType from '../service/type/SimpleCityType';
import { CityWeatherType } from '../service/type/weatherType';
import wmoIcons from '../utils/wmoIcons';

export interface BookmarkWeatherType extends CityWeatherType {
  cityName: string;
}

interface BookmarkProps {
  weather: BookmarkWeatherType;
  onClick: (city: SimpleCityType) => void;
}

const Bookmark = ({ weather, onClick }: BookmarkProps) => {
  const handleOnPress = useCallback(() => {
    onClick({
      cityName: weather.cityName,
      latitude: weather.latitude,
      longitude: weather.longitude,
    });
  }, [weather, onClick]);

  return (
    <Card
      isPressable
      className='p-2 text-sm flex gap-1 flex-row items-center'
      onPress={handleOnPress}>
      {wmoIcons[String(weather?.current.weather_code)] && (
        <img
          src={wmoIcons[String(weather?.current.weather_code)].day.image}
          alt=''
          className='w-6 h-6'
        />
      )}
      <div>
        {weather?.current.temperature_2m}
        {weather?.current_units.temperature_2m}
      </div>
      {weather.cityName}
    </Card>
  );
};

export default Bookmark;
