import { Modal } from '@/components/Modal';

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit: () => Promise<void>;
  submitText: string;
  bookData: {
    Title: string;
    ISBN: string;
    PublicationYear?: number;
    Description?: string;
    AuthorBook?: string;
    CategoryBook?: string;
    TotalCopies?: number;
    AvailableCopies?: number;
    Status: 'available' | 'borrowed' | 'reserved';
  };
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: string
  ) => void;
}

export const BookModal = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  submitText,
  bookData,
  onChange
}: BookModalProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    onSubmit={onSubmit}
    submitText={submitText}
  >
    <div className="grid gap-4">
      <input
        type="text"
        placeholder="Title"
        value={bookData.Title}
        onChange={(e) => onChange(e, 'Title')}
        className="input w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="ISBN"
        value={bookData.ISBN}
        onChange={(e) => onChange(e, 'ISBN')}
        className="input w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        placeholder="Publication Year"
        value={bookData.PublicationYear || ''}
        onChange={(e) => onChange(e, 'PublicationYear')}
        className="input w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        placeholder="Description"
        value={bookData.Description || ''}
        onChange={(e) => onChange(e, 'Description')}
        className="input w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>

      <input
        type="text"
        placeholder="Author"
        value={bookData.AuthorBook || ''}
        onChange={(e) => onChange(e, 'AuthorBook')}
        className="input w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="Category"
        value={bookData.CategoryBook || ''}
        onChange={(e) => onChange(e, 'CategoryBook')}
        className="input w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        placeholder="Total Copies"
        value={bookData.TotalCopies || ''}
        onChange={(e) => onChange(e, 'TotalCopies')}
        className="input w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        placeholder="Available Copies"
        value={bookData.AvailableCopies || ''}
        onChange={(e) => onChange(e, 'AvailableCopies')}
        className="input w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={bookData.Status}
        onChange={(e) => onChange(e, 'Status')}
        className="input w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="available">Available</option>
        <option value="borrowed">Borrowed</option>
        <option value="reserved">Reserved</option>
      </select>
    </div>
  </Modal>
);
