'use client'
import React , { useEffect, useState }from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import axios from 'axios';
import Link from 'next/link';
export default function App() {
const [posts, setPosts] = useState([]);
useEffect(() => {
fetchPosts();
}, []);
const fetchPosts = async () => {
try {
const res = await axios.get('/api/posts');
setPosts(res.data);
} catch (error) {
console.error(error);
}
};
const deletePost = async (id) => {
try {
await axios.delete(`/api/posts/${id}`);
fetchPosts();
} catch (error) {
console.error('Failed to delete the post', error);
}
};
return (
<>
<Link
className="mt-4 inline-flex items-center px-4 py-2
border border-transparent shadow-sm text-sm font-medium
rounded-md text-white bg-indigo-600 hover:bg-indigo-700
focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
href="/create"
>
สร้างรายการโพสต์ใหม่
</Link>
<Table aria-label="Example static collection table">
<TableHeader>
<TableColumn>รหัส</TableColumn>
<TableColumn>หัวข้อ</TableColumn>
<TableColumn>เนื้อหา</TableColumn>
<TableColumn>วันเวลาโพส</TableColumn>
<TableColumn>ACTION</TableColumn>
</TableHeader>
<TableBody>
{
posts.map((post, index) => (
<TableRow key={index}>
<TableCell>{post.id}</TableCell>
<TableCell>{post.title}</TableCell>
<TableCell>{post.content}</TableCell>
<TableCell>{post.createdAt}</TableCell>
<TableCell>
<Link
className="text-indigo-600 hover:text-indigo-900 mr-4"
href={`/edit/${post.id}`}
>
แก้ไข
</Link>
<button
onClick={() => deletePost(post.id)}
className="text-red-600 hover:text-red-900"
>
ลบ
</button></TableCell>
</TableRow>
))
}
</TableBody>
</Table>
</>
);
}