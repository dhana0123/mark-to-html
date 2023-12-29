import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [markdown, setMarkdown] = useState("");
  const [socketConnect, setSocketConnection] = useState<WebSocket | null>(null);
  const [previewHTML, setPreviewHTML] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/convert");
    setSocketConnection(ws);

    ws.onopen = function () {
      console.log("WebSocket connected successfully");
    };

    ws.onmessage = function (evt) {
      const receivedMsg = evt.data;
      setPreviewHTML(receivedMsg);
    };

    ws.onclose = function () {
      console.log("WebSocket connection closed");
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  let debounceTimer: NodeJS.Timeout;

  const debouncedSendToBackend = (value: string) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      sendMarkdownToBackend(value);
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setMarkdown(value);
    debouncedSendToBackend(value);
  };

  const sendMarkdownToBackend = (markdownContent: string) => {
    if (socketConnect) {
      try {
        socketConnect.send(markdownContent);
      } catch (error) {
        console.error("Error:", error);
      }
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
        <div dangerouslySetInnerHTML={{ __html: previewHTML }} />
      </div>
    </div>
  );
};

export default App;
