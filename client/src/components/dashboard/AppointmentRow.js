import { TableRow, TableCell } from '@material-ui/core';
import "../../pages/styles/Dashboard.css"
const AppointmentRow = ({ name, date, time, details }) => (
  <TableRow className="appointment-row">
    <TableCell>{name}</TableCell>
    <TableCell>{date}</TableCell>
    <TableCell>{time}</TableCell>
    <TableCell>{details}</TableCell>
  </TableRow>
);

export default AppointmentRow;