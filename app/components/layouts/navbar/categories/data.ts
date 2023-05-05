import { IconType } from 'react-icons';
import { BsSnow } from 'react-icons/bs';
import { FaSkiing } from 'react-icons/fa';
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';

export type CategoriesType = {
  id: number;
  label: string;
  icon: IconType;
  description: string;
};

export const categories: CategoriesType[] = [
  {
    id: 1,
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the beach!',
  },
  {
    id: 2,
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property is has windmills!',
  },
  {
    id: 3,
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property is modern!',
  },
  {
    id: 4,
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is in the countryside!',
  },
  {
    id: 5,
    label: 'Pools',
    icon: TbPool,
    description: 'This is property has a beautiful pool!',
  },
  {
    id: 6,
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on an island!',
  },
  {
    id: 7,
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is near a lake!',
  },
  {
    id: 8,
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property has skiing activies!',
  },
  {
    id: 9,
    label: 'Castles',
    icon: GiCastle,
    description: 'This property is an ancient castle!',
  },
  {
    id: 10,
    label: 'Caves',
    icon: GiCaveEntrance,
    description: 'This property is in a spooky cave!',
  },
  {
    id: 11,
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This property offers camping activities!',
  },
  {
    id: 12,
    label: 'Arctic',
    icon: BsSnow,
    description: 'This property is in arctic environment!',
  },
  {
    id: 13,
    label: 'Desert',
    icon: GiCactus,
    description: 'This property is in the desert!',
  },
  {
    id: 14,
    label: 'Barns',
    icon: GiBarn,
    description: 'This property is in a barn!',
  },
  {
    id: 15,
    label: 'Lux',
    icon: IoDiamond,
    description: 'This property is brand new and luxurious!',
  },
];
