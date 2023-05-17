import Badge from '@material-ui/core/Badge';
import "../../pages/styles/Dashboard.css"
const NotificationBadge = ({ type, count }) => (
    <Badge badgeContent={count} color={type} className={`notification-badge ${type}`}>
        {type}
    </Badge>
);

export default NotificationBadge;
