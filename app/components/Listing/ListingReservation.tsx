"use client"
import Calendar from "./Calendar"
import { Range } from "react-date-range"
import Button from "../Button"
interface ListingReservationProps{
  price:number,
  totalPrice:number,
  totalNight:number,
  onChangeDate:(value:Range)=>void,
  dateRange: Range,
  onSubmit: ()=>void,
  disabled: boolean,
  disabledDates: Date[]
}
const ListingReservation = ({
  price,
  totalPrice,
  totalNight,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates
}:ListingReservationProps) => {
  return (
    <div className="flex flex-col border-[1px] rounded-xl border-neutral-300 overflow-hidden">
      <div className="flex flex-row items-center font-semibold text-xl gap-1 p-4">
        <div>$ {price}</div>
        <div className="font-light text-neutral-500 text-md">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value)=>onChangeDate(value.selection)}
      />
      <div className="p-4">
        <Button
          label={'Reserve'}
          onClick={onSubmit}
          disabled={disabled}
        />
      </div>
      <div className="mx-auto">
        {"You won't be charged yet"}
      </div>
      <hr />
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total {totalNight} Night</div>
        <div>{totalPrice}</div>
      </div>
    </div>
  )
}

export default ListingReservation