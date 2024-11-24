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
import {
  createUser,
  deleteUser,
  fetchUsers,
  updateUser
} from 'app/api/users/user';
import { Modal } from '@/components/Modal';

interface UserData {
  UserID: number;
  FullName: string;
  Email: string;
  Role: string;
  createdAt: string;
}

export default function UserPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [newUserData, setNewUserData] = useState<{
    FullName: string;
    Email: string;
    Role: string;
  }>({
    FullName: '',
    Email: '',
    Role: 'Member'
  });
  const [updateUserData, setUpdateUserData] = useState<{
    FullName: string;
    Email: string;
    Role: string;
  }>({
    FullName: '',
    Email: '',
    Role: 'Member'
  });

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadUsers();
  }, []);

  const handleDeleteUser = async () => {
    if (selectedUser) {
      try {
        await deleteUser(selectedUser.UserID);
        setUsers((prev) =>
          prev.filter((user) => user.UserID !== selectedUser.UserID)
        );
        setIsDeleteOpen(false);
        setSelectedUser(null);
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const handleAddUser = async () => {
    try {
      const newUser = await createUser(newUserData);
      setUsers((prev) => [...prev, newUser]);
      setIsAddOpen(false);
      setNewUserData({ FullName: '', Email: '', Role: 'Member' });
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  const handleUpdateUser = async () => {
    if (selectedUser) {
      try {
        const updatedUser = await updateUser({
          UserID: selectedUser.UserID,
          ...updateUserData
        });
        setUsers((prev) =>
          prev.map((user) =>
            user.UserID === selectedUser.UserID ? updatedUser : user
          )
        );
        setIsEditOpen(false);
        setSelectedUser(null);
        setUpdateUserData({ FullName: '', Email: '', Role: 'Member' });
      } catch (error) {
        console.error('Failed to update user:', error);
      }
    }
  };

  const handleViewDetails = (user: UserData) => {
    setSelectedUser(user);
    setIsViewOpen(true);
  };

  const handleEditUser = (user: UserData) => {
    setUpdateUserData({
      FullName: user.FullName,
      Email: user.Email,
      Role: user.Role
    });
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-gradient-to-r from-red-400 via-red-500 to-red-500 text-white shadow-lg';
      case 'Member':
        return 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-500 text-white shadow-lg';
      case 'Guest':
        return 'bg-gradient-to-r from-gray-400 via-gray-500 to-gray-500 text-white shadow-lg';
      default:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-black shadow-lg';
    }
  };

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (users.length === 0) {
    return <p>No users available.</p>;
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <Button onClick={() => setIsAddOpen(true)} className="mb-4">
        Add New User
      </Button>

      <Table className="table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th className="text-center">Role</th> <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <TableRow key={user.UserID}>
              <TableCell
                className="font-medium cursor-pointer"
                onClick={() => handleViewDetails(user)}
              >
                {user.FullName}
              </TableCell>
              <TableCell>{user.Email}</TableCell>
              <TableCell className="text-center">
                {' '}
                <span
                  className={`inline-block px-3 py-1 rounded-full ${getRoleColor(user.Role)}`}
                >
                  {user.Role}
                </span>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {new Date(user.createdAt).toLocaleDateString('en-US')}
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
                    <DropdownMenuItem onClick={() => handleViewDetails(user)}>
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEditUser(user)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setIsDeleteOpen(true);
                        setSelectedUser(user);
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
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add New User"
        onSubmit={handleAddUser}
        submitText="Add"
      >
        <input
          type="text"
          placeholder="Full Name"
          value={newUserData.FullName}
          onChange={(e) =>
            setNewUserData({ ...newUserData, FullName: e.target.value })
          }
          className="input w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUserData.Email}
          onChange={(e) =>
            setNewUserData({ ...newUserData, Email: e.target.value })
          }
          className="input w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={newUserData.Role}
          onChange={(e) =>
            setNewUserData({ ...newUserData, Role: e.target.value })
          }
          className="input w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Admin">Admin</option>
          <option value="Member">Member</option>
          <option value="Guest">Guest</option>
        </select>
      </Modal>

      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit User"
        onSubmit={handleUpdateUser}
        submitText="Update"
      >
        <input
          type="text"
          placeholder="Full Name"
          value={updateUserData.FullName}
          onChange={(e) =>
            setUpdateUserData({ ...updateUserData, FullName: e.target.value })
          }
          className="input w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={updateUserData.Email}
          onChange={(e) =>
            setUpdateUserData({ ...updateUserData, Email: e.target.value })
          }
          className="input w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={updateUserData.Role}
          onChange={(e) =>
            setUpdateUserData({ ...updateUserData, Role: e.target.value })
          }
          className="input w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Admin">Admin</option>
          <option value="Member">Member</option>
          <option value="Guest">Guest</option>
        </select>
      </Modal>

      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Delete User"
        onSubmit={handleDeleteUser}
        submitText="Delete"
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>

      {isViewOpen && selectedUser && (
        <Modal
          isOpen={isViewOpen}
          onClose={() => setIsViewOpen(false)}
          title="User Details"
          submitText="Close"
        >
          <div>
            <p>
              <strong>Full Name:</strong> {selectedUser.FullName}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.Email}
            </p>
            <p>
              <strong>Role:</strong> {selectedUser.Role}
            </p>
            <p>
              <strong>Created At:</strong>{' '}
              {new Date(selectedUser.createdAt).toLocaleDateString('en-US')}
            </p>
          </div>
        </Modal>
      )}
    </main>
  );
}
