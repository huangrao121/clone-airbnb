import Container from "../Container"

import {BsSnow} from 'react-icons/bs'
import { FaSkiing } from 'react-icons/fa'
import { TbBeach, TbMountain, TbPool } from "react-icons/tb"
import { GiWindmill, GiIsland, GiBoatFishing, GiCastle, GiForestCamp,GiCaveEntrance, GiCactus, GiBarn } from "react-icons/gi"
import { MdOutlineVilla } from "react-icons/md"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import CategoryBox from "../CategoryBox"
import { IoDiamond } from "react-icons/io5"
export const categories = [
  {
    label:"beach",
    icon: TbBeach,
    description: "This property is close to the beach"
  },
  {
    label:"windmills",
    icon: GiWindmill,
    description: "This property is close to the windmills"
  },
  { 
    label:"MdOutlineVilla",
    icon: MdOutlineVilla,
    description: "This property is close to the MdOutlineVilla"
  },
  { 
    label:"Countryside",
    icon: TbMountain,
    description: "This property is close to the Countryside"
  },
  { 
    label:"Pools",
    icon: TbPool,
    description: "This property is close to the Pools"
  },
  { 
    label:"Islands",
    icon: GiIsland,
    description: "This property is close to the MdOutlineVilla"
  },
  { 
    label:"lake",
    icon: GiBoatFishing,
    description: "This property is close to the lake"
  },
  { 
    label:"Ski/out",
    icon: FaSkiing,
    description: "This property is close to the Skiing"
  },
  { 
    label:"Castle",
    icon: GiCastle,
    description: "This property is close to the Skiing"
  },
  { 
    label:"Camping",
    icon: GiForestCamp,
    description: "This property is close to the Camping activities"
  },
  { 
    label:"Arctic",
    icon: BsSnow,
    description: "This property is close to the Skiing"
  },
  { 
    label:"Cave",
    icon: GiCaveEntrance,
    description: "This property is in the cave"
  },
  { 
    label:"Desert",
    icon: GiCactus,
    description: "This property is in the desert"
  },
  { 
    label:"Barn",
    icon: GiBarn,
    description: "This property is in the barn"
  },
  { 
    label:"Lux",
    icon: IoDiamond,
    description: "This property is luxurious"
  }
]

const Categories = ()=>{
  const params = useSearchParams()
  const ctgry = params?.get('category')
  const pathname = usePathname()
  const isMainPage = (pathname === '/')

  if(!isMainPage){
    return null
  }
  return (
    <Container>
      <div className="flex flex-row justify-between items-center overflow-x-scroll">
        {categories.map((category)=>(
          <CategoryBox
            key={category.label}
            label={category.label}
            icon={category.icon}
            selected={ctgry === category.label}
          />
        ))}
      </div>
    </Container>
  )
}

export default Categories
