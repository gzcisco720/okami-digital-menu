import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { IMenuItem } from '../../interfaces/menu.interface';

interface IMenuCardProps {
  menuItem: IMenuItem;
}

export const MenuCard: FC<IMenuCardProps> = ({ menuItem }) => {
  return (
    <Card sx={{ maxWidth: 345 }} style={{ margin: '0 auto' }}>
      <CardMedia
        sx={{ height: 140 }}
        image={menuItem.image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {menuItem.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {menuItem.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
