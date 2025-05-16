// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Upload, Bold, Italic, Underline } from 'lucide-react';
// import { createContent, updateContent, getContent, deleteContent } from '@/actions/admin-action';

// const ContentPage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const contentId = searchParams.get('id');
  
//   const [title, setTitle] = useState('');
//   const [thumbnail, setThumbnail] = useState<File | null>(null);
//   const [type, setType] = useState<'news' | 'article'>('article');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const editorRef = useRef<HTMLDivElement>(null);
  
//   useEffect(() => {
//     if (contentId) {
//       getContent(contentId).then((data) => {
//         if (data) {
//           setTitle(data.content.title);
//           setType(data.type);
//           if (editorRef.current) {
//             editorRef.current.innerHTML = data.content.content || ''; // Ensure it's always a string
//           }
//         }
//       });
//     }
//   }, [contentId]);
  

//   const handleFormatting = (command: string) => {
//     document.execCommand(command, false, '');
//   };

//   const handleSubmit = async () => {
//     if (!title || !editorRef.current?.innerHTML) {
//       setErrorMessage('Title and content are required');
//       return;
//     }

//     const content = editorRef.current.innerHTML;

//     const response = contentId
//       ? await updateContent(contentId, type, title, content, thumbnail)
//       : await createContent(type, title, content, thumbnail);
    
//     if (response?.error) {
//       setErrorMessage(response.error);
//     } else {
//       setSuccessMessage('Content saved successfully!');
//       setTimeout(() => router.push('/admin/content'), 1000);
//     }
//   };

//   const handleDelete = async () => {
//     if (!contentId) return;
//     if (!confirm('Are you sure you want to delete this content?')) return;

//     const response = await deleteContent(contentId);
//     if (response?.error) {
//       setErrorMessage(response.error);
//     } else {
//       setSuccessMessage('Content deleted successfully!');
//       setTimeout(() => router.push('/admin/content'), 1000);
//     }
//   };

//   return (
//     <div className='p-6'>
//       <h1 className='text-2xl font-bold mb-4'>{contentId ? 'Edit Content' : 'Create New Content'}</h1>
//       {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
//       {successMessage && <p className='text-green-500'>{successMessage}</p>}

//       <select
//         value={type}
//         onChange={(e) => setType(e.target.value as 'news' | 'article')}
//         className='w-full p-2 border mb-4'
//       >
//         <option value='article'>Article</option>
//         <option value='news'>News</option>
//       </select>

//       <input
//         type='text'
//         placeholder='Title'
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className='w-full p-2 border mb-4'
//       />

//       <label className='block mb-4 cursor-pointer'>
//         <div className='flex items-center gap-2 p-2 border border-dashed rounded'>
//           <Upload size={18} /> Upload Thumbnail
//         </div>
//         <input
//           type='file'
//           accept='image/*'
//           onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
//           className='hidden'
//         />
//       </label>

//       <div className='border p-2'>
//         <div className='flex gap-2 mb-2'>
//           <button onClick={() => handleFormatting('bold')}><Bold size={18} /></button>
//           <button onClick={() => handleFormatting('italic')}><Italic size={18} /></button>
//           <button onClick={() => handleFormatting('underline')}><Underline size={18} /></button>
//         </div>
//         <div
//           ref={editorRef}
//           contentEditable
//           className='border p-2 min-h-[150px] outline-none'
//         ></div>
//       </div>

//       <div className='mt-4 flex gap-4'>
//         <Button onClick={handleSubmit}>Save</Button>
//         {contentId && <Button onClick={handleDelete} variant='destructive'>Delete</Button>}
//       </div>
//     </div>
//   );
// };

// export default ContentPage;
