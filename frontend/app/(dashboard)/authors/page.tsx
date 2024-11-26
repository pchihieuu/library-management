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
import { AuthorModal } from '@/components/AuthorModal';
import {
  deleteAuthor,
  fetchAuthors,
  createAuthor,
  updateAuthor
} from 'app/api/authors/authors';

interface AuthorData {
  AuthorID: number;
  FullName: string;
  Bio: string;
  AvatarURL: string;
  createdAt: string;
}

export default function Author() {
  const [authors, setAuthors] = useState<AuthorData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorData | null>(null);
  const [newAuthorData, setNewAuthorData] = useState<{
    FullName: string;
    Bio: string;
  }>({ FullName: '', Bio: '' });
  const [updateAuthorData, setUpdateAuthorData] = useState<{
    FullName: string;
    Bio: string;
  }>({ FullName: '', Bio: '' });

  useEffect(() => {
    async function loadAuthors() {
      try {
        const data = await fetchAuthors();
        setAuthors(data);
      } catch (error) {
        console.error('Failed to fetch authors:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadAuthors();
  }, []);

  const handleDeleteAuthor = async (AuthorID: number) => {
    try {
      await deleteAuthor(AuthorID);
      setAuthors((prev) =>
        prev.filter((author) => author.AuthorID !== AuthorID)
      );
      setIsDeleteOpen(false);
    } catch (error) {
      console.error('Failed to delete author:', error);
    }
  };

  const handleAddAuthor = async () => {
    try {
      const newAuthor = await createAuthor(newAuthorData);
      setAuthors((prev) => [...prev, newAuthor]);
      setIsAddOpen(false);
      setNewAuthorData({ FullName: '', Bio: '' });
    } catch (error) {
      console.error('Failed to add author:', error);
    }
  };

  const handleUpdateAuthor = async () => {
    if (selectedAuthor) {
      try {
        const updatedAuthor = await updateAuthor({
          AuthorID: selectedAuthor.AuthorID,
          ...updateAuthorData
        });
        setAuthors((prev) =>
          prev.map((author) =>
            author.AuthorID === selectedAuthor.AuthorID ? updatedAuthor : author
          )
        );
        setIsEditOpen(false);
        setSelectedAuthor(null);
        setUpdateAuthorData({ FullName: '', Bio: '' });
      } catch (error) {
        console.error('Failed to update author:', error);
      }
    }
  };

  const handleViewDetails = (author: AuthorData) => {
    setSelectedAuthor(author);
    setIsViewOpen(true);
  };

  const handleEditAuthor = (author: AuthorData) => {
    setUpdateAuthorData({ FullName: author.FullName, Bio: author.Bio });
    setSelectedAuthor(author);
    setIsEditOpen(true);
  };

  if (isLoading) {
    return <p>Loading authors...</p>;
  }

  // if (authors.length === 0) {
  //   return <p>No authors available.</p>;
  // }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Authors</h1>
      <Button onClick={() => setIsAddOpen(true)} className="mb-4">
      <Plus className="mr-2 h-4 w-4" /> Add New Author
      </Button>

      <Table className="table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Bio</th>
            <th>Join At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <TableRow key={author.AuthorID}>
              <TableCell
                className="font-medium cursor-pointer min-w-[200px]"
                onClick={() => handleViewDetails(author)}
              >
                {author.FullName}
              </TableCell>
              <TableCell>{author.Bio}</TableCell>
              <TableCell className="hidden md:table-cell">
                {new Date(author.createdAt).toLocaleDateString('en-US')}
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
                    <DropdownMenuItem onClick={() => handleViewDetails(author)}>
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEditAuthor(author)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setIsDeleteOpen(true);
                        setSelectedAuthor(author);
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

      <AuthorModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add New Author"
        onSubmit={handleAddAuthor}
        submitText="Add"
      >
        <input
          type="text"
          placeholder="Full Name"
          value={newAuthorData.FullName}
          onChange={(e) =>
            setNewAuthorData({ ...newAuthorData, FullName: e.target.value })
          }
          className="input w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Bio"
          value={newAuthorData.Bio}
          onChange={(e) =>
            setNewAuthorData({ ...newAuthorData, Bio: e.target.value })
          }
          className="textarea w-full h-32 p-4 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </AuthorModal>

      <AuthorModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Author"
        onSubmit={handleUpdateAuthor}
        submitText="Update"
      >
        <input
          type="text"
          placeholder="Full Name"
          value={updateAuthorData.FullName}
          onChange={(e) =>
            setUpdateAuthorData({
              ...updateAuthorData,
              FullName: e.target.value
            })
          }
          className="input w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Bio"
          value={updateAuthorData.Bio}
          onChange={(e) =>
            setUpdateAuthorData({ ...updateAuthorData, Bio: e.target.value })
          }
          className="textarea w-full h-32 p-4 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </AuthorModal>

      {selectedAuthor && (
        <AuthorModal
          isOpen={isViewOpen}
          onClose={() => setIsViewOpen(false)}
          title="View Author Details"
          onSubmit={() => {}}
          submitText="Close"
          readOnly
        >
          <div className="mb-4">
            <strong>Full Name:</strong> {selectedAuthor.FullName}
          </div>
          <div className="mb-4">
            <strong>Bio:</strong> {selectedAuthor.Bio}
          </div>
          <div>
            <strong>Join At:</strong>{' '}
            {new Date(selectedAuthor.createdAt).toLocaleDateString('en-US')}
          </div>
        </AuthorModal>
      )}

      {selectedAuthor && (
        <AuthorModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          title="Delete Author"
          onSubmit={() => handleDeleteAuthor(selectedAuthor.AuthorID)}
          submitText="Delete"
        >
          <p>Are you sure you want to delete {selectedAuthor.FullName}?</p>
        </AuthorModal>
      )}
    </main>
  );
}
