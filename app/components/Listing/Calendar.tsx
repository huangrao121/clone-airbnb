import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Range, RangeKeyDict } from "react-date-range"
import { DateRange } from "react-date-range"
interface CalendarProps {
  value:Range,
  disabledDates?:Date[],
  onChange:(value:RangeKeyDict)=>void
}

const Calendar = ({
  value,
  disabledDates,
  onChange
}:CalendarProps)=>{
  return (
    <DateRange
      ranges={[value]}
      onChange={onChange}
      date={new Date()}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  )
}

export default Calendar