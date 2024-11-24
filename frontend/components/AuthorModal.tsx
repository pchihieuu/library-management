import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog';

interface AuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  submitText?: string;
  readOnly?: boolean;
}

export function AuthorModal({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitText = 'Save',
  readOnly = false
}: AuthorModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          {!readOnly && onSubmit && (
            <Button onClick={onSubmit}>{submitText}</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
