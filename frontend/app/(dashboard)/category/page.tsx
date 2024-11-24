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
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow, Table } from '@/components/ui/table';
import { AuthorModal } from '@/components/AuthorModal';
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory
} from 'app/api/category/category';

interface CategoryData {
  CategoryID: number;
  CategoryName: string;
  Description?: string;
  createdAt: string;
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(
    null
  );
  const [newCategoryData, setNewCategoryData] = useState<{
    CategoryName: string;
    Description?: string;
  }>({
    CategoryName: '',
    Description: ''
  });
  const [updateCategoryData, setUpdateCategoryData] = useState<{
    CategoryName: string;
    Description?: string;
  }>({
    CategoryName: '',
    Description: ''
  });

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadCategories();
  }, []);

  const handleDeleteCategory = async (CategoryID: number) => {
    try {
      await deleteCategory(CategoryID);
      setCategories((prev) =>
        prev.filter((category) => category.CategoryID !== CategoryID)
      );
      setIsDeleteOpen(false);
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  const handleAddCategory = async () => {
    try {
      const newCategory = await createCategory(newCategoryData);
      setCategories((prev) => [...prev, newCategory]);
      setIsAddOpen(false);
      setNewCategoryData({ CategoryName: '', Description: '' });
    } catch (error) {
      console.error('Failed to add category:', error);
    }
  };

  const handleUpdateCategory = async () => {
    if (selectedCategory) {
      try {
        const updatedCategory = await updateCategory({
          CategoryID: selectedCategory.CategoryID,
          ...updateCategoryData
        });
        setCategories((prev) =>
          prev.map((category) =>
            category.CategoryID === selectedCategory.CategoryID
              ? updatedCategory
              : category
          )
        );
        setIsEditOpen(false);
        setSelectedCategory(null);
        setUpdateCategoryData({ CategoryName: '', Description: '' });
      } catch (error) {
        console.error('Failed to update category:', error);
      }
    }
  };

  const handleViewDetails = (category: CategoryData) => {
    setSelectedCategory(category);
    setIsViewOpen(true);
  };

  const handleEditCategory = (category: CategoryData) => {
    setUpdateCategoryData({
      CategoryName: category.CategoryName,
      Description: category.Description
    });
    setSelectedCategory(category);
    setIsEditOpen(true);
  };

  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  if (categories.length === 0) {
    return <p>No categories available.</p>;
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <Button onClick={() => setIsAddOpen(true)} className="mb-4">
        Add New Category
      </Button>

      <Table className="table">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <TableRow key={category.CategoryID}>
              <TableCell
                className="font-medium cursor-pointer"
                onClick={() => handleViewDetails(category)}
              >
                {category.CategoryName}
              </TableCell>
              <TableCell>{category.Description || 'N/A'}</TableCell>
              <TableCell className="hidden md:table-cell">
                {new Date(category.createdAt).toLocaleDateString('en-US')}
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
                    <DropdownMenuItem
                      onClick={() => handleViewDetails(category)}
                    >
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleEditCategory(category)}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setIsDeleteOpen(true);
                        setSelectedCategory(category);
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
        title="Add New Category"
        onSubmit={handleAddCategory}
        submitText="Add"
      >
        <input
          type="text"
          placeholder="Category Name"
          value={newCategoryData.CategoryName}
          onChange={(e) =>
            setNewCategoryData({
              ...newCategoryData,
              CategoryName: e.target.value
            })
          }
          className="input w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Description"
          value={newCategoryData.Description}
          onChange={(e) =>
            setNewCategoryData({
              ...newCategoryData,
              Description: e.target.value
            })
          }
          className="input w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </AuthorModal>

      <AuthorModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Category"
        onSubmit={handleUpdateCategory}
        submitText="Update"
      >
        <input
          type="text"
          placeholder="Category Name"
          value={updateCategoryData.CategoryName}
          onChange={(e) =>
            setUpdateCategoryData({
              ...updateCategoryData,
              CategoryName: e.target.value
            })
          }
          className="input w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Description"
          value={updateCategoryData.Description}
          onChange={(e) =>
            setUpdateCategoryData({
              ...updateCategoryData,
              Description: e.target.value
            })
          }
          className="textarea w-full h-32 p-4 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </AuthorModal>

      {selectedCategory && (
        <AuthorModal
          isOpen={isViewOpen}
          onClose={() => setIsViewOpen(false)}
          title="View Category Details"
          readOnly
        >
          <div className="mb-4">
            <strong>Category Name:</strong> {selectedCategory.CategoryName}
          </div>
          <div className="mb-4">
            <strong>Description:</strong>{' '}
            {selectedCategory.Description || 'N/A'}
          </div>
          <div>
            <strong>Created At:</strong>{' '}
            {new Date(selectedCategory.createdAt).toLocaleDateString('en-US')}
          </div>
        </AuthorModal>
      )}

      {selectedCategory && (
        <AuthorModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          title="Delete Category"
          onSubmit={() => handleDeleteCategory(selectedCategory.CategoryID)}
          submitText="Delete"
        >
          <p>
            Are you sure you want to delete {selectedCategory.CategoryName}?
          </p>
        </AuthorModal>
      )}
    </main>
  );
}
