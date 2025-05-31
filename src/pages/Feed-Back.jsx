import { useState } from "react";

function Feedback() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, message, rating });
    alert("Thank you for your feedback!");
    // Reset form
    setName("");
    setMessage("");
    setRating(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Feedback</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="block font-medium">Your Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            placeholder="Enter your name"
            required
          />
        </label>

        <label className="block">
          <span className="block font-medium">Your Feedback</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            rows="4"
            placeholder="Write your feedback here..."
            required
          ></textarea>
        </label>

        <label className="block">
          <span className="block font-medium">Rating</span>
          <div className="flex space-x-2 mt-1">
            {[1, 2, 3, 4, 5].map((num) => (
              <label key={num} className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="rating"
                  value={num}
                  checked={rating === num}
                  onChange={() => setRating(num)}
                />
                <span>⭐</span>
              </label>
            ))}
          </div>
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Feedback;
