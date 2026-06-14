// Use DOMPurify to safely handle HTML content
// 使用 DOMPurify 安全处理 HTML 内容
import DOMPurify from 'dompurify';

// Escape HTML special characters
// 转义 HTML 特殊字符
export function escapeHTML(str) {
	if (typeof str !== 'string') return '';
	// 使用替换方法确保 HTML 特殊字符被转义，而不是被移除
	// 这样 <java> 会变成 &lt;java&gt; 而不是被删除
	return str.replace(/[&<>"']/g, function(c) {
		return {
			'&': '&amp;',  // & 转为 &amp;
			'<': '&lt;',   // < 转为 &lt;
			'>': '&gt;',   // > 转为 &gt;
			'"': '&quot;', // " 转为 &quot;
			"'": '&#39;'   // ' 转为 &#39;
		}[c];
	});
}

// Convert text to HTML, preserving line breaks
// 将文本转换为 HTML，保留换行符
export function textToHTML(text, allowHTML = false) {
	if (typeof text !== 'string') return '';
	
	if (allowHTML) {
		// 如果允许 HTML，则先保留 HTML 标签，只转义文本内容
		// 使用临时占位符保护 HTML 标签
		const tempPlaceholders = [];
		let result = text;
		let counter = 0;
		
		// 提取 HTML 标签
		result = result.replace(/<[^>]+>/g, (match) => {
			const placeholder = `__HTML_PLACEHOLDER_${counter}__`;
			tempPlaceholders.push(match);
			counter++;
			return placeholder;
		});
		
		// 转义剩余的文本内容
		result = escapeHTML(result);
		
		// 恢复 HTML 标签（使用 DOMPurify 清理）
		tempPlaceholders.forEach((tag, index) => {
			result = result.replace(`__HTML_PLACEHOLDER_${index}__`, tag);
		});
		
		// 替换换行符
		result = result.replace(/\n/g, '<br>');
		
		// 使用 DOMPurify 清理，只允许 <br> 和 <span class="mention-highlight"> 标签
		return DOMPurify.sanitize(result, {
			ALLOWED_TAGS: ['br', 'span'],
			ALLOWED_ATTR: ['class'],
		});
	} else {
		// 原有逻辑：完全转义
		const escaped = escapeHTML(text);
		const withLineBreaks = escaped.replace(/\n/g, '<br>');
		return DOMPurify.sanitize(withLineBreaks, {
			ALLOWED_TAGS: ['br'],
			ALLOWED_ATTR: [],
		});
	}
}