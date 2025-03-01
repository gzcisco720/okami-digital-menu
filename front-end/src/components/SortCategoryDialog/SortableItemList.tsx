import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { ListItem } from "@mui/material";
interface SortableItemListProps {
  id: string;
}
export const SortableItemList = ({id}: SortableItemListProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id});
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: '1px solid #ccc'
  };
  return (
    <ListItem  ref={setNodeRef} style={style} {...attributes} {...listeners} key={id}>
      {id}
    </ListItem>
  )
};
