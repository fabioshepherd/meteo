import { Card, CardBody } from '@nextui-org/react';
import { ReactNode } from 'react';

const InfoCard = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <Card>
      <CardBody>
        <div className='font-bold uppercase text-xs text-gray-500'>{title}</div>
        <div className='text-3xl'>{children}</div>
      </CardBody>
    </Card>
  );
};

export default InfoCard;
