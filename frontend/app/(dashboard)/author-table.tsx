'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { fetchAuthors } from 'app/api/authors/authors';

interface Author {
  AuthorID: number;
  FullName: string;
  Bio: string;
  createdAt: string;
  updatedAt: string;
}

export function AuthorsTable({
  offset,
  totalAuthors,
}: {
  offset: number;
  totalAuthors: number;
}) {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const authorsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAuthors();
        setAuthors(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function prevPage() {
    router.push(`/?offset=${Math.max(0, offset - authorsPerPage)}`, {
      scroll: false,
    });
  }

  function nextPage() {
    router.push(`/?offset=${offset + authorsPerPage}`, { scroll: false });
  }

  if (loading) {
    return <p>Loading authors...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Authors</CardTitle>
        <CardDescription>
          Manage your authors and view their information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Bio</TableHead>
              <TableHead>Join At</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {authors.map((author) => (
              <TableRow key={author.AuthorID}>
                <td>{author.FullName}</td>
                <td>{author.Bio}</td>
                <td>
                  {new Date(author.createdAt).toLocaleDateString()}
                </td>
                <td>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => alert(`Edit Author ${author.AuthorID}`)}
                  >
                    Edit
                  </Button>
                </td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {Math.max(0, offset - authorsPerPage + 1)}-{offset}
            </strong>{' '}
            of <strong>{totalAuthors}</strong> authors
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset <= authorsPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + authorsPerPage > totalAuthors}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
