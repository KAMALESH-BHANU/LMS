import React, { useState, useEffect, useRef } from "react";

const SmartChatbot = () => {

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hello! I'm your Library Assistant. Ask me anything about the system."
    }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /* KNOWLEDGE BASE */

  const knowledgeBase = [

    {
      keywords: ["borrow", "issue", "get book"],
      answer: "📚 To borrow a book, open 'Browse Books' and click the Request Book button."
    },

    {
      keywords: ["return book", "return"],
      answer: "↩️ To return a book, go to 'My Books' and click Return Request."
    },

    {
      keywords: ["fine", "late fee"],
      answer: "⚠️ If a book is returned after the due date, a late fine may be applied."
    },

    {
      keywords: ["membership"],
      answer: "👤 You can view membership details in the Membership page."
    },

    {
      keywords: ["renew membership", "renew"],
      answer: "🔄 Membership renewal can be done from the Membership section."
    },

    {
      keywords: ["book history"],
      answer: "📖 Your previously borrowed books are available in the Book History page."
    },

    {
      keywords: ["due date"],
      answer: "📅 Book due dates are visible in the My Books section."
    },

    {
      keywords: ["profile"],
      answer: "🧑 You can update your information in the Profile section."
    },

    {
      keywords: ["search books", "available books"],
      answer: "🔍 Use the Browse Books page to search books by title, author, or category."
    },

    {
      keywords: ["max books", "maximum books"],
      answer: "📚 Usually students can borrow up to 3 books depending on membership."
    },

    {
      keywords: ["notifications"],
      answer: "🔔 Notifications are available using the bell icon in the top navigation bar."
    },

    /* STUDENT FEATURES */

    {
      keywords: ["student features", "student can do"],
      answer:
        "🎓 Students can: Browse books, Request books, Return books, Receive notifications, View book details, and Update their profile."
    },

    {
      keywords: ["browse book"],
      answer:
        "📚 Students can browse books using the Browse Books page where all available books are listed."
    },

    {
      keywords: ["request book"],
      answer:
        "📥 Students can request a book from the Browse Books page using the Request button."
    },

    {
      keywords: ["notify book available", "notify book"],
      answer:
        "🔔 If a book is unavailable, you can request a notification when it becomes available."
    },

    {
      keywords: ["book details"],
      answer:
        "📖 Students can click a book to view detailed information like author, category, and availability."
    },

    /* ADMIN FEATURES */

    {
      keywords: ["admin features", "admin can do"],
      answer:
        "🛠 Admin can manage the system including adding books, approving users, managing users, updating books, deleting books, and approving borrow/return requests."
    },

    {
      keywords: ["add book"],
      answer:
        "➕ Admin or Librarian can add new books to the system using the Add Book page."
    },

    {
      keywords: ["delete book"],
      answer:
        "🗑 Admin or Librarian can remove books from the library database."
    },

    {
      keywords: ["update book"],
      answer:
        "✏️ Books can be edited or updated by Admin or Librarian from the Manage Books section."
    },

    {
      keywords: ["approve user"],
      answer:
        "✅ Admin or Librarian can approve new user registrations before they can access the system."
    },

    {
      keywords: ["manage users"],
      answer:
        "👥 Admin or Librarian can view, approve, or manage registered users."
    },

    {
      keywords: ["approve request", "approve book request"],
      answer:
        "📥 Admin or Librarian can approve or reject book borrow requests."
    },

    {
      keywords: ["approve return"],
      answer:
        "↩️ Returned books must be approved by Admin or Librarian to complete the return process."
    },

    /* LIBRARIAN FEATURES */

    {
      keywords: ["librarian features", "librarian can do"],
      answer:
        "📚 Librarians manage books and users including adding books, approving users, approving book requests, approving returns, and managing library records."
    }

  ];

  /* SUGGESTIONS */

  const suggestions = [
    "How do I borrow a book?",
    "What student can do?",
    "What admin can do?",
    "What librarian can do?",
    "How many books can I borrow?"
  ];

  /* MATCHING */

  const findBestAnswer = (question) => {

    const text = question.toLowerCase();

    let bestScore = 0;
    let bestAnswer = null;

    knowledgeBase.forEach((item) => {

      let score = 0;

      item.keywords.forEach((keyword) => {

        if (text.includes(keyword)) score++;

      });

      if (score > bestScore) {
        bestScore = score;
        bestAnswer = item.answer;
      }

    });

    if (bestScore > 0) return bestAnswer;

    return "❗ Sorry, I can't answer that right now. Please contact the librarian.";
  };

  /* SEND MESSAGE */

  const sendMessage = (msg) => {

    const userText = msg || input;

    if (!userText.trim()) return;

    const userMessage = { sender: "user", text: userText };

    const botReply = {
      sender: "bot",
      text: findBestAnswer(userText)
    };

    setMessages((prev) => [...prev, userMessage, botReply]);

    setInput("");
  };

  return (
    <>

      {/* FLOATING BUTTON */}

      <div
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-xl cursor-pointer z-50 hover:scale-110 transition"
      >
        💬
      </div>

      {/* CHAT WINDOW */}

      {open && (

        <div className="fixed bottom-24 right-6 w-80 bg-white shadow-2xl rounded-2xl border z-50 overflow-hidden">

          {/* HEADER */}

          <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 font-semibold">

            Library Assistant 🤖

            <button
              onClick={() => setOpen(false)}
              className="text-white text-lg"
            >
              ✕
            </button>

          </div>

          {/* MESSAGES */}

          <div className="h-72 overflow-y-auto p-4 space-y-3 bg-gray-50">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`text-sm p-3 rounded-xl max-w-xs ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white ml-auto"
                    : "bg-white border"
                }`}
              >
                {msg.text}
              </div>

            ))}

            <div ref={messagesEndRef}></div>

          </div>

          {/* SUGGESTIONS */}

          <div className="px-3 py-2 bg-gray-100 flex flex-wrap gap-2">

            {suggestions.map((s, i) => (

              <button
                key={i}
                onClick={() => sendMessage(s)}
                className="text-xs bg-white border px-3 py-1 rounded-full hover:bg-blue-50"
              >
                {s}
              </button>

            ))}

          </div>

          {/* INPUT */}

          <div className="flex border-t">

            <input
              type="text"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 p-3 text-sm outline-none"
            />

            <button
              onClick={() => sendMessage()}
              className="bg-blue-600 text-white px-5 hover:bg-blue-700 transition"
            >
              Send
            </button>

          </div>

        </div>

      )}

    </>
  );
};

export default SmartChatbot;