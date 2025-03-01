import { List } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import { SortableItemList } from './SortableItemList';
import { useMenuStore } from '../../stores/menu.store';
import { useParams } from 'react-router';


interface SortCategoryDialogProps {
  open: boolean;
  handleClose: () => void;
  categories: string[];
}

export const SortCategoryDialog = ({ open, handleClose, categories }: SortCategoryDialogProps) => {
  const { branch } = useParams();
  const { updateMenuCategories } = useMenuStore();
  const [sortableCategories, setSortableCategories] = useState<string[]>([]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setSortableCategories(categories)
  }, [categories])

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;
    if (over && active.id !== over.id) {
      setSortableCategories((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const handleSave = async () => {
    if (!branch) return;
    await updateMenuCategories(branch, sortableCategories);
    handleClose();
  }


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Sort Menu Categories</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={sortableCategories}
            strategy={verticalListSortingStrategy}
          >
            <List>
              {
                sortableCategories.map((category) => (<SortableItemList key={category} id={category}/>))
              }
            </List>
          </SortableContext>
        </DndContext>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
