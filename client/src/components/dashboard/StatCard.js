import { Card, CardContent, Typography} from '@material-ui/core';
import "../../pages/styles/Dashboard.css"
const StatCard = ({ title, value, icon }) => (
    <Card className="stat-card">
        <CardContent>
            <div className="stat-icon">{icon}</div>
            <div className="stat-info">
                <Typography variant="h6">{title}</Typography>
                <Typography variant="h4">{value}</Typography>
            </div>
        </CardContent>
    </Card>
);

export default StatCard;