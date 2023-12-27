// App.js

import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [markdown, setMarkdown] = useState("");

  let debounceTimer: NodeJS.Timeout;

  const debouncedSendToBackend = (value: string) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      sendMarkdownToBackend(value);
    }, 700);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
    debouncedSendToBackend(e.target.value);
  };

  const sendMarkdownToBackend = async (markdownContent: string) => {
    try {
      const response = await fetch(
        "https://backend-mark.onrender.com/convert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ markdown: markdownContent }),
        }
      );
      const htmlResponse = await response.json();
      updatePreview(htmlResponse.html);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updatePreview = (html: string) => {
    const elem = document.getElementById("preview");
    if (elem) {
      elem.innerHTML = html;
    }
  };

  return (
    <div>
      <div className="editor-pane">
        <textarea
          className="textArea"
          value={markdown}
          onChange={handleInputChange}
          placeholder="Type your Markdown here..."
        />
      </div>
      <div className="preview-pane">
        <h2>Preview</h2>
        <div id="preview" />
      </div>
    </div>
  );
};

export default App;
