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

export enum CategoryNames {
  Beach = 'Beach',
  Windmills = 'Windmills',
  Modern = 'Modern',
  Countryside = 'Countryside',
  Pools = 'Pools',
  Islands = 'Islands',
  Lake = 'Lake',
  Skiing = 'Skiing',
  Castles = 'Castles',
  Caves = 'Caves',
  Camping = 'Camping',
  Arctic = 'Arctic',
  Desert = 'Desert',
  Barns = 'Barns',
  Lux = 'Lux',
}

const categoriesIcons = new Map<keyof typeof CategoryNames, IconType>([
  ['Beach', TbBeach],
  ['Windmills', GiWindmill],
  ['Modern', MdOutlineVilla],
  ['Countryside', TbMountain],
  ['Pools', TbPool],
  ['Islands', GiIsland],
  ['Lake', GiBoatFishing],
  ['Skiing', FaSkiing],
  ['Castles', GiCastle],
  ['Caves', GiCaveEntrance],
  ['Camping', GiForestCamp],
  ['Arctic', BsSnow],
  ['Desert', GiCactus],
  ['Barns', GiBarn],
  ['Lux', IoDiamond],
]);

export const getCategoryIconByName = (
  name: keyof typeof CategoryNames
): IconType | undefined => categoriesIcons.get(name);
