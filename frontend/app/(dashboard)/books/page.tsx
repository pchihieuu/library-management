'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Plus } from 'lucide-react';
import { TableCell, TableRow, Table } from '@/components/ui/table';
import {
  createBook,
  deleteBook,
  fetchBooks,
  updateBook
} from 'app/api/books/books';
import { Modal } from '@/components/Modal';
import { BookModal } from '@/components/BookModal';

type BookStatus = 'available' | 'borrowed' | 'reserved';

interface BookData {
  BookID: string;
  Title: string;
  ISBN: string;
  PublicationYear?: number;
  Description?: string;
  AuthorBook?: string;
  CategoryBook?: string;
  TotalCopies?: number;
  AvailableCopies?: number;
  Status: BookStatus;
  createdAt?: string;
}

export default function BookPage() {
  const [books, setBooks] = useState<BookData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);
  const [newBookData, setNewBookData] = useState({
    Title: '',
    ISBN: '',
    Status: 'available' as BookStatus
  });

  const [updateBookData, setUpdateBookData] = useState({
    Title: '',
    ISBN: '',
    Status: 'available' as BookStatus
  });

  useEffect(() => {
    async function loadBooks() {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadBooks();
  }, []);

  const handleDeleteBook = async () => {
    if (selectedBook) {
      try {
        await deleteBook(selectedBook.BookID);

        setBooks((prev) =>
          prev.filter((book) => book.BookID !== selectedBook.BookID)
        );
        setIsDeleteOpen(false);
        setSelectedBook(null);
      } catch (error) {
        console.error('Failed to delete book:', error);
      }
    }
  };

  const handleAddBook = async () => {
    try {
      const newBook = await createBook(newBookData);
      setBooks((prev) => [...prev, newBook]);
      setIsAddOpen(false);
      setNewBookData({ Title: '', ISBN: '', Status: 'available' });
    } catch (error) {
      console.error('Failed to add book:', error);
    }
  };

  const handleEditBook = (book: BookData) => {
    setSelectedBook(book);
    setUpdateBookData({
      Title: book.Title || '',
      ISBN: book.ISBN || '',
      Status: book.Status || 'available'
    });
    setIsEditOpen(true);
  };

  const handleUpdateBook = async () => {
    if (selectedBook) {
      try {
        const updatedBook = await updateBook({
          BookID: selectedBook.BookID,
          ...updateBookData
        });
        setBooks((prev) =>
          prev.map((book) =>
            book.BookID === selectedBook.BookID ? updatedBook : book
          )
        );
        setIsEditOpen(false);
        setSelectedBook(null);
        setUpdateBookData({ Title: '', ISBN: '', Status: 'available' });
      } catch (error) {
        console.error('Failed to update book:', error);
      }
    }
  };

  const handleViewDetails = (book: BookData) => {
    setSelectedBook(book);
    setIsViewDetailsOpen(true);
  };

  if (isLoading) {
    return <p>Loading books...</p>;
  }

  if (books.length === 0) {
    return <p>No books available.</p>;
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Books</h1>

      <Button onClick={() => setIsAddOpen(true)} className="mb-4">
      <Plus className="mr-2 h-4 w-4" /> Add New Book
      </Button>

      <Table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>ISBN</th>
            <th>Author</th>
            <th>Total Copies</th>
            <th>Available Copies</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <TableRow key={book.BookID}>
              <TableCell
                className="font-medium cursor-pointer"
                onClick={() => handleViewDetails(book)}
              >
                {book.Title}
              </TableCell>
              <TableCell>{book.ISBN}</TableCell>
              <TableCell>
              <span className="px-3 py-1.5 inline-block rounded-lg text-white text-sm font-normal bg-gradient-to-br from-pink-500 to-purple-700 shadow-xl hover:shadow-2xl hover:translate-y-[-2px] transition-all">
                  {book.AuthorBook || 'Unknown'}
              </span>
              </TableCell>
              <TableCell>{book.TotalCopies}</TableCell>
              <TableCell>{book.AvailableCopies}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 inline-block rounded-lg text-white ${
                    book.Status === 'available'
                      ? 'bg-gradient-to-r from-green-400 via-teal-500 to-green-600'
                      : book.Status === 'borrowed'
                        ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500'
                        : 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'
                  }`}
                >
                  {book.Status}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleViewDetails(book)}>
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setIsDeleteOpen(true);
                        setSelectedBook(book);
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <Modal
        isOpen={isViewDetailsOpen && selectedBook !== null}
        onClose={() => setIsViewDetailsOpen(false)}
        title="Book Details"
        submitText="Close"
      >
        {selectedBook && (
          <>
            <div>
              <strong>Title:</strong> {selectedBook.Title}
            </div>
            <div>
              <strong>ISBN:</strong> {selectedBook.ISBN}
            </div>
            <div>
              <strong>Author:</strong> {selectedBook.AuthorBook}
            </div>
            <div>
              <strong>Category:</strong> {selectedBook.CategoryBook}
            </div>
            <div>
              <strong>Publication Year:</strong> {selectedBook.PublicationYear}
            </div>
            <div>
              <strong>Description:</strong> {selectedBook.Description}
            </div>
          </>
        )}
      </Modal>

      <BookModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add New Book"
        onSubmit={handleAddBook}
        submitText="Add Book"
        bookData={newBookData}
        onChange={(e, field) =>
          setNewBookData((prev) => ({ ...prev, [field]: e.target.value }))
        }
      />
      {selectedBook && (
        <BookModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          title="Edit Book"
          onSubmit={handleUpdateBook}
          submitText="Update Book"
          bookData={updateBookData}
          onChange={(e, field) =>
            setUpdateBookData((prev) => ({ ...prev, [field]: e.target.value }))
          }
        />
      )}
      <Modal
        isOpen={isDeleteOpen && selectedBook !== null}
        onClose={() => setIsDeleteOpen(false)}
        title="Confirm Delete"
        submitText="Delete"
        onSubmit={handleDeleteBook}
      >
        {selectedBook && (
          <p>
            Are you sure you want to delete{' '}
            <strong>{selectedBook.Title}</strong> (ISBN: {selectedBook.ISBN})?
          </p>
        )}
      </Modal>
    </main>
  );
}
