import React from 'react';

const MarkdownRenderer = ({ content }) => {
  // Simple markdown parser for basic formatting
  const parseMarkdown = (text) => {
    if (!text) return '';
    
    // Convert markdown to HTML
    let html = text
      // Headers
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mb-2 mt-4">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mb-3 mt-4">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4 mt-4">$1</h1>')
      
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-md overflow-x-auto my-4"><code class="text-sm">$1</code></pre>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm">$1</code>')
      
      // Lists
      .replace(/^\* (.*$)/gm, '<li class="mb-1">$1</li>')
      .replace(/^- (.*$)/gm, '<li class="mb-1">$1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li class="mb-1">$1</li>')
      
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">$1</a>')
      
      // Line breaks
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br>');

    // Wrap in paragraph tags
    html = '<p class="mb-4">' + html + '</p>';
    
    // Wrap consecutive list items in ul tags
    html = html.replace(/(<li class="mb-1">.*?<\/li>)(\s*<li class="mb-1">.*?<\/li>)*/g, '<ul class="list-disc pl-6 mb-4">$&</ul>');
    
    return html;
  };

  return (
    <div 
      className="prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
    />
  );
};

export default MarkdownRenderer;