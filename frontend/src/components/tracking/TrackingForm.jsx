import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TrackingForm() {
  const [trackingId, setTrackingId] =
    useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!trackingId.trim()) return;

    navigate(
      `/track/${trackingId}`
    );
  };

  return (
    <div
      className="
      w-full
      max-w-md
      bg-white
      rounded-xl
      shadow-md
      p-6
      "
    >
      <h1
        className="
        text-3xl
        font-bold
        text-center
        mb-6
        "
      >
        Courier Tracking application
      </h1>

      <form onSubmit={handleSubmit}>
        <label
          className="
          block
          mb-2
          font-medium
          "
        >
          Tracking ID
        </label>

        <input
          type="text"
          value={trackingId}
          onChange={(e) =>
            setTrackingId(
              e.target.value
            )
          }
          placeholder="QS1001"
          className="
          w-full
          border
          rounded-lg
          px-3
          py-2
          mb-4
          "
        />

        <button
          type="submit"
          className="
          w-full
          bg-black
          text-white
          py-2
          rounded-lg
          "
        >
          Track Package
        </button>
      </form>
    </div>
  );
}