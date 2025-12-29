export const exampleApiHandler = (hasPrisma: boolean) => `
import { NextResponse } from 'next/server';
${hasPrisma ? "import prisma from '@/lib/prisma';" : ""}

export async function GET() {
  ${
    hasPrisma
      ? "const posts = await prisma.post.findMany();"
      : "const posts = [{ id: 1, title: 'Hello World', content: 'This is a mock post' }];"
  }
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json();
  ${
    hasPrisma
      ? "const post = await prisma.post.create({ data: { title: body.title, content: body.content } });"
      : "const post = { id: Date.now(), ...body };"
  }
  return NextResponse.json(post);
}
`;

export const examplePage = (hasQuery: boolean, hasAxios: boolean) => `
'use client';

import { useState, useEffect } from 'react';
${
  hasQuery
    ? "import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';"
    : ""
}
${hasAxios ? "import { api } from '@/lib/axios';" : ""}

export default function PostsPage() {
  const [title, setTitle] = useState('');
  
  ${
    hasQuery
      ? `
  const queryClient = useQueryClient();
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      ${
        hasAxios
          ? "const res = await api.get('/posts'); return res.data;"
          : "const res = await fetch('/api/posts'); return res.json();"
      }
    }
  });

  const mutation = useMutation({
    mutationFn: async (newPost: any) => {
       ${
         hasAxios
           ? "return api.post('/posts', newPost);"
           : "return fetch('/api/posts', { method: 'POST', body: JSON.stringify(newPost) });"
       }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutation.mutate({ title, content: 'Dynamic content' });
    setTitle('');
  };
  `
      : `
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
       ${
         hasAxios
           ? "const res = await api.get('/posts'); setPosts(res.data);"
           : "const res = await fetch('/api/posts'); const data = await res.json(); setPosts(data);"
       }
       setIsLoading(false);
    };
    fetchPosts();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Simple POST logic
    const payload = { title, content: 'Dynamic content' };
    ${
      hasAxios
        ? "await api.post('/posts', payload);"
        : "await fetch('/api/posts', { method: 'POST', body: JSON.stringify(payload) });"
    }
    // Refresh (not optimal but simple for example)
    window.location.reload();
  };
  `
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
        <input 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Post Title" 
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Post
        </button>
      </form>
      <div className="grid gap-4">
        {posts?.map((post: any) => (
          <div key={post.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
`;

export const hubPage = `
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-gray-50 to-white dark:from-black dark:to-gray-900 dark:text-white">
      <div className="text-center mb-16 max-w-2xl">
        <h1 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Welcome to Your App
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Your project is ready. Select an example below to get started.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Auth Card */}
        <Link href="/auth" className="group">
          <div className="p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all hover:border-blue-500 bg-white dark:bg-gray-800/50">
            <h2 className="text-2xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
              Authentication &rarr;
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Complete user authentication flow with server-side sessions, protected routes, and user profiles.
            </p>
          </div>
        </Link>

        {/* CRUD Card */}
        <Link href="/posts" className="group">
          <div className="p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all hover:border-purple-500 bg-white dark:bg-gray-800/50">
            <h2 className="text-2xl font-semibold mb-3 group-hover:text-purple-600 transition-colors">
              CRUD Operations &rarr;
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Full-stack Create, Read, Update, Delete functionality with database integration and API routes.
            </p>
          </div>
        </Link>
      </div>

      <div className="mt-16 text-center text-sm text-gray-500">
        <p>Generated by nxt-gen-cli 🚀</p>
      </div>
    </main>
  );
}
`;
